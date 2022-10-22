import { Environment } from '@flair-sdk/common';

import { balanceRampNativeValueResolve } from '../resolvers';
import { BalanceRampConfig } from '../types';
import { BalanceRampClient } from './balance-ramp.client';

let clientInstance: BalanceRampClient;

export const createBalanceRampClient = (
  config?: Partial<BalanceRampConfig>,
) => {
  clientInstance = new BalanceRampClient(
    Object.assign<any, Partial<BalanceRampConfig>, Partial<BalanceRampConfig>>(
      {},
      {
        env: Environment.PROD,
        resolvers: [balanceRampNativeValueResolve],
        requiresKyc: false,
        ignoreCurrentBalance: false,
        maxGasLimit: 1_000_000,
        inputCurrency: 'USD',
      },
      config || {},
    ),
  );
  return clientInstance;
};

export const getBalanceRampClient = () => {
  if (!clientInstance) {
    clientInstance = createBalanceRampClient();
  }

  return clientInstance;
};