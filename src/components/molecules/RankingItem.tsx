import { INFTHolderRank } from 'src/domain/interface';
import { CustomIcon } from '../atoms';
import { useNavigate } from 'react-router-dom';

interface RankingItemProps extends INFTHolderRank {
  key: string;
  symbol: string;
}

export function RankingItem(props: RankingItemProps) {
  const navigate = useNavigate();

  const rank =
    props.rank === 1 ? (
      <CustomIcon icon='i-emojione-monotone-1st-place-medal' size='sm' />
    ) : props.rank === 2 ? (
      <CustomIcon icon='i-emojione-monotone-2nd-place-medal' size='sm' />
    ) : props.rank === 3 ? (
      <CustomIcon icon='i-emojione-monotone-3rd-place-medal' size='sm' />
    ) : (
      <span>{props.rank}</span>
    );

  const handleClick = () => {
    navigate(`/wallet/${props.walletAddress}`);
  };

  return (
    <div
      className='flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100'
      onClick={handleClick}
    >
      <div className='flex items-center gap-2'>
        <div className='flex items-center justify-center w-5'>{rank}</div>
        <div className='text-sm'>
          {`${props.walletAddress.slice(0, 7)}...${props.walletAddress.slice(-5)}`}
        </div>
      </div>
      <div className='text-sm'>
        {props.holdings} {props.symbol}
      </div>
    </div>
  );
}
