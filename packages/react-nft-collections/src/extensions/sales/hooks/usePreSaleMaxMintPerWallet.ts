import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@flair-sdk/react-common';
import { BigNumberish } from 'ethers';

export const usePreSaleMaxMintPerWallet = (
  config: PredefinedReadContractConfig,
) => {
  return useContractRead<BigNumberish>({
    contractFqn: 'collections/ERC721/extensions/ERC721PreSaleExtension',
    functionName: 'preSaleMaxMintPerWallet',
    ...config,
  });
};
