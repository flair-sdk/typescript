import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@flair-sdk/react-common';
import { BigNumberish } from 'ethers';

export const useERC20TotalSupply = (config: PredefinedReadContractConfig) => {
  return useContractRead<BigNumberish>({
    contractFqn: 'openzeppelin/token/ERC20/ERC20',
    functionName: 'totalSupply',
    ...config,
  });
};
