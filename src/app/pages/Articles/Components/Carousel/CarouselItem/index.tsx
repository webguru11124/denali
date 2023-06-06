import config from 'app/config';
import { routes } from 'app/router';
import { SearchStatus } from 'iconsax-react';
import { useHistory } from 'react-router-dom';
import {
  BasicArticleInfo,
  Tenant,
} from 'submodules/common-ui/generated/api/gcs';

import ItemImage from './ItemImage';

interface CarouselItemProps {
  article: BasicArticleInfo;
  tenant?: Tenant;
  index: number;
}
const CarouselItem = ({ article, tenant, index }: CarouselItemProps) => {
  const history = useHistory();

  const mainLanguage =
    article.languages.find((l) => l.isDefault)?.language || 'en';

  return (
    <div
      key={index}
      className="flex flex-col flex-shrink-0 max-w-[216px] max-h-[316px] ml-5 mt-2 rounded-[24px] bg-white"
    >
      <ItemImage
        url={`${config.env.articlesApiUrl}/${article.variants[mainLanguage].coverImage?.url}`}
      />

      <div className="flex flex-col items-center justify-between w-full h-full px-2 py-2">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center w-4 h-4 border border-focus-background rounded-sm mr-1 box-border p-[2px]">
            {tenant?.logo && <img src={tenant?.logo} alt="Logo" />}
          </div>

          <span className="text-xs">{tenant?.title ?? '-'}</span>
        </div>
        <span className="font-bold text-center line-clamp-4 mt-[2px]">
          {article.variants[mainLanguage].title}
        </span>

        <button
          type="button"
          className="flex items-center justify-center text-focus mt-2 bg-hover-blue rounded-xl w-full h-12 hover:bg-focus-background"
          onClick={() =>
            history.push(
              routes.editorArticle.create(article.id.toString(), 'review')
            )
          }
        >
          <SearchStatus size={24} />
          <span className="ml-[6px] text-sm">Review</span>
        </button>
      </div>
    </div>
  );
};

export default CarouselItem;
