import { cx } from '@emotion/css';
import { useTranslations } from 'app/hooks';
import React, { useEffect } from 'react';
import CheckIcon from 'remixicon-react/CheckLineIcon';
import CloseIcon from 'remixicon-react/CloseCircleLineIcon';
interface AnswerProps {
  answer: string;
  isSelected: boolean;
  isQuizFinished: boolean;
  isCorrect: boolean;
  onClick: () => void;
}

interface AnswerIconProps {
  isSelected: boolean;
  isQuizFinished: boolean;
  isCorrect: boolean;
}

const getButtonClassName = (
  isSelected: boolean,
  isQuizFinished: boolean,
  isCorrect: boolean
): string => {
  if (isQuizFinished) {
    if (isSelected) {
      return isCorrect
        ? 'border-success bg-success-background'
        : 'border-error bg-error-light';
    }
  }

  if (isSelected) {
    return 'bg-focus-background border-focus';
  }

  return 'bg-light border-gray-dark';
};

const AnswerIcon: React.FC<AnswerIconProps> = ({
  isCorrect,
  isQuizFinished,
  isSelected,
}) => {
  if (!isQuizFinished) {
    return (
      <div className="w-6 h-6 p-0.5 rounded-sm border border-grayscale-primary">
        {isSelected && <div className="rounded-sm bg-focus w-full h-full" />}
      </div>
    );
  }

  return isCorrect ? (
    <CheckIcon className="text-success" />
  ) : (
    <CloseIcon className="text-error" />
  );
};

const Answer: React.FC<AnswerProps> = ({
  answer,
  onClick,
  isSelected,
  isQuizFinished,
  isCorrect,
}) => (
  <button
    type="button"
    className={cx(
      'w-full border rounded-lg mb-2 flex items-center pl-4 py-3',
      getButtonClassName(isSelected, isQuizFinished, isCorrect)
    )}
    onClick={onClick}
  >
    <div className="mr-4">
      <AnswerIcon
        isCorrect={isCorrect}
        isQuizFinished={isQuizFinished}
        isSelected={isSelected}
      />
    </div>
    <div>{answer}</div>
  </button>
);

export default Answer;
