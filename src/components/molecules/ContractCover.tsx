import { ContractImage } from '../atoms';

interface ContractCoverProps {
  title: string;
  image: string;
}
export function ContractCover({ title, image }: ContractCoverProps) {
  return (
    <div>
      <div className='flex justify-center mb-4'>
        <h1 className='text-2xl font-bold'>{title}</h1>
      </div>
      <div className='flex justify-center mb-4'>
        <ContractImage src={image} size='lg' />
      </div>
    </div>
  );
}
