import styled from '@emotion/styled';
import { useMissionQuery } from 'app/api/missions/hooks';
import {
  HtmlContent,
  Container,
  PageLoader,
  HideableContent,
  ProgressBar,
  Feature,
  RequestError,
} from 'app/components';
import { useRouteId } from 'app/hooks';
import { routes } from 'app/router';
import { selectDefinedImageSource } from 'app/utils';
import { Link } from 'react-router-dom';
import LightbulbFlashLineIcon from 'remixicon-react/LightbulbFlashLineIcon';
import PieChartIcon from 'remixicon-react/PieChartLineIcon';

import Series from './Series';

const Header = styled.div`
  height: 280px;
`;

const Mission = () => {
  const id = useRouteId();

  if (typeof id === 'string') throw new Error('Id should be numeric');
  const { data, isLoading, error } = useMissionQuery(id);

  if (error) {
    return <RequestError error={error} />;
  }

  if (!data || isLoading) {
    return <PageLoader />;
  }
  const totalMissionActivities = data?.series?.reduce(
    (acc, { totalActivities }) => acc + totalActivities,
    0
  );

  const completedMissionActivities = data?.series?.reduce(
    (acc, { completedActivities }) => acc + completedActivities,
    0
  );

  const imageSource = selectDefinedImageSource({
    srcSet: data.logoResponsive?.sizes,
    src: data.logoResponsive?.url,
  });
  return (
    <div className="flex justify-center mt-8 mb-10">
      <Container>
        <div className="rounded-lg w-full shadow-atobi pb-10">
          <Header className=" w-full">
            {imageSource ? (
              <img
                className="w-full h-full object-cover rounded-t-lg"
                alt={data.name}
                {...imageSource}
              />
            ) : (
              <div className="flex rounded-t-lg h-full items-center justify-center bg-pink">
                <LightbulbFlashLineIcon className="text-white w-12 h-12" />
              </div>
            )}
          </Header>
          <div className="row">
            <div className="col-10 offset-1 py-5 border-b border-gray-light px-0">
              <ProgressBar
                stepsAmount={totalMissionActivities}
                completion={completedMissionActivities}
                className="mt-6"
              />
            </div>
          </div>
          <div className="row mt-6">
            <div className="col-10 offset-1">
              <div className="flex justify-between">
                <p className="text-grayscale-primary text-lg font-bold">
                  {data.name}
                </p>
                <Link
                  to={routes.missionReport.create(id)}
                  className="p-2 rounded-lg bg-light shadow-card ml-auto"
                >
                  <PieChartIcon className="w-6 h-6 text-grayscale-secondary" />
                </Link>
              </div>

              <div className="mt-6 text-grayscale-primary pb-5 border-b border-gray-light">
                <HideableContent maxHeight={150}>
                  <HtmlContent isMarkdown content={data.description} />
                </HideableContent>
              </div>
              {data.series.map(
                ({
                  id: seriesId,
                  name,
                  totalActivities,
                  completedActivities,
                  activities,
                }) => (
                  <div key={seriesId} className="mt-5">
                    <Series
                      missionId={id}
                      totalActivities={totalActivities}
                      completedActivities={completedActivities}
                      name={name}
                      activities={activities}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const FeaturedMission = () => (
  <Feature feature="missions" activeComponent={Mission} />
);

export default FeaturedMission;
