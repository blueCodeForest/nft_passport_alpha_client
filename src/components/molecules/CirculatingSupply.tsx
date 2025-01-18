import { CustomIcon } from '../atoms';

interface CirculatingSupplyProps {
  circulatingSupply: number;
  symbol: string;
}

export function CirculatingSupply({
  circulatingSupply,
  symbol,
}: CirculatingSupplyProps) {
  return (
    <div className='flex items-center gap-2'>
      <CustomIcon icon='solar-layers-minimalistic-linear' size={4} />
      <span className='text-sm'>
        流通量 : {circulatingSupply} {symbol}
      </span>
    </div>
  );
}
