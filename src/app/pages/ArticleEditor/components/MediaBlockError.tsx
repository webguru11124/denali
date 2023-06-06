import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { Danger } from 'iconsax-react';

interface MediaBlockErrorProps {
  fileId?: string;
  error?: string;
  isCover?: boolean;
  onDoubleClick?: VoidFunction;
}

const MediaBlockError = ({
  fileId = '',
  isCover = false,
  error,
  onDoubleClick,
}: MediaBlockErrorProps) => {
  const { t } = useArticlesTranslation();
  return (
    <StyledContainer
      isCover={isCover}
      className={cx(
        'flex items-center py-4 px-4 w-full text-grayscale-secondary rounded-lg',
        {
          'flex-col justify-center h-[385px] bg-gray-light rounded-b-[0px]':
            isCover,
          'justify-start bg-grayscale-bg-dark': !isCover,
        }
      )}
      onDoubleClick={() => onDoubleClick?.()}
    >
      <Danger
        size={isCover ? 100 : 30}
        className="text-grayscale-secondary"
        variant="Linear"
      />
      <div
        className={cx('flex flex-col', {
          'ml-3': !isCover,
          'items-center': isCover,
        })}
      >
        <span className="text-base mt-1">
          {error ?? t('File not available. Try uploading it again')}
        </span>
        <span className="text-xs mt-1">File ID: {fileId}</span>
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  ${({ isCover }: { isCover: boolean }) => {
    if (isCover) return;

    return `
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%23333' stroke-width='1' stroke-dasharray='10%2c 10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 12px;
    `;
  }}
`;
export default MediaBlockError;
