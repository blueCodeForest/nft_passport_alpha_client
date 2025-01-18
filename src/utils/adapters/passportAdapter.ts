import { IPassport } from 'src/domain/interface';
import { UseFetchPassportResponseDto } from 'src/domain/types/api/responses';

export function passportAdapter(
  passport: UseFetchPassportResponseDto['passport']
): IPassport {
  return {
    id: passport.id,
    name: passport.name,
    type: passport.type,
    imageUrl: passport.imageUrl,
    issuer: passport.issuer,
    description: passport.description,
    links: {
      hp: passport.hp,
      x: passport.x,
      instagram: passport.instagram,
      line: passport.line,
    },
  };
}
