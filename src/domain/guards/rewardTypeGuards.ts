import { Reward, RewardType } from '../types';
import { ITokenQuantityReward, ITokenVarietyReward } from '../interface';

export function isTokenQuantityRewards(
  rewards: Reward[]
): rewards is ITokenQuantityReward[] {
  console.log('rewards', rewards);
  return rewards.every((reward) => reward.type === RewardType.TOKEN_QUANTITY);
}

export function isTokenVarietyRewards(
  rewards: Reward[]
): rewards is ITokenVarietyReward[] {
  return rewards.every((reward) => reward.type === RewardType.TOKEN_VARIETY);
}
