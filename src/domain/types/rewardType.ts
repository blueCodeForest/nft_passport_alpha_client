export const RewardType = {
  TOKEN_QUANTITY: 'tokenQuantity',
  TOKEN_VARIETY: 'tokenVariety',
} as const;

export type RewardType = (typeof RewardType)[keyof typeof RewardType];

const AllRewardType = Object.values(RewardType);

export const isRewardType = (value: unknown): value is RewardType => {
  return AllRewardType.includes(value as RewardType);
};
