import { PassportWithOwnerStats } from 'src/domain/types';
import { PassportItem } from '../molecules/PassportItem';
import { H2 } from '../molecules';

interface OwnPassportsAreaProps {
  passports: PassportWithOwnerStats[];
}

export function OwnPassportsArea({ passports }: OwnPassportsAreaProps) {
  return (
    <div className='w-full mb-4'>
      <H2 icon='streamline-passport'>保有パスポート</H2>
      <div className='flex flex-col gap-1 px-1'>
        {passports.map((passport) => (
          <PassportItem key={passport.id} passport={passport} />
        ))}
      </div>
    </div>
  );
}
