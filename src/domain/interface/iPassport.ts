import { PassportType } from '../types';

export interface IPassportBase {
  id: number;
  name: string;
  type: PassportType;
  imageUrl: string;
}

export interface IPassport extends IPassportBase {
  issuer: string;
  description: string;
  links?: IPassportLinks;
}

export interface IPassportLinks {
  hp?: string;
  x?: string;
  instagram?: string;
  line?: string;
}
