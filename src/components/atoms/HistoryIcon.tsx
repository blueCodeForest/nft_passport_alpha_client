import { ContractType, HistoryType } from 'src/domain/types';
import { CustomIcon } from './CustomIcon';

interface HistoryIconProps {
  historyType: HistoryType;
  contractType?: ContractType;
}

export function HistoryIcon({ historyType, contractType }: HistoryIconProps) {
  if (historyType === HistoryType.MINT) {
    if (contractType === ContractType.COIN)
      return <CustomIcon icon='majesticons-coins-line' size={5} />;
    return <CustomIcon icon='tabler-rubber-stamp' size={5} />;
  }
  return <CustomIcon icon='fluent-ribbon-12-regular' size={5} />;
}
