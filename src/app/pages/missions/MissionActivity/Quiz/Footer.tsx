import { Button } from 'app/components';
import { useMissionsTranslation } from 'app/internationalization/hooks';
import React from 'react';

interface FooterProps {
  selectedAnswersAmount: number;
  correctAnswersAmount: number;
  onQuizFinished: () => void;
  // Quiz is finished, further actions are required
  isQuizDone: boolean;
  onNext: () => void;
}

const Footer: React.FC<FooterProps> = ({
  selectedAnswersAmount,
  correctAnswersAmount,
  onQuizFinished,
  onNext,
  isQuizDone,
}) => {
  const { t } = useMissionsTranslation();

  return !isQuizDone ? (
    <div className="row">
      <div className="col-6 offset-3 mt-18">
        <Button
          disabled={selectedAnswersAmount !== correctAnswersAmount}
          onClick={onQuizFinished}
          variant="primary"
          type="button"
        >
          {t('Answer {{count}} / {{total}}', {
            count: selectedAnswersAmount,
            total: correctAnswersAmount,
          })}
        </Button>
      </div>
    </div>
  ) : (
    <div className="row">
      <div className="col-6 offset-3 mt-18">
        <Button variant="primary" onClick={onNext}>
          {t('See ranking')}
        </Button>
      </div>
    </div>
  );
};

export default Footer;
