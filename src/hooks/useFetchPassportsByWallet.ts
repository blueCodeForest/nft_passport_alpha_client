import useSWR from 'swr';
import { fetcher } from 'src/utils/apiCall';
import { passportsWithOwnerStatsAdapter } from 'src/utils/adapters';
import { UseFetchPassportsByWalletResponseDto } from 'src/domain/types/api/passport';

export function useFetchPassportsByWallet(walletAddress: string) {
  const { data, error, isLoading, ...rest } =
    useSWR<UseFetchPassportsByWalletResponseDto>(
      walletAddress ? `/passports/by-wallet?wa=${walletAddress}` : null,
      fetcher
    );

  return {
    data: data ? passportsWithOwnerStatsAdapter(data.passports) : undefined,
    error,
    isLoading,
    ...rest,
  };
}
