import { cx } from '@emotion/css';
import styled from '@emotion/styled';

const ImageContainer = styled.div`
  height: 185px;
  overflow: hidden;
`;

const TitleContainer = styled.div`
  height: 95px;
`;

interface CardProps {
  logo: JSX.Element;
  label: string | JSX.Element;
  className?: string;
}

const Card = ({ logo, label, className }: CardProps) => (
  <div className={cx('w-full', className)}>
    <div className="shadow-atobi rounded-lg">
      <ImageContainer>{logo}</ImageContainer>
      <div className="px-2">
        <TitleContainer className="flex h-auto items-center justify-center">
          <span className="line-clamp-1">{label}</span>
        </TitleContainer>
      </div>
    </div>
  </div>
);

export default Card;
