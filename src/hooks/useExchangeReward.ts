import useSWRMutation from 'swr/mutation';
import { mutator } from 'src/utils/apiCall';
import {
  UseExchangeRewardResponseDto,
  UseExchangeRewardRequestDto,
} from 'src/domain/types/api';

export const useExchangeReward = (id: number) => {
  return useSWRMutation<
    UseExchangeRewardResponseDto,
    Error,
    string,
    UseExchangeRewardRequestDto
  >(`/rewards/${id}/exchange`, (url, { arg }) => mutator(url, arg));
};
