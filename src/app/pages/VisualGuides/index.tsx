import { Container, PageLoader, Feature } from 'app/components';
import { findImage } from 'app/utils';

import Empty from './Empty';
import GuideCard from './GuideCard';
import useVisualGuidesQuery from './useVisualGuidesQuery';

const VisualGuides = () => {
  const { data: visualGuides, isLoading } = useVisualGuidesQuery();

  if (isLoading || !visualGuides) {
    return <PageLoader />;
  }

  if (!visualGuides.length) {
    return <Empty />;
  }

  return (
    <div className="flex justify-center">
      <Container className="mt-4">
        <div className="row">
          {visualGuides.map(({ id, media, title, appearsDate }) => {
            const image = findImage(media);
            return (
              <div key={id} className="2xl:col-3 col-4 mt-4">
                <GuideCard
                  id={id}
                  title={title}
                  appearsDate={appearsDate}
                  mediaItemsCount={media?.length || 0}
                  image={image}
                />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

const FeaturedVisualGuides = () => (
  <Feature feature="vmGuides" activeComponent={VisualGuides} />
);

export default FeaturedVisualGuides;
