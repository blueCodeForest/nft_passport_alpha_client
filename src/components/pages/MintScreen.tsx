import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { MintArea } from 'src/components/organisms';
import { useFetchContractCover, useMint } from 'src/hooks';
import { useMintSuccessModal } from '../organisms/MintSuccessModalContext';
import { isContractType } from 'src/domain/types';

export function MintScreen() {
  const navigate = useNavigate();
  // const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { setShowMintSuccessModal, setContractType } = useMintSuccessModal();
  const { chainId, contractAddress } = useParams();
  const [searchParams] = useSearchParams();
  const mintAuthKey = searchParams.get('mak');
  const walletAddress = '0xccEbb7C015FAb6e0a35FFdc7d5Fa73AB32af50cB';

  const { trigger, error } = useMint(Number(chainId), contractAddress || '');
  const handleMint = async () => {
    if (!mintAuthKey) {
      console.error('mintAuthKey is required');
      return;
    }

    try {
      const result = await trigger({
        mintAuthKey,
        walletAddress,
      });
      console.log('Mint successful:', result);
      setContractType(
        isContractType(contractData?.type) ? contractData?.type : null
      );
      setShowMintSuccessModal(true);
      navigate(`/wallet/${walletAddress}`);
    } catch (err) {
      console.error('Mint failed:', error);
    }
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
