import { cx } from '@emotion/css';
import { PaginatedResponseMeta } from 'app/api/types';
import { useCommonTranslation } from 'app/internationalization/hooks';
import { ArrowRight2, ArrowLeft2 } from 'iconsax-react';
import { useEffect, useState } from 'react';

interface PaginationProps {
  changePage: (val: number) => void;
  paginationMeta?: PaginatedResponseMeta;
  zeroBased?: boolean;
  isChangingPage?: boolean;
}

const Pagination = ({
  changePage,
  paginationMeta,
  zeroBased,
  isChangingPage,
}: PaginationProps) => {
  const { t } = useCommonTranslation();

  const [paginationState, setPaginationState] = useState<
    Record<string, number>
  >({ total: 0, currentPage: 0, perPage: 0, lastPage: 0 });

  useEffect(() => {
    if (!paginationMeta) return;

    const { total, currentPage, perPage, lastPage } = paginationMeta;
    let from: number, to: number;
    if (zeroBased) {
      from =
        total === 0
          ? 0
          : currentPage === 0
          ? 1
          : (currentPage + 1) * perPage - (perPage - 1);
      to =
        perPage > total
          ? total
          : currentPage === 0
          ? perPage
          : (currentPage + 1) * perPage;
    } else {
      from = paginationMeta.from;
      to = paginationMeta.to;
    }

    setPaginationState({
      from,
      to,
      currentPage,
      lastPage,
      total,
    });
  }, [paginationMeta, zeroBased]);

  const { from, to, currentPage, lastPage, total } = paginationState;

  return (
    <div className="flex justify-end items-center basis-0 p-2">
      <span className="text-sm text-grayscale-secondary mr-3">
        {from} - {to} {t('of')} {total}
      </span>
      <button
        className="flex items-center justify-center whitespace-nowrap mr-3 text-grayscale-secondary"
        type="button"
        disabled={
          isChangingPage
            ? true
            : zeroBased
            ? currentPage === 0
            : currentPage === 1
        }
        onClick={() => changePage(currentPage - 1)}
      >
        <ArrowLeft2
          className={cx({
            'text-gray-dark': isChangingPage
              ? true
              : zeroBased
              ? currentPage === 0
              : currentPage === 1,
          })}
        />
      </button>
      <button
        className="flex items-center justify-center whitespace-nowrap text-grayscale-secondary"
        type="button"
        disabled={isChangingPage || currentPage === lastPage}
        onClick={() => changePage(currentPage + 1)}
      >
        <ArrowRight2
          className={cx({
            'text-gray-dark': isChangingPage || currentPage === lastPage,
          })}
        />
      </button>
    </div>
  );
};

export default Pagination;
