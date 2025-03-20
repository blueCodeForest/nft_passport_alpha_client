/**
 * 保留中アクションを管理するサービスクラス
 * 認証後に実行するアクションの保存と取得を担当する
 */
export class PendingActionService {
  private static readonly PENDING_ACTION_KEY = 'pendingAction';
  private static readonly PENDING_CALLBACK_KEY = 'pendingCallback';
  private static readonly PENDING_ACTION_ID_KEY = 'pendingActionId';

  /**
   * 保留中アクションを設定する
   * @param actionId アクションを識別するID
   * @param callback 実行するコールバック関数の文字列表現
   */
  static setPendingAction(actionId: string, callback: string): void {
    sessionStorage.setItem(this.PENDING_ACTION_KEY, 'true');
    sessionStorage.setItem(this.PENDING_CALLBACK_KEY, callback);
    sessionStorage.setItem(this.PENDING_ACTION_ID_KEY, actionId);
  }

  /**
   * 保留中アクションがあるかどうかを確認する
   */
  static hasPendingAction(): boolean {
    return sessionStorage.getItem(this.PENDING_ACTION_KEY) === 'true';
  }

  /**
   * 保留中アクションのIDを取得する
   */
  static getPendingActionId(): string | null {
    return sessionStorage.getItem(this.PENDING_ACTION_ID_KEY);
  }

  /**
   * 保留中アクションのコールバックを取得する
   */
  static getPendingCallback(): string | null {
    return sessionStorage.getItem(this.PENDING_CALLBACK_KEY);
  }

  /**
   * 保留中アクションをクリアする
   */
  static clearPendingAction(): void {
    sessionStorage.removeItem(this.PENDING_ACTION_KEY);
    sessionStorage.removeItem(this.PENDING_CALLBACK_KEY);
    sessionStorage.removeItem(this.PENDING_ACTION_ID_KEY);
  }

  /**
   * 保留中アクションを実行する
   * @returns 保留中アクションがあったかどうか
   */
  static executePendingAction(): boolean {
    if (!this.hasPendingAction()) return false;

    const actionId = this.getPendingActionId();
    const callback = this.getPendingCallback();

    // 保留中アクションをクリア
    this.clearPendingAction();

    // コールバックを実行
    if (callback) {
      try {
        const fn = new Function(callback);
        fn();
      } catch (error) {
        console.error('保留中のアクション実行エラー:', error);
      }
    }

    // イベントを発火
    window.dispatchEvent(
      new CustomEvent('actionAuthComplete', { detail: { actionId } })
    );

    return true;
  }
}
