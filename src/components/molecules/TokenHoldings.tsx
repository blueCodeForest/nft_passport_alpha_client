import { ContractType } from 'src/domain/types';
import { CustomIcon } from '../atoms';

export interface CoinHoldings {
  tokenType: typeof ContractType.COIN;
  holdings: number;
  symbol: string;
}

export interface StampVarietyHoldings {
  tokenType: typeof ContractType.STAMP;
  collectedCount: number;
  totalVarieties: number;
}

type TokenHoldingsProps = CoinHoldings | StampVarietyHoldings;

export function TokenHoldings(props: TokenHoldingsProps) {
  if (props.tokenType === ContractType.COIN) {
    return (
      <div className='flex items-center gap-2'>
        <CustomIcon icon='teenyicons-wallet-alt-outline' size={5} />
        {props.holdings} {props.symbol}
      </div>
    );
  }
  if (props.tokenType === ContractType.STAMP) {
    return (
      <div>
        <CustomIcon icon='teenyicons-wallet-alt-outline' size={5} />
        {props.collectedCount} / {props.totalVarieties}
      </div>
    );
  } else {
    throw new Error('Invalid reward type');
  }
}
