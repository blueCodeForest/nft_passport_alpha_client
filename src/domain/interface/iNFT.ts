import { IContract } from './iContract';
import { IMetadata } from './iMetadata';

export interface INFTWithQuantity {
  metadata: IMetadata;
  quantity: number;
}

export interface INFTWithContract extends INFTWithQuantity {
  contract: IContract;
}
