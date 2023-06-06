import { useEditor, useNode } from '@craftjs/core';
import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { PageLoader } from 'app/components';
import config from 'app/config';
import { Add } from 'iconsax-react';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

import { useChannelsContext } from '../context';

const Container = styled.div`
  transition: width 0.2s;
  .image {
    transition: width 0.2s;
  }
`;

const GradientContainer = styled(Container)`
  background: linear-gradient(268.13deg, #8b769d33 -2.04%, #e2c3bd33 94.23%);
`;

const NewChannelItem: FC<Props> = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSource, setImageSource] = useState('');
  const isSelected = useRef(false);

  const {
    newChannel,
    selectFormType,
    isImageUploading,
    hasChanges,
    movedBlock,
  } = useChannelsContext();
  const {
    connectors: { connect },
    selected,
  } = useNode((node) => ({
    selected: node?.events?.selected,
    nodeId: node.id,
  }));

  const { selectedNodeId } = useEditor((state) => ({
    selectedNodeId: state.events.selected,
  }));

  const getTitle = useCallback(() => {
    const defaultLang = Object.keys(newChannel.title).find(
      (e) => newChannel.title[e].isDefault
    );
    if (defaultLang) return newChannel.title[defaultLang].title;
    else return newChannel.title[Object.keys(newChannel.title)[0]].title;
  }, [newChannel.title]);

  const hasData = !!(newChannel.coverImage?.url || getTitle());
  const Wrapper =
    !hasData && !isSelected.current ? GradientContainer : Container;

  useEffect(() => {
    if (newChannel.coverImage?.file) {
      const src = URL.createObjectURL(newChannel.coverImage.file);
      setImageSource(src);

      return () => URL.revokeObjectURL(src);
    }
  }, [newChannel]);

  useEffect(() => {
    selectedNodeId.forEach((selectedId) => {
      if (selectedId) {
        isSelected.current = selected;
      }
    });
  }, [selected, selectedNodeId]);

  return (
    <Container
      ref={(ref) => ref && connect(ref)}
      className={cx('rounded-2xl rounded-bl-xs p-[1px] ', {
        '-mb-8': !isSelected.current,
        'w-full bg-gradient-to-r from-focus to-pink -mb-12': isSelected.current,
        'opacity-50 pointer-events-none': !!hasChanges && !!movedBlock,
      })}
    >
      <Wrapper
        onClick={() => selectFormType('new')}
        className={cx(
          'flex justify-between overflow-hidden rounded-2xl rounded-bl-xs bg-white relative h-min items-stretch',
          {
            'w-[calc(100%-1.5rem)] border-white shadow-atobi':
              !isSelected.current,
            'w-full': isSelected.current,
          }
        )}
      >
        <div
          className={cx('flex grow p-4 items-center flex-1 content pt-6', {
            'pb-14': !isSelected.current,
            'pb-18': isSelected.current,
          })}
        >
          <div>
            <div
              className={cx('w-7 flex items-center justify-center', {
                'opacity-0': hasData || isSelected.current,
                'opacity-100': !hasData && !isSelected.current,
              })}
            >
              <Add color={config.colors['grayscale-secondary']} />
            </div>
          </div>

          <div className="px-4 py-2 pl-5 w-[65%]">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold leading-5">
                {getTitle() || 'New Channel'}
              </h4>
            </div>
          </div>
        </div>

        {(hasData || isSelected.current) && (
          <div
            className={cx(
              'image relative overflow-hidden flex items-center justify-center bg-hover-blue',
              {
                'w-[calc((100%-1.5rem)/100*30+1.5rem)]': isSelected.current,
                'w-[30%]': !isSelected.current,
              }
            )}
          >
            {isImageUploading && !hasLoaded && !hasError && (
              <div className="w-[80%] h-[48px]">
                <PageLoader />
              </div>
            )}
            {newChannel.coverImage?.url && (
              <img
                className={cx('object-cover h-full w-full absolute', {
                  hidden: (!hasLoaded && !hasError) || hasError,
                })}
                src={imageSource}
                alt={newChannel.coverImage?.name}
                onLoad={() => {
                  setHasLoaded(true);
                  setHasError(false);
                }}
                onError={() => setHasError(true)}
              />
            )}
          </div>
        )}
      </Wrapper>
    </Container>
  );
};

interface Props {
  children?: React.ReactNode;
}

export default NewChannelItem;
