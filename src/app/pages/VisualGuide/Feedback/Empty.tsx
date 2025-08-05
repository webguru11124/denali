import { Empty as EmptyPage } from 'app/components';
import { useVMGuidesTranslation } from 'app/internationalization/hooks';
import mirrorIcon from 'assets/icons/mirror.png';
import { FC } from 'react';

import EmptyStateContainer from '../EmptyStateContainer';

const Empty: FC = () => {
  const { t } = useVMGuidesTranslation();

  const CONTENT = {
    image: <img src={mirrorIcon} alt="mirror" />,
    heading: t(
      "A visual always brings a first impression. But if there's going to be a first impression, I might as well use it to control the story. - MF Doom"
    ),
    text: t('There is no feedback here yet.'),
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
