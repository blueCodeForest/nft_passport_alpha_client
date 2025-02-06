import { paths } from 'src/types/swagger-types';

export type UseFetchPassportsByWalletResponseDto =
  paths['/passports/by-wallet']['get']['responses']['200']['content']['application/json; charset=utf-8'];

export type UseFetchPassportsByContractResponseDto =
  paths['/passports/by-contract']['get']['responses']['200']['content']['application/json; charset=utf-8'];

export type UseFetchPassportResponseDto =
  paths['/passports/{id}']['get']['responses']['200']['content']['application/json; charset=utf-8'];
