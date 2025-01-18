import { INFTHolderRank } from 'src/domain/interface';
import { CustomIcon } from '../atoms';

interface RankingItemProps extends INFTHolderRank {
  key: string;
  symbol: string;
}

export function RankingItem(props: RankingItemProps) {
  const rank =
    props.rank === 1 ? (
      <CustomIcon icon='emojione-monotone-1st-place-medal' size={5} />
    ) : props.rank === 2 ? (
      <CustomIcon icon='emojione-monotone-2nd-place-medal' size={5} />
    ) : props.rank === 3 ? (
      <CustomIcon icon='emojione-monotone-3rd-place-medal' size={5} />
    ) : (
      <span>{props.rank}</span>
    );
  return (
    <div className='flex items-center justify-between p-2'>
      <div className='flex items-center gap-2'>
        <div className='flex items-center justify-center w-5'>{rank}</div>
        <div className='text-sm'>
          {`${props.walletAddress.slice(0, 7)}...${props.walletAddress.slice(-5)}`}
        </div>
      </div>
      <div className='text-sm'>
        {props.holdings} {props.symbol}
      </div>
    </div>
  );
}
