import { Reward, RewardType } from 'src/domain/types';
import { RewardExchangeModal } from '../organisms/RewardExchangeModal';
import { useState } from 'react';
import { CustomButton } from '../atoms';

interface RewardItemProps {
  key: number;
  reward: Reward;
  symbol: string;
  holdings: number;
  onExchangeComplete?: () => void;
}

export function RewardItem(props: RewardItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (props.reward.type === RewardType.TOKEN_QUANTITY) {
    return (
      <>
        <div
          className='flex items-center justify-between border-b-2 border-dashed border-lightGray px-2 py-4'
          onClick={() => setIsModalOpen(true)}
        >
          <span>{props.reward.name}</span>
          <CustomButton
            label={`${props.reward.condition.cost} ${props.symbol}`}
            size='sm'
            className='w-24'
            disabled={props.holdings < props.reward.condition.cost}
            onClick={() => setIsModalOpen(true)}
          />
          {/* <button>
            <div
              className={`flex items-center justify-center w-24 rounded-md ${
                props.holdings >= props.reward.condition.cost
                  ? 'border-2 border-darkGray bg-transparent text-darkGray'
                  : 'bg-lightGray text-white'
              } font-bold`}
            >
              <span>
                {props.reward.condition.cost} {props.symbol}
              </span>
            </div>
          </button> */}
        </div>

        <RewardExchangeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          reward={props.reward}
          symbol={props.symbol}
          isEnabled={props.holdings >= props.reward.condition.cost}
          onExchangeComplete={props.onExchangeComplete}
        />
      </>
    );
  }
}
