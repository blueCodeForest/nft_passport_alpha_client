import { PassportType } from 'src/domain/types';
import { PassportWithOwnerStats } from 'src/domain/types/passportWithOwnerStats';
import { UseFetchPassportsByWalletResponseDto } from 'src/domain/types/api/responses/passport';

export function passportsWithOwnerStatsAdapter(
  passports: UseFetchPassportsByWalletResponseDto['passports']
): PassportWithOwnerStats[] {
  return passports.map((passport) => {
    const base = {
      id: passport.id,
      name: passport.name,
      imageUrl: passport.imageUrl,
    };

    if (passport.type === PassportType.BRAND) {
      return {
        ...base,
        type: PassportType.BRAND,
        stats: {
          rank: passport.stats.rank,
          totalHolders: passport.stats.totalHolders,
          holdingCoins: passport.stats.holdingCoins,
        },
        contractSymbol: passport.contractSymbol,
      };
    } else {
      return {
        ...base,
        type: PassportType.COLLECTION,
        stats: {
          holdingStamps: passport.stats.holdingStamps,
          totalStamps: passport.stats.totalStamps,
        },
      };
    }
  });
}
