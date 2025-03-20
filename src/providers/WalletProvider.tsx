import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useLiff } from './LiffProvider';
import { v4 as uuidv4 } from 'uuid';

interface WalletContextType {
  walletAddress: string | null;
  isLoading: boolean;
  error: Error | null;
}

const WalletContext = createContext<WalletContextType>({
  walletAddress: null,
  isLoading: false,
  error: null,
});

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn, profile, isInitialized } = useLiff();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // ユーザー固有のsalt値を生成または取得
  const getUserSalt = (): string => {
    const storedSalt = localStorage.getItem('walletSalt');
    if (storedSalt) {
      return storedSalt;
    }

    // 新しいsalt値を生成して保存
    const newSalt = uuidv4();
    localStorage.setItem('walletSalt', newSalt);
    return newSalt;
  };

  // ウォレットアドレスを取得
  useEffect(() => {
    const fetchWalletAddress = async () => {
      if (!isInitialized || !isLoggedIn || !profile) {
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const lineUserId = profile.userId;
        const salt = getUserSalt();
        const serverUrl = import.meta.env.VITE_SERVER_URL;

        if (!serverUrl) {
          throw new Error('環境変数 VITE_SERVER_URL が設定されていません');
        }

        const response = await fetch(
          `${serverUrl}/wallets/${lineUserId}/ethereum-address?salt=${salt}`
        );

        if (!response.ok) {
          throw new Error(
            `ウォレットアドレスの取得に失敗しました: ${response.statusText}`
          );
        }

        const data = await response.json();
        setWalletAddress(data.address);
      } catch (err) {
        console.error('ウォレットアドレス取得エラー:', err);
        setError(
          err instanceof Error
            ? err
            : new Error('ウォレットアドレスの取得に失敗しました')
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletAddress();
  }, [isInitialized, isLoggedIn, profile]);

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        isLoading,
        error,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
