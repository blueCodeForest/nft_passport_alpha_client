import { ContractType } from 'src/domain/types';
import { MintButton } from '../atoms';
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
      <MintButton type={type as ContractType} onClick={onMint} />
    </div>
  );
}
