import { Dialog, DialogPanel } from '@headlessui/react';
import { CustomButton, CustomIcon } from '../atoms';
interface WalletConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => Promise<void>;
}

export function WalletConnectionModal({
  isOpen,
  onClose,
  onConnect,
}: WalletConnectionModalProps) {
  const isMintPage = window.location.pathname.startsWith('/mint');

  const handleConnect = async () => {
    try {
      await onConnect();
      onClose();
    } catch (error) {
      console.error('接続に失敗しました:', error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className='relative z-50'>
      <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <DialogPanel className='mx-auto max-w-sm rounded bg-background p-6'>
          <h3 className='text-lg font-bold mb-4'>
            {isMintPage
              ? 'コイン/スタンプを受け取るために、ウォレットに接続してください。'
              : 'NFT Passportのサービスを利用するには、ウォレットの接続が必要です。'}
          </h3>
          <img
            src={'/images/common/NFT_passport_concept_flow_transparent.png'}
            alt='NFT Passport Concept Flow'
            className='w-full h-auto mb-4'
          />
          <CustomButton
            label='パスキーで接続する'
            onClick={handleConnect}
            icon='i-material-symbols-key'
            className='mb-2'
          />
          <div className='flex items-center justify-center gap-1 text-green-600 text-sm mb-4'>
            <CustomIcon
              icon='i-mdi-shield-check'
              size='base'
              color='text-green-600'
            />
            <span>生体認証で安全に接続</span>
          </div>
          <p className='text-sm text-gray-600'>
            ウォレットは端末内部で自動的に生成されます。
            <br />
            遷移先ページで、サインアップ(Sign
            up)もしくは承認する(Approve)ボタンを押してください。
          </p>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
