import { BareComponentProps } from '@flair-sdk/react-common';
import { BigNumberish } from 'ethers';
import { Fragment } from 'react';

import { useStreamShares } from '../hooks/useStreamShares';
import { useStreamTotalShares } from '../hooks/useStreamTotalShares';
import { useStreamContext } from '../providers/StreamProvider';

type Props = {
  ticketTokenIds?: BigNumberish[];
} & BareComponentProps;

export const StreamSharesAllocation = ({
  ticketTokenIds,
  as,
  ...attributes
}: Props) => {
  const {
    data: {
      env,
      chainId,
      contractAddress,
      selectedTicketTokenIds: accountTicketTokenIds,
    },
  } = useStreamContext();

  const {
    data: shares,
    isLoading: sharesLoading,
    error: sharesError,
  } = useStreamShares({
    env,
    chainId,
    contractAddress,
    args: {
      ticketTokenIds: ticketTokenIds || accountTicketTokenIds,
    },
  });

  const {
    data: totalShares,
    isLoading: totalSharesLoading,
    error: totalSharesError,
  } = useStreamTotalShares({
    chainId,
    contractAddress,
  });

  const sumOfShares =
    shares?.reduce<number>((acc, curr) => {
      return Number(acc) + Number(curr);
    }, 0) || 0;

  const Component =
    as || (attributes.className || attributes.style ? 'span' : Fragment);

  return (
    <Component {...attributes}>
      {sumOfShares?.toString()} / {totalShares?.toString()}
    </Component>
  );
};
