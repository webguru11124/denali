import { Container, Feature } from 'app/components';
import { useParams } from 'react-router-dom';

import MissionsCategories from '../MissionTags';
import useCategoriesState from '../useCategoriesState';
import useMissionTagsQuery from '../useMissionTagsQuery';

import Missions from './Missions';
import useCategorizedMissionsQuery from './useCategorizedMissionsQuery';

const MissionsList = () => {
  const { category = 'active' } = useParams<{
    category: 'active' | 'completed' | 'new';
  }>();
  const { data: tags } = useMissionTagsQuery();
  const [selectedTags, setSelectedTags] = useCategoriesState();

  const {
    data: missions,
    isLoading,
    meta,
    fetchNextPage,
  } = useCategorizedMissionsQuery(category, selectedTags);
  // TODO: add proper error handling

  return (
    <div className="flex justify-center mt-8 mb-16">
      <Container>
        <div>
          {tags && (
            <MissionsCategories
              onTagClick={setSelectedTags}
              selectedTags={selectedTags}
              tags={tags}
            />
          )}
        </div>
        <Missions
          missions={missions}
          isLoading={isLoading}
          meta={meta}
          fetchNextPage={fetchNextPage}
        />
      </Container>
    </div>
  );
};

const FeaturedMissionsList = () => (
  <Feature feature="missions" activeComponent={MissionsList} />
);

export default FeaturedMissionsList;
