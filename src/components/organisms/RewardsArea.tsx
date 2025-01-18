import { ContractType, RewardType } from 'src/domain/types';
import { H2, RewardItem } from '../molecules';
import {
  ITokenQuantityReward,
  ITokenVarietyReward,
} from 'src/domain/interface';
import { CoinHoldings, TokenHoldings } from '../molecules/TokenHoldings';

type RewardsAreaProps =
  | TokenQuantityRewardAreaProps
  | TokenVarietyRewardAreaProps;

export interface TokenQuantityRewardAreaProps {
  rewardType: typeof RewardType.TOKEN_QUANTITY;
  tokenType: typeof ContractType.COIN;
  rewards: ITokenQuantityReward[];
  holdings: number;
  symbol: string;
}

export interface TokenVarietyRewardAreaProps {
  rewardType: typeof RewardType.TOKEN_VARIETY;
  tokenType: typeof ContractType.STAMP;
  rewards: ITokenVarietyReward[];
  requiredHoldings: number;
  optionalHoldings: number;
}

export function RewardsArea(props: RewardsAreaProps) {
  if (props.rewardType === RewardType.TOKEN_QUANTITY) {
    const tokenHoldingsProps: CoinHoldings = {
      tokenType: props.tokenType,
      holdings: props.holdings,
      symbol: props.symbol,
    };
    return (
      <div className='mb-6'>
        <H2
          icon='fluent-ribbon-12-regular'
          rightElement={<TokenHoldings {...tokenHoldingsProps} />}
        >
          特典
        </H2>
        {props.rewards.map((reward) => (
          <RewardItem
            key={reward.id}
            reward={reward}
            symbol={props.symbol}
            holdings={props.holdings}
          />
        ))}
      </div>
    );
  }
}
