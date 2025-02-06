import { UseFetchHistoriesResponseDto } from 'src/domain/types/api';
import { History } from 'src/domain/types';
import { HistoryType } from 'src/domain/types/historyType';
import { RewardType } from 'src/domain/types/rewardType';
import {
  IMintHistory,
  ITokenQuantityRewardHistory,
  ITokenVarietyRewardHistory,
} from 'src/domain/interface';

export function historiesAdapter(
  histories: UseFetchHistoriesResponseDto['histories']
): History[] {
  if (!Array.isArray(histories)) {
    throw new Error('histries must be an array');
  }

  return histories.map((history) => {
    switch (history.historyType) {
      case HistoryType.MINT:
        return adaptMintHistory(history);
      case HistoryType.REWARD:
        return adaptRewardHistory(history);
      default:
        throw new Error('invalid history type');
    }
  });
}

function adaptMintHistory(
  history: UseFetchHistoriesResponseDto['histories'][number]
): IMintHistory {
  if (history.historyType !== HistoryType.MINT) {
    throw new Error('invalid history type');
  }

  if (!history.contract || !history.nft) {
    throw new Error('mint history must have contract and nft');
  }

  return {
    id: history.id,
    historyType: history.historyType,
    walletAddress: history.walletAddress,
    createdAt: new Date(history.createdAt),
    passport: {
      id: history.passport.id,
      name: history.passport.name,
      type: history.passport.type,
      imageUrl: history.passport.imageUrl,
    },
    contract: history.contract,
    nft: history.nft,
  };
}

function adaptRewardHistory(
  history: UseFetchHistoriesResponseDto['histories'][number]
): ITokenQuantityRewardHistory | ITokenVarietyRewardHistory {
  if (history.historyType !== HistoryType.REWARD) {
    throw new Error('invalid history type');
  }

  if (!history.rewardType || !history.reward) {
    throw new Error('reward history must have rewardType and reward');
  }

  const base = {
    id: history.id,
    historyType: history.historyType,
    walletAddress: history.walletAddress,
    createdAt: new Date(history.createdAt),
    passport: {
      id: history.passport.id,
      name: history.passport.name,
      type: history.passport.type,
      imageUrl: history.passport.imageUrl,
    },
    rewardType: history.rewardType,
    reward: {
      ...history.reward,
      exchangeDeadline: new Date(history.reward.exchangeDeadline),
    },
  };

  if (history.rewardType === RewardType.TOKEN_QUANTITY) {
    if (!history.contract) {
      throw new Error('TOKEN_QUANTITY reward history must have contract');
    }
    return {
      ...base,
      rewardType: RewardType.TOKEN_QUANTITY,
      contract: history.contract,
      reward: {
        ...history.reward,
        type: RewardType.TOKEN_QUANTITY,
        exchangeDeadline: new Date(history.reward.exchangeDeadline),
      },
    };
  }

  return {
    ...base,
    rewardType: RewardType.TOKEN_VARIETY,
    reward: {
      ...history.reward,
      type: RewardType.TOKEN_VARIETY,
      exchangeDeadline: new Date(history.reward.exchangeDeadline),
    },
  };
}
