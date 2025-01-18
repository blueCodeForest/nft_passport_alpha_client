import { CustomIcon } from '../atoms';

interface HolderCountProps {
  holderCount: number;
}

export function HolderCount({ holderCount }: HolderCountProps) {
  return (
    <div className='flex items-center gap-2'>
      <CustomIcon icon='lucide-users' size={4} />
      <span className='text-sm'>ホルダー数 : {holderCount}</span>
    </div>
  );
}
