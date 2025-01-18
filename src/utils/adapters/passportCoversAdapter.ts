import { IPassportBase } from 'src/domain/interface/iPassport';
import { UseFetchPassportsByContractResponseDto } from 'src/domain/types/api/responses/passport';

export function passportCoversAdapter(
  covers: UseFetchPassportsByContractResponseDto['passports']
): IPassportBase[] {
  return covers.map((cover) => {
    return {
      id: cover.id,
      name: cover.name,
      imageUrl: cover.imageUrl,
      type: cover.type,
    };
  });
}
