import { UseFetchPassportResponseDto } from 'src/domain/types/api';
import { passportAdapter } from 'src/utils/adapters';
import { fetcher } from 'src/utils/apiCall';
import useSWR from 'swr';

export function useFetchPassport(passportId: number) {
  const { data, error, isLoading, ...rest } =
    useSWR<UseFetchPassportResponseDto>(
      passportId ? `/passports/${passportId}` : null,
      fetcher
    );
  return {
    data: data ? passportAdapter(data.passport) : undefined,
    error,
    isLoading,
    ...rest,
  };
}
