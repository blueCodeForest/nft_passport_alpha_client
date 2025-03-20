import { useParams } from 'react-router-dom';
import { BrandPassportHeader } from '../organisms/BrandPassportHeader';
import { RewardsArea } from '../organisms/RewardsArea';
import { RankingArea } from '../organisms/RankingArea';
import {
  useFetchContractWithStats,
  useFetchNFTBalance,
  useWallet,
} from 'src/hooks';
import {
  useFetchRewards,
  useFetchNFTHolderRanking,
  useFetchPassport,
} from 'src/hooks';
import { RewardType, ContractType } from 'src/domain/types';
import {
  TokenQuantityRewardAreaProps,
  TokenVarietyRewardAreaProps,
} from '../organisms/RewardsArea';
import { isTokenQuantityRewards } from 'src/domain/guards';

export function BrandPassportScreen() {
  const { id } = useParams();
  const passportId = Number(id);
  const { address: walletAddress } = useWallet();

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
    mutate: mutateNFTBalance,
  } = useFetchNFTBalance(
    contractData ? contractData.id : undefined,
    contractData && walletAddress ? walletAddress : undefined,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      shouldRetryOnError: true,
    }
  );

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

  const isQuantityRewards = isTokenQuantityRewards(rewardsData);

  const rewardsProps = isQuantityRewards
    ? ({
        rewardType: RewardType.TOKEN_QUANTITY,
        tokenType: ContractType.COIN,
        rewards: rewardsData,
        holdings: nftBalanceData ?? 0,
        symbol: contractData.symbol,
        onExchangeComplete: () => mutateNFTBalance(),
      } as TokenQuantityRewardAreaProps)
    : ({
        rewardType: RewardType.TOKEN_VARIETY,
        tokenType: ContractType.STAMP,
        rewards: rewardsData,
        requiredHoldings: 0,
        optionalHoldings: 0,
      } as TokenVarietyRewardAreaProps);

  try {
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
  } catch (error) {
    console.error('レンダリング中にエラーが発生しました', error);
    return (
      <div>
        レンダリングエラー:{' '}
        {error instanceof Error ? error.message : String(error)}
      </div>
    );
  }
}
