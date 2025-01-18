import { createPortal } from 'react-dom';

import { ContractType } from 'src/domain/types';

interface MintSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractType: ContractType | null;
}

export const MintSuccessModal = ({
  isOpen,
  onClose,
  contractType,
}: MintSuccessModalProps) => {
  if (!isOpen) return null;

  const MESSAGE: Record<ContractType, string> = {
    coin: 'コインを取得しました',
    stamp: 'スタンプを押しました',
  } as const;

  // 外側のクリックでモーダルを閉じる
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
      onClick={handleBackdropClick}
    >
      <div className='bg-white p-6 rounded-lg shadow-xl flex flex-col items-center w-4/5'>
        <img
          src={'/images/common/check.png'}
          alt='mint-success'
          className='w-3/4'
        />
        <div className='text-center'>
          <h3 className='text-lg font-medium mb-2'>
            {contractType ? MESSAGE[contractType] : ''}
          </h3>
        </div>
      </div>
    </div>,
    document.body
  );
};
