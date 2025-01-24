import { PassportWithOwnerStats } from 'src/domain/types';
import { PassportImage, PassportName } from '../atoms';
import { PassportStats } from '.';
import { IPassportBase } from 'src/domain/interface/iPassport';
import { useNavigate } from 'react-router-dom';

interface PassportItemProps {
  key: number;
  passport: PassportWithOwnerStats | IPassportBase;
}

export function PassportItem({ passport }: PassportItemProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    const passportType = passport.type;
    navigate(`/passport/${passportType}/${passport.id}`);
  };

  return (
    <div
      className='flex items-center gap-1 p-2 border border-darkGray rounded-md w-full min-w-0 cursor-pointer hover:bg-gray-100'
      onClick={handleClick}
    >
      <PassportImage src={passport.imageUrl} alt={passport.name} />
      <div className='flex gap-1 w-full justify-between min-w-0'>
        <PassportName name={passport.name} />
        {'stats' in passport && <PassportStats passport={passport} />}
      </div>
    </div>
  );
}
