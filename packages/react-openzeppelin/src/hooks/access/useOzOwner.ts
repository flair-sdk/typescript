import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractRead } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { ReadContractConfig } from '@wagmi/core';
import { BytesLike, Signer } from 'ethers';

type Config = Partial<ReadContractConfig> & {
  version?: ContractVersion;
  enabled?: boolean;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
};

export const useOzOwner = ({
  version,
  enabled,
  contractAddress,
  signerOrProvider,
  ...restOfConfig
}: Config) => {
  return useContractRead<BytesLike>({
    version,
    enabled,
    contractFqn: 'openzeppelin/access/Ownable',
    functionName: 'owner',
    contractAddress,
    signerOrProvider,
    ...restOfConfig,
  });
};
