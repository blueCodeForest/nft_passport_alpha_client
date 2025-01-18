export const PassportType = {
  BRAND: 'brand',
  COLLECTION: 'collection',
} as const;

export type PassportType = (typeof PassportType)[keyof typeof PassportType];

const AllPassportType = Object.values(PassportType);

export const isPassportType = (value: unknown): value is PassportType => {
  return AllPassportType.includes(value as PassportType);
};
