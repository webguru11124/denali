import { types } from 'app/api/missions';
import { ActivityStatus } from 'app/api/missions/constants';
import { ApiFile } from 'app/api/types';
import { Gallery, Button } from 'app/components';
import { useTranslations } from 'app/hooks';
import { useMissionsTranslation } from 'app/internationalization/hooks';
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import TitleAndContentBasic from '../TitleAndContentBasic';

import Answer from './Answer';
import QuizStats from './QuizStats';
import useLoopedQuizStats from './QuizStats/useLoopedQuizStats';
import useQuizStatsQuery from './QuizStats/useQuizStatsQuery';
import usePostQuizAnswerIncorrect from './usePostQuizAnswerIncorrectMutation';
import usePostQuizAnswer from './usePostQuizAnswerMutation';
import {
  isAnsweredCorrect as isAnsweredCorrectFunc,
  getCorrectAnswers,
} from './utils';

interface QuizProps {
  id: number;
  name: string;
  content: string;
  answers: Array<types.QuizAnswer>;
  files: Array<ApiFile>;
  completed: ActivityStatus;
  isLooped: boolean;
  missionId: number;
}

interface ToastProps {
  selectedAnswersAmount: number;
  allAnswersAmount: number;
  isCorrect: boolean;
  isLooped: boolean;
}

const Toast: React.FC<ToastProps> = ({
  selectedAnswersAmount,
  allAnswersAmount,
  isCorrect,
  isLooped,
}) => {
  const { t } = useMissionsTranslation();

  const getToastContent = (): string => {
    if (isCorrect) return t('Keep up the good work!');

    return isLooped ? t('Please, try again.') : '';
  };

  return (
    <div className="flex">
      <p className="font-bold mr-1 text-black">
        {t('{{count}}/{{total}} correct', {
          count: selectedAnswersAmount,
          total: allAnswersAmount,
        })}
      </p>
      <p className="text-black">{getToastContent()}</p>
    </div>
  );
};

const getUUIDs = (
  answers: Array<types.QuizAnswer> | Array<types.QuizStatsItem>
) => answers.map(({ uuid }) => uuid);

const Quiz: React.FC<QuizProps> = ({
  name,
  content,
  answers,
  id,
  completed,
  isLooped,
  missionId,
  files,
}) => {
  const [isFinished, setIsFinished] = useState(
    completed === ActivityStatus.completed
  );

  const { mutateAsync: postAnswer } = usePostQuizAnswer(id, missionId);
  const { mutate: postAnswerIncorrect } = usePostQuizAnswerIncorrect(id);
  const [selectedAnswers, setSelectedAnswers] = useState<Array<string>>([]);
  const { data: stats, refetch: refetchQuizStatsQuery } = useQuizStatsQuery(id);
  const { refetch: refetchLoopedQuizStats } = useLoopedQuizStats(id);
  const correctAnswers = getCorrectAnswers(answers);
  const isAnsweredCorrect = isAnsweredCorrectFunc(answers, selectedAnswers);
  const { t } = useMissionsTranslation();

  const refetchStats = useCallback(() => {
    if (isLooped) {
      refetchLoopedQuizStats();
    } else {
      refetchQuizStatsQuery();
    }
  }, [isLooped, refetchLoopedQuizStats, refetchQuizStatsQuery]);

  useEffect(() => {
    refetchStats();
  }, [refetchStats]);

  useEffect(() => {
    if (!isFinished || completed === ActivityStatus.completed) return undefined;

    return undefined;
  }, [
    completed,
    isAnsweredCorrect,
    isFinished,
    isLooped,
    postAnswer,
    postAnswerIncorrect,
    selectedAnswers,
    refetchStats,
  ]);

  const {
    translations: [translatedName, translatedContent, ...translatedAnswers],
    isTranslating,
    isTranslated,
    toggleTranslation,
  } = useTranslations(
    [name, content].concat(answers.map((item) => item.answer))
  );

  useEffect(() => {
    if (completed && stats && !selectedAnswers.length && !isLooped) {
      // If question is looped -> select correct answers, since looped questions have to be answered

      // If question is simple -> select the ones that were submitted

      setSelectedAnswers(
        getUUIDs(stats.answers.filter(({ selected }) => selected))
      );
      return;
    }

    if (completed && !selectedAnswers.length && isLooped) {
      setSelectedAnswers(getUUIDs(correctAnswers));
    }
  }, [completed, correctAnswers, isLooped, selectedAnswers.length, stats]);

  const handleFinish = async () => {
    if (selectedAnswers.length !== correctAnswers.length) {
      return;
    }

    const correctAnswersAmount = correctAnswers.filter(({ uuid }) =>
      selectedAnswers.includes(uuid)
    ).length;

    if (!isLooped || isAnsweredCorrect) {
      await postAnswer(selectedAnswers);
      refetchStats();
      setIsFinished(true);

      const toastComponent = (
        <Toast
          allAnswersAmount={correctAnswers.length}
          selectedAnswersAmount={correctAnswersAmount}
          isCorrect={isAnsweredCorrect}
          isLooped={isLooped}
        />
      );

      if (isAnsweredCorrect) {
        toast.success(toastComponent);
        return;
      }

      toast.error(toastComponent);
      return;
    }
    setSelectedAnswers([]);

    // Looped quiz is incorrect
    // Incorrect answers are posted
    postAnswerIncorrect(selectedAnswers);

    toast.error(
      <Toast
        allAnswersAmount={correctAnswers.length}
        selectedAnswersAmount={correctAnswersAmount}
        isCorrect={false}
        isLooped={isLooped}
      />
    );
  };

  return (
    <div>
      <TitleAndContentBasic
        id={id}
        name={translatedName}
        content={translatedContent}
        isTranslating={isTranslating}
        isTranslated={isTranslated}
        onTranslate={toggleTranslation}
      />
      <div className="mt-3">
        <Gallery files={files} />
      </div>
      <div className="mt-4 flex flex-col">
        {answers.map(({ uuid, answer, correct }, index) => (
          <Answer
            isCorrect={correct}
            isSelected={selectedAnswers.includes(uuid)}
            isQuizFinished={isFinished}
            onClick={() => {
              if (!isFinished) {
                setSelectedAnswers((prev) => {
                  if (prev.includes(uuid)) {
                    return prev.filter((filterVal) => filterVal !== uuid);
                  }

                  if (prev.length >= correctAnswers.length) return prev;

                  return [...prev, uuid];
                });
              }
            }}
            key={uuid}
            answer={translatedAnswers[index]}
          />
        ))}
      </div>
      {!isFinished && (
        <div className="row">
          <div className="col-6 offset-3 mt-18">
            <Button
              disabled={selectedAnswers.length !== correctAnswers.length}
              onClick={handleFinish}
              variant="primary"
              type="button"
            >
              {t('Answer {{count}} / {{total}}', {
                count: selectedAnswers.length,
                total: correctAnswers.length,
              })}
            </Button>
          </div>
        </div>
      )}
      <QuizStats isFinished={isFinished} />
    </div>
  );
};

export default Quiz;
