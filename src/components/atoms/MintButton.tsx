import { ContractType } from '../../domain/types';

interface MintButtonProps {
  type: ContractType;
  onClick: () => void;
}
export function MintButton({ type, onClick }: MintButtonProps) {
  const BUTTON_LABELS: Record<ContractType, string> = {
    coin: 'コインを取得する',
    stamp: 'スタンプを押す',
  } as const;

  return (
    <div className='flex justify-center'>
      <button
        onClick={onClick}
        className='rounded-md border-2 border-darkGray bg-transparent px-6 py-2 text-darkGray font-bold'
      >
        {BUTTON_LABELS[type]}
      </button>
    </div>
  );
}
