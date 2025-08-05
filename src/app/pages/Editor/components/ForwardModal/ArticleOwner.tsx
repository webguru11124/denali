import { ArticleCollaborator } from 'app/api/articleCollaborators/types';
import { useArticlesTranslation } from 'app/internationalization/hooks';

interface ArticleOwnerProps {
  articleOwner: ArticleCollaborator;
}

const ArticleOwner = ({ articleOwner }: ArticleOwnerProps) => {
  const { t } = useArticlesTranslation();
  return (
    <div className="flex items-center w-full rounded-sm mt-4">
      <div className="flex items-center w-1/2">
        <div className="w-8 h-8 flex items-center justify-center  text-grayscale-secondary rounded border border-gray-light bg-white">
          <img
            className="rounded"
            src={articleOwner.avatars.small}
            alt="Avatar"
          />
        </div>
        <div className="flex flex-col justify-center min-w-0 ml-3">
          <div className="flex mb-0.5">
            <span className="text-sm text-ellipsis whitespace-nowrap overflow-hidden ">
              {articleOwner.fullName}
            </span>
          </div>
        </div>
      </div>

      <span className="text-sm text-grayscale-secondary text-ellipsis whitespace-nowrap overflow-hidden ml-auto">
        {t('Article Owner')}
      </span>
    </div>
  );
};

export default ArticleOwner;
