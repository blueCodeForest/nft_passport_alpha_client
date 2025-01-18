import { PassportType, PassportWithOwnerStats } from 'src/domain/types';
import { CustomIcon } from '../atoms';

interface PassportStatsProps {
  passport: PassportWithOwnerStats;
}

export function PassportStats({ passport }: PassportStatsProps) {
  if (passport.type === PassportType.BRAND) {
    return (
      <div className='shrink-0 flex items-center gap-2 min-w-0'>
        <span className='min-w-0 whitespace-nowrap flex items-center gap-1'>
          <CustomIcon icon='material-symbols-trophy-outline' size={5} />
          {passport.stats.rank}/{passport.stats.totalWallets}
        </span>
        <span className='min-w-0 whitespace-nowrap flex items-center gap-1'>
          <CustomIcon icon='majesticons-coins-line' size={5} />
          {passport.stats.holdingCoins}
          {passport.contractSymbol}
        </span>
      </div>
    );
  }
  return (
    <div className='shrink-0 flex items-center gap-1 min-w-0'>
      <span className='min-w-0 whitespace-nowrap flex items-center gap-1'>
        <CustomIcon icon='tabler-rubber-stamp' size={5} />
        {passport.stats.holdingStamps}/{passport.stats.totalStamps}
      </span>
    </div>
  );
}
