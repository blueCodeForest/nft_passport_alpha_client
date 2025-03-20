import { ContractType } from 'src/domain/types';
import { ContractCover } from '../molecules';
import { CustomButton } from '../atoms';

interface MintAreaProps {
  name: string;
  imageUrl: string;
  type: string;
  onMint: () => void;
}

export function MintArea({ name, imageUrl, type, onMint }: MintAreaProps) {
  // ボタンのラベルを決定
  const buttonLabel =
    type === ContractType.COIN ? 'コインを取得する' : 'スタンプを押す';

  return (
    <div className='flex flex-col space-y-4'>
      <ContractCover title={name} image={imageUrl} />
      <div className='flex flex-col items-center'>
        <CustomButton label={buttonLabel} onClick={onMint} />
      </div>
    </div>
  );
}
