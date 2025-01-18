export interface IMetadata {
  name: string;
  imageUrl: string;
  description?: string;
  attributes?: IAttribute[];
}

export interface IAttribute {
  trait_type: string;
  value: string;
}
