import useSWR, { SWRConfiguration } from 'swr';
import { fetcher } from 'src/utils/apiCall';
import { UseFetchNFTBalanceResponseDto } from 'src/domain/types/api';
import { Maybe } from 'src/utils/utility';

export function useFetchNFTBalance(
  contractId: Maybe<number>,
  walletAddress: Maybe<string>,
  config?: SWRConfiguration
) {
  const { data, error, isLoading, ...rest } =
    useSWR<UseFetchNFTBalanceResponseDto>(
      walletAddress ? `/nfts/${contractId}/balance?wa=${walletAddress}` : null,
      fetcher,
      config
    );
  return {
    data: data ? data.balance : 0,
    error,
    isLoading,
    ...rest,
  };
}
