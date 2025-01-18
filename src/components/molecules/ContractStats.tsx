import { CirculatingSupply } from './CirculatingSupply';
import { HolderCount } from './HolderCount';

interface ContractStatsProps {
  circulatingSupply: number;
  holderCount: number;
  symbol: string;
  className?: string;
}

export function ContractStats({
  circulatingSupply,
  holderCount,
  symbol,
  className,
}: ContractStatsProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <CirculatingSupply
        circulatingSupply={circulatingSupply}
        symbol={symbol}
      />
      <HolderCount holderCount={holderCount} />
    </div>
  );
}
