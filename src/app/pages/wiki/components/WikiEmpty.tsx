import { Empty } from 'app/components';
import { useWikiTranslation } from 'app/internationalization/hooks';
import { FC } from 'react';

const WikiEmpty: FC = () => {
  const { t } = useWikiTranslation();

  return (
    <Empty
      className="mt-16 mb-12"
      content={{
        image: `${t('Empty_icon')}`,
        heading: `${t(
          'Knowledge is like a garden; if it’s not cultivated, it cannot be harvested.'
        )}`,
        text: `${t('There are no Wiki Cards yet.')}`,
      }}
    />
  );
};

export default WikiEmpty;
