import { IPagination, INFTHolderRanking } from 'src/domain/interface';
import { H2 } from '../molecules/H2';
import { RankingItem } from '../molecules';

interface INFTHolderRankingAreaProps {
  ranking: INFTHolderRanking;
  symbol: string;
  pagination: IPagination;
}

export function RankingArea(props: INFTHolderRankingAreaProps) {
  return (
    <div className='w-full'>
      <H2 icon='material-symbols-trophy-outline'>ランキング</H2>
      {props.ranking.holders.map((holder) => (
        <RankingItem
          key={holder.walletAddress}
          {...holder}
          symbol={props.symbol}
        />
      ))}
    </div>
  );
}
