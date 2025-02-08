import { H2, HistoryItem } from '../molecules';
import { History } from 'src/domain/types';

interface HistoriesAreaProps {
  histories: History[];
}

export function HistoriesArea({ histories }: HistoriesAreaProps) {
  return (
    <div>
      <H2 icon='i-iconamoon-history-fill'>ヒストリー</H2>
      {histories.length === 0 ? (
        <p className='text-gray-500 text-center py-4'>
          ヒストリーはまだありません
        </p>
      ) : (
        histories.map((history) => (
          <HistoryItem key={history.id} history={history} />
        ))
      )}
    </div>
  );
}
