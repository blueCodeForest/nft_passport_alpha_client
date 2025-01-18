interface HistoryDateProps {
  date: Date;
}

export function HistoryDate({ date }: HistoryDateProps) {
  return (
    <div className='text-sm text-darkGray whitespace-nowrap'>
      {date.toLocaleDateString('ja-JP')}
    </div>
  );
}
