import { paths } from 'src/types/swagger-types';

export type UseFetchRewardsResponseDto =
  paths['/rewards']['get']['responses']['200']['content']['application/json; charset=utf-8'];

export type UseExchangeRewardResponseDto =
  paths['/rewards/{id}/exchange']['post']['responses']['200']['content']['application/json; charset=utf-8'];

export type UseExchangeRewardRequestDto =
  paths['/rewards/{id}/exchange']['post']['requestBody']['content']['application/json'];
