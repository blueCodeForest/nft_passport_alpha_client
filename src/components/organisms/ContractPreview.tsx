import { IContractWithStats } from 'src/domain/interface';
import { ContractImage } from '../atoms';
import { ContractStats, ContractAddress, ContractTitle } from '../molecules';
import { useNavigate } from 'react-router-dom';

interface ContractPreviewProps {
  contract: IContractWithStats;
}

export function ContractPreview({ contract }: ContractPreviewProps) {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/contract/${contract.id}`);
  };

  return (
    <div className='flex gap-2'>
      <ContractImage
        src={contract.metadata.imageUrl}
        size='md'
        onClick={handleImageClick}
        className='cursor-pointer'
      />
      <div className='w-2/3 flex flex-col gap-2'>
        <ContractTitle
          title={contract.metadata.name}
          contractType={contract.type}
          symbol={contract.symbol}
        />
        <ContractStats
          totalSupply={contract.stats.totalSupply}
          holderCount={contract.stats.holderCount}
          symbol={contract.symbol}
        />
        <ContractAddress
          chainId={contract.chainId}
          contractAddress={contract.contractAddress}
        />
      </div>
    </div>
  );
}
