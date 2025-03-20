import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { LiffAdapter } from 'src/adapters/LiffAdapter';

interface LiffContextType {
  isInClient: boolean;
  isLoggedIn: boolean;
  isLineFriend: boolean;
  liffError: Error | null;
  isInitialized: boolean;
  profile: any | null;
}

const LiffContext = createContext<LiffContextType>({
  isInClient: false,
  isLoggedIn: false,
  isLineFriend: false,
  liffError: null,
  isInitialized: false,
  profile: null,
});

export const LiffProvider = ({ children }: { children: ReactNode }) => {
  const [isInClient, setIsInClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLineFriend, setIsLineFriend] = useState(false);
  const [liffError, setLiffError] = useState<Error | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [profile, setProfile] = useState<any | null>(null);
  const navigate = useNavigate();

  // LIFFの初期化
  useEffect(() => {
    const initializeLiff = async () => {
      try {
        const liffId = import.meta.env.VITE_LIFF_ID;
        if (!liffId) {
          throw new Error('環境変数 VITE_LIFF_ID が設定されていません');
        }

        await LiffAdapter.initialize(liffId);

        setIsInClient(LiffAdapter.isInClient());
        setIsLoggedIn(LiffAdapter.isLoggedIn());

        if (LiffAdapter.isLoggedIn()) {
          const userProfile = await LiffAdapter.getProfile();
          setProfile(userProfile);

          // 友達関係を確認
          const isFriend = await LiffAdapter.getFriendship();
          setIsLineFriend(isFriend);
        }

        // リダイレクト後のパスを処理
        const redirectPath = LiffAdapter.handleRedirectPath();
        if (redirectPath) {
          console.log('遷移先:', redirectPath);
          // 少し遅延させて確実にReactが準備できた状態で遷移する
          setTimeout(() => {
            navigate(redirectPath, { replace: true });
          }, 100);
        }

        setIsInitialized(true);
      } catch (error) {
        console.error('LIFF初期化エラー:', error);
        setLiffError(
          error instanceof Error ? error : new Error('LIFF初期化に失敗しました')
        );
        setIsInitialized(true);
      }
    };

    initializeLiff();
  }, [navigate]);

  return (
    <LiffContext.Provider
      value={{
        isInClient,
        isLoggedIn,
        isLineFriend,
        liffError,
        isInitialized,
        profile,
      }}
    >
      {children}
    </LiffContext.Provider>
  );
};

export const useLiff = () => useContext(LiffContext);
