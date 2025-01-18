import { IContractCover } from 'src/domain/interface';
import { UseFetchContractCoverResponseDto } from 'src/domain/types/api/responses';

export function contractCoverAdapter(
  contractCover: UseFetchContractCoverResponseDto
): IContractCover {
  return {
    name: contractCover.name,
    imageUrl: contractCover.imageUrl,
    type: contractCover.type,
  };
}
