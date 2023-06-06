import { ActivityStatus, ActivityTypes } from 'app/api/missions/constants';
import { useMissionActivityQuery } from 'app/api/missions/hooks';
import { SeriesActivity } from 'app/api/missions/types';
import {
  Container,
  PageLoader,
  HeaderImageContainer,
  ProgressBar,
  OpenableButton,
  Spinner,
  Feature,
} from 'app/components';
import { useRouteId } from 'app/hooks';
import { useMissionsTranslation } from 'app/internationalization/hooks';
import { routes } from 'app/router';
import { selectDefinedImageSource } from 'app/utils';
import { lazy, Suspense, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LightbulbFlashLineIcon from 'remixicon-react/LightbulbFlashLineIcon';

import useActivityCompleted from '../useActivityCompleted';
import useMissionQuery from '../useMissionQuery';

const LazyFiles = lazy(() => import('./Files'));
const LazyQuiz = lazy(() => import('./Quiz'));
const LazyQuestion = lazy(() => import('./Question'));
const LazySimple = lazy(() => import('./Simple'));

const ALLOWED_ACTIVITY_STATUSES = [
  ActivityStatus.active,
  ActivityStatus.completed,
];

const MissionActivity = () => {
  const id = useRouteId();
  const missionId = useRouteId('missionId');

  if (typeof id === 'string') throw new Error('Activity ID should be numeric');
  if (typeof missionId === 'string')
    throw new Error('Mission ID should be numeric');
  const { t } = useMissionsTranslation();
  const history = useHistory();
  const { data: activity, isLoading } = useMissionActivityQuery(id);
  const { data: mission } = useMissionQuery(missionId);

  const onCompletedActivityClick = useActivityCompleted(
    id,
    activity?.nextId,
    activity?.missionId
  );

  useEffect(() => {
    if (!mission) return undefined;

    // Reduce activities into single array
    // and find current activity
    const currentActivity = mission.series
      .reduce<Array<SeriesActivity>>(
        (acc, { activities }) => [...acc, ...activities],
        []
      )
      .find(({ id: activityId }) => activityId === id);

    if (
      !currentActivity ||
      !ALLOWED_ACTIVITY_STATUSES.includes(currentActivity?.completed)
    ) {
      history.replace(routes.mission.create(missionId));
    }

    return undefined;
  }, [activity, history, id, mission, missionId]);
  if (!activity || isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex justify-center mt-8 mb-8">
      <Container>
        <div className="shadow-atobi rounded-lg pb-12">
          <HeaderImageContainer className="rounded-t-lg relative flex items-center justify-center bg-pink">
            {activity.logoResponsive ? (
              <img
                className="rounded-t-lg w-full h-full object-cover"
                {...selectDefinedImageSource({
                  srcSet: activity.logoResponsive.sizes,
                  src: activity.logoResponsive.url,
                })}
                alt={activity.name}
              />
            ) : (
              <LightbulbFlashLineIcon className="text-white w-8 h-8" />
            )}
            <div className="absolute top-0 right-0 pt-4 pr-5">
              <OpenableButton
                label={t('Quit the Activity')}
                onClick={() =>
                  history.push(routes.mission.create(activity.missionId))
                }
              />
            </div>
          </HeaderImageContainer>
          <div className="row mt-6">
            <div className="col-10 offset-1 ">
              <div className="border-b border-gray-light pb-6">
                <ProgressBar
                  completion={activity.completedActivities}
                  stepsAmount={activity.totalActivities}
                />
              </div>
            </div>
          </div>

          <div className="row mt-12">
            <div className="col-10 offset-1">
              <Suspense fallback={<Spinner />}>
                {(() => {
                  switch (activity.typeId) {
                    case ActivityTypes.files:
                      return (
                        <LazyFiles
                          name={activity.name}
                          content={activity.content}
                          files={activity.files}
                          activityId={activity.id}
                          onCompletedActivityClick={onCompletedActivityClick}
                          completed={activity.completed}
                        />
                      );
                    case ActivityTypes.quiz:
                      return (
                        <LazyQuiz
                          id={id}
                          missionId={activity.missionId}
                          name={activity.name}
                          content={activity.content}
                          files={activity.files}
                          completed={activity.completed}
                          answers={activity.answers}
                          isLooped={activity.loop}
                        />
                      );
                    case ActivityTypes.question:
                      return (
                        <LazyQuestion
                          // For some reason API returns []
                          // if question is not answered
                          isAnswered={!Array.isArray(activity.userAnswer)}
                          name={activity.name}
                          files={activity.files}
                          missionId={activity.missionId}
                          content={activity.content}
                          id={id}
                        />
                      );
                    case ActivityTypes.simple:
                      return (
                        <LazySimple
                          files={activity.files}
                          name={activity.name}
                          content={String(activity.content)}
                          onCompletedActivityClick={onCompletedActivityClick}
                          activityId={id}
                          completed={
                            activity.completed === ActivityStatus.completed
                          }
                        />
                      );
                    default:
                      return null;
                  }
                })()}
              </Suspense>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const FeaturedMissionActivity = () => (
  <Feature feature="missions" activeComponent={MissionActivity} />
);

export default FeaturedMissionActivity;
