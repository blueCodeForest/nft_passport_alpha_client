import { IPassportBase } from '../interface';
import { PassportType } from '.';

export type PassportWithOwnerStats =
  | IBrandPassportWithOwnerStats
  | ICollectionPassportWithOwnerStats;

interface IBrandPassportWithOwnerStats extends IPassportBase {
  type: typeof PassportType.BRAND;
  stats: {
    rank: number;
    totalHolders: number;
    holdingCoins: number;
  };
  contractSymbol: string;
}

interface ICollectionPassportWithOwnerStats extends IPassportBase {
  type: typeof PassportType.COLLECTION;
  stats: {
    holdingStamps: number;
    totalStamps: number;
  };
}
