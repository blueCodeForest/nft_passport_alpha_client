export const ContractType = {
  COIN: 'coin',
  STAMP: 'stamp',
} as const;

// type ContractType = "coin" | "stamp"
export type ContractType = (typeof ContractType)[keyof typeof ContractType];

// 全てのtypeを配列として取得
// const AllContractType: ("coin" | "stamp")[]
const AllContractType = Object.values(ContractType);

export const isContractType = (value: unknown): value is ContractType => {
  return AllContractType.includes(value as ContractType);
};
