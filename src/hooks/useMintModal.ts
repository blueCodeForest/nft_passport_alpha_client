import { useContext } from 'react';
import { MintModalContext } from 'src/providers';

export const useMintModal = () => {
  const context = useContext(MintModalContext);
  if (!context) {
    throw new Error('useMintModal must be used within a MintModalProvider');
  }
  return context;
};
