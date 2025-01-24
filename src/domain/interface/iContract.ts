import { ContractType } from '../types';
import { IMetadata } from './iMetadata';

export interface IContract {
  id: number;
  chainId: number;
  contractAddress: string;
  symbol: string;
  type: ContractType;
}

export interface IContractCover {
  name: string;
  imageUrl: string;
  type: ContractType;
}

export interface IContractWithMetadata extends IContract {
  metadata: IMetadata;
}

export interface IContractWithStats extends IContractWithMetadata {
  stats: INFTContractStats;
}

export interface INFTContractStats {
  totalSupply: number;
  totalBurned: number;
  holderCount: number;
}

export interface INFTHolderRank {
  rank: number;
  walletAddress: string;
  holdings: number;
}

export interface INFTHolderRanking {
  holders: INFTHolderRank[];
}
