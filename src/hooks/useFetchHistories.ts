import useSWR from 'swr';
import { fetcher } from 'src/utils/apiCall';
import { UseFetchHistoriesResponseDto } from 'src/domain/types/api/responses';
import { historiesAdapter } from 'src/utils/adapters';

export function useFetchHistories(walletAddress: string) {
  const { data, error, isLoading, ...rest } =
    useSWR<UseFetchHistoriesResponseDto>(
      walletAddress ? `/histories?wa=${walletAddress}` : null,
      fetcher
    );

  return {
    data: data ? historiesAdapter(data.histories) : undefined,
    error,
    isLoading,
    ...rest,
  };
}
