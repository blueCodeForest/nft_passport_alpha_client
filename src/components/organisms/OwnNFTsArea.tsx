import { ContractType } from 'src/domain/types';

interface OwnNFTsAreaProps {
  nfts: {
    chainId: number;
    contractAddress: string;
    contractType: ContractType;
    name: string;
    imageUrl: string;
    balance: number;
  }[];
}

export function OwnNFTsArea({ nfts }: OwnNFTsAreaProps) {
  const filledNFTs = [...nfts, ...Array(9 - nfts.length).fill(null)];

  return (
    <div className='w-full mb-4'>
      <div className='grid grid-cols-3 gap-2 p-4 auto-rows-fr'>
        {filledNFTs.map((nft) => (
          <div
            key={nft ? nft.contractAddress : Math.random()}
            className='border relative border-lightGray border-dashed p-1'
          >
            {nft ? (
              <img
                src={nft.imageUrl}
                alt={nft.name}
                className='object-contain'
              />
            ) : (
              <div className='w-full h-full flex items-center justify-center'>
                <span className='text-lightGray'>Empty</span>
              </div>
            )}
            {nft &&
              nft.contractType === ContractType.COIN &&
              nft.balance >= 1 && (
                <div className='absolute top-1 right-1 bg-background/80 px-1.5 py-0.5 rounded-full text-sm font-medium'>
                  ×{nft.balance}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
