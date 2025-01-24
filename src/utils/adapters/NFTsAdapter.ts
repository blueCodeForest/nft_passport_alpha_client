import { INFTWithContract } from 'src/domain/interface';
import { UseFetchNFTsByWalletResponseDto } from '../../domain/types/api/responses';

export function NFTsAdapter(
  nfts: UseFetchNFTsByWalletResponseDto['nfts']
): INFTWithContract[] {
  return nfts.map((nft) => {
    return {
      metadata: nft.metadata,
      contract: nft.contract,
      quantity: nft.quantity,
    };
  });
}
