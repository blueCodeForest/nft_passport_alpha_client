import { IContractWithStats } from 'src/domain/interface';
import { IPassport } from 'src/domain/interface';
import { PassportTitle, PassportDescription } from '../atoms';
import { ContractPreview } from './ContractPreview';
import { SocialLinks } from '../molecules';

interface BrandPassportHeaderProps {
  passport: IPassport;
  contract: IContractWithStats;
}

export function BrandPassportHeader({
  passport,
  contract,
}: BrandPassportHeaderProps) {
  return (
    <div className='flex flex-col gap-2 p-2 mb-4'>
      <PassportTitle title={passport.name} />
      <ContractPreview contract={contract} />
      <PassportDescription description={passport.description} />
      <SocialLinks {...passport.links} />
    </div>
  );
}
