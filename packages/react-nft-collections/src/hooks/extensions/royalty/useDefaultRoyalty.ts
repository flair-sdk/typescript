import { Version } from '@0xflair/contracts-registry';
import { ReadContractConfig, useContractRead } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, BytesLike, Signer } from 'ethers';

type Config = Partial<ReadContractConfig> & {
  version?: Version;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
};

export const useDefaultRoyalty = ({
  version,
  contractAddress,
  signerOrProvider,
  ...restOfConfig
}: Config) => {
  const { data, ...rest } = useContractRead<
    [receiver: BytesLike, bps: BigNumberish]
  >({
    version,
    contractKey: 'collections/ERC721/extensions/ERC721RoyaltyExtension',
    functionName: 'defaultRoyalty',
    contractAddress,
    signerOrProvider,
    ...restOfConfig,
  });

  return {
    data: {
      receiver: data?.[0],
      bps: data?.[1],
      percent: data?.[1] ? Number(data[1]) / 100 : undefined,
    },
    ...rest,
  };
};