import { ContractType } from 'src/domain/types';
import { CustomButton } from '../atoms';
import { ContractCover } from '../molecules';

interface MintAreaProps {
  name: string;
  imageUrl: string;
  type: string;
  onMint: () => void;
}

export function MintArea({ name, imageUrl, type, onMint }: MintAreaProps) {
  return (
    <div>
      <ContractCover title={name} image={imageUrl} />
      <CustomButton
        label={
          type === ContractType.COIN ? 'コインを取得する' : 'スタンプを押す'
        }
        onClick={onMint}
      />
    </div>
  );
}
