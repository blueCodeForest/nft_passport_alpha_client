import { LineAuthLevel } from 'src/types/auth';
import { LiffAdapter } from 'src/authBackup/adapters/LiffAdapter';
import { PendingActionService } from './PendingActionService';

/**
 * 認証ステップの種類
 */
export enum AuthStep {
  REDIRECT_TO_LINE = 'redirectToLine',
  LOGIN = 'login',
  ADD_FRIEND = 'addFriend',
}

/**
 * 認証オプション
 */
export interface AuthOptions {
  actionId?: string;
  callback?: string;
  liffId: string;
  botId: string;
  redirectPath?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  onError?: (error: Error) => void;
}

/**
 * 認証ロジックの中核となるサービスクラス
 * 認証レベルの判定、認証フローの制御、認証操作の実行を担当する
 */
export class AuthenticationService {
  /**
   * 現在の認証レベルを取得する
   */
  static async getCurrentAuthLevel(): Promise<LineAuthLevel> {
    // LINE内ブラウザで実行されているかどうかを確認
    if (!LiffAdapter.isInClient()) {
      return LineAuthLevel.NONE;
    }

    // LINEにログインしているかどうかを確認
    if (!LiffAdapter.isLoggedIn()) {
      return LineAuthLevel.IN_LINE_BROWSER;
    }

    // 友だち関係を確認
    try {
      const isFriend = await LiffAdapter.getFriendship();
      return isFriend ? LineAuthLevel.LINE_FRIEND : LineAuthLevel.LINE_LOGIN;
    } catch (error) {
      console.error('友だち関係の確認に失敗しました:', error);
      return LineAuthLevel.LINE_LOGIN;
    }
  }

  /**
   * 認証レベルを満たしているかどうかを確認する
   */
  static async checkAuthLevel(requiredLevel: LineAuthLevel): Promise<boolean> {
    const currentLevel = await this.getCurrentAuthLevel();
    return currentLevel >= requiredLevel;
  }

  /**
   * 認証フローを実行する
   */
  static async authenticate(
    requiredLevel: LineAuthLevel,
    options: AuthOptions
  ): Promise<boolean> {
    try {
      // 現在の認証レベルを確認
      const currentLevel = await this.getCurrentAuthLevel();

      // 既に認証レベルを満たしている場合は成功を返す
      if (currentLevel >= requiredLevel) {
        options.onSuccess?.();
        return true;
      }

      // 必要な認証ステップを決定
      const steps = this.determineAuthSteps(currentLevel, requiredLevel);

      // 各ステップを順番に実行
      for (const step of steps) {
        const success = await this.executeAuthStep(step, options);
        if (!success) {
          options.onCancel?.();
          return false; // ユーザーがキャンセルした場合
        }
      }

      // 認証完了後の状態を確認
      const newLevel = await this.getCurrentAuthLevel();
      const success = newLevel >= requiredLevel;

      if (success) {
        options.onSuccess?.();
      }

      return success;
    } catch (error) {
      console.error('認証エラー:', error);
      const errorObj =
        error instanceof Error ? error : new Error('認証に失敗しました');
      options.onError?.(errorObj);
      return false;
    }
  }

  /**
   * 認証ステップを実行する
   */
  private static async executeAuthStep(
    step: AuthStep,
    options: AuthOptions
  ): Promise<boolean> {
    switch (step) {
      case AuthStep.REDIRECT_TO_LINE:
        return LiffAdapter.redirectToLine(options.liffId, options.redirectPath);

      case AuthStep.LOGIN:
        // 保留中アクションを設定
        if (options.actionId && options.callback) {
          PendingActionService.setPendingAction(
            options.actionId,
            options.callback
          );
        }
        LiffAdapter.login();
        return true;

      case AuthStep.ADD_FRIEND:
        // 保留中アクションを設定
        if (options.actionId && options.callback) {
          PendingActionService.setPendingAction(
            options.actionId,
            options.callback
          );
        }
        LiffAdapter.openFriendshipPage(options.botId);
        return true;

      default:
        return false;
    }
  }

  /**
   * 必要な認証ステップを決定する
   */
  private static determineAuthSteps(
    current: LineAuthLevel,
    required: LineAuthLevel
  ): AuthStep[] {
    const steps: AuthStep[] = [];

    if (
      current < LineAuthLevel.IN_LINE_BROWSER &&
      required >= LineAuthLevel.IN_LINE_BROWSER
    ) {
      steps.push(AuthStep.REDIRECT_TO_LINE);
    }

    if (
      current < LineAuthLevel.LINE_LOGIN &&
      required >= LineAuthLevel.LINE_LOGIN
    ) {
      steps.push(AuthStep.LOGIN);
    }

    if (
      current < LineAuthLevel.LINE_FRIEND &&
      required >= LineAuthLevel.LINE_FRIEND
    ) {
      steps.push(AuthStep.ADD_FRIEND);
    }

    return steps;
  }

  /**
   * 保留中アクションをチェックする
   */
  static checkPendingActions(): boolean {
    return PendingActionService.executePendingAction();
  }
}
