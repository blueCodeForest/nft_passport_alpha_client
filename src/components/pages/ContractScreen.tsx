import {
  useFetchContractWithStats,
  useFetchPassportsByContract,
} from 'src/hooks';
import { useParams } from 'react-router-dom';
import { ContractDetails, PassportsArea } from '../organisms';

export function ContractScreen() {
  const { id } = useParams();
  const { data: contract, isLoading: isLoadingContract } =
    useFetchContractWithStats(Number(id));
  const { data: passports, isLoading: isLoadingPassports } =
    useFetchPassportsByContract(Number(id));
  if (isLoadingContract || isLoadingPassports) return <div>Loading...</div>;
  if (!contract) return <div>Contract not found</div>;
  if (!passports) return <div>Passports not found</div>;

  return (
    <div>
      <ContractDetails contract={contract} />
      <PassportsArea passports={passports} />
    </div>
  );
}
