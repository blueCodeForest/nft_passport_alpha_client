import { CustomIcon } from '../atoms';

interface HolderCountProps {
  holderCount: number;
}

export function HolderCount({ holderCount }: HolderCountProps) {
  return (
    <div className='flex items-center gap-2'>
      <CustomIcon icon='i-lucide-users' size='sm' />
      <span className='text-sm'>ホルダー数 : {holderCount}</span>
    </div>
  );
}
