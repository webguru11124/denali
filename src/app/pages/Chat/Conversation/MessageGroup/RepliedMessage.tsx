import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { Message } from 'app/api/chat/types';
import React, { FC } from 'react';

interface Props {
  className?: string;
  isMe: boolean;
  reply: Omit<Message, 'reply'>;
}

const Container = styled.div`
  position: relative;
  bottom: -6px;
  z-index: -1;
`;

const ImageContainer = styled.div`
  width: 46px;
  height: 40px;
`;

const RepliedMessage: FC<Props> = (props) => {
  const { reply, className, isMe } = props;
  const { senderDisplayName, content, files } = reply;

  const containerStyles = {
    'bg-focus text-white': !isMe,
    'bg-gray text-grayscale-secondary': isMe,
  };

  return (
    <Container
      className={cx(
        'py-2 px-3 rounded-xl flex items-center',
        containerStyles,
        className
      )}
    >
      <div className="flex-1">
        {isMe && (
          <div className="line-clamp-1 font-bold text-xs">
            {senderDisplayName}
          </div>
        )}
        <div className="flex items-center">
          {!!content.message && (
            <span className="break-all text-sm w-full text-xs">
              {content.message}
            </span>
          )}
        </div>
      </div>
    </Container>
  );
};

export default RepliedMessage;
