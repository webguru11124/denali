import { useKpisTranslation } from 'app/internationalization/hooks';
import { dayjs } from 'app/utils';
import { FC } from 'react';

interface LastUpdatedProps {
  date: string;
}

const LastUpdated: FC<LastUpdatedProps> = ({ date }) => {
  const { t } = useKpisTranslation();

  return (
    <div className="w-full text-center text-grayscale-secondary">
      {t('Last updated {{date}}', {
        date: dayjs(date).format('DD MM YYYY, HH:mm'),
      })}
    </div>
  );
};

export default LastUpdated;
