interface PassportDescriptionProps {
  description: string;
}

export function PassportDescription({ description }: PassportDescriptionProps) {
  return <div>{description}</div>;
}
