import { History, HistoryType, RewardType } from 'src/domain/types';
import {
  HistoryDate,
  HistoryIcon,
  HistoryResult,
  HistoryTitle,
} from '../atoms';

interface HistoryItemProps {
  history: History;
}

export function HistoryItem({ history }: HistoryItemProps) {
  const iconProps = {
    historyType: history.historyType,
    contractType: 'contract' in history ? history.contract.type : undefined,
  };

  const titleProps = {
    historyName:
      history.historyType === HistoryType.MINT
        ? history.nft.metadata.name
        : history.reward.name,
    passportName: history.passport.name,
  };

  const resultProps = (() => {
    if (history.historyType === HistoryType.MINT) {
      return {
        type: HistoryType.MINT,
        symbol: history.contract.symbol,
        quantity: history.nft.quantity,
      } as const;
    }

    if (history.rewardType === RewardType.TOKEN_QUANTITY) {
      return {
        type: HistoryType.REWARD,
        rewardType: RewardType.TOKEN_QUANTITY,
        symbol: history.contract.symbol,
        quantity: history.reward.condition.cost,
      } as const;
    }

    return {
      type: HistoryType.REWARD,
      rewardType: RewardType.TOKEN_VARIETY,
    } as const;
  })();

  return (
    <div className='flex items-center gap-2 p-4 border-b border-lightGray border-dashed'>
      <HistoryIcon {...iconProps} />
      <div className='flex-1 min-w-0'>
        <HistoryTitle {...titleProps} />
      </div>
      <div>
        <HistoryResult {...resultProps} />
        <HistoryDate date={history.createdAt} />
      </div>
    </div>
  );
}
