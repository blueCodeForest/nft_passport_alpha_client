import { ContractType } from 'src/domain/types';
import { CustomIcon } from '../atoms';

interface ContractTitleProps {
  title: string;
  contractType: ContractType;
  symbol: string;
  className?: string;
}
export function ContractTitle({
  title,
  contractType,
  symbol,
  className,
}: ContractTitleProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {contractType === ContractType.COIN && (
        <CustomIcon icon='i-majesticons-coins-line' size='lg' />
      )}
      {contractType === ContractType.STAMP && (
        <CustomIcon icon='i-tabler-rubber-stamp' size='lg' />
      )}
      <h2 className='text-lg font-bold'>
        {title} ({symbol})
      </h2>
    </div>
  );
}
