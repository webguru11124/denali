import { useEditor } from '@craftjs/core';
import { cx, css } from '@emotion/css';
import styled from '@emotion/styled';
import useUpdateChannelMutation from 'app/api/channels/hooks/useUpdateChannelMutationQuery';
import orderIcon from 'assets/icons/order-info.png';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useChannelsContext } from '../context';

const Container = styled.div`
  animation-iteration-count: infinite;
  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(3px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-6px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(6px, 0, 0);
    }
  }
`;

const ActionButton = styled.button``;

const OrderInfo = () => {
  const { hasChanges, setHasChanges, movedBlock, setMovedBlock } =
    useChannelsContext();

  const { mutate: updateChannel, isLoading: isUpdateLoading } =
    useUpdateChannelMutation();

  const {
    getNodes,
    actions: {
      history: { undo },
    },
    nodes,
  } = useEditor((state, query) => ({
    getNodes: query.getNodes,
    nodes: state.nodes.dropableRegion?.data?.nodes ?? [],
  }));

  const [wasConfirmed, setWasConfirmed] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [shake, setShake] = useState(false);

  const getNodeByIndex = useCallback(
    (key: string) => getNodes()[key].data.props,
    [getNodes]
  );

  const updateChannelsRanking = useCallback(() => {
    if (!movedBlock) return;
    const nodeIndex = nodes.findIndex((e) => e === movedBlock);
    const blocks = getNodes()[movedBlock].data.props.data;

    let newRanking = 0;
    if (nodeIndex === 0) {
      const neighbourRanking: number = getNodeByIndex(nodes[1]).data.ranking;
      newRanking = neighbourRanking + 1;
    } else if (nodeIndex === nodes.length - 1) {
      const neighbourRanking: number = getNodeByIndex(nodes[nodes.length - 2])
        .data.ranking;
      newRanking = neighbourRanking - 1;
    } else {
      const upNeighbourRanking: number = getNodeByIndex(nodes[nodeIndex - 1])
        .data.ranking;
      const downNeighbourRanking: number = getNodeByIndex(nodes[nodeIndex + 1])
        .data.ranking;
      newRanking = (upNeighbourRanking + downNeighbourRanking) / 2;
    }

    updateChannel({
      ...blocks,
      ranking: newRanking,
    });
  }, [getNodeByIndex, getNodes, movedBlock, nodes, updateChannel]);

  const onConfirm = useCallback(() => {
    setHasChanges(false);
    setWasConfirmed(true);
    updateChannelsRanking();
    setTimeout(() => {
      setHidden(true);
      setWasConfirmed(false);
      toast.dismiss();
    }, 2000);
  }, [setHasChanges, updateChannelsRanking]);

  useEffect(() => {
    const isHidden = !(movedBlock && hasChanges);
    setHidden(isHidden);
  }, [hasChanges, movedBlock]);

  useEffect(() => {
    const unsubscribe = document.addEventListener('click', (e) => {
      if (!e.target) return;
      const target = e.target as unknown as { id: string };
      if (target.id === 'channelsContainer') {
        setShake(true);
        setTimeout(() => {
          setShake(false);
        }, 1000);
      }
    });
    return unsubscribe;
  }, []);

  if (wasConfirmed)
    return (
      <Container className=" bg-grayscale-primary text-white py-3 px-6 rounded-lg">
        The order of channels was changed
      </Container>
    );

  return (
    <Container
      className={cx(
        'flex flex-row items-center font-lato bg-white rounded-lg p-4 gap-4  place-self-center border-[1px] border-focus shadow-atobi drop-shadow-lg',
        {
          hidden,
        },
        css(shake ? `animation: shake 0.5s` : '')
      )}
    >
      <div>
        <img src={orderIcon} alt="order-icon" />
      </div>
      <div className="grow">
        <h4 className="font-semibold leading-5 text-black">
          Change order of the channels for everyone?
        </h4>
        <p className="text-grayscale-secondary text-sm ">
          The order of channels will change for everyone in the mobile & web
          app.
        </p>
      </div>

      <div className="h-full flex">
        <ActionButton className="px-4 text-focus font-bold" onClick={onConfirm}>
          Confirm
        </ActionButton>
        <ActionButton
          className="px-4 text-grayscale-secondary font-bold"
          onClick={() => {
            setMovedBlock(undefined);
            undo();
            toast.dismiss();
          }}
        >
          Cancel
        </ActionButton>
      </div>
    </Container>
  );
};

export default OrderInfo;
