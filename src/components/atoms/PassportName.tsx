interface PassportNameProps {
  name: string;
}

export function PassportName({ name }: PassportNameProps) {
  return <div className='truncate'>{name}</div>;
}
