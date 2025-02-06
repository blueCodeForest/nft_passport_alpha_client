export interface IMetadata {
  name: string;
  imageUrl: string;
  description?: string;
  animationUrl?: string;
  externalUrl?: string;
  attributes?: IAttribute[];
}

export interface IAttribute {
  traitType: string;
  value: string;
}
