import { useArticlesTranslation } from 'app/internationalization/hooks';
import dayjs from 'dayjs';
import { DirectInbox, Send2 } from 'iconsax-react';

interface ScheduleSummaryProps {
  publishDate?: string | null;
  archiveDate?: string | null;
}

const ScheduleSummary = ({
  archiveDate,
  publishDate,
}: ScheduleSummaryProps) => {
  const { t } = useArticlesTranslation();

  return (
    <div className="flex flex-col mt-4">
      {(publishDate || archiveDate) && (
        <span className="text-black font-bold">{t('Scheduling Summary')}</span>
      )}
      {publishDate && (
        <div className="flex mt-2 items-center">
          <Send2 size={16} className="text-grayscale-secondary mr-1" />
          <span className="text-black font-bold text-sm mr-1">
            {t('Publish')}:
          </span>
          <span className="text-sm mr-1">
            {dayjs(publishDate).format('D MMM YYYY, HH:mm')}
          </span>
          <span className="text-sm text-grayscale-secondary">
            ({t('members local time')})
          </span>
        </div>
      )}
      {archiveDate && (
        <div className="flex mt-2 items-center">
          <DirectInbox size={16} className="text-grayscale-secondary mr-1" />
          <span className="text-black font-bold text-sm mr-1">
            {t('Archive')}:
          </span>
          <span className="text-sm mr-1">
            {dayjs(archiveDate).format('D MMM YYYY, HH:mm')}
          </span>
          <span className="text-sm text-grayscale-secondary">
            ({t('members local time')})
          </span>
        </div>
      )}
    </div>
  );
};

export default ScheduleSummary;
