import { useContext } from 'react';
import { WalletConnectionModalContext } from '../components/organisms';

export const useWalletConnectionModal = () => {
  const context = useContext(WalletConnectionModalContext);

  if (!context) {
    throw new Error(
      'useWalletConnectionModal must be used within a WalletConnectionModalProvider'
    );
  }

  return context;
};
