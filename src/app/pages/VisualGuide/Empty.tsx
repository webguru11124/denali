import { Empty as EmptyPage } from 'app/components';
import { useVMGuidesTranslation } from 'app/internationalization/hooks';
import { FC } from 'react';

import EmptyStateContainer from './EmptyStateContainer';

const Empty: FC = () => {
  const { t } = useVMGuidesTranslation();

  const CONTENT = {
    image: t('Empty_icon_guide'),
    heading: t(
      'I am seeking for the bridge which leans from the visible  to the invisible through reality. - Max Beckmann'
    ),
    text: t('There is no guide here.'),
  };
  return (
    <div className="flex justify-center">
      <EmptyStateContainer>
        <EmptyPage content={CONTENT} />
      </EmptyStateContainer>
    </div>
  );
};

export default Empty;
