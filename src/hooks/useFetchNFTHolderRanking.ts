import { UseFetchNFTHolderRankingResponseDto } from 'src/domain/types/api/responses';
import { fetcher } from 'src/utils/apiCall';
import useSWR from 'swr';
import { NFTHolderRankingAdapter, paginationAdapter } from 'src/utils/adapters';

export function useFetchNFTHolderRanking(contractId: number) {
  const { data, error, isLoading, ...rest } =
    useSWR<UseFetchNFTHolderRankingResponseDto>(
      `/contracts/${contractId}/ranking`,
      fetcher
    );

  return {
    data: data
      ? {
          ranking: NFTHolderRankingAdapter(data.ranking),
          pagination: paginationAdapter(data.pagination),
        }
      : undefined,
    error,
    isLoading,
    ...rest,
  };
}
