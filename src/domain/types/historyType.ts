export const HistoryType = {
  MINT: 'mint',
  REWARD: 'reward',
} as const;

export type HistoryType = (typeof HistoryType)[keyof typeof HistoryType];

const AllHistoryType = Object.values(HistoryType);

export const isHistoryType = (value: unknown): value is HistoryType => {
  return AllHistoryType.includes(value as HistoryType);
};
