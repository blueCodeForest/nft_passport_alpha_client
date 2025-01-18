import { IContractWithStats } from 'src/domain/interface';
import { ContractImage } from '../atoms';
import { ContractStats, ContractAddress, ContractTitle } from '../molecules';

interface ContractPreviewProps {
  contract: IContractWithStats;
}

export function ContractPreview({ contract }: ContractPreviewProps) {
  return (
    <div className='flex gap-2'>
      <ContractImage src={contract.metadata.imageUrl} size='md' />
      <div className='w-2/3 flex flex-col gap-2'>
        <ContractTitle
          title={contract.metadata.name}
          contractType={contract.type}
          symbol={contract.symbol}
        />
        <ContractStats
          circulatingSupply={contract.stats.circulatingSupply}
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
