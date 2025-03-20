import useSWR from 'swr';
import { fetcher } from 'src/utils/apiCall';
import { UseFetchWalletAddressResponseDto } from 'src/domain/types/api/wallet';

export function useFetchWalletAddress(userId: string | null, salt: string) {
  const { data, error, isLoading, ...rest } =
    useSWR<UseFetchWalletAddressResponseDto>(
      userId ? `/wallets/${userId}/ethereum-address?salt=${salt}` : null,
      fetcher
    );

  return {
    data,
    error,
    isLoading,
    ...rest,
  };
}
