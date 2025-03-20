import { useWallet as useWalletContext } from 'src/providers/WalletProvider';

interface UseWalletReturn {
  address: string | null;
  isLoading: boolean;
  error: Error | null;
}

export const useWallet = (): UseWalletReturn => {
  const { walletAddress, isLoading, error } = useWalletContext();

  return {
    address: walletAddress,
    isLoading,
    error,
  };
};
