import { ContractType } from 'src/domain/types';
import { useNavigate } from 'react-router-dom';
import { INFTWithContract } from 'src/domain/interface';
import { CustomIcon } from '../atoms/CustomIcon';

interface OwnNFTsAreaProps {
  nfts: INFTWithContract[];
}

export function OwnNFTsArea({ nfts }: OwnNFTsAreaProps) {
  const navigate = useNavigate();
  const filledNFTs: (INFTWithContract | null)[] = [
    ...nfts,
    ...Array(9 - nfts.length).fill(null),
  ];

  return (
    <div className='w-full mb-4 p-1 mt-2'>
      {/* <div className='grid grid-cols-3 gap-2 p-4 auto-rows-fr'> */}
      <div className='flex flex-wrap'>
        {filledNFTs.map((nft, i) => (
          <div className='w-1/3' key={nft ? nft.contract.contractAddress : i}>
            <div className='relative' style={{ paddingTop: '100%' }}>
              <div
                className='absolute top-0 left-0 w-full h-full p-0.5 flex items-center justify-center'
                onClick={() => nft && navigate(`/contract/${nft.contract.id}`)}
                style={{ cursor: nft ? 'pointer' : 'default' }}
              >
                <div className='w-full h-full border border-lightGray border-dashed p-1 relative'>
                  {nft ? (
                    <img
                      src={nft.metadata.imageUrl}
                      alt={nft.metadata.name}
                      className='w-full h-full object-contain'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center'>
                      {/* <span className='text-lightGray'>Empty</span> */}
                      <CustomIcon
                        icon='i-material-symbols-add'
                        size='lg'
                        color='text-lightGray'
                      />
                    </div>
                  )}
                  {nft &&
                    nft.contract.type === ContractType.COIN &&
                    nft.quantity >= 1 && (
                      <div className='absolute top-1 right-1 bg-background/80 px-1.5 py-0.5 rounded-full text-sm font-medium'>
                        ×{nft.quantity}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
