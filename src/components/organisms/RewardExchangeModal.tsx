import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { Reward, RewardType } from 'src/domain/types';
import { useExchangeReward } from 'src/hooks/useExchangeReward';
import { useState } from 'react';
import { CustomButton } from '../atoms';
import { useWallet } from 'src/hooks';

interface RewardExchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  reward: Reward;
  symbol: string;
  isEnabled: boolean;
  onExchangeComplete?: () => void;
}

export function RewardExchangeModal(props: RewardExchangeModalProps) {
  const { address } = useWallet();
  const { trigger: exchangeReward, isMutating } = useExchangeReward(
    props.reward.id
  );
  const [error, setError] = useState<string | null>(null);
  const [exchangeSuccess, setExchangeSuccess] = useState(false);
  const [exchangeTime, setExchangeTime] = useState<string | null>(null);

  const handleClose = () => {
    setError(null);
    setExchangeSuccess(false);
    setExchangeTime(null);
    props.onClose();
  };

  const handleExchange = async () => {
    if (!address) return;

    try {
      setError(null);
      await exchangeReward({
        walletAddress: address,
      });
      setExchangeSuccess(true);
      setExchangeTime(new Date().toLocaleString('ja-JP'));
      props.onExchangeComplete?.();
    } catch (error) {
      setError('報酬の交換に失敗しました。もう一度お試しください。');
      console.error('Exchange failed:', error);
    }
  };

  return (
    <Dialog open={props.isOpen} onClose={handleClose} className='relative z-50'>
      <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <DialogPanel className='mx-auto max-w-sm rounded bg-background p-6'>
          <DialogTitle className='text-lg font-bold'>
            {props.reward.name}
          </DialogTitle>
          <Description className='mt-2'>{props.reward.description}</Description>

          {error && <div className='mt-2 text-red-500 text-sm'>{error}</div>}

          {exchangeSuccess ? (
            <div className='mt-4 flex flex-col items-center'>
              <img
                src={'/images/common/check.png'}
                alt='mint-success'
                className='w-3/4'
              />
              <p className='mt-2 text-lg font-semibold text-green-600'>
                交換が完了しました！
              </p>
              <p className='mt-1 text-sm text-gray-600'>
                交換完了時刻: {exchangeTime}
              </p>
              <button
                className='mt-4 w-full py-2 px-4 bg-gray-500 text-white rounded'
                onClick={handleClose}
              >
                閉じる
              </button>
            </div>
          ) : (
            <div className='mt-4 space-y-2'>
              {props.reward.type === RewardType.TOKEN_QUANTITY && (
                <CustomButton
                  label={
                    isMutating
                      ? '処理中...'
                      : `報酬と交換する (${props.reward.condition.cost} ${props.symbol})`
                  }
                  onClick={() => handleExchange()}
                  disabled={!props.isEnabled || isMutating || !address}
                />
              )}
              {props.reward.type === RewardType.TOKEN_VARIETY && (
                <button
                  className='w-full py-2 px-4 bg-green-500 text-white rounded disabled:opacity-50'
                  onClick={() => handleExchange()}
                  disabled={!props.isEnabled || isMutating || !address}
                >
                  {isMutating ? '処理中...' : '報酬を受け取る'}
                </button>
              )}
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
