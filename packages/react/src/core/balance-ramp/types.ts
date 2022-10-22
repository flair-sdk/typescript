import { TransactionRequest } from '@ethersproject/providers';
import { Environment } from '@flair-sdk/common';
import { BigNumberish } from 'ethers';
import { Deferrable } from 'ethers/lib/utils';

export type CurrentBalance = {
  tokenAddress: string;
  amount: BigNumberish;
};

export type RequiredBalance = {
  idempotencyKey?: string;
  outputTokenAddress?: string;
  outputDecimals?: number;
  outputAmount: string;
  estimatedGasLimit?: string;
  estimatedMaxFeePerGas?: string;
  estimatedMaxPriorityFeePerGas?: string;
  inputCurrency?: string;
  requiresKyc?: boolean;
  ignoreCurrentBalance?: boolean;
};

export type BalanceResolverContext = {
  config: BalanceRampConfig;
  estimatedGasLimit?: BigNumberish;
  estimatedMaxFeePerGas?: BigNumberish;
  estimatedMaxPriorityFeePerGas?: BigNumberish;
  transactionRequest?: Deferrable<TransactionRequest>;
};

export type BalanceResolver = (
  context: BalanceResolverContext,
) => Promise<RequiredBalance | undefined>;

export type BalanceRampConfig = {
  env: Environment;
  requiresKyc: boolean;
  ignoreCurrentBalance: boolean;
  inputCurrency?: string;
  resolvers: BalanceResolver[];
  enabledChainIds?: number[];
  maxGasLimit?: BigNumberish;
};