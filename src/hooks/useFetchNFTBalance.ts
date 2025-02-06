import useSWR from 'swr';
import { fetcher } from 'src/utils/apiCall';
import { UseFetchNFTBalanceResponseDto } from 'src/domain/types/api';
import { Maybe } from 'src/utils/utility';

export function useFetchNFTBalance(
  contractId: Maybe<number>,
  walletAddress: Maybe<string>
) {
  const { data, error, isLoading, ...rest } =
    useSWR<UseFetchNFTBalanceResponseDto>(
      `/nfts/${contractId}/balance?wa=${walletAddress}`,
      fetcher
    );
  return {
    data: data ? data.balance : 0,
    error,
    isLoading,
    ...rest,
  };
}
