import { PolygonIcon } from '../atoms';

interface ContractAddressProps {
  chainId: number;
  contractAddress: string;
}

export function ContractAddress({
  chainId,
  contractAddress,
}: ContractAddressProps) {
  return (
    <div className='flex items-center gap-1'>
      <PolygonIcon px={11} />
      <span className='text-xs text-darkGray'>
        {contractAddress.slice(0, 6)}...
        {contractAddress.slice(-4)}
      </span>
    </div>
  );
}
