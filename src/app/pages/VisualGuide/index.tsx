import { Container, CategoryLinks, Feature } from 'app/components';
import { useRouteId } from 'app/hooks';
import { useVMGuidesTranslation } from 'app/internationalization/hooks';
import { routes, constants } from 'app/router';
import { useParams } from 'react-router-dom';

import Feedback from './Feedback';
import Guide from './Guide';

const VisualGuide = () => {
  const id = useRouteId();

  if (typeof id === 'string') throw new Error('Guide ID should be numeric');

  const { type } = useParams<{ type: 'guide' | 'feedback' }>();
  const { t } = useVMGuidesTranslation();

  const BASE_CATEGORY_LINKS = [
    {
      label: t('Guide'),
      type: constants.visualGuideTypes.guide,
    },
    {
      label: t('Feedback'),
      type: constants.visualGuideTypes.feedback,
    },
  ];

  return (
    <div className="flex justify-center mb-21">
      <Container className="pt-8">
        <CategoryLinks
          links={BASE_CATEGORY_LINKS.map(({ label, type: linkType }) => ({
            isActive: type === linkType,
            to: routes.visualGuide.create(id, linkType),
            label,
          }))}
        />
        <div className="mt-4">
          {(() => {
            switch (type) {
              case constants.visualGuideTypes.guide:
                return <Guide guideId={id} />;
              case constants.visualGuideTypes.feedback:
                return <Feedback guideId={id} />;
              default:
                return null;
            }
          })()}
        </div>
      </Container>
    </div>
  );
};

const FeaturedVisualGuide = () => (
  <Feature feature="vmGuides" activeComponent={VisualGuide} />
);

export default FeaturedVisualGuide;
