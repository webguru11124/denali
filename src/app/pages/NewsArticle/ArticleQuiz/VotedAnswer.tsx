import { css, cx } from '@emotion/css';
import { FC } from 'react';

import AnswerContainer from './AnswerContainer';

interface VotedAnswerProps {
  percent: string;
  label: string;
  selectedByMe: boolean;
}

const VotedAnswer: FC<VotedAnswerProps> = ({
  percent,
  label,
  selectedByMe,
}) => (
  <AnswerContainer
    className={cx('relative border overflow-hidden px-4 rounded-lg', {
      'border-focus-background': selectedByMe,
      'border-success-background': !selectedByMe,
    })}
  >
    <div className="z-20 relative h-full flex w-full items-center">
      <div>
        <div>{label}</div>
        {selectedByMe && (
          <div className="text-xs text-grayscale-secondary">You</div>
        )}
      </div>
      <div className="ml-auto">{percent}</div>
    </div>
    <div
      className={cx(
        'absolute py-4 top-0 left-0 h-full z-10',
        {
          'bg-success-background': !selectedByMe,
          'bg-focus-background': selectedByMe,
        },
        css`
          width: ${percent};
        `
      )}
    />
  </AnswerContainer>
);

export default VotedAnswer;
