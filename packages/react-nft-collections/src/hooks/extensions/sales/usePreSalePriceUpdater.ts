import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, Signer } from 'ethers';

type Config = {
  version?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  newPrice?: BigNumberish;
};

type ArgsType = [newPrice: BigNumberish];

export const usePreSalePriceUpdater = ({
  version,
  contractAddress,
  signerOrProvider,
  newPrice,
}: Config) => {
  return useContractWriteAndWait<ArgsType>({
    version,
    contractFqn: 'collections/ERC721/extensions/ERC721PreSaleExtension',
    functionName: 'setPreSalePrice',
    contractAddress,
    signerOrProvider,
    args: [newPrice] as ArgsType,
  });
};
