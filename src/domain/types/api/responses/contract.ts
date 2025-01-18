import { paths } from 'src/types/swagger-types';

export type UseFetchContractCoverResponseDto =
  paths['/contracts/{chainId}/{contractAddress}']['get']['responses']['200']['content']['application/json; charset=utf-8'];

export type UseFetchContractInfoResponseDto =
  paths['/contracts/{id}']['get']['responses']['200']['content']['application/json; charset=utf-8'];

export type UseFetchNFTHolderRankingResponseDto =
  paths['/contracts/{id}/ranking']['get']['responses']['200']['content']['application/json; charset=utf-8'];

export type UseMintResponseDto =
  paths['/contracts/{chainId}/{contractAddress}']['post']['responses']['200']['content']['application/json; charset=utf-8'];

export type UseMintRequestDto =
  paths['/contracts/{chainId}/{contractAddress}']['post']['requestBody']['content']['application/json'];
