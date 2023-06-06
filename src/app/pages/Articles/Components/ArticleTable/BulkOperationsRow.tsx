import { cx } from '@emotion/css';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { routes } from 'app/router';
import {
  MessageEdit,
  ReceiveSquare,
  TransmitSquare,
  Trash,
  Eye,
} from 'iconsax-react';
import { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

import { useArticlesContext } from '../../context';

const BulkOperationsRow = ({ unArchive }: { unArchive: VoidFunction }) => {
  const history = useHistory();
  const {
    selectedArticles: articleIds,
    articleFilters: { status },
    setArchiveModalState,
    setDeleteModalState,
  } = useArticlesContext();
  const { t } = useArticlesTranslation();

  const isArchived = status === 'archived';

  const Button = ({
    children,
    className,
    onClick,
  }: {
    children: ReactNode;
    onClick: VoidFunction;
    className?: string;
  }) => (
    <button
      className={`flex text-sm text-grayscale-secondary hover:text-grayscale-primary ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  return (
    <th colSpan={status === 'draft' || status === 'archived' ? 3 : 4}>
      <div className="flex items-end w-full mb-4 font-normal">
        {articleIds.length === 1 && (
          <>
            <Button
              className="mr-8 ml-auto"
              onClick={() =>
                history.push(
                  routes.editorArticle.create(articleIds[0].toString(), 'view')
                )
              }
            >
              <Eye />
              <span className="ml-4.5">{t('View')}</span>
            </Button>
            <Button
              className="mr-8"
              onClick={() =>
                history.push(
                  routes.editorArticle.create(articleIds[0].toString(), 'edit')
                )
              }
            >
              <MessageEdit />
              <span className="ml-4.5">{t('Edit')}</span>
            </Button>

            <Button
              className="mr-8"
              onClick={() =>
                setDeleteModalState({ open: true, ids: [articleIds[0]] })
              }
            >
              <Trash />
              <span className="ml-4.5">{t('Delete')}</span>
            </Button>
          </>
        )}

        <Button
          className={cx({ 'ml-auto': articleIds.length > 1 })}
          onClick={() =>
            isArchived
              ? unArchive()
              : setArchiveModalState({ open: true, ids: articleIds })
          }
        >
          {isArchived ? <TransmitSquare /> : <ReceiveSquare />}
          <span className="ml-4.5">
            {isArchived ? t('Unarchive') : t('Archive')}
          </span>
        </Button>
      </div>
    </th>
  );
};

export default BulkOperationsRow;
