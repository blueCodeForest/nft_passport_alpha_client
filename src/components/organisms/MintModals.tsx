import { createPortal } from 'react-dom';
import { ContractType } from 'src/domain/types';
import { useMintModal } from 'src/hooks';

export const MintModals = () => {
  const { modalType, successModalData, closeModal } = useMintModal();

  if (!modalType) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalType !== 'minting' && e.target === e.currentTarget) {
      closeModal();
    }
  };

  const modalContent = {
    minting: (
      <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'>
        <div className='bg-white p-6 rounded-lg shadow-xl flex flex-col items-center'>
          <div className='animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent' />
          <p className='mt-4'>処理中...</p>
        </div>
      </div>
    ),
    success: successModalData && (
      <div
        className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'
        onClick={handleBackdropClick}
      >
        <div className='bg-white p-6 rounded-lg shadow-xl flex flex-col items-center w-4/5'>
          <img
            src={successModalData?.imageUrl}
            alt={successModalData?.name}
            className='w-3/4'
          />
          <div className='text-center mt-3'>
            <h3 className='text-lg font-medium mb-2'>
              {successModalData?.contractType === ContractType.COIN
                ? `${successModalData?.name}を取得しました！`
                : `${successModalData?.name}を押しました！`}
            </h3>
          </div>
        </div>
      </div>
    ),
    error: (
      <div
        className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'
        onClick={handleBackdropClick}
      >
        <div className='bg-white p-6 rounded-lg shadow-xl flex flex-col items-center'>
          <h3 className='text-lg font-medium mb-4'>ミントに失敗しました</h3>
          <div className='flex gap-4'>
            <button
              onClick={closeModal}
              className='px-4 py-2 bg-gray-200 rounded'
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    ),
  };

  return createPortal(modalContent[modalType], document.body);
};
