import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { useLiff } from './LiffProvider';
import { LineAuthLevel, LineAuthState } from 'src/types/auth';
import {
  AuthenticationService,
  AuthOptions,
} from 'src/services/AuthenticationService';
import { LiffAdapter } from 'src/authBackup/adapters/LiffAdapter';

interface LineAuthContextType extends LineAuthState {
  checkAuthLevel: (requiredLevel: LineAuthLevel) => Promise<boolean>;
  authenticate: (
    requiredLevel: LineAuthLevel,
    options?: Partial<AuthOptions>
  ) => Promise<boolean>;
  redirectToLine: (path?: string) => boolean;
}

const LineAuthContext = createContext<LineAuthContextType>({
  currentLevel: LineAuthLevel.NONE,
  isInLineBrowser: false,
  isLineLoggedIn: false,
  isLineFriend: false,
  isFetching: true,
  checkAuthLevel: async () => false,
  authenticate: async () => false,
  redirectToLine: () => false,
});

export const LineAuthProvider = ({ children }: { children: ReactNode }) => {
  const { isInClient, isLoggedIn, isLineFriend, isInitialized } = useLiff();
  const [isFetching, setIsFetching] = useState(true);
  const [currentLevel, setCurrentLevel] = useState<LineAuthLevel>(
    LineAuthLevel.NONE
  );

  // 認証レベルを更新する
  useEffect(() => {
    const updateAuthLevel = async () => {
      if (!isInitialized) return;

      setIsFetching(true);

      let level = LineAuthLevel.NONE;

      if (isInClient) {
        level = LineAuthLevel.IN_LINE_BROWSER;

        if (isLoggedIn) {
          level = LineAuthLevel.LINE_LOGIN;

          if (isLineFriend) {
            level = LineAuthLevel.LINE_FRIEND;
          }
        }
      }

      setCurrentLevel(level);
      setIsFetching(false);
    };

    updateAuthLevel();
  }, [isInitialized, isInClient, isLoggedIn, isLineFriend]);

  // 必要な認証レベルを満たしているかを非同期でチェックする関数
  const checkAuthLevel = useCallback(
    async (requiredLevel: LineAuthLevel): Promise<boolean> => {
      if (isFetching) {
        // 認証状態の取得中は最新の状態を取得
        const currentAuthLevel =
          await AuthenticationService.getCurrentAuthLevel();
        return currentAuthLevel >= requiredLevel;
      }
      return currentLevel >= requiredLevel;
    },
    [currentLevel, isFetching]
  );

  // 認証を実行する関数
  const authenticate = useCallback(
    async (
      requiredLevel: LineAuthLevel,
      options?: Partial<AuthOptions>
    ): Promise<boolean> => {
      const liffId = import.meta.env.VITE_LIFF_ID;
      const botId = import.meta.env.VITE_LINE_BOT_BASIC_ID;

      if (!liffId) {
        console.error('環境変数 VITE_LIFF_ID が設定されていません');
        options?.onError?.(new Error('LIFF ID が設定されていません'));
        return false;
      }

      if (!botId && requiredLevel === LineAuthLevel.LINE_FRIEND) {
        console.error('環境変数 VITE_LINE_BOT_BASIC_ID が設定されていません');
        options?.onError?.(new Error('LINE Bot ID が設定されていません'));
        return false;
      }

      const authOptions: AuthOptions = {
        liffId,
        botId: botId || '',
        ...options,
      };

      return await AuthenticationService.authenticate(
        requiredLevel,
        authOptions
      );
    },
    []
  );

  // LINE内ブラウザにリダイレクトする関数
  const redirectToLine = useCallback((path?: string) => {
    const liffId = import.meta.env.VITE_LIFF_ID as string;
    return LiffAdapter.redirectToLine(liffId, path);
  }, []);

  return (
    <LineAuthContext.Provider
      value={{
        currentLevel,
        isInLineBrowser: isInClient,
        isLineLoggedIn: isLoggedIn,
        isLineFriend,
        isFetching,
        checkAuthLevel,
        authenticate,
        redirectToLine,
      }}
    >
      {children}
    </LineAuthContext.Provider>
  );
};

export const useLineAuth = () => useContext(LineAuthContext);
export { LineAuthLevel };
