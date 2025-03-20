import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { MintArea } from 'src/components/organisms';
import { ContractType } from 'src/domain/types';
import {
  useFetchContractCover,
  useMint,
  useMintModal,
  useWallet,
} from 'src/hooks';

export function MintScreen() {
  const navigate = useNavigate();
  const { showMintingModal, showSuccessModal, showErrorModal } = useMintModal();
  const { chainId, contractAddress } = useParams();
  const [searchParams] = useSearchParams();
  const mintAuthKey = searchParams.get('mak');
  const { address: walletAddress } = useWallet();
  const { trigger } = useMint(Number(chainId), contractAddress || '');

  const {
    data: contractData,
    isLoading,
    error: fetchError,
  } = useFetchContractCover(Number(chainId), contractAddress || '');

  const handleMint = async () => {
    if (!mintAuthKey) {
      alert(
        'うまく情報が読み込めません。\nもう一度QRコードをスキャンしてください。'
      );
      console.error('mintAuthKey is required');
      return;
    }

    if (!walletAddress) {
      console.error('Wallet address is not available');
      return;
    }

    if (!contractData) {
      console.error('Contract data is not available');
      return;
    }

    showMintingModal();

    try {
      const result = await trigger({
        mintAuthKey,
        walletAddress: walletAddress,
      });
      console.log('Mint successful:', result);
      const mintedNFT = {
        chainId: Number(chainId),
        contractAddress: contractAddress || '',
        tokenId: result.tokenId,
        imageUrl: contractData?.imageUrl || '',
      };

      showSuccessModal({
        contractType: contractData?.type || ContractType.COIN,
        imageUrl: contractData?.imageUrl || '',
        name: contractData?.name || '',
      });
      navigate(`/wallet/${walletAddress}`, { state: { mintedNFT } });
    } catch (err) {
      console.error('Mint failed:', err);
      showErrorModal();
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (fetchError) return <div>Error: {fetchError.message}</div>;

  if (!contractData?.name || !contractData?.imageUrl || !contractData?.type) {
    console.warn('Contract data is incomplete:', {
      name: contractData?.name,
      imageUrl: contractData?.imageUrl,
      type: contractData?.type,
    });
  }

  return (
    <>
      <div className='container max-w-screen-sm pt-10'>
        <MintArea
          name={contractData?.name || ''}
          imageUrl={contractData?.imageUrl || ''}
          type={contractData?.type || ''}
          onMint={handleMint}
        />
      </div>
    </>
  );
}
