import { TotalSupply } from './TotalSupply';
import { HolderCount } from './HolderCount';

interface ContractStatsProps {
  totalSupply: number;
  holderCount: number;
  symbol: string;
  className?: string;
}

export function ContractStats({
  totalSupply,
  holderCount,
  symbol,
  className,
}: ContractStatsProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <TotalSupply totalSupply={totalSupply} symbol={symbol} />
      <HolderCount holderCount={holderCount} />
    </div>
  );
}
