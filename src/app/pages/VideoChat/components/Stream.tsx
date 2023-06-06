import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import Spinner from 'app/components/Spinner';
import { FC } from 'react';
import MicOffIcon from 'remixicon-react/MicOffFillIcon';

const Avatar = styled.img`
  width: 150px;
  height: 150px;
`;

const PaddingHack = styled.div`
  padding-bottom: 100%;
`;

const Footer = styled.div`
  background: radial-gradient(
    40% 8131% at 49% 50%,
    rgba(0, 0, 0, 0.45) 26%,
    rgba(0, 0, 0, 0) 100%
  );
  backdrop-filter: blur(5px);
`;

interface Props {
  displayName: string;
  avatar?: string;
  videoContainerId: string;
  isMuted: boolean;
  isRendered: boolean;
  className?: string;
}

const Stream: FC<Props> = ({
  displayName,
  videoContainerId,
  isRendered,
  avatar,
  isMuted,
  className,
}) => {
  const renderContent = () => {
    if (!avatar) return <Spinner />;
    if (!isRendered)
      return <Avatar className="object-cover rounded-xl" src={avatar} />;
    return null;
  };

  return (
    <div
      className={cx(
        'w-full h-full relative rounded-xs bg-black flex items-center justify-center overflow-hidden',
        className
      )}
    >
      <div
        className={cx('w-full h-full', { hidden: !isRendered })}
        id={videoContainerId}
      />
      <PaddingHack />
      {renderContent()}
      <Footer className="flex z-10 items-center justify-center absolute left-0 right-0 bottom-0 p-3 rounded-xl">
        {isMuted && <MicOffIcon size={14} className="text-white mr-2" />}
        <span className="text-white text-base">{displayName}</span>
      </Footer>
    </div>
  );
};

export default Stream;
