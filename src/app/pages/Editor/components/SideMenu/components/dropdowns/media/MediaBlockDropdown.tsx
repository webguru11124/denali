import { useEditor } from '@craftjs/core';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { ReactComponent as GifBlockGradientIcon } from 'assets/icons/gif-block-gradient-icon.svg';
import { ReactComponent as ImageBlockGradientIcon } from 'assets/icons/image-block-gradient-icon.svg';
import { ReactComponent as VideoBlockGradientIcon } from 'assets/icons/video-block-gradient-icon.svg';
import { Gallery, VideoVertical, Unlimited } from 'iconsax-react';
import React from 'react';

import DropdownContainer from '../DropdownContainer';

import { MediaBlockOption, MediaBlockType } from './MediaBlockOption';

const MediaBlockDropdown = () => {
  const { selected: selectedProps } = useEditor((state) => {
    const [currentNodeId] = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
      };
    }

    return {
      selected,
    };
  });

  const { t } = useArticlesTranslation();

  return (
    <>
      {selectedProps?.name === 'GiphyBlock' ? (
        <div
          className="dropdown bg-white absolute rounded-xl shadow-atobi"
          role="presentation"
          onClick={(e) => e.stopPropagation()}
        >
          {selectedProps &&
            selectedProps.settings &&
            React.createElement(selectedProps.settings)}
        </div>
      ) : (
        <DropdownContainer>
          {selectedProps && selectedProps.settings ? (
            React.createElement(selectedProps.settings)
          ) : (
            <>
              <span className="flex text-lg text-grayscale-primary">
                {t('Media')}
              </span>
              <MediaBlockOption
                text={t('Image')}
                Icon={Gallery}
                GradientIcon={ImageBlockGradientIcon}
                type={MediaBlockType.Image}
              />
              <MediaBlockOption
                text={t('Video')}
                Icon={VideoVertical}
                GradientIcon={VideoBlockGradientIcon}
                type={MediaBlockType.Video}
              />
              <MediaBlockOption
                text={t('Gif')}
                Icon={Unlimited}
                GradientIcon={GifBlockGradientIcon}
                type={MediaBlockType.Gif}
              />
            </>
          )}
        </DropdownContainer>
      )}
    </>
  );
};

export default MediaBlockDropdown;
