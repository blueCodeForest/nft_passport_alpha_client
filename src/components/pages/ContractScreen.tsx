import { H2, PassportItem } from '../molecules';
import { useFetchContractInfo, useFetchPassportsByContract } from 'src/hooks';
import { useParams } from 'react-router-dom';
import { ContractDetails } from '../organisms';

export function ContractScreen() {
  const { contractId } = useParams();
  const { data: contract, isLoading: isLoadingContract } = useFetchContractInfo(
    Number(contractId)
  );
  const { data: passports, isLoading: isLoadingPassports } =
    useFetchPassportsByContract(Number(contractId));
  if (isLoadingContract || isLoadingPassports) return <div>Loading...</div>;
  if (!contract) return <div>Contract not found</div>;
  if (!passports) return <div>Passports not found</div>;

  return (
    <div>
      <ContractDetails contract={contract} />
      <H2 icon='streamline-passport'>関連パスポート</H2>
      <div className='flex flex-wrap gap-4'>
        {passports.map((passport) => (
          <PassportItem key={passport.id} passport={passport} />
        ))}
      </div>
    </div>
  );
}
