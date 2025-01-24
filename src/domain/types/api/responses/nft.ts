import { paths } from 'src/types/swagger-types';

export type UseFetchNFTsByWalletResponseDto =
  paths['/nfts']['get']['responses']['200']['content']['application/json; charset=utf-8'];

export type UseFetchNFTBalanceResponseDto =
  paths['/nfts/{contractId}/balance']['get']['responses']['200']['content']['application/json; charset=utf-8'];
