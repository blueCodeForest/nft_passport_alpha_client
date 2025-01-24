import useSWR from 'swr';
import { fetcher } from 'src/utils/apiCall';
import { UseFetchNFTsByWalletResponseDto } from 'src/domain/types/api/responses';
import { NFTsAdapter } from 'src/utils/adapters';

export function useFetchNFTsByWallet(walletAddress: string) {
  const { data, error, isLoading, ...rest } =
    useSWR<UseFetchNFTsByWalletResponseDto>(
      walletAddress ? `/nfts?wa=${walletAddress}` : null,
      fetcher
    );

  return {
    data: data ? NFTsAdapter(data.nfts) : undefined,
    error,
    isLoading,
    ...rest,
  };
}
