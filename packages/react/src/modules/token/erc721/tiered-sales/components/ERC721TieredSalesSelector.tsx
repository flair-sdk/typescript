import { classNames } from '@flair-sdk/common';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/solid';

import { useChainInfo } from '../../../../../common';
import {
  CryptoUnits,
  CryptoValue,
  IfWalletConnected,
  useDiamondContext,
} from '../../../../../core';
import { TieredSalesSelector } from '../../../../finance/tiered-sales/components/TieredSalesSelector';
import { Tier } from '../../../../finance/tiered-sales/types';
import { NftMetadataPreview } from '../../../metadata/components/NftMetadataPreview';

type OptionClassProps = {
  checked: boolean;
  active: boolean;
  disabled: boolean;
};

type RenderProps = {
  checked: boolean;
  active: boolean;
  disabled: boolean;
  tierId: string;
  tier: Tier;
};

type Props = {
  className?: string;
  title?: string | React.ReactNode;
  titleClassName?: string;
  optionElement?: (props: RenderProps) => JSX.Element;
  optionClassName?: string | ((props: OptionClassProps) => string);
  labelElement?: (props: RenderProps) => JSX.Element;
  alwaysShow?: boolean;
};

export const ERC721TieredSalesSelector = (props: Props = {}) => {
  const {
    data: { chainId, offChainConfigs: configValues },
  } = useDiamondContext();

  const chainInfo = useChainInfo(chainId);

  return (
    <TieredSalesSelector
      optionElement={({
        checked,
        active,
        disabled,
        tier,
        tierId,
      }: RenderProps) => {
        const metadataUri =
          configValues?.['admin:tiered-sales']?.tiers?.[tierId]?.metadataUri;
        return (
          <>
            <span className="flex flex-1">
              <span className="flex flex-col">
                <RadioGroup.Label
                  as="span"
                  className="block text-sm font-medium text-gray-900"
                >
                  {metadataUri ? (
                    <NftMetadataPreview
                      uri={metadataUri}
                      hideAttributes={true}
                      hideDescription={true}
                    />
                  ) : (
                    <>Tier #{tierId}</>
                  )}
                </RadioGroup.Label>
                <IfWalletConnected>
                  {tier.isEligible !== undefined ? (
                    <RadioGroup.Description
                      as="span"
                      className="mt-1 flex items-center text-xs text-gray-500"
                    >
                      {tier.isEligible ? 'Eligible' : 'Not eligible'}
                    </RadioGroup.Description>
                  ) : null}
                </IfWalletConnected>
                <RadioGroup.Description
                  as="span"
                  className="mt-4 text-sm font-medium text-gray-900"
                >
                  {tier.price.toString() ? (
                    <CryptoValue
                      symbol={chainInfo?.nativeCurrency?.symbol}
                      value={tier.price.toString()}
                      unit={CryptoUnits.WEI}
                      showPrice={false}
                      showSymbol={true}
                    />
                  ) : null}
                </RadioGroup.Description>
              </span>
            </span>
            <CheckCircleIcon
              className={classNames(
                !checked ? 'invisible' : '',
                'h-5 w-5 text-indigo-600',
              )}
              aria-hidden="true"
            />
            <span
              className={classNames(
                active ? 'border' : 'border-2',
                checked ? 'border-indigo-500' : 'border-transparent',
                'pointer-events-none absolute -inset-px rounded-lg',
              )}
              aria-hidden="true"
            />
          </>
        );
      }}
    />
  );
};
