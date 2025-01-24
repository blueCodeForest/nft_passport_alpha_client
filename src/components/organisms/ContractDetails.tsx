import { IContractWithStats } from 'src/domain/interface';
import { ContractTitle } from '../molecules/ContractTitle';
import { ContractAddress } from '../molecules/ContractAddress';
import { ContractDescription } from '../atoms/ContractDescription';
import { Attributes } from '../molecules/Attributes';
import { TotalSupply, HolderCount } from '../molecules';

interface ContractDetailsProps {
  contract: IContractWithStats;
}

export function ContractDetails({ contract }: ContractDetailsProps) {
  return (
    <>
      <img src={contract.metadata.imageUrl} alt={contract.metadata.name} />
      <div className='flex flex-col gap-3 p-2'>
        <div className='flex flex-col gap-2'>
          <div className='flex items-end justify-between'>
            <ContractTitle
              title={contract.metadata.name}
              contractType={contract.type}
              symbol={contract.symbol}
            />
            <ContractAddress
              chainId={contract.chainId}
              contractAddress={contract.contractAddress}
            />
          </div>
          <ContractDescription description={contract.metadata.description} />
          <div className='flex gap-4'>
            <TotalSupply
              totalSupply={contract.stats.totalSupply}
              symbol={contract.symbol}
            />
            <HolderCount holderCount={contract.stats.holderCount} />
          </div>
          <Attributes attributes={contract.metadata.attributes} />
        </div>
      </div>
    </>
  );
}
