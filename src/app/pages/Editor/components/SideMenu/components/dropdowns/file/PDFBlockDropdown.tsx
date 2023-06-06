import { useEditor } from '@craftjs/core';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { ReactComponent as DocumentTextGradientIcon } from 'assets/icons/document-text-icon.svg';
import { ReactComponent as DocumentTextIcon } from 'assets/icons/document-text.svg';
import React from 'react';

import DropdownContainer from '../DropdownContainer';

import { PDFBlockOption } from './PDFBlockOption';

const PDFBlockDropdown = () => {
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
    <DropdownContainer>
      {selectedProps && selectedProps.settings ? (
        React.createElement(selectedProps.settings)
      ) : (
        <>
          <span className="flex text-lg text-grayscale-primary">
            {t('PDF')}
          </span>
          <PDFBlockOption
            text={t('PDF')}
            Icon={DocumentTextIcon}
            GradientIcon={DocumentTextGradientIcon}
          />
        </>
      )}
    </DropdownContainer>
  );
};

export default PDFBlockDropdown;
