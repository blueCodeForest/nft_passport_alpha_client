import { ContractType, HistoryType } from 'src/domain/types';
import { CustomIcon } from './CustomIcon';

interface HistoryIconProps {
  historyType: HistoryType;
  contractType?: ContractType;
}

export function HistoryIcon({ historyType, contractType }: HistoryIconProps) {
  if (historyType === HistoryType.MINT) {
    if (contractType === ContractType.COIN)
      return <CustomIcon icon='i-majesticons-coins-line' size='lg' />;
    return <CustomIcon icon='i-tabler-rubber-stamp' size='lg' />;
  }
  return <CustomIcon icon='i-fluent-ribbon-12-regular' size='lg' />;
}
