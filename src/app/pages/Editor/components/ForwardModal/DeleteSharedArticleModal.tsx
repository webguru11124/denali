import useGetSharingConnectionQuery from 'app/api/articleSharing/hooks/useGetSharingConnectionQuery';
import Modal from 'app/components/Modal';
import PageLoader from 'app/components/PageLoader';
import { useDispatch } from 'app/hooks';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { actions as modalActions } from 'app/store/modal';
import { ModalTypes } from 'app/store/modal/types';
import { People, ArrowForwardSquare, ArrowRotateLeft } from 'iconsax-react';
import { toast } from 'react-toastify';

import useDeleteSharedArticleMutation from '../../hooks/mutations/useDeleteSharedArticleMutation';
import SimpleToast from '../Toast/SimpleToast';

export interface DeleteSharedArticleModalProps {
  articleId: number;
  articleOwner: number;
  receiverName: string;
  tenantId: number;
}

const DeleteSharedArticleModal = ({
  articleId,
  articleOwner,
  receiverName,
  tenantId,
}: DeleteSharedArticleModalProps) => {
  const dispatch = useDispatch();
  const { t } = useArticlesTranslation();

  const { mutate, isLoading } = useDeleteSharedArticleMutation();
  const { refetch } = useGetSharingConnectionQuery({
    enabled: false,
  });

  const deleteSharingcConnection = () => {
    mutate(
      { articleId, tenantIds: [tenantId] },
      {
        onSuccess: (res) => {
          refetch?.();
          showToast();
          openForwardModal();
        },
      }
    );
  };

  const openForwardModal = () => {
    dispatch(
      modalActions.showModal({
        modalType: ModalTypes.FORWARD_MODAL,
        modalProps: { articleOwner, articleId },
      })
    );
  };

  const showToast = () => {
    toast(<SimpleToast text={t('Article has been withdrawn')} />, {
      position: 'bottom-center',
      autoClose: 8000,
      closeButton: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      containerId: 'Simple',
    });
  };

  const iconSize = 24;

  return (
    <Modal onClose={openForwardModal}>
      <div className="flex flex-col max-w-[424px]">
        <span className="font-bold text-lg text-grayscale-primary">
          {t('Withdraw Article?')}
        </span>
        <span className="font-bold text-grayscale-primary mt-6">
          {t('1 article will be withdrawn')}
        </span>

        <div className="flex text-grayscale-primary mt-6">
          <People size={iconSize} />
          <span className="ml-4.5">
            {t('The article is deleted from editors and audiences in')}{' '}
            {receiverName}
          </span>
        </div>
        <div className="flex text-grayscale-primary mt-4">
          <ArrowForwardSquare size={iconSize} />
          <span className="ml-4.5">
            {t(
              'The article is deleted from any teams it has been reshared with'
            )}
          </span>
        </div>
        <div className="flex text-grayscale-primary mt-4">
          <ArrowRotateLeft size={iconSize} />
          <span className="ml-4.5">
            {t('We recommend informing the team why you  withdrew it')}
          </span>
        </div>

        <div className="flex w-full mt-8">
          <button
            type="button"
            className="h-12 w-1/2 bg-hover-blue text-focus rounded-lg"
            onClick={openForwardModal}
            disabled={isLoading}
          >
            {t('Cancel')}
          </button>

          {isLoading && (
            <div className="ml-4 h-12 w-1/2">
              <PageLoader />
            </div>
          )}

          {!isLoading && (
            <button
              type="button"
              className="ml-4 h-12 w-1/2 bg-error text-white rounded-lg"
              onClick={deleteSharingcConnection}
            >
              {t('Withdraw')}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DeleteSharedArticleModal;
