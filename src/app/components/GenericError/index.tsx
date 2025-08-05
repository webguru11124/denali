import { useErrorTranslation } from 'app/internationalization/hooks';
import { FC } from 'react';

const GenericError: FC = () => {
  const { t } = useErrorTranslation();

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-xl font-bold">{t('An error occurred')}</div>
      <div className="text-lg">{t('Please reload the page and try again')}</div>
    </div>
  );
};

export default GenericError;
