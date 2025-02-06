import useSWRMutation from 'swr/mutation';
import { mutator } from 'src/utils/apiCall';
import { UseMintResponseDto, UseMintRequestDto } from 'src/domain/types/api';

export function useMint(chainId: number, contractAddress: string) {
  return useSWRMutation<UseMintResponseDto, Error, string, UseMintRequestDto>(
    `/contracts/${chainId}/${contractAddress}`,
    (url: string, { arg }: { arg: UseMintRequestDto }) => mutator(url, arg)
  );
}
