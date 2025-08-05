import { cx } from '@emotion/css';
import useGetAudienceQuery from 'app/api/audiences/hooks/useGetAudienceQuery';
import useGetAudienceUsersQuery from 'app/api/audiences/hooks/useGetAudienceUsersQuery';
import { Audience as ApiAudience } from 'app/api/audiences/types';
import { PageLoader, Pagination, TablePageContainer } from 'app/components';
import { useAudiencesTranslation, useNotFoundTranslation } from 'app/internationalization/hooks';
import { routes } from 'app/router';
import dayjs from 'dayjs';
import { Edit2, Global, Location, Trash, UserOctagon } from 'iconsax-react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import AudienceModal from '../Audiences/components/Modals/AudienceModal/AudienceModal';
import Toast from '../Audiences/components/Toast';
import ToastContainer from '../Editor/components/Toast/ToastContainer';

import AudienceUsersTable from './components/AudienceUsersTable/AudienceUsersTable';
import DeleteAudienceModal from './components/DeleteAudienceModal';
import useDeleteAudienceMutation from './hooks/useDeleteAudienceMutation';

const Audience = () => {
  const { id: audienceId } = useParams<{ id: string }>();
  const history = useHistory();

  const { t } = useAudiencesTranslation();
  const { t : tn } = useNotFoundTranslation();

  const [page, setPage] = useState(1);

  const {
    data: audience,
    isLoading: isLoadingAudience,
    error,
    refetch,
  } = useGetAudienceQuery({
    id: parseInt(audienceId),
  });
  const {
    data: users,
    meta,
    isLoading: isLoadingUsers,
  } = useGetAudienceUsersQuery({
    id: parseInt(audienceId),
    page,
  });

  const { mutate, isDeleting } = useDeleteAudienceMutation();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const deleteAudience = () => {
    if (!audience) return;
    mutate(audience.id, {
      onSuccess: () => {
        setDeleteModalOpen(false);
        history.push({
          pathname: routes.audiences.create(),
          state: { deleted: true },
        });
      },
    });
  };

  const onAudienceUpdated = (result: ApiAudience | null) => {
    if (result !== null) refetch?.();
    showToast();
  };

  const showToast = () =>
    toast(<Toast onClick={toast.dismiss} />, {
      position: 'bottom-center',
      autoClose: 8000,
      closeButton: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      containerId: 'AudienceUpdatedPopup',
    });

  const formatDate = (date?: string): string => {
    if (!date) return '-';

    return dayjs(date).format('DD.MM.YYYY');
  };

  if (isLoadingAudience) return <PageLoader />;
  if (error) history.goBack();

  return (
    <TablePageContainer>
      <div className="flex items-center justify-between ">
        <div className="flex">
          <div className="relative rounded-lg border border-gray-light mr-4">
            <div className="w-10 h-10 flex items-center justify-center whitespace-nowrap text-grayscale-secondary">
              <Global size={32} />
            </div>
          </div>

          <div className="flex flex-col">
            <span>{audience?.name}</span>
            <div className="flex items-center justify-center">
              <span className="text-sm text-grayscale-secondary">
                {t('Updated by {{name}} on', {
                  name: audience?.updatedBy?.fullName || tn('Ex-colleague'),
                })}{' '}
                {formatDate(audience?.updatedAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex">
          <button
            type="button"
            className="flex items-center justify-center ml-4 w-12 h-12 bg-focus text-white hover:bg-hover-primary rounded-xl"
            onClick={() => setCreateModalOpen(true)}
          >
            <Edit2 />
          </button>
          <button
            type="button"
            className="flex items-center justify-center ml-4 w-12 h-12 bg-hover-blue rounded-xl hover:bg-focus-background text-focus"
            onClick={() => setDeleteModalOpen(true)}
          >
            <Trash />
          </button>
        </div>
      </div>

      <div className={cx('flex mt-6 mb-2 rounded-l bg-grayscale-bg-dark')}>
        <div className="w-1 bg-gradient-audience rounded-l" />
        <div className="flex-col  py-2 pl-5">
          <span className="font-bold">{t('Audience Summary')}</span>
          <div className="flex items-center text-sm text-grayscale-secondary mt-2">
            <span>
              {t('{{count}} members', { count: audience?.usersCount || 0 })}
            </span>
            <div className="rounded bg-gray-dark w-[3px] h-[3px] mx-2" />
            <UserOctagon size={20} className="text-grayscale-secondary mr-1" />
            <span>
              {(audience?.professions ?? []).length > 0
                ? t('{{count}} profession', {
                    count: audience?.professions.length,
                  })
                : t('All Professions')}
            </span>
            <div className="rounded bg-gray-dark w-[3px] h-[3px] mx-2" />
            <Location size={20} className="text-grayscale-secondary mr-1" />
            <span>{audience?.locations.length} locations</span>
            {/* <div className="rounded bg-gray-dark w-[3px] h-[3px] mx-2" />
            <Clock size={20} className="text-grayscale-secondary mr-1" />
            <span>{t('{{count}} timezones', { count: 0 })}</span> */}
          </div>
        </div>
      </div>

      {((users && users.length > 0) || isLoadingUsers) && (
        <Pagination
          zeroBased={false}
          changePage={setPage}
          paginationMeta={meta}
          isChangingPage={isLoadingUsers}
        />
      )}

      <AudienceUsersTable users={users} isLoading={isLoadingUsers} />
      {deleteModalOpen && (
        <DeleteAudienceModal
          members={audience?.usersCount ?? 0}
          onCancelClick={() => setDeleteModalOpen(false)}
          onConfirmClick={deleteAudience}
          isLoading={isDeleting}
        />
      )}

      {createModalOpen && (
        <AudienceModal
          onClose={() => setCreateModalOpen(false)}
          onAudienceSubmited={onAudienceUpdated}
          selectedLocations={audience?.locations || []}
          selectedProfessions={audience?.professions || []}
          name={audience?.name}
          id={audience?.id}
        />
      )}

      <ToastContainer toastId="AudienceUpdatedPopup" />
    </TablePageContainer>
  );
};

export default Audience;
