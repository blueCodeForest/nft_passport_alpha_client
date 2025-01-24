import { CustomIcon } from './CustomIcon';

export function PassportTitle({ title }: { title: string }) {
  return (
    <div className='flex items-center gap-1'>
      <CustomIcon icon='i-streamline-passport' size='2xl' />
      <h1 className='text-2xl font-bold'>{title}</h1>
    </div>
  );
}
