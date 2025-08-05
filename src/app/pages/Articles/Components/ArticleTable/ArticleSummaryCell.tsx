import { cx } from '@emotion/css';
import { PageLoader } from 'app/components';
import CheckBox from 'app/components/Checkbox';
import VerticalChevron from 'app/components/VerticalChevron';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { Gallery, People } from 'iconsax-react';
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { BasicArticleInfo } from 'submodules/common-ui/generated/api/gcs';

import { useArticlesContext } from '../../context';
import CollaboratorsDropdown from '../dropdowns/CollaboratorsDropdown';
import StatusTag from '../StatusTag';

interface ArticleSummaryCellProps
  extends Pick<BasicArticleInfo, 'status' | 'id'> {
  title: string;
  coverImage: string | undefined;
}

const ArticleSummaryCell = ({
  title,
  status,
  coverImage,
  id,
}: ArticleSummaryCellProps) => {
  const [open, setOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { setSelectedArticles, selectedArticles } = useArticlesContext();
  const { t } = useArticlesTranslation();

  return (
    <td className="pl-3">
      <div className="flex justify-start items-center max-w-md">
        <CheckBox
          id={`${title}${status}${id}`}
          checked={selectedArticles.includes(id)}
          onClick={(e) => e.stopPropagation()}
          onChange={() =>
            setSelectedArticles((prev) => {
              if (prev.includes(id)) {
                return prev.filter((val) => val !== id);
              }

              return [...prev, id];
            })
          }
        />
        <div className="px-5 py-1">
          {coverImage && !hasLoaded && !hasError && (
            <div className="w-[88px] h-[48px]">
              <PageLoader />
            </div>
          )}
          <img
            className={cx(
              'min-w-[88px] min-h-[48px] w-[88px] h-[48px] rounded border-2 border-white shadow-block',
              { hidden: (!hasLoaded && !hasError) || hasError }
            )}
            src={coverImage}
            alt=""
            onLoad={() => {
              setHasLoaded(true);
              setHasError(false);
            }}
            onError={() => setHasError(true)}
          />

          {(hasError || !coverImage) && (
            <div className="flex items-center justify-center bg-hover-blue text-focus w-[88px] h-[48px] rounded border-2 border-white shadow-block">
              <Gallery size={24} />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center min-w-0">
          <div className="flex mb-0.5">
            <span className="text-ellipsis whitespace-nowrap overflow-hidden">
              {title}
            </span>
            {status && <StatusTag status={status} />}
          </div>
          <div className="items-center justify-start mt-0.5 hidden">
            <People className="text-grayscale-secondary" />
            <span className="ml-1 text-sm text-grayscale-secondary">
              {t('Collaborators')}
            </span>
            <div className="dropstart relative flex">
              <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
                <VerticalChevron
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen((isOpen) => !isOpen);
                  }}
                  open={open}
                />
              </OutsideClickHandler>
              {open && <CollaboratorsDropdown />}
            </div>
          </div>
        </div>
      </div>
    </td>
  );
};

export default ArticleSummaryCell;
