import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@0xflair/react-common';
import { BigNumberish } from 'ethers';

type ArgsType = [];

export const useStreamMinStakingDuration = (
  config: PredefinedReadContractConfig<ArgsType>,
) => {
  return useContractRead<BigNumberish, ArgsType>({
    contractFqn: 'streams/ERC721/extensions/ERC721StakingExtension',
    functionName: 'minStakingDuration',
    ...config,
  });
};