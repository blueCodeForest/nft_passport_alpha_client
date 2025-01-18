import useSWR from 'swr';
import { UseFetchContractInfoResponseDto } from 'src/domain/types/api/responses';
import { fetcher } from 'src/utils/apiCall';
import { contractAdapter } from 'src/utils/adapters';

export function useFetchContractInfo(contractId: number) {
  const { data, error, isLoading, ...rest } =
    useSWR<UseFetchContractInfoResponseDto>(
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
