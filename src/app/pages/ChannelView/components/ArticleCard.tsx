import styled from '@emotion/styled';
import config from 'app/config';
import a11yKeydown from 'app/utils/a11y/keydown';
import { CopySuccess, Eye, Gallery } from 'iconsax-react';
import { useState } from 'react';
import { BasicArticleInfo } from 'submodules/common-ui/generated/api/gcs';

const CoverImage = styled.img`
  -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 0)
    ),
    linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  -webkit-mask-size: 100%;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: top bottom;
`;

interface ArticleCardProps {
  article: BasicArticleInfo;
  onClick: () => void;
}

const ArticleCard = ({ article, onClick }: ArticleCardProps) => {
  const [imageHasError, setImageHasError] = useState(false);
  const mainLanguage =
    article.languages.find((l) => l.isDefault)?.language || 'en';

  const variant = article.variants[mainLanguage];

  return (
    <div
      onClick={onClick}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => a11yKeydown(e, () => onClick())}
      className="flex justify-between flex-col shadow-atobi rounded-2lg gap-2 border-[1px] border-gray-light overflow-clip cursor-pointer"
    >
      {imageHasError ? (
        <CoverImage
          as="div"
          className="flex items-center justify-center bg-hover-blue text-focus h-[170px] rounded-t-[24px]"
        >
          <Gallery size={36} />
        </CoverImage>
      ) : (
        <CoverImage
          src={`${config.env.articlesApiUrl}/${variant.coverImage.url}`}
          className="h-[170px] rounded-t-6 object-cover"
          onLoad={() => {
            setImageHasError(false);
          }}
          onError={() => setImageHasError(true)}
        />
      )}
      <div className="flex flex-col gap-2 p-2">
        <span className="text-base font-bold">{variant.title}</span>
        <div className="flex flex-row gap-3">
          <span className="flex flex-row gap-1 items-center">
            <Eye size={16} color={config.colors['grayscale-secondary']} />
            <span className="text-grayscale-secondary text-sm">##</span>
          </span>
          <span className="flex flex-row gap-1 items-center">
            <CopySuccess
              size={16}
              color={config.colors['grayscale-secondary']}
            />
            <span className="text-grayscale-secondary text-sm">##</span>
          </span>
        </div>
      </div>
      <div className="flex -mb-2 opacity-50">
        <span className="h-4 w-30 bg-gradient-to-r from-transparent to-focus" />
        <span className="h-4 bg-gray-dark flex-grow" />
      </div>
    </div>
  );
};

export default ArticleCard;
