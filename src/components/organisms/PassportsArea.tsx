import { PassportWithOwnerStats } from 'src/domain/types';
import { PassportItem } from '../molecules/PassportItem';
import { H2 } from '../molecules';
import { IPassportBase } from 'src/domain/interface/iPassport';
interface PassportsAreaProps {
  passports: (PassportWithOwnerStats | IPassportBase)[];
}

export function PassportsArea({ passports }: PassportsAreaProps) {
  if (passports.length === 0) {
    return (
      <div className='w-full mb-4'>
        <H2 icon='i-streamline-passport'>パスポート</H2>
        <div className='flex justify-center items-center p-4 text-gray-500'>
          パスポートがありません
        </div>
      </div>
    );
  }

  const h2Text = 'stats' in passports[0] ? '保有パスポート' : '関連パスポート';
  return (
    <div className='w-full mb-4'>
      <H2 icon='i-streamline-passport'>{h2Text}</H2>
      <div className='flex flex-col gap-1 px-1'>
        {passports.map((passport) => (
          <PassportItem key={passport.id} passport={passport} />
        ))}
      </div>
    </div>
  );
}
