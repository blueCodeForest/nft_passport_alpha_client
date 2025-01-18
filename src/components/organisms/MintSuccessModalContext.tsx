import { createContext, useContext, useState } from 'react';
import { MintSuccessModal } from './MintSuccessModal';
import { ContractType } from 'src/domain/types';

interface ModalContextType {
  showMintSuccessModal: boolean;
  setShowMintSuccessModal: (show: boolean) => void;
  contractType: ContractType | null;
  setContractType: (type: ContractType | null) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const MintSuccessModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showMintSuccessModal, setShowMintSuccessModal] = useState(false);
  const [contractType, setContractType] = useState<ContractType | null>(null);
  return (
    <ModalContext.Provider
      value={{
        showMintSuccessModal,
        setShowMintSuccessModal,
        contractType,
        setContractType,
      }}
    >
      {children}
      <MintSuccessModal
        isOpen={showMintSuccessModal}
        onClose={() => setShowMintSuccessModal(false)}
        contractType={contractType}
      />
    </ModalContext.Provider>
  );
};

export const useMintSuccessModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
