import { INFTHolderRanking } from 'src/domain/interface';
import { UseFetchNFTHolderRankingResponseDto } from '../../domain/types/api';

export function NFTHolderRankingAdapter(
  ranking: UseFetchNFTHolderRankingResponseDto['ranking']
): INFTHolderRanking {
  return {
    holders: ranking.holders.map((holder) => {
      return {
        rank: holder.rank,
        walletAddress: holder.walletAddress,
        holdings: holder.holdings,
      };
    }),
  };
}
