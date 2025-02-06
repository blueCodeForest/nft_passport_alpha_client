import { UseFetchRewardsResponseDto } from 'src/domain/types/api';
import { fetcher } from 'src/utils/apiCall';
import useSWR from 'swr';
import { rewardsAdapter } from 'src/utils/adapters';

export function useFetchRewards(passportId: number) {
  const { data, error, isLoading, ...rest } =
    useSWR<UseFetchRewardsResponseDto>(`/rewards?pid=${passportId}`, fetcher);

  return {
    data: data ? rewardsAdapter(data.rewards) : undefined,
    error,
    isLoading,
    ...rest,
  };
}
