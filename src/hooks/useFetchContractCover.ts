import useSWR from 'swr';
import { fetcher } from 'src/utils/apiCall';
import { UseFetchContractCoverResponseDto } from 'src/domain/types/api/responses';
import { contractCoverAdapter } from 'src/utils/adapters';

export function useFetchContractCover(
  chainId: number,
  contractAddress: string
) {
  const { data, error, isLoading, ...rest } =
    useSWR<UseFetchContractCoverResponseDto>(
      `/contracts/${chainId}/${contractAddress}`,
      fetcher
    );

  return {
    data: data ? contractCoverAdapter(data) : undefined,
    error,
    isLoading,
    ...rest,
  };
}
