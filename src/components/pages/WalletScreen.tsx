import {
  useFetchPassportsByWallet,
  useFetchHistories,
  useFetchNFTsByWallet,
} from 'src/hooks';
import { useParams } from 'react-router-dom';
import { HistoriesArea, PassportsArea, OwnNFTsArea } from '../organisms';
import { useWalletConnection } from 'src/hooks';

export function WalletScreen() {
  const { walletAddress: paramWalletAddress } = useParams();
  const { address: connectedWalletAddress } = useWalletConnection();

  const {
    data: nftsData,
    error: nftsError,
    isLoading: nftsLoading,
  } = useFetchNFTsByWallet(paramWalletAddress ?? '');

  const {
    data: passportsData,
    error: passportsError,
    isLoading: passportsLoading,
  } = useFetchPassportsByWallet(paramWalletAddress ?? '');

  const {
    data: historiesData,
    error: historiesError,
    isLoading: historiesLoading,
  } = useFetchHistories(paramWalletAddress ?? '');

  if (nftsLoading || passportsLoading || historiesLoading)
    return <div>読み込み中...</div>;
  if (nftsError || passportsError || historiesError)
    return <div>エラーが発生しました</div>;

  return (
    <div className='container max-w-screen-sm'>
      <OwnNFTsArea nfts={nftsData ?? []} />
      <PassportsArea passports={passportsData ?? []} />
      {connectedWalletAddress?.toLowerCase() ===
        paramWalletAddress?.toLowerCase() && (
        <HistoriesArea histories={historiesData ?? []} />
      )}
    </div>
  );
}
