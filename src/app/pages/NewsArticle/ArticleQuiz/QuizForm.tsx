import { PollAnswer } from 'app/api/news/types';
import { Button } from 'app/components';
import { isDefined } from 'app/utils';
import { FC, useState } from 'react';

import Answer from './Answer';
import usePostVoteMutation from './usePostVoteMutation';

interface QuizFormProps {
  articleId: number;
  answers: Array<PollAnswer>;
  pollId: number;
}

const QuizForm: FC<QuizFormProps> = ({ articleId, answers, pollId }) => {
  const [selectedAnswerId, setSelectedAnswerId] = useState<
    number | undefined
  >();
  const { mutate: postVote } = usePostVoteMutation(articleId);

  return (
    <>
      {answers.map(({ text, id }) => (
        <div key={id} className="mb-2">
          <Answer
            label={text}
            isSelected={selectedAnswerId === id}
            onClick={() => {
              setSelectedAnswerId((prev) => {
                if (prev === id) {
                  return undefined;
                }

                return id;
              });
            }}
          />
        </div>
      ))}
      <div className="row mt-4">
        <div className="col-6 offset-3">
          <Button
            disabled={!isDefined(selectedAnswerId)}
            type="button"
            variant="primary"
            onClick={() => {
              if (!selectedAnswerId) {
                throw new Error('[ArticleQuiz]: no selected answer');
              }

              postVote({ pollId, answerId: selectedAnswerId });
            }}
          >
            Answer
          </Button>
        </div>
      </div>
    </>
  );
};

export default QuizForm;
