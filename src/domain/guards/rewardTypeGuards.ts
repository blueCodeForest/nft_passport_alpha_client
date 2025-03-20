import { Reward, RewardType } from '../types';
import { ITokenQuantityReward, ITokenVarietyReward } from '../interface';

export function isTokenQuantityRewards(
  rewards: Reward[]
): rewards is ITokenQuantityReward[] {
  try {
    // 配列チェック
    if (!Array.isArray(rewards)) {
      console.error('isTokenQuantityRewards: rewards is not an array', rewards);
      return false;
    }

    // 空配列チェック
    if (rewards.length === 0) {
      console.log('isTokenQuantityRewards: rewards is empty');
      return true; // 空配列の場合はデフォルトでTOKEN_QUANTITYとして扱う
    }

    // rewards内の各要素のtypeプロパティを確認
    for (let i = 0; i < rewards.length; i++) {
      const reward = rewards[i];
      if (!reward || typeof reward !== 'object') {
        console.error(
          `isTokenQuantityRewards: reward[${i}] is not an object\n${reward[i]}`,
          reward
        );
        return false;
      }

      if (!('type' in reward)) {
        console.error(
          `isTokenQuantityRewards: reward[${i}] has no type property\n${reward[i]}`,
          reward
        );
        return false;
      }

      // RewardType.TOKEN_QUANTITYは文字列'tokenQuantity'であるため、文字列として比較
      if (reward.type !== RewardType.TOKEN_QUANTITY) {
        console.log(
          `isTokenQuantityRewards: reward[${i}].type is not TOKEN_QUANTITY`,
          reward.type
        );
        return false;
      }
    }
    return true;
  } catch (error) {
    console.error('isTokenQuantityRewards: エラー発生', error);
    return false;
  }
}

export function isTokenVarietyRewards(
  rewards: Reward[]
): rewards is ITokenVarietyReward[] {
  try {
    console.log('isTokenVarietyRewards: rewards', rewards);

    // 配列チェック
    if (!Array.isArray(rewards)) {
      console.error('isTokenVarietyRewards: rewards is not an array', rewards);
      return false;
    }

    // 空配列チェック
    if (rewards.length === 0) {
      console.log('isTokenVarietyRewards: rewards is empty');
      return false;
    }

    // rewards内の各要素のtypeプロパティを確認
    for (let i = 0; i < rewards.length; i++) {
      const reward = rewards[i];

      if (!reward || typeof reward !== 'object') {
        console.error(
          `isTokenVarietyRewards: reward[${i}] is not an object`,
          reward
        );
        return false;
      }

      if (!('type' in reward)) {
        console.error(
          `isTokenVarietyRewards: reward[${i}] has no type property`,
          reward
        );
        return false;
      }

      // RewardType.TOKEN_VARIETYは文字列'tokenVariety'であるため、文字列として比較
      if (reward.type !== RewardType.TOKEN_VARIETY) {
        console.log(
          `isTokenVarietyRewards: reward[${i}].type is not TOKEN_VARIETY`,
          reward.type
        );
        return false;
      }
    }

    // すべての要素がTOKEN_VARIETYならtrue
    console.log('isTokenVarietyRewards: すべての要素がTOKEN_VARIETY');
    return true;
  } catch (error) {
    console.error('isTokenVarietyRewards: エラー発生', error);
    return false;
  }
}
