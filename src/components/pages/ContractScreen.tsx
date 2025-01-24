import {
  useFetchContractWithStats,
  useFetchPassportsByContract,
} from 'src/hooks';
import { useParams } from 'react-router-dom';
import { ContractDetails, PassportsArea } from '../organisms';

export function ContractScreen() {
  const { contractId } = useParams();
  const { data: contract, isLoading: isLoadingContract } =
    useFetchContractWithStats(Number(contractId));
  const { data: passports, isLoading: isLoadingPassports } =
    useFetchPassportsByContract(Number(contractId));
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
