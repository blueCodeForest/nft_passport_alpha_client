import useSWRMutation from 'swr/mutation';
import { mutator } from 'src/utils/apiCall';
import {
  UseExchangeRewardResponseDto,
  UseExchangeRewardRequestDto,
} from 'src/domain/types/api';

export const useExchangeReward = () => {
  return useSWRMutation<
    UseExchangeRewardResponseDto,
    Error,
    string,
    UseExchangeRewardRequestDto
  >('/rewards/exchange', (url, { arg }) =>
    mutator(`/rewards/${arg.id}/exchange`, {
      method: 'POST',
      body: { walletAddress: arg.walletAddress },
    })
  );
};
