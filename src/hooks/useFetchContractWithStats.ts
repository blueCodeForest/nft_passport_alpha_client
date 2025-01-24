import useSWR from 'swr';
import { UseFetchContractWithStatsResponseDto } from 'src/domain/types/api/responses';
import { fetcher } from 'src/utils/apiCall';
import { contractAdapter } from 'src/utils/adapters';

export function useFetchContractWithStats(contractId: number) {
  const { data, error, isLoading, ...rest } =
    useSWR<UseFetchContractWithStatsResponseDto>(
      `/contracts/${contractId}`,
      fetcher
    );

  return {
    data: data ? contractAdapter(data) : undefined,
    error,
    isLoading,
    ...rest,
  };
}
