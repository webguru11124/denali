import { ApiFile } from 'app/api/types';
import { Input, Button, Gallery } from 'app/components';
import { missionActivityAnswerSchema } from 'app/form/validation';
import { useMissionsTranslation } from 'app/internationalization/hooks';
import React, { useState } from 'react';

import ActivityControls from '../../ActivityControls';
import TitleAndContent from '../TitleAndContent';

import QuestionAnswers from './QuestionAnswers';
import usePostAnswerMutation from './usePostAnswerMutation';

interface QuestionProps {
  id: number;
  isAnswered: boolean;
  name: string;
  content: string;
  files?: Array<ApiFile>;
  missionId: number;
}

const Question: React.FC<QuestionProps> = ({
  id,
  isAnswered,
  name,
  files,
  missionId,
  content,
}) => {
  const [answer, setAnswer] = useState('');
  const { t } = useMissionsTranslation();
  const errors = missionActivityAnswerSchema.safeParse({ answer });
  const { mutate: postAnswer, isLoading } = usePostAnswerMutation(
    id,
    missionId
  );

  const handleSubmit = () => {
    if (errors.success && !isLoading) {
      postAnswer({ answer });
    }
  };

  return (
    <div>
      <TitleAndContent name={name} content={content} id={id} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {files && (
          <div className="mt-3">
            <Gallery files={files} />
          </div>
        )}

        {!isAnswered && (
          <>
            <p className="text-lg text-grayscale-primary mt-4">{t('Answer')}</p>
            <Input
              className="mt-2 border border-gray-light rounded-lg"
              placeholder={`${t('Type your answer...')}`}
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              name="answer"
            />

            <div className="row mt-12">
              <div className="col-6 offset-3">
                <Button
                  variant="primary"
                  className="disabled:bg-gray-light disabled:text-grayscale-secondary disabled:border-0"
                  disabled={!errors.success || isLoading}
                  type="submit"
                >
                  {t('Post your answer')}
                </Button>
              </div>
            </div>
          </>
        )}
      </form>
      <QuestionAnswers isAnswered={isAnswered} />
      {isAnswered && <ActivityControls activityId={id} />}
    </div>
  );
};

export default Question;
