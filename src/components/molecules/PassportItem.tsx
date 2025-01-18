import { PassportWithOwnerStats } from 'src/domain/types';
import { PassportImage, PassportName } from '../atoms';
import { PassportStats } from '.';
import { IPassportBase } from 'src/domain/interface/iPassport';

interface PassportItemProps {
  key: number;
  passport: PassportWithOwnerStats | IPassportBase;
}

export function PassportItem({ passport }: PassportItemProps) {
  return (
    <div className='flex items-center gap-1 p-2 border border-darkGray rounded-md w-full min-w-0'>
      <PassportImage src={passport.imageUrl} alt={passport.name} />
      <div className='flex gap-1 w-full justify-between min-w-0'>
        <PassportName name={passport.name} />
        {'stats' in passport && <PassportStats passport={passport} />}
      </div>
    </div>
  );
}
