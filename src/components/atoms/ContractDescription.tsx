import { Maybe } from 'src/utils/utility';

interface ContractDescriptionProps {
  description: Maybe<string>;
}

export function ContractDescription({ description }: ContractDescriptionProps) {
  return <div>{description}</div>;
}
