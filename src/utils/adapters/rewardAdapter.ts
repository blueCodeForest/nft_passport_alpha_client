import { Reward, RewardType } from 'src/domain/types';
import { UseFetchRewardsResponseDto } from 'src/domain/types/api';

export function rewardsAdapter(
  rewards: UseFetchRewardsResponseDto['rewards']
): Reward[] {
  return rewards.map((reward) => {
    const base = {
      id: reward.id,
      name: reward.name,
      description: reward.description,
      type: reward.type,
      exchangeDeadline: new Date(reward.exchangeDeadline),
      oneTimeOnly: reward.oneTimeOnly,
    };

    if (!reward.condition) {
      throw new Error('reward condition is required');
    }

    if (reward.type === RewardType.TOKEN_QUANTITY) {
      return {
        ...base,
        type: RewardType.TOKEN_QUANTITY,
        condition: {
          contractId: reward.condition.contractId,
          cost: reward.condition.cost,
        },
      };
    } else {
      return {
        ...base,
        type: RewardType.TOKEN_VARIETY,
        condition: {
          requiredContractIds: reward.condition.requiredContractIds,
          optionalContractIds: reward.condition.optionalContractIds,
          minimumVarietyCount: reward.condition.minimumVarietyCount,
        },
      };
    }
  });
}
