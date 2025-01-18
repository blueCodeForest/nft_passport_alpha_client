import { IPassportBase } from './iPassport';
import { HistoryType, RewardType } from '../types';
import {
  IRewardBase,
  ITokenQuantityReward,
  ITokenVarietyReward,
} from './iReward';
import { IContract } from './iContract';
import { INFTWithQuantity } from './iNFT';

export interface IHistoryBase {
  id: string;
  walletAddress: string;
  historyType: HistoryType;
  createdAt: Date;
  passport: IPassportBase;
}

export interface IMintHistory extends IHistoryBase {
  historyType: typeof HistoryType.MINT;
  contract: IContract;
  nft: INFTWithQuantity;
}

export interface IRewardHistoryBase extends IHistoryBase {
  historyType: typeof HistoryType.REWARD;
  rewardType: RewardType;
  reward: IRewardBase;
}

export interface ITokenQuantityRewardHistory extends IRewardHistoryBase {
  rewardType: typeof RewardType.TOKEN_QUANTITY;
  reward: ITokenQuantityReward;
  contract: IContract;
}

export interface ITokenVarietyRewardHistory extends IRewardHistoryBase {
  rewardType: typeof RewardType.TOKEN_VARIETY;
  reward: ITokenVarietyReward;
}
