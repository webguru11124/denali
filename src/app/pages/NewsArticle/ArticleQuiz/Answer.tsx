import { cx } from '@emotion/css';
import { FC } from 'react';

import AnswerContainer from './AnswerContainer';

interface AnswerProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const Answer: FC<AnswerProps> = ({ label, isSelected, onClick }) => (
  <AnswerContainer>
    <button
      type="button"
      className={cx(
        'w-full h-full py-4 text-sm text-left pl-4 rounded-lg border',
        {
          'border-gray-dark': !isSelected,
          'border-focus text-focus bg-focus-background': isSelected,
        }
      )}
      onClick={onClick}
    >
      <div>{label}</div>
    </button>
  </AnswerContainer>
);

export default Answer;
