import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { MintArea } from 'src/components/organisms';
import { ContractType } from 'src/domain/types';
import {
  useFetchContractCover,
  useMint,
  useMintModal,
  useWalletConnection,
} from 'src/hooks';
import { useEffect, useState } from 'react';
import { useWalletConnectionModal } from 'src/hooks/useWalletConnectionModal';

export function MintScreen() {
  const navigate = useNavigate();
  const { showMintingModal, showSuccessModal, showErrorModal } = useMintModal();
  const { chainId, contractAddress } = useParams();
  const [searchParams] = useSearchParams();
  const mintAuthKey = searchParams.get('mak');
  const { address: walletAddress, isConnected } = useWalletConnection();
  const { trigger, error } = useMint(Number(chainId), contractAddress || '');
  const [shouldMint, setShouldMint] = useState(false);
  const { showModal: showWalletConnectionModal } = useWalletConnectionModal();

  useEffect(() => {
    if (shouldMint && isConnected && walletAddress) {
      executeMint();
    }
  }, [shouldMint, isConnected, walletAddress]);

  const executeMint = async () => {
    if (!mintAuthKey) return;

    showMintingModal();

    try {
      const result = await trigger({
        mintAuthKey,
        walletAddress: walletAddress!,
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
      console.error('Mint failed:', error);
      showErrorModal();
    }
  };

  const handleMint = async () => {
    if (!mintAuthKey) {
      alert(
        'うまく情報が読み込めません。\nもう一度QRコードをスキャンしてください。'
      );
      console.error('mintAuthKey is required');
      return;
    }

    setShouldMint(true);

    if (!isConnected) {
      showWalletConnectionModal();
      return;
    }

    executeMint();
  };

  const {
    data: contractData,
    isLoading,
    error: fetchError,
  } = useFetchContractCover(Number(chainId), contractAddress || '');
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
