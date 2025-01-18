import { HistoryType, RewardType } from 'src/domain/types';

interface MintHistoryResult {
  type: typeof HistoryType.MINT;
  symbol: string;
  quantity: number;
}

interface TokenQuantityRewardHistoryResult {
  type: typeof HistoryType.REWARD;
  rewardType: typeof RewardType.TOKEN_QUANTITY;
  symbol: string;
  quantity: number;
}

interface TokenVarietyRewardHistoryResult {
  type: typeof HistoryType.REWARD;
  rewardType: typeof RewardType.TOKEN_VARIETY;
}

type HistoryResultProps =
  | MintHistoryResult
  | TokenQuantityRewardHistoryResult
  | TokenVarietyRewardHistoryResult;

export function HistoryResult(props: HistoryResultProps) {
  if (props.type === HistoryType.MINT) {
    return (
      <div className='text-right whitespace-nowrap text-text'>
        +{props.quantity} {props.symbol}
      </div>
    );
  }

  if (props.type === HistoryType.REWARD) {
    if (props.rewardType === RewardType.TOKEN_QUANTITY) {
      return (
        <div className='text-right whitespace-nowrap text-text'>
          -{props.quantity} {props.symbol}
        </div>
      );
    }
    return null;
  }

  return null;
}
