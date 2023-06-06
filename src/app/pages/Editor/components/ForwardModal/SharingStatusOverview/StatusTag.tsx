import { useArticlesTranslation } from 'app/internationalization/hooks';
import { ArticlesKey } from 'app/internationalization/types';
import { Calendar, Eye, Import, Send, Slash, TickCircle } from 'iconsax-react';
import {
  ArticleSharingStatus,
  ArticleSharingStatusStatusEnum,
} from 'submodules/common-ui/generated/api/gcs';

interface StatusTagProps {
  sharingStatus: ArticleSharingStatus;
}

const StatusTag = ({ sharingStatus }: StatusTagProps) => {
  const { t } = useArticlesTranslation();
  const iconSize = 16;

  const draftOrScheduledLabel = () => {
    if (sharingStatus.publishAt === null) return 'Approved';

    return 'Scheduled';
  };

  const draftOrScheduledIcon = () => {
    if (sharingStatus.publishAt === null) return <TickCircle size={iconSize} />;

    return <Calendar size={iconSize} />;
  };

  const statusProps = {
    inbound: {
      text: 'text-grayscale-secondary',
      background: 'bg-grayscale-bg-dark',
      icon: <Import size={iconSize} />,
    },
    draft: {
      text: sharingStatus.publishAt ? 'text-success' : 'text-focus',
      background: sharingStatus.publishAt
        ? 'bg-success-background'
        : 'bg-hover-blue',
      icon: draftOrScheduledIcon(),
    },
    archived: {
      text: 'text-warning',
      background: 'bg-hover-blue',
      icon: <Eye size={iconSize} />,
    },
    published: {
      text: 'text-success',
      background: 'bg-success-background',
      icon: <Send size={iconSize} />,
    },
    rejected: {
      text: 'text-error',
      background: 'bg-error-light',
      icon: <Slash size={iconSize} />,
    },
  };

  const getTranslationKey = (
    key: ArticleSharingStatusStatusEnum
  ): ArticlesKey => {
    switch (key) {
      case 'archived':
        return 'Archived';
      case 'inbound':
        return 'Received';
      case 'published':
        return 'Published';
      case 'rejected':
        return 'Rejected';
      default:
        return draftOrScheduledLabel();
    }
  };

  return (
    <div
      className={`flex items-center px-1 py-0.5 ml-2 text-xs font-bold capitalize rounded-sm ${
        statusProps[sharingStatus.status].text
      } ${statusProps[sharingStatus.status].background}`}
    >
      {statusProps[sharingStatus.status].icon}
      <span className="ml-1">{t(getTranslationKey(sharingStatus.status))}</span>
    </div>
  );
};

export default StatusTag;
