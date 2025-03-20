import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useLiff } from './LiffProvider';
import { v4 as uuidv4 } from 'uuid';
import { useFetchWalletAddress } from 'src/hooks';

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

  // ウォレット情報の取得処理をコンポーネントのトップレベルで実行
  const salt = getUserSalt();
  const fetchCondition = isInitialized && isLoggedIn && profile;
  const {
    data,
    error: fetchError,
    isLoading,
  } = useFetchWalletAddress(fetchCondition ? profile.userId : null, salt);

  // ウォレットアドレスを設定
  useEffect(() => {
    if (!fetchCondition) {
      return;
    }

    if (fetchError) {
      setError(
        new Error(
          `ウォレットアドレスの取得に失敗しました: ${fetchError.message}`
        )
      );
      return;
    }

    if (data && !isLoading) {
      setWalletAddress(data.address);
      setError(null);
    }
  }, [fetchCondition, data, fetchError, isLoading]);

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
