import { IContractWithStats } from 'src/domain/interface';
import { UseFetchContractInfoResponseDto } from 'src/domain/types/api/responses';

export function contractAdapter(
  contractInfo: UseFetchContractInfoResponseDto
): IContractWithStats {
  return {
    id: contractInfo.contract.id,
    chainId: contractInfo.contract.chainId,
    contractAddress: contractInfo.contract.contractAddress,
    symbol: contractInfo.contract.symbol,
    type: contractInfo.contract.type,
    metadata: {
      name: contractInfo.contract.metadata.name,
      imageUrl: contractInfo.contract.metadata.imageUrl,
      description: contractInfo.contract.metadata.description,
      attributes: contractInfo.contract.metadata.attributes,
    },
    stats: {
      totalSupply: contractInfo.stats.totalSupply,
      circulatingSupply: contractInfo.stats.circulatingSupply,
      holderCount: contractInfo.stats.holderCount,
    },
  };
}
