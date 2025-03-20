import { createContext, useState, ReactNode } from 'react';
import { ContractType } from 'src/domain/types';
import { MintModals } from '../components/organisms/MintModals';

type ModalType = 'minting' | 'success' | 'error' | null;

interface SuccessModalData {
  contractType: ContractType;
  imageUrl: string;
  name: string;
}

export interface MintModalContextType {
  modalType: ModalType;
  successModalData: SuccessModalData | null;
  showMintingModal: () => void;
  showSuccessModal: (data: SuccessModalData) => void;
  showErrorModal: () => void;
  closeModal: () => void;
}

export const MintModalContext = createContext<MintModalContextType | undefined>(
  undefined
);

export const MintModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [successModalData, setSuccessModalData] =
    useState<SuccessModalData | null>(null);

  const showMintingModal = () => setModalType('minting');
  const showSuccessModal = (data: SuccessModalData) => {
    setSuccessModalData(data);
    setModalType('success');
  };
  const showErrorModal = () => setModalType('error');
  const closeModal = () => {
    setModalType(null);
    setSuccessModalData(null);
  };

  return (
    <MintModalContext.Provider
      value={{
        modalType,
        successModalData,
        showMintingModal,
        showSuccessModal,
        showErrorModal,
        closeModal,
      }}
    >
      {children}
      <MintModals />
    </MintModalContext.Provider>
  );
};
