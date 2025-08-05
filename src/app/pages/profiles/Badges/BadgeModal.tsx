import { css, cx } from '@emotion/css';
import styled from '@emotion/styled';
import { Modal, LockedContent, HtmlContent } from 'app/components';
import { useProfileTranslation } from 'app/internationalization/hooks';
import { FC } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import CloseIcon from 'remixicon-react/CloseLineIcon';

interface BadgeModalProps {
  onClose: () => void;
  srcSet: string;
  contentSrcSet?: string;
  title: string;
  description: string;
  isLocked: boolean;
}

const IMAGE_HEIGHT = 423;
const MODAL_HEIGHT = 620;
const MODAL_WIDTH = '450px';

const Image = styled.img`
  height: ${IMAGE_HEIGHT}px;
`;

const ContentImage = styled.img`
  height: 125px;
`;

const DescriptionContainer = styled.div`
  max-width: ${MODAL_WIDTH};
  min-height: ${MODAL_HEIGHT - IMAGE_HEIGHT}px;
  * {
    max-width: 400px;
  }
`;

const BadgeModal: FC<BadgeModalProps> = ({
  onClose,
  srcSet,
  title,
  description,
  isLocked,
  contentSrcSet,
}) => {
  const { t } = useProfileTranslation();

  return (
    <Modal
      className={cx(
        'relative overflow-y-auto overflow-x-hidden',
        css`
          padding: 0px !important;
          width: ${MODAL_WIDTH} !important;
          height: ${MODAL_HEIGHT}px !important;
        `
      )}
      onClose={onClose}
    >
      <Scrollbars height={MODAL_HEIGHT}>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-0 top-0 z-30"
        >
          <CloseIcon className="h-10 w-10 text-white mt-2 mr-2" />
        </button>
        <LockedContent
          iconClassName={css`
            width: 103px !important;
          `}
          className="rounded-lg"
          label={
            <div className="text-center px-16 mt-5">
              <p className="text-2xl font-bold mb-6">
                {t("You haven't unlocked this badge yet.")}
              </p>
              <HtmlContent isMarkdown content={description} />
            </div>
          }
          isLocked={isLocked}
        >
          <div className="flex flex-col text-center">
            <Image
              className="object-cover rounded-t-lg"
              srcSet={srcSet}
              alt="Badge"
            />
            <DescriptionContainer className="px-6 flex flex-col items-center justify-center overflow-x-contain py-6">
              <p className="text-grayscale-primary text-xl font-bold">
                {title}
              </p>
              {contentSrcSet && (
                <ContentImage
                  className="my-6 rounded-lg w-full object-cover"
                  srcSet={contentSrcSet}
                  alt={title}
                />
              )}
              <HtmlContent
                isMarkdown
                content={description}
                className="text-grayscale-secondary"
              />
            </DescriptionContainer>
          </div>
        </LockedContent>
      </Scrollbars>
    </Modal>
  );
};

export default BadgeModal;
