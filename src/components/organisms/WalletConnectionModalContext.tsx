import { createContext, useState, ReactNode, useCallback } from 'react';
import { WalletConnectionModal } from './WalletConnectionModal';
import { useWalletConnection } from 'src/hooks/useWalletConnection';

export interface WalletConnectionModalContextType {
  isOpen: boolean;
  showModal: () => void;
  closeModal: () => void;
}

export const WalletConnectionModalContext = createContext<
  WalletConnectionModalContextType | undefined
>(undefined);

interface WalletConnectionModalProviderProps {
  children: ReactNode;
}

export const WalletConnectionModalProvider = ({
  children,
}: WalletConnectionModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const showModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const { connectWallet } = useWalletConnection();

  return (
    <WalletConnectionModalContext.Provider
      value={{
        isOpen,
        showModal,
        closeModal,
      }}
    >
      {children}
      <WalletConnectionModal
        isOpen={isOpen}
        onClose={closeModal}
        onConnect={connectWallet}
      />
    </WalletConnectionModalContext.Provider>
  );
};
