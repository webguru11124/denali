import { PollAnswer } from 'app/api/news/types';
import { FC } from 'react';

import QuizForm from './QuizForm';
import VotedAnswer from './VotedAnswer';

interface ArticleQuizProps {
  answers: Array<PollAnswer>;
  pollId: number;
  votedAnswerId: number | null;
  articleId: number;
  isExpired: boolean;
  votedByMe: boolean;
}

const ArticleQuiz: FC<ArticleQuizProps> = ({
  answers,
  pollId,
  votedAnswerId,
  articleId,
  isExpired,
  votedByMe,
}) => {
  const renderContent = () => {
    if (!votedByMe && votedAnswerId === null && !isExpired) {
      return (
        <QuizForm pollId={pollId} answers={answers} articleId={articleId} />
      );
    }

    return (
      <>
        {answers.map(({ percent, text, id }) => (
          <div key={id} className="mb-2">
            <VotedAnswer
              selectedByMe={id === votedAnswerId}
              label={text}
              percent={`${percent}%`}
            />
          </div>
        ))}
      </>
    );
  };

  return <>{renderContent()}</>;
};

export default ArticleQuiz;
