import { CustomIcon } from '../atoms';

interface TotalSupplyProps {
  totalSupply: number;
  symbol: string;
}

export function TotalSupply({ totalSupply, symbol }: TotalSupplyProps) {
  return (
    <div className='flex items-center gap-2'>
      <CustomIcon icon='i-solar-layers-minimalistic-linear' size='sm' />
      <span className='text-sm'>
        流通量 : {totalSupply} {symbol}
      </span>
    </div>
  );
}
