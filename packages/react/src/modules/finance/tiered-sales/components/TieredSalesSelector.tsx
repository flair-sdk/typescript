import { classNames } from '@flair-sdk/common';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { Chain } from '@wagmi/chains';
import { BigNumber, BigNumberish, ethers } from 'ethers';
import { ReactNode, useEffect } from 'react';

import { useChainInfo } from '../../../../common';
import {
  CryptoSymbol,
  CryptoUnits,
  CryptoValue,
  IfWalletConnected,
  useDiamondContext,
  useRemoteJsonReader,
} from '../../../../core';
import { NftTokenMetadata, useContractSymbol } from '../../../token';
import { useTieredSalesContext } from '../providers';
import { Tier } from '../types';

type OptionClassProps = {
  checked: boolean;
  active: boolean;
  disabled: boolean;
};

export type TieredSalesSelectorRenderProps = {
  checked: boolean;
  active: boolean;
  disabled: boolean;
  tierId: string;
  tierConfig: Tier;
  currencySymbol: CryptoSymbol;
  tokenMetadataUri?: string;
  tokenMetadata?: NftTokenMetadata;
  tokenMetadataLoading?: boolean;
};

type Props = {
  className?: string;
  title?: boolean | string | React.ReactNode;
  titleClassName?: string;
  wrapper?: boolean;
  wrapperClassName?: string;
  optionElement?: (props: TieredSalesSelectorRenderProps) => JSX.Element;
  optionClassName?: string | ((props: OptionClassProps) => string);
  labelElement?: (props: TieredSalesSelectorRenderProps) => JSX.Element;
  loadingElement?: ReactNode;
  alwaysShowTierSelector?: boolean;
  hideNotEligibleTiers?: boolean;
  hideNotActiveTiers?: boolean;
  hideSoldOutTiers?: boolean;
};

export const TieredSalesSelector = ({
  className = 'flex flex-col gap-2',
  title = 'Select from active sale tiers',
  titleClassName = 'text-base font-medium text-gray-900',
  wrapper = true,
  wrapperClassName = 'tier-items-list mt-2 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4',
  optionElement,
  optionClassName = ({ checked, active }) =>
    classNames(
      checked ? 'border-transparent' : 'border-gray-300',
      active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
      'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none',
    ),
  labelElement,
  loadingElement,
  alwaysShowTierSelector = false,
  hideNotEligibleTiers = false,
  hideNotActiveTiers = false,
  hideSoldOutTiers = false,
}: Props) => {
  const {
    data: { chainId, autoDetectedTierId, currentTierId, tiers },
    isLoading: { tiersLoading, isAutoDetectingTier },
    setCurrentTierId,
  } = useTieredSalesContext();

  const chainInfo = useChainInfo(chainId);

  const {
    data: { configValues },
  } = useDiamondContext();

  const visibleTiers = Object.entries(tiers || {}).filter(([tierId, tier]) => {
    if (hideNotEligibleTiers && tier?.isEligible === false) {
      return false;
    }
    if (hideNotActiveTiers && tier?.isActive === false) {
      return false;
    }
    if (hideSoldOutTiers && tier?.remainingSupply !== undefined) {
      return BigNumber.from(tier?.remainingSupply).gt(0);
    }
    return true;
  });

  useEffect(() => {
    if (
      isAutoDetectingTier ||
      (!visibleTiers.length && autoDetectedTierId === undefined) ||
      currentTierId !== undefined
    ) {
      return;
    }

    if (visibleTiers.length > 0) {
      setCurrentTierId(autoDetectedTierId || visibleTiers[0][0]);
    } else {
      setCurrentTierId(autoDetectedTierId || Object.keys(tiers || {})[0]);
    }
  }, [
    visibleTiers,
    autoDetectedTierId,
    currentTierId,
    isAutoDetectingTier,
    setCurrentTierId,
    tiers,
  ]);

  const renderLabel = labelElement
    ? labelElement
    : ({ tierId }: TieredSalesSelectorRenderProps) => <>Tier #{tierId}</>;

  const renderOption = optionElement
    ? optionElement
    : ({
        checked,
        active,
        disabled,
        tierConfig,
        tierId,
        currencySymbol,
        tokenMetadata,
        tokenMetadataUri,
        tokenMetadataLoading,
      }: TieredSalesSelectorRenderProps) => (
        <>
          <span className="tier-item-wrapper flex flex-1">
            <span className="tier-item-content flex flex-col">
              <RadioGroup.Label
                as="span"
                className="tier-metadata block text-sm font-medium text-gray-900"
              >
                {renderLabel({
                  checked,
                  active,
                  disabled,
                  tierConfig,
                  tierId,
                  currencySymbol,
                  tokenMetadata,
                  tokenMetadataUri,
                  tokenMetadataLoading,
                })}
              </RadioGroup.Label>
              <IfWalletConnected>
                {tierConfig?.isEligible !== undefined ? (
                  <RadioGroup.Description
                    as="span"
                    className="tier-eligibility-status mt-1 flex items-center text-xs text-gray-500"
                  >
                    {tierConfig?.isEligible ? 'Eligible' : 'Not eligible'}
                  </RadioGroup.Description>
                ) : null}
              </IfWalletConnected>
              <RadioGroup.Description
                as="span"
                className="tier-price mt-4 text-sm font-medium text-gray-900"
              >
                {tierConfig?.price?.toString() ? (
                  <CryptoValue
                    symbol={currencySymbol}
                    value={tierConfig.price.toString()}
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
              'tier-checked-icon h-5 w-5 text-indigo-600',
            )}
            aria-hidden="true"
          />
          <span
            className={classNames(
              active ? 'border' : 'border-2',
              checked ? 'border-indigo-500' : 'border-transparent',
              'tier-checked-border pointer-events-none absolute -inset-px rounded-lg',
            )}
            aria-hidden="true"
          />
        </>
      );

  const elementsView = visibleTiers.map(([tierId, tierConfig]) => (
    <RadioGroup.Option
      key={tierId}
      value={tierId.toString()}
      className={optionClassName}
    >
      {({ checked, active, disabled }) => (
        <TierItemRow
          key={tierId}
          chainInfo={chainInfo}
          checked={checked}
          active={active}
          disabled={disabled}
          tierId={tierId}
          tierConfig={tierConfig}
          configValues={configValues}
          renderOption={renderOption}
        />
      )}
    </RadioGroup.Option>
  ));

  if (
    !visibleTiers?.length &&
    (tiersLoading || isAutoDetectingTier) &&
    loadingElement
  ) {
    return <>{loadingElement}</>;
  }

  return visibleTiers.length > 1 || alwaysShowTierSelector ? (
    <RadioGroup
      className={className}
      value={currentTierId?.toString()}
      onChange={(newTierId: BigNumberish) => {
        setCurrentTierId(newTierId.toString());
      }}
    >
      {title ? (
        <RadioGroup.Label className={titleClassName}>{title}</RadioGroup.Label>
      ) : null}
      {wrapper ? (
        <div className={wrapperClassName || ''}>{elementsView}</div>
      ) : (
        elementsView
      )}
    </RadioGroup>
  ) : null;
};

const TierItemRow = ({
  chainInfo,
  checked,
  active,
  disabled,
  tierId,
  tierConfig,
  configValues,
  renderOption,
}: {
  chainInfo?: Chain;
  checked: boolean;
  active: boolean;
  disabled: boolean;
  tierId: string;
  tierConfig: Tier;
  configValues?: Record<string, any>;
  renderOption: (props: TieredSalesSelectorRenderProps) => JSX.Element;
}) => {
  const { data: erc20Symbol } = useContractSymbol({
    chainId: chainInfo?.id,
    contractAddress: tierConfig?.currency?.toString(),
    enabled: Boolean(
      chainInfo?.id &&
        tierConfig?.currency &&
        tierConfig?.currency !== ethers.constants.AddressZero,
    ),
  });

  const tokenMetadataUri =
    configValues?.['admin:tiered-sales']?.tiers?.[tierId]?.metadataUri;

  const {
    data: tokenMetadata,
    error: tokenMetadataError,
    isLoading: tokenMetadataLoading,
  } = useRemoteJsonReader({
    uri: tokenMetadataUri?.toString(),
    enabled: Boolean(tokenMetadataUri),
  });

  if (tokenMetadataError) {
    console.warn(
      `Got tokenMetadataError for tier ${tierId}: `,
      tokenMetadataError,
    );
  }

  return renderOption({
    checked,
    active,
    disabled,
    tierId,
    tierConfig,
    currencySymbol: (!tierConfig.currency ||
    tierConfig.currency === ethers.constants.AddressZero
      ? chainInfo?.nativeCurrency?.symbol
      : erc20Symbol) as CryptoSymbol,
    tokenMetadataUri,
    tokenMetadata,
    tokenMetadataLoading,
  });
};
