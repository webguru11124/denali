import useGetAudiencesQuery from 'app/api/audiences/hooks/useAudiencesQuery';
import { Audience } from 'app/api/audiences/types';
import {
  Input2,
  PageLoader,
  SuccessModal,
  TablePageContainer,
} from 'app/components';
import Pagination from 'app/components/Pagination';
import { useAudiencesTranslation } from 'app/internationalization/hooks';
import { routes } from 'app/router';
import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';

import DeleteAudienceModal from '../Audience/components/DeleteAudienceModal';
import useDeleteAudienceMutation from '../Audience/hooks/useDeleteAudienceMutation';
import ToastContainer from '../Editor/components/Toast/ToastContainer';

import { AudiencesTable } from './components/AudiencesTable';
import AudienceTabsIndicatorContainer from './components/AudienceTabIndicatorContainer';
import EmptyState from './components/EmptyState';
import AudienceModal from './components/Modals/AudienceModal/AudienceModal';
import Toast from './components/Toast';
import {
  AudiencesContextProvider,
  DeleteModalState,
  useAudiencesContext,
} from './context';

const Audiences = () => {
  const AudiencesContent = () => {
    const history = useHistory();
    const { page, changePage, deleteModalState, setDeleteModalState } =
      useAudiencesContext();
    const [searchQuery, setSearchQuery] = useState('');
    const debounceSearch = debounce((value) => setSearchQuery(value), 500);

    const {
      data: audiences,
      meta: paginationInfo,
      isLoading,
      refetch,
    } = useGetAudiencesQuery({ page, query: searchQuery });

    const { mutate, isDeleting } = useDeleteAudienceMutation();
    const { t } = useAudiencesTranslation();

    const [audienceModalOpen, setAudienceModalOpen] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);

    const showToast = () =>
      toast(<Toast onClick={toast.dismiss} deletedCount={1} />, {
        position: 'bottom-center',
        autoClose: 8000,
        closeButton: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        containerId: 'DeletedAudiencePopUp',
      });

    const onAudienceSubmited = (result: Audience | null) => {
      if (result !== null) {
        refetch?.();
        setSuccessModalOpen(true);
      }

      setAudienceModalOpen(false);
    };

    const deleteAudience = () => {
      if (!deleteModalState.id) return;
      mutate(deleteModalState.id, {
        onSuccess: () => {
          refetch?.();
          setDeleteModalState({ open: false });
          showToast();
        },
      });
    };

    const onDeleteClick = (data: DeleteModalState) => setDeleteModalState(data);

    const viewAudience = (audienceId: number) =>
      history.push(routes.audience.create(audienceId));

    useEffect(() => {
      if (history.location?.state?.deleted) {
        showToast();
      }
    }, [history.location?.state?.deleted]);

    return (
      <>
        <TablePageContainer className="px-0">
          <div className="flex flex-col pl-3 mr-8">
            <div className="flex w-full items-center">
              <Input2
                placeholder="Search for Audience"
                onChange={(e) => debounceSearch(e.target.value)}
                onClear={() => debounceSearch('')}
                isSearch={true}
              />
              <button
                type="button"
                className="ml-4 w-56 h-12 bg-focus text-white rounded-xl hover:bg-hover-primary"
                onClick={() => setAudienceModalOpen(true)}
              >
                {t('Create Audience')}
              </button>
            </div>
            <div className="h-4 mt-2 text-xs text-grayscale-secondary">
              {Boolean(searchQuery.length) && (
                <span>
                  {t('Results found', {
                    count: paginationInfo?.total,
                  })}
                </span>
              )}
            </div>
          </div>

          {isLoading && <PageLoader />}

          {!isLoading && audiences?.length === 0 && (
            <EmptyState onClick={() => setAudienceModalOpen(true)} />
          )}

          {audiences && audiences.length > 0 && (
            <>
              <div className="flex justify-between items-end mt-4 ml-3 mr-8 border-b border-hover-blue">
                <AudienceTabsIndicatorContainer />
                <Pagination
                  paginationMeta={paginationInfo}
                  changePage={changePage}
                />
              </div>
              <div className="ml-1 mr-3">
                <AudiencesTable
                  audiences={audiences}
                  onViewClick={viewAudience}
                  onDeleteClick={onDeleteClick}
                />
              </div>
            </>
          )}
        </TablePageContainer>

        {audienceModalOpen && (
          <AudienceModal
            onClose={() => setAudienceModalOpen(false)}
            onAudienceSubmited={onAudienceSubmited}
            selectedLocations={[]}
            selectedProfessions={[]}
          />
        )}

        {successModalOpen && (
          <SuccessModal
            title={t('Audience created!')}
            description={t('It is now accessible in your list of audiences.')}
            onClose={() => setSuccessModalOpen(false)}
          />
        )}

        {deleteModalState.open && (
          <DeleteAudienceModal
            onCancelClick={() => setDeleteModalState({ open: false })}
            onConfirmClick={() => deleteAudience()}
            members={
              deleteModalState.members ??
              audiences?.filter((a) => a.id === deleteModalState.id)?.[0]
                ?.usersCount ??
              0
            }
            isLoading={isDeleting}
          />
        )}
        <ToastContainer toastId="DeletedAudiencePopUp" />
        <ReactTooltip place="top" effect="solid" class="react-tooltip" />
      </>
    );
  };

  return (
    <AudiencesContextProvider>
      <AudiencesContent />
    </AudiencesContextProvider>
  );
};

export default Audiences;
