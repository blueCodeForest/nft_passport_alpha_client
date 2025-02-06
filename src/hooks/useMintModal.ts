import { useContext } from 'react';
import { MintModalContext } from 'src/components/organisms/MintModalContext';

export const useMintModal = () => {
  const context = useContext(MintModalContext);
  if (!context) {
    throw new Error('useMintModal must be used within a MintModalProvider');
  }
  return context;
};
