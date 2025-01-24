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
          <CustomIcon icon='i-material-symbols-trophy-outline' size='base' />
          {passport.stats.rank}/{passport.stats.totalHolders}
        </span>
        <span className='min-w-0 whitespace-nowrap flex items-center gap-1'>
          <CustomIcon icon='i-majesticons-coins-line' size='base' />
          {passport.stats.holdingCoins}
          {passport.contractSymbol}
        </span>
      </div>
    );
  }
  return (
    <div className='shrink-0 flex items-center gap-1 min-w-0'>
      <span className='min-w-0 whitespace-nowrap flex items-center gap-1'>
        <CustomIcon icon='i-tabler-rubber-stamp' size='base' />
        {passport.stats.holdingStamps}/{passport.stats.totalStamps}
      </span>
    </div>
  );
}
