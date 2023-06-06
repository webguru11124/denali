import { useEditor, useNode } from '@craftjs/core';
import { cx, css } from '@emotion/css';
import styled from '@emotion/styled';
import { ArrowPopup, PageLoader } from 'app/components';
import config from 'app/config';
import dragArea from 'assets/icons/drag.svg';
import { ArrowDown, ArrowUp, Gallery, Refresh } from 'iconsax-react';
import moment from 'moment';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Popover } from 'react-tiny-popover';
import { BasicChannelInfo } from 'submodules/common-ui/generated/api/gcs';

import { useChannelsContext } from '../context';
import useImageSource from '../hooks/useCoverImage';

const Wrapper = styled.div`
  box-shadow: 0px 0px 15px rgba(115, 117, 186, 0.08);
  transition: width 0.2s;
  .image {
    transition: width 0.2s;
  }
`;

const Container = styled.div`
  &:last-child {
    > div {
      border-bottom-left-radius: 32px;
      margin-bottom: 0px !important;
    }
    div.content {
      padding-bottom: 1.5rem !important;
      padding-top: 1.5rem !important;
    }
  }
`;

const ChannelItem: FC<ChannelItemProps> = ({ data }) => {
  const { setSelectedChannel, selectFormType } = useChannelsContext();
  const [moveHovered, setMoveHovered] = useState(false);
  const isSelected = useRef(false);
  const {
    id,
    connectors: { drag, connect },
    selected,
  } = useNode((node) => ({
    selected: node?.events?.selected,
  }));

  const {
    currentQuery,
    selectedNodeId,
    actions: { move },
  } = useEditor((state, query) => ({
    currentQuery: query,
    selectedNodeId: state.events.selected,
  }));

  const { hasError, hasLoaded, imageSource, setHasError, setHasLoaded } =
    useImageSource(data.coverImage);

  const moveBlock = (to: 'up' | 'down') => {
    const nodes = currentQuery.getNodes().dropableRegion.data.nodes;

    const currentRegion = nodes.findIndex((node) => node === id);

    if (currentRegion !== -1) {
      if (to === 'up') {
        if (currentRegion === 0) return;
        move(String(id), 'dropableRegion', currentRegion - 1);
      } else {
        const indexToMove =
          currentRegion > nodes.length - 1 ? currentRegion : currentRegion + 1;
        const nodeToMove = nodes[indexToMove];
        move(nodeToMove, 'dropableRegion', indexToMove - 1);
      }
    }
  };

  useEffect(() => {
    selectedNodeId.forEach((selectedId) => {
      if (selectedId) {
        isSelected.current = selected;
      }
    });
  }, [selected, selectedNodeId]);

  const getTitle = useCallback(() => {
    const defaultLang = Object.keys(data.title).find(
      (e) => data.title[e].isDefault
    );
    if (defaultLang) return data.title[defaultLang].title;
    else return data.title[Object.keys(data.title)[0]].title;
  }, [data.title]);

  return (
    <Container
      ref={(ref) => ref && connect(ref)}
      className={cx('rounded-2xl rounded-bl-xs ', {
        '-mb-8': !isSelected.current,
        'w-full -mb-12': isSelected.current,
      })}
    >
      <Wrapper
        onClick={() => {
          setSelectedChannel(data);
          selectFormType('edit', data);
        }}
        className={cx(
          'flex justify-between p-[1px] overflow-hidden rounded-2xl rounded-bl-xs bg-white relative h-min items-stretch',
          {
            'w-[calc(100%-1.5rem)] border-white shadow-atobi':
              !isSelected.current,
            'w-full bg-gradient-to-r from-focus to-pink': isSelected.current,
          }
        )}
      >
        <div
          className={cx(
            'flex grow items-center flex-1 p-4 content bg-white rounded-l-2xl rounded-bl-xs',
            {
              'pb-10': !isSelected.current,
              'pb-14 ': isSelected.current,
            }
          )}
        >
          <div
            onFocus={() => setMoveHovered(true)}
            onMouseOver={() => setMoveHovered(true)}
            onMouseLeave={() => setMoveHovered(false)}
          >
            <Popover
              isOpen={moveHovered}
              positions={['bottom']}
              containerClassName="z-999"
              content={() => {
                return (
                  <ArrowPopup
                    className={css`
                      margin-left: 70px;
                      margin-top: 10px;
                      width: 330px;
                    `}
                  >
                    Click on the arrows to move the channels up or down Drag to
                    move it freely
                  </ArrowPopup>
                );
              }}
            >
              <div
                className={cx(
                  'group left-4 z-10 translate-y-[-50%] absolute rounded-tl rounded-bl flex items-center justify-center flex-col gap-2 p-1 hover:bg-white hover:shadow-atobi',
                  {
                    'top-[calc(50%-0.5rem)]': isSelected.current,
                    'top-[50%]': !isSelected.current,
                  }
                )}
              >
                <ArrowUp
                  className="opacity-0 cursor-pointer group-hover:opacity-100"
                  color={config.colors['grayscale-secondary']}
                  size={24}
                  onClick={() => moveBlock('up')}
                />
                <div ref={(ref) => ref && drag(ref)}>
                  <img
                    className="opacity-70 cursor-pointer hover:opacity-100"
                    src={dragArea}
                    alt=""
                  />
                </div>
                <ArrowDown
                  className="opacity-0 cursor-pointer group-hover:opacity-100"
                  color={config.colors['grayscale-secondary']}
                  size={24}
                  onClick={() => moveBlock('down')}
                />
              </div>
            </Popover>
          </div>
          <div className="px-4 py-2 pl-12 w-[65%]">
            <div className="flex items-center gap-2">
              {data?.isDraft && (
                <Refresh size={18} color={config.colors.error} />
              )}
              <h4 className="font-semibold leading-5">
                {getTitle().length > 0 ? getTitle() : 'Channel Title'}
              </h4>
            </div>
            <span className="text-grayscale-secondary text-sm">
              Created: {moment(data.createdAt).format('DD.MM.YYYY')}
            </span>
          </div>
        </div>

        <div
          className={cx(
            'image relative overflow-hidden flex items-center justify-center bg-hover-blue rounded-r-2xl',
            {
              'w-[calc((100%-1.5rem)/100*30+1.5rem)]': isSelected.current,
              'w-[30%]': !isSelected.current,
            }
          )}
        >
          {!hasLoaded && !hasError && (
            <div className="w-[80%] h-[48px]">
              <PageLoader />
            </div>
          )}
          {imageSource && (
            <img
              className={cx('object-cover h-full w-full absolute', {
                hidden: (!hasLoaded && !hasError) || hasError,
              })}
              src={imageSource}
              alt={imageSource}
              onLoad={() => {
                setHasLoaded(true);
                setHasError(false);
              }}
              onError={() => setHasError(true)}
            />
          )}

          {(hasError || !imageSource) && (
            <div className="flex items-center justify-center bg-hover-blue text-focus">
              <Gallery size={36} />
            </div>
          )}
        </div>
      </Wrapper>
    </Container>
  );
};

export interface ChannelItemProps {
  data: BasicChannelInfo & { isDraft?: boolean };
}

export default ChannelItem;
