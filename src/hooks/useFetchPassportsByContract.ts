import useSWR from 'swr';
import { fetcher } from 'src/utils/apiCall';
import { passportCoversAdapter } from 'src/utils/adapters';
import { UseFetchPassportsByContractResponseDto } from 'src/domain/types/api/passport';

export function useFetchPassportsByContract(contractId: number) {
  const { data, error, isLoading, ...rest } =
    useSWR<UseFetchPassportsByContractResponseDto>(
      contractId ? `/passports/by-contract?cid=${contractId}` : null,
      fetcher
    );

  return {
    data: data ? passportCoversAdapter(data.passports) : undefined,
    error,
    isLoading,
    ...rest,
  };
}
