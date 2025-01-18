import { IPassportLinks } from 'src/domain/interface';
import { FaGlobe, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { SiLine } from 'react-icons/si';

export function SocialLinks(props: IPassportLinks) {
  const { hp, x, instagram, line } = props;

  return (
    <div className='flex gap-2'>
      {hp && (
        <a
          href={hp}
          target='_blank'
          rel='noopener noreferrer'
          className='text-darkGray hover:text-lightGray transition-colors'
        >
          <FaGlobe className='w-4 h-4' />
        </a>
      )}
      {x && (
        <a
          href={x}
          target='_blank'
          rel='noopener noreferrer'
          className='text-darkGray hover:text-lightGray transition-colors'
        >
          <FaXTwitter className='w-4 h-4' />
        </a>
      )}
      {instagram && (
        <a
          href={instagram}
          target='_blank'
          rel='noopener noreferrer'
          className='text-darkGray hover:text-lightGray transition-colors'
        >
          <FaInstagram className='w-4 h-4' />
        </a>
      )}
      {line && (
        <a
          href={line}
          target='_blank'
          rel='noopener noreferrer'
          className='text-darkGray hover:text-lightGray transition-colors'
        >
          <SiLine className='w-4 h-4' />
        </a>
      )}
    </div>
  );
}
