import {
  IMintHistory,
  ITokenQuantityRewardHistory,
  ITokenVarietyRewardHistory,
} from '../interface';

export type History =
  | IMintHistory
  | ITokenQuantityRewardHistory
  | ITokenVarietyRewardHistory;
