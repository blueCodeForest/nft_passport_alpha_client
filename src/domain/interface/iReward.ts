import { RewardType } from '../types';

export interface IRewardBase {
  id: number;
  name: string;
  description?: string;
  type: RewardType;
  exchangeDeadline: Date;
  oneTimeOnly: boolean;
}

export interface ITokenQuantityReward extends IRewardBase {
  type: typeof RewardType.TOKEN_QUANTITY;
  condition: {
    contractId: number;
    cost: number;
  };
}

export interface ITokenVarietyReward extends IRewardBase {
  type: typeof RewardType.TOKEN_VARIETY;
  condition: {
    requiredContractIds: number[];
    optionalContractIds: number[];
    minimumVarietyCount: number;
  };
}
