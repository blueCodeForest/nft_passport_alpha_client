interface HistoryTitleProps {
  historyName: string;
  passportName: string;
}

export function HistoryTitle({ historyName, passportName }: HistoryTitleProps) {
  return (
    <div className='flex flex-col'>
      <div className='text-text truncate'>{historyName}</div>
      <div className='text-sm text-darkGray truncate'>{passportName}</div>
    </div>
  );
}
