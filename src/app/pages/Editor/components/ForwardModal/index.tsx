import { zodResolver } from '@hookform/resolvers/zod';
import useGetArticleCollaboratorsQuery from 'app/api/articleCollaborators/hooks/useGetArticleCollaboratorsQuery';
import useGetArticleSharingStatusOverview from 'app/api/articleSharing/hooks/useGetArticleSharingStatusOverview';
import useGetSharingConnectionQuery from 'app/api/articleSharing/hooks/useGetSharingConnectionQuery';
import { Modal, PageLoader } from 'app/components';
import { actions as modalActions } from 'app/store/modal';
import { ModalTypes } from 'app/store/modal/types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import useShareArticleMutation from '../../hooks/mutations/useShareArticleMutation';

import ArticleOwner from './ArticleOwner';
import { FormFields, schema } from './formSchema';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import MultiSelect from './MultiSelect';
import SharingStatusOverview from './SharingStatusOverview';

export interface ForwardModalProps {
  articleOwner: number;
  articleId: number;
}

export type Mode = 'view' | 'save';

const ForwardModal = ({ articleOwner, articleId }: ForwardModalProps) => {
  const dispatch = useDispatch();

  const [mode, setMode] = useState<Mode>('view');

  const { data } = useGetArticleCollaboratorsQuery({
    role: 'collaborators',
    permissions: 'update',
    enabled: false,
  });

  const { data: statusOverview, isLoading: isLoadingStatusOverview } =
    useGetArticleSharingStatusOverview({
      articleId,
    });
  const { data: sharingConnections, isLoading: isLoadingSharingConnections } =
    useGetSharingConnectionQuery({});

  const { mutate: shareArticle, isLoading } = useShareArticleMutation();

  const { register, handleSubmit, control, watch, formState } =
    useForm<FormFields>({
      defaultValues: {
        tennants: [],
        comment: '',
      },
      resolver: zodResolver(schema),
    });

  const ownerUser = data?.find((c) => c.id === articleOwner);
  const tenantsLength = watch('tennants').length;

  useEffect(() => {
    if (tenantsLength === 0) {
      setMode('view');
      return;
    }
    setMode('save');
  }, [tenantsLength]);

  const onSubmit = (values: FormFields) => {
    shareArticle(
      {
        articleId,
        receiverTenants: values.tennants,
        sharingComment: values.comment,
        includeAssets: true,
        allowResharing: true,
      },
      {
        onSuccess: (res) => onArticleShared(),
      }
    );
  };

  const close = () => {
    dispatch(modalActions.hideModal());
  };

  const onArticleShared = () => {
    dispatch(
      modalActions.showModal({
        modalType: ModalTypes.SHARE_SUCCESS_MODAL,
        modalProps: {},
      })
    );
  };

  return (
    <Modal
      onClose={close}
      className="w-[536px] overflow-visible overflow-y-visible"
      overflow
      containerPaddingClass="py-0 px-0"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pt-6 px-6">
          <ModalHeader
            mode={mode}
            hasConnections={
              (statusOverview && statusOverview.length > 0) || false
            }
            onBack={() => setMode('view')}
            onClose={close}
          />

          <MultiSelect
            control={control}
            isLoading={isLoadingSharingConnections || isLoadingStatusOverview}
            sharingTenants={sharingConnections}
            statusOverview={statusOverview}
          />

          {ownerUser && mode === 'view' && (
            <ArticleOwner articleOwner={ownerUser} />
          )}

          {mode === 'view' && statusOverview && statusOverview.length > 0 && (
            <SharingStatusOverview
              statusOverview={statusOverview}
              sender={sharingConnections?.sourceName}
              articleId={articleId}
              articleOwner={articleOwner}
            />
          )}
          {isLoadingStatusOverview && (
            <div className="h-10">
              <PageLoader />
            </div>
          )}

          {mode === 'save' && (
            <textarea
              {...register('comment')}
              rows={3}
              className="bg-grayscale-bg-dark mt-5 p-4 w-full text-sm rounded resize-none"
              placeholder="Add an optional short message to the team(s). E.g. what’s your ideal 
audience and publish date?"
            ></textarea>
          )}
        </div>

        <ModalFooter
          mode={mode}
          submitDisabled={!formState.isValid}
          isLoading={isLoading}
        />
      </form>
    </Modal>
  );
};

export default ForwardModal;
