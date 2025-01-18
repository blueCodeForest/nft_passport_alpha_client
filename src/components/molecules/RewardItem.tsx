import { Reward, RewardType } from 'src/domain/types';

interface RewardItemProps {
  key: number;
  reward: Reward;
  symbol: string;
  holdings: number;
}

export function RewardItem(props: RewardItemProps) {
  if (props.reward.type === RewardType.TOKEN_QUANTITY) {
    return (
      <div className='flex items-center justify-between border-b-2 border-dashed border-lightGray px-2 py-4'>
        <span>{props.reward.name}</span>
        {props.holdings >= props.reward.condition.cost && (
          <div className='flex items-center justify-center w-24 rounded-md border-2 border-darkGray bg-transparent text-darkGray font-bold'>
            <span>
              {props.reward.condition.cost} {props.symbol}
            </span>
          </div>
        )}
        {props.holdings < props.reward.condition.cost && (
          <div className='flex items-center justify-center w-24 rounded-md bg-lightGray text-white font-bold'>
            <span>
              {props.reward.condition.cost} {props.symbol}
            </span>
          </div>
        )}
      </div>
    );
  }
}
