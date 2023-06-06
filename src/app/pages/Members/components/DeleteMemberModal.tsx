import useDeleteMemberMutation from 'app/api/user/hooks/useDeleteMemberMutation';
import Modal from 'app/components/Modal';
import PageLoader from 'app/components/PageLoader';
import { useMembersTranslation } from 'app/internationalization/hooks';
import { logger } from 'app/utils';
import { CloseCircle, ArrowRotateLeft, Trash } from 'iconsax-react';

import { useMembersContext } from '../context';

const DeleteMemberModal = ({ ids }: { ids: Array<number> }) => {
  const { setDeleteModalState, refetch } = useMembersContext();
  const { mutate, isLoading } = useDeleteMemberMutation();

  const { t } = useMembersTranslation();

  const close = () => setDeleteModalState({ open: false, ids: [] });

  const deleteMember = () => {
    mutate(
      { id: ids[0] },
      {
        onSuccess: (res) => {
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
          {t('Delete')}
        </span>
        <span className="font-bold text-grayscale-primary mt-6">
          {t('1 member will be deleted')}
        </span>

        <div className="flex text-grayscale-primary mt-6">
          <ArrowRotateLeft />
          <span className="ml-4.5">
            {t('Deleted members cannot be restored')}
          </span>
        </div>
        <div className="flex text-grayscale-primary mt-4">
          <CloseCircle />
          <span className="ml-4.5">{t('They will lose access to Atobi')}</span>
        </div>
        <div className="flex text-grayscale-primary mt-4">
          <Trash />
          <span className="ml-4.5">
            {t('Their contributions will be deleted')}
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
              onClick={deleteMember}
            >
              {t('Delete')}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DeleteMemberModal;
