import { useFetchPassportsByWallet, useFetchHistories } from 'src/hooks';
import { useParams } from 'react-router-dom';
import { HistoriesArea } from '../organisms/HistoriesArea';
import { OwnNFTsArea } from '../organisms/OwnNFTsArea';
import { OwnPassportsArea } from '../organisms/OwnPassportsArea';
import { ContractType } from 'src/domain/types';

export function WalletScreen() {
  const { walletAddress } = useParams();
  const {
    data: passportsData,
    error: passportsError,
    isLoading: passportsLoading,
  } = useFetchPassportsByWallet(walletAddress ?? '');

  const {
    data: historiesData,
    error: historiesError,
    isLoading: historiesLoading,
  } = useFetchHistories(walletAddress ?? '');

  if (passportsLoading || historiesLoading) return <div>読み込み中...</div>;
  if (passportsError || historiesError) return <div>エラーが発生しました</div>;

  return (
    <div className='container max-w-screen-sm'>
      <OwnNFTsArea nfts={nfts} />
      <OwnPassportsArea passports={passportsData ?? []} />
      <HistoriesArea histories={historiesData ?? []} />
    </div>
  );
}

const nfts = [
  {
    chainId: 137,
    contractAddress: '0x0000000000000000000000000000000000000001',
    contractType: ContractType.COIN,
    name: '来場証明コイン',
    imageUrl:
      'https://nft-stamp-card-alpha-client.vercel.app/images/whiskey_event.png',
    balance: 4,
  },
  {
    chainId: 137,
    contractAddress: '0x0000000000000000000000000000000000000002',
    contractType: ContractType.COIN,
    name: 'お化けコイン',
    imageUrl:
      'https://nft-stamp-card-alpha-client.vercel.app/images/obake_bar.png',
    balance: 1,
  },
  {
    chainId: 137,
    contractAddress: '0x0000000000000000000000000000000000000003',
    contractType: ContractType.STAMP,
    name: '地球の中',
    imageUrl:
      'https://nft-stamp-card-alpha-client.vercel.app/images/earth_in_pbag.png',
    balance: 1,
  },
  {
    chainId: 137,
    contractAddress: '0x0000000000000000000000000000000000000004',
    contractType: ContractType.STAMP,
    name: '地球の中から植物',
    imageUrl:
      'https://nft-stamp-card-alpha-client.vercel.app/images/plant_on_earth.png',
    balance: 1,
  },
];
