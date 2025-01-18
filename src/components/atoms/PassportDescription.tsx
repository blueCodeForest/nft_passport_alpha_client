import { IPassportLinks } from 'src/domain/interface';

interface PassportDescriptionProps {
  description: string;
  links?: IPassportLinks;
}

export function PassportDescription({
  description,
  links,
}: PassportDescriptionProps) {
  return <div>{description}</div>;
}
