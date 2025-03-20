import { useState, useCallback, useEffect } from 'react';
import { useLineAuth } from 'src/providers/LineAuthProvider';
import { LineAuthLevel } from 'src/types/auth';
import { v4 as uuidv4 } from 'uuid';

type ActionAuthCallback = () => void | Promise<void>;

interface UseActionAuthOptions {
  onAuthStart?: () => void;
  onAuthSuccess?: () => void;
  onAuthCancel?: () => void;
  onAuthError?: (error: Error) => void;
  // 認証UIを表示するためのコールバック
  renderAuthUI?: (
    requiredLevel: LineAuthLevel,
    currentLevel: LineAuthLevel,
    onConfirm: () => void,
    onCancel: () => void
  ) => void;
}

/**
 * アクションに対する認証を管理するフック
 */
export function useActionAuth(options: UseActionAuthOptions = {}) {
  const { currentLevel, authenticate, isFetching } = useLineAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [pendingAction, setPendingAction] = useState<ActionAuthCallback | null>(
    null
  );

  // 認証完了イベントのリスナー
  useEffect(() => {
    const handleAuthComplete = (_: Event) => {
      if (pendingAction) {
        // 保留中のアクションを実行
        try {
          options.onAuthSuccess?.();
          pendingAction();
        } catch (error) {
          console.error('アクション実行エラー:', error);
          options.onAuthError?.(
            error instanceof Error
              ? error
              : new Error('アクション実行に失敗しました')
          );
        } finally {
          setPendingAction(null);
          setIsAuthenticating(false);
        }
      }
    };

    // イベントリスナーを登録
    window.addEventListener('actionAuthComplete', handleAuthComplete);

    // クリーンアップ
    return () => {
      window.removeEventListener('actionAuthComplete', handleAuthComplete);
    };
  }, [pendingAction, options]);

  /**
   * 認証をキャンセルする共通処理
   */
  const handleAuthCancel = useCallback(() => {
    options.onAuthCancel?.();
    setIsAuthenticating(false);
  }, [options]);

  /**
   * 指定された認証レベルでアクションを実行する
   * @param action 実行するアクション
   * @param requiredLevel 必要な認証レベル
   */
  const executeWithAuth = useCallback(
    async (action: ActionAuthCallback, requiredLevel: LineAuthLevel) => {
      // 認証レベルをチェック（フェッチング中は実行しない）
      if (isFetching) {
        console.log('認証状態を確認中。時間をおいて再試行してください');
        return;
      }

      // 認証レベルを満たしている場合は直接アクションを実行
      if (currentLevel >= requiredLevel) {
        try {
          options.onAuthSuccess?.();
          await action();
        } catch (error) {
          console.error('アクション実行エラー:', error);
          options.onAuthError?.(
            error instanceof Error
              ? error
              : new Error('アクション実行に失敗しました')
          );
        }
        return;
      }

      // 認証レベルを満たしていない場合
      setIsAuthenticating(true);
      options.onAuthStart?.();

      // 認証プロセスを開始
      try {
        // アクションIDを生成
        const actionId = uuidv4();

        // 保留中のアクションを設定
        setPendingAction(() => action);

        // カスタムUI表示用のコールバックが提供されている場合はそれを使用
        if (options.renderAuthUI) {
          options.renderAuthUI(
            requiredLevel,
            currentLevel,
            async () => {
              // 認証を実行
              const success = await authenticate(requiredLevel, {
                actionId,
                callback: `console.log('認証完了後のアクション実行: ${actionId}');`,
                onSuccess: options.onAuthSuccess,
                onCancel: options.onAuthCancel,
                onError: options.onAuthError,
              });

              if (!success) {
                setPendingAction(null);
                setIsAuthenticating(false);
              }
            },
            handleAuthCancel
          );
        } else {
          // デフォルトの認証フロー
          const success = await authenticate(requiredLevel, {
            actionId,
            callback: `console.log('認証完了後のアクション実行: ${actionId}');`,
            onSuccess: options.onAuthSuccess,
            onCancel: options.onAuthCancel,
            onError: options.onAuthError,
          });

          if (!success) {
            setPendingAction(null);
            setIsAuthenticating(false);
          }
        }
      } catch (error) {
        console.error('認証エラー:', error);
        options.onAuthError?.(
          error instanceof Error ? error : new Error('認証に失敗しました')
        );
        setPendingAction(null);
        setIsAuthenticating(false);
      }
    },
    [currentLevel, isFetching, authenticate, options, handleAuthCancel]
  );

  /**
   * LINE内ブラウザでの閲覧が必要なアクションを実行
   */
  const executeWithLineInBrowser = useCallback(
    (action: ActionAuthCallback) => {
      return executeWithAuth(action, LineAuthLevel.IN_LINE_BROWSER);
    },
    [executeWithAuth]
  );

  /**
   * LINEログインが必要なアクションを実行
   */
  const executeWithLineLogin = useCallback(
    (action: ActionAuthCallback) => {
      return executeWithAuth(action, LineAuthLevel.LINE_LOGIN);
    },
    [executeWithAuth]
  );

  /**
   * LINE友だち登録が必要なアクションを実行
   */
  const executeWithLineFriend = useCallback(
    (action: ActionAuthCallback) => {
      return executeWithAuth(action, LineAuthLevel.LINE_FRIEND);
    },
    [executeWithAuth]
  );

  return {
    isAuthenticating,
    executeWithAuth,
    executeWithLineInBrowser,
    executeWithLineLogin,
    executeWithLineFriend,
  };
}
