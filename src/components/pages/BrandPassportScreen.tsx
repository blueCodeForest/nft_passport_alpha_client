import { useParams } from 'react-router-dom';
import { BrandPassportHeader } from '../organisms/BrandPassportHeader';
import { RewardsArea } from '../organisms/RewardsArea';
import { RankingArea } from '../organisms/RankingArea';
import { useFetchContractWithStats, useFetchNFTBalance } from 'src/hooks';
import {
  useFetchRewards,
  useFetchNFTHolderRanking,
  useFetchPassport,
} from 'src/hooks';
import { RewardType } from 'src/domain/types';
import {
  TokenQuantityRewardAreaProps,
  TokenVarietyRewardAreaProps,
} from '../organisms/RewardsArea';
import { isTokenQuantityRewards } from 'src/domain/guards';
import { useWalletConnection } from 'src/hooks';

export function BrandPassportScreen() {
  const { id } = useParams();
  const passportId = Number(id);
  const { address: walletAddress } = useWalletConnection();

  const {
    data: contractData,
    error: contractError,
    isLoading: contractLoading,
  } = useFetchContractWithStats(passportId);

  const {
    data: passportData,
    error: passportError,
    isLoading: passportLoading,
  } = useFetchPassport(passportId);

  const {
    data: rewardsData,
    error: rewardsError,
    isLoading: rewardsLoading,
  } = useFetchRewards(passportId);

  const {
    data: rankingData,
    error: rankingError,
    isLoading: rankingLoading,
  } = useFetchNFTHolderRanking(passportId);

  const {
    data: nftBalanceData,
    error: nftBalanceError,
    isLoading: nftBalanceLoading,
  } = useFetchNFTBalance(contractData?.id, walletAddress);

  if (
    contractLoading ||
    rewardsLoading ||
    rankingLoading ||
    passportLoading ||
    nftBalanceLoading
  ) {
    return <div>読み込み中...</div>;
  }

  if (
    contractError ||
    rewardsError ||
    rankingError ||
    passportError ||
    nftBalanceError
  ) {
    return <div>エラーが発生しました</div>;
  }

  if (!contractData || !rewardsData || !rankingData || !passportData) {
    return <div>データが見つかりません</div>;
  }

  const rewardsProps = isTokenQuantityRewards(rewardsData)
    ? ({
        rewardType: RewardType.TOKEN_QUANTITY,
        tokenType: contractData.type,
        rewards: rewardsData,
        holdings: nftBalanceData,
        symbol: contractData.symbol,
      } as TokenQuantityRewardAreaProps)
    : ({
        rewardType: RewardType.TOKEN_VARIETY,
        rewards: rewardsData,
        requiredHoldings: 0,
        optionalHoldings: 0,
      } as TokenVarietyRewardAreaProps);

  return (
    <div className='container max-w-screen-sm mt-2'>
      <BrandPassportHeader passport={passportData} contract={contractData} />
      <RewardsArea {...rewardsProps} />
      <RankingArea
        ranking={rankingData.ranking}
        symbol={contractData.symbol}
        pagination={rankingData.pagination}
      />
    </div>
  );
}
