import { Article } from 'app/api/articles/types';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { ArticlesKey } from 'app/internationalization/types';
import { ArticleStatusEnum } from 'submodules/common-ui/generated/api/gcs';

type StatusTagProps = Pick<Article, 'status'>;

const StatusTag = ({ status }: StatusTagProps) => {
  const { t } = useArticlesTranslation();

  const statusColors = {
    inbound: 'text-success',
    draft: 'text-focus',
    archived: 'text-warning',
    published: 'text-success',
    rejected: 'text-error',
  };

  const getTranslationKey = (key: ArticleStatusEnum): ArticlesKey => {
    switch (key) {
      case 'archived':
        return 'Archived';
      case 'inbound':
        return 'Inbound';
      case 'published':
        return 'Published';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Draft';
    }
  };

  return (
    <div className="flex items-center bg-hover-blue px-2 py-0.5 ml-2">
      <span className={`text-xs font-bold capitalize ${statusColors[status]}`}>
        {t(getTranslationKey(status))}
      </span>
    </div>
  );
};

export default StatusTag;
