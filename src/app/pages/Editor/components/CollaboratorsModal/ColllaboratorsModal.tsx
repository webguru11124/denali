import useGetArticleCollaboratorsQuery from 'app/api/articleCollaborators/hooks/useGetArticleCollaboratorsQuery';
import { ArticleCollaborator } from 'app/api/articleCollaborators/types';
import { Modal, PageLoader } from 'app/components';
import { useSelector } from 'app/hooks';
import { actions, selectors } from 'app/store/editor';
import { actions as modalActions } from 'app/store/modal';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';

import SimpleToast from '../Toast/SimpleToast';

import CollaboratorsDropdown from './components/CollaboratorsDropdown';
import ModalFooter from './components/ModalFooter';
import ModalHeader from './components/ModalHeader';
import SelectedCollaborators from './components/SelectedCollaborators';

export interface CollaboratorsModalProps {
  articleOwner?: number | null;
  articleId?: number;
}

const CollaboratorsModal = ({
  articleOwner = 0,
  articleId,
}: CollaboratorsModalProps) => {
  const { data, isLoading } = useGetArticleCollaboratorsQuery({
    role: 'collaborators',
    permissions: 'update',
    enabled: false,
  });

  const collaborators: ArticleCollaborator[] = useMemo(() => {
    if (!data) return [];

    return data;
  }, [data]);

  const dispatch = useDispatch();
  const selectedLanguages = useSelector(selectors.getSelectedLanguages);

  const close = () => {
    dispatch(modalActions.hideModal());
  };

  const addCollaborator = useCallback(
    (collaborator: ArticleCollaborator) => {
      dispatch(
        actions.addCollaborator({
          id: collaborator.id,
          fullName: collaborator.fullName,
          avatar: collaborator.avatars.small,
          languages: selectedLanguages.map((l) => l.code),
          email: collaborator.email,
        })
      );
    },
    [dispatch, selectedLanguages]
  );

  const removeCollaborator = (id: number) => {
    dispatch(actions.removeCollaborator(id));
    toast(<SimpleToast text="Collaborator Removed" />, {
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

  const languagePermissionChange = (id: number, code: string) => {
    dispatch(actions.updateCollaboratorLanguages({ id, code }));
  };

  return (
    <Modal
      onClose={close}
      className="w-[536px] overflow-visible overflow-y-visible"
      overflow
      containerPaddingClass="py-0 px-0"
    >
      <div className="flex flex-col h-full py-6 px-6">
        <ModalHeader close={close} />
        <div className="flex items-center w-full mt-4">
          <CollaboratorsDropdown
            collaborators={collaborators}
            addCollaborator={addCollaborator}
            isLoading={isLoading}
          />
        </div>

        {isLoading && <PageLoader />}
        <SelectedCollaborators
          articleOwner={articleOwner}
          languagePermissionChange={languagePermissionChange}
          removeCollaborator={removeCollaborator}
        />
      </div>
      <ModalFooter articleId={articleId} />
      <ReactTooltip place="bottom" effect="solid" class="react-tooltip" />
    </Modal>
  );
};

export default CollaboratorsModal;
