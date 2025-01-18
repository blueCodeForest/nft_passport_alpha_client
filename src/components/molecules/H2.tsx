import { CustomIcon } from '../atoms';

interface H2Props {
  icon: string;
  children: React.ReactNode;
  rightElement?: React.ReactNode;
}

export function H2({ icon, children, rightElement }: H2Props) {
  return (
    <div className='flex items-center justify-between mb-2 bg-white p-2'>
      <h2 className='text-xl font-bold flex items-center gap-2'>
        <CustomIcon icon={icon} size={7} />
        {children}
      </h2>
      {rightElement && <div>{rightElement}</div>}
    </div>
  );
}
