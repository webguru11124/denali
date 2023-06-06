import Modal from 'app/components/Modal';
import PageLoader from 'app/components/PageLoader';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { logger } from 'app/utils';
import { People, ArrowRotateLeft, Forbidden2 } from 'iconsax-react';

import { useArticlesContext } from '../context';
import useDeleteArticleMutation from '../hooks/useDeleteArticleMutation';

const DeleteArticleModal = ({ ids }: { ids: Array<number> }) => {
  const { setDeleteModalState, refetch, setSelectedArticles } =
    useArticlesContext();
  const { mutate, isLoading } = useDeleteArticleMutation();

  const { t } = useArticlesTranslation();

  const close = () => setDeleteModalState({ open: false, ids: [] });

  const deleteArticle = () => {
    mutate(
      { id: ids[0] },
      {
        onSuccess: (res) => {
          setSelectedArticles((prev) => prev.filter((v) => !ids.includes(v)));
          refetch?.();
          close();
        },
        onError: logger.error,
      }
    );
  };

  return (
    <Modal onClose={close}>
      <div className="flex flex-col">
        <span className="font-bold text-lg text-grayscale-primary">
          {t('Delete Article?')}
        </span>
        <span className="font-bold text-grayscale-primary mt-6">
          {t('1 article will be deleted')}
        </span>

        <div className="flex text-grayscale-primary mt-6">
          <Forbidden2 />
          <span className="ml-4.5">
            {t('All members in the audience(s) will lose access')}
          </span>
        </div>
        <div className="flex text-grayscale-primary mt-4">
          <ArrowRotateLeft />
          <span className="ml-4.5">
            {t('You can not restore the article again')}
          </span>
        </div>
        <div className="flex text-grayscale-primary mt-4">
          <People />
          <span className="ml-4.5">
            {t('Invited collaborators will lose access')}
          </span>
        </div>

        <div className="flex mt-8">
          <button
            type="button"
            className="w-[176px] h-12 bg-hover-blue text-focus rounded-xl"
            onClick={close}
            disabled={isLoading}
          >
            {t('Cancel')}
          </button>

          {isLoading && (
            <div className="ml-4 w-[176px] h-12">
              <PageLoader />
            </div>
          )}

          {!isLoading && (
            <button
              type="button"
              className="ml-4 w-[176px] h-12 bg-focus text-white rounded-xl"
              onClick={deleteArticle}
            >
              {t('Delete')}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DeleteArticleModal;
