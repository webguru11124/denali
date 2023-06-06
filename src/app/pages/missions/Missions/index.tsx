import { cx } from '@emotion/css';
import { PageLoader, Container, SearchInput, Feature } from 'app/components';
import { useMissionsTranslation } from 'app/internationalization/hooks';
import { routes, constants } from 'app/router';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

import MissionsEmpty from '../MissionsEmpty';
import MissionTags from '../MissionTags';
import useCategoriesState from '../useCategoriesState';
import useMissionTagsQuery from '../useMissionTagsQuery';

import MissionsInProgress from './MissionsInProgress';
import MissionsList from './MissionsList';
import useActiveMissionsQuery from './useActiveMissionsQuery';
import useCompletedMissionsQuery from './useCompletedMissionsQuery';
import useNewMissionsQuery from './useNewMissionsQuery';

const Missions = () => {
  const [selectedTags, setSelectedTags] = useCategoriesState();
  const [searchValue, setSearchValue] = useState('');
  const { t } = useMissionsTranslation();
  const [debouncedValue] = useDebounce(searchValue, 500);
  const { data: tags, isLoading: isTagsLoading } = useMissionTagsQuery();
  const { data: newMissions, isLoading: isNewMissionsLoading } =
    useNewMissionsQuery(debouncedValue, selectedTags);
  const { data: completedMissions, isLoading: isCompletedMissionsLoading } =
    useCompletedMissionsQuery(debouncedValue, selectedTags);
  const { data: activeMissions, isLoading: isActiveMissionsLoading } =
    useActiveMissionsQuery(debouncedValue, selectedTags);
  const history = useHistory();

  if (!tags || isTagsLoading) {
    return <PageLoader />;
  }

  const hasActiveMissions = Boolean(activeMissions?.length);
  const hasNewMissions = Boolean(newMissions?.length);
  const hasCompletedMissions = Boolean(completedMissions?.length);

  const hasNoMissionsAndIsNotLoading =
    !hasActiveMissions &&
    !hasNewMissions &&
    !hasCompletedMissions &&
    !isNewMissionsLoading &&
    !isCompletedMissionsLoading &&
    !isActiveMissionsLoading;

  const totalMissionsCount =
    (newMissions?.length || 0) +
    (completedMissions?.length || 0) +
    (activeMissions?.length || 0);

  const isMissionsLoading =
    isNewMissionsLoading ||
    isCompletedMissionsLoading ||
    isActiveMissionsLoading;

  return (
    <div className="flex flex-col items-center justify-center mt-8 pb-21">
      <Container>
        <div className="row">
          <div className="col-6">
            <SearchInput
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              onClear={() => setSearchValue('')}
            />
            {Boolean(searchValue.length) && (
              <p className="text-xs text-grayscale-secondary my-2">
                {t('Results found', {
                  count: totalMissionsCount,
                })}
              </p>
            )}
          </div>

          <div className={cx(!searchValue.length && 'mt-8')}>
            <MissionTags
              selectedTags={selectedTags}
              onTagClick={setSelectedTags}
              tags={tags}
            />
          </div>
          {isMissionsLoading ? <PageLoader /> : null}
          {hasActiveMissions && (
            <div className="mt-5">
              <MissionsInProgress
                isLoading={isActiveMissionsLoading}
                onLabelClick={() => {
                  history.push(
                    routes.missionsList.create(
                      constants.missionListTypes.active
                    )
                  );
                }}
                missions={activeMissions || []}
              />
            </div>
          )}
        </div>
      </Container>
      {hasNoMissionsAndIsNotLoading ? (
        <MissionsEmpty />
      ) : (
        <>
          {hasNewMissions && (
            <div className="mt-12">
              <MissionsList
                onLabelClick={() =>
                  history.push(
                    routes.missionsList.create(constants.missionListTypes.new)
                  )
                }
                isLoading={isNewMissionsLoading}
                label={t('Not Started')}
                missions={newMissions || []}
              />
            </div>
          )}
          {hasCompletedMissions && (
            <div className="mt-12">
              <MissionsList
                isLoading={isCompletedMissionsLoading}
                onLabelClick={() =>
                  history.push(
                    routes.missionsList.create(
                      constants.missionListTypes.completed
                    )
                  )
                }
                label={t('Completed')}
                missions={completedMissions || []}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

const FeaturedMissions = () => (
  <Feature feature="missions" activeComponent={Missions} />
);

export default FeaturedMissions;
