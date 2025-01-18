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
        <CustomIcon icon='majesticons-coins-line' size={7} />
      )}
      {contractType === ContractType.STAMP && (
        <CustomIcon icon='tabler-rubber-stamp' size={7} />
      )}
      <h2 className='text-lg font-bold'>
        {title} ({symbol})
      </h2>
    </div>
  );
}
