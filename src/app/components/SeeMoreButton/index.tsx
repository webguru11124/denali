import styled from '@emotion/styled';
import { useComponentsTranslation } from 'app/internationalization/hooks';
import { FC } from 'react';
import ArrowRightIcon from 'remixicon-react/ArrowRightSLineIcon';

const Button = styled.button`
  :hover {
    .see_all {
      opacity: 1;
      margin-left: 49px;
      width: auto;
    }
  }
`;

interface SeeMoreButtonProps {
  label: string;
  onClick: () => void;
  seeMoreLabel?: string;
}

const SeeMoreButton: FC<SeeMoreButtonProps> = ({
  onClick,
  label,
  seeMoreLabel,
}) => {
  const { t } = useComponentsTranslation();

  const getLabel = () => {
    if (seeMoreLabel) {
      return seeMoreLabel;
    }

    return t('See all');
  };
  return (
    <Button
      onClick={onClick}
      type="button"
      className="text-lg flex items-center justify-center text-black border-b border-gray-light mr-auto"
    >
      {label}{' '}
      <span className="transition-all duration-300 whitespace-nowrap opacity-0 w-0 text-xs see_all">
        {getLabel()}
      </span>
      <ArrowRightIcon className="w-5 h-5 text-grayscale-secondary" />
    </Button>
  );
};
export default SeeMoreButton;
