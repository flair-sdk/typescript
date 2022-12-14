import { FLAIR_CHAINS } from '@flair-sdk/chains';
import { classNames } from '@flair-sdk/common';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid/esm/index.js';
import { Chain } from '@wagmi/chains';
import React, { Fragment, useMemo } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';

import { useWalletContext } from '../providers';
import { WalletComponentWrapper } from './WalletComponentWrapper';

type Props = {
  className?: string;
  wrapperClassName?: string;
  chains?: Chain[];
};

const ChainView = ({ chain }: { chain: Chain }) => {
  return (
    <Listbox.Option
      key={chain.id}
      className={({ active }) =>
        classNames(
          active ? 'text-white bg-indigo-600' : 'text-gray-900',
          'cursor-default select-none relative py-2 pl-3 pr-9',
        )
      }
      value={chain}
    >
      {({ selected, active }) => (
        <>
          <span
            className={classNames(
              selected ? 'font-semibold' : 'font-normal',
              'block truncate',
            )}
          >
            {chain.name}{' '}
            {chain.nativeCurrency ? (
              <small className="text-xs">({chain.nativeCurrency.symbol})</small>
            ) : (
              ''
            )}
          </span>

          {selected ? (
            <span
              className={classNames(
                active ? 'text-white' : 'text-indigo-600',
                'absolute inset-y-0 right-0 flex items-center pr-4',
              )}
            >
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
        </>
      )}
    </Listbox.Option>
  );
};

export const NetworkSelector = (props: Props) => {
  const { chains } = props;
  const { chain } = useNetwork();
  const {
    state: { preferredChainId },
    setPreferredChainId,
  } = useWalletContext();
  const { switchNetwork } = useSwitchNetwork();

  const availableChains = chains || FLAIR_CHAINS;
  const selected = useMemo(() => {
    return (
      availableChains.find((c) => c.id === chain?.id) ||
      availableChains.find(
        (c) => c.id?.toString() === preferredChainId?.toString(),
      )
    );
  }, [availableChains, chain?.id, preferredChainId]);

  const categorizedChains = availableChains.reduce<{
    mainnet: Chain[];
    testnet: Chain[];
  }>(
    (chains, currentChain) => {
      // filtering hardhat and localhost
      if ([31_337, 1_337].includes(currentChain.id)) {
        return chains;
      }

      if (currentChain.testnet) {
        chains.testnet.push(currentChain);
      } else {
        chains.mainnet.push(currentChain);
      }
      return chains;
    },
    { mainnet: [], testnet: [] },
  );

  return (
    <WalletComponentWrapper
      className={classNames('network-selector-wrapper', props.wrapperClassName)}
    >
      <Listbox
        value={selected}
        disabled={availableChains?.length < 2}
        onChange={(chain: Chain) => {
          if (switchNetwork) {
            switchNetwork(chain.id);
          } else {
            setPreferredChainId(chain.id);
          }
        }}
      >
        {({ open }) => (
          <>
            <div className="relative">
              <Listbox.Button className="bg-white relative w-24 sm:w-32 md:w-48 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span className="block truncate">
                  {(chain?.name ?? chain?.id) ||
                    (selected?.name ?? selected?.id) || (
                      <i className="italic">Select a network</i>
                    )}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-20 mt-1 w-48 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  <div>
                    {categorizedChains.mainnet.map((chain) => {
                      return <ChainView key={chain.id} chain={chain} />;
                    })}
                  </div>
                  <div className="relative py-2">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-2 bg-white text-sm text-gray-500">
                        Testnets
                      </span>
                    </div>
                  </div>
                  <div className="">
                    {categorizedChains.testnet.map((chain) => {
                      return <ChainView key={chain.id} chain={chain} />;
                    })}
                  </div>
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </WalletComponentWrapper>
  );
};
