import { paths } from 'src/types/swagger-types';

export type UseFetchWalletAddressResponseDto =
  paths['/wallets/{id}/ethereum-address']['get']['responses']['200']['content']['application/json; charset=utf-8'];
