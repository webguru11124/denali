import { cx } from '@emotion/css';
import { zodResolver } from '@hookform/resolvers/zod';
import useGetUsersQuery from 'app/api/audiences/hooks/useGetUsersQuery';
import { Audience } from 'app/api/audiences/types';
import { Profession, Location } from 'app/api/auth/types';
import useGetProfessionsQuery from 'app/api/professions/hooks/useProfessionsQuery';
import { Input2, Modal, Spinner } from 'app/components';
import {
  useAudiencesTranslation,
  useCommonTranslation,
} from 'app/internationalization/hooks';
import useUpdateAudienceMutation from 'app/pages/Audience/hooks/useUpdateAudienceMutation';
import { actions } from 'app/store/editor';
import { actions as modalActions } from 'app/store/modal';
import { Information } from 'iconsax-react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import CloseLineIcon from 'remixicon-react/CloseLineIcon';

import useCreateAudienceMutation from '../../../hooks/useCreateAudienceQuery';
import { FormFields, schema } from '../../audienceFormSchema';
import LocationDropdown from '../../LocationTree/LocationDropdown';
import ProfessionsDropdown from '../../ProfessionsDropdown';

import AudienceUsers from './AudienceUsers';

export interface AudienceModalProps {
  selectedLocations: Location[];
  selectedProfessions: Profession[];
  id?: number;
  name?: string;
  onAudienceSubmited?: (result: Audience | null) => void;
  onClose?: VoidFunction;
}

const AudienceModal = ({
  selectedLocations,
  selectedProfessions,
  name,
  id,
  onAudienceSubmited,
  onClose,
}: AudienceModalProps) => {
  const dispatch = useDispatch();
  const { t } = useAudiencesTranslation();
  const { t: tc } = useCommonTranslation();

  const { data: professions, isLoading: isLoadingProfessions } =
    useGetProfessionsQuery();
  const { mutate: createAudience, isCreating } = useCreateAudienceMutation();
  const { mutate: updateAudience, isUpdating } = useUpdateAudienceMutation();

  const { register, handleSubmit, control, formState, watch } = useForm({
    defaultValues: {
      name: name ?? '',
      locations: selectedLocations.map((l) => l.id),
      professions: selectedProfessions.map((p) => p.id),
    },
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery({
    locations: watch('locations'),
    professions: watch('professions'),
  });

  const close = () => {
    if (!onClose) {
      dispatch(modalActions.hideModal());
      return;
    }

    onClose();
  };

  const onSubmit = (data: FormFields) => {
    const dataToSubmit = {
      ...data,
      name: {
        en: data.name,
      },
    };
    if (id) {
      editAudience(dataToSubmit);
      return;
    }
    saveAudience(dataToSubmit);
  };

  const saveAudience = (data: {
    name: {
      en: string;
    };
    locations: number[];
    professions: number[];
  }) => {
    createAudience(data, {
      onSuccess: (result) => {
        if (!onAudienceSubmited) {
          onAudienceSubmitedFromArticles(result.data.data);
          return;
        }
        onAudienceSubmited(result.data.data);
        close();
      },
      onError: () => close(),
    });
  };

  const editAudience = (data: {
    name: {
      en: string;
    };
    locations: number[];
    professions: number[];
  }) => {
    if (!id) return;

    updateAudience(
      { data, id },
      {
        onSuccess: (result) => {
          onAudienceSubmited?.(result.data.data);
          close();
        },
        onError: (e) => close(),
      }
    );
  };

  const onAudienceSubmitedFromArticles = (audience: Audience) => {
    if (!audience) return;
    close();
    dispatch(
      actions.addAudience({
        id: audience.id,
        name: audience.name,
        members: users?.length ?? 0,
      })
    );
  };

  return (
    <Modal onClose={close} className="max-w-[488px] h-[714px] py-4">
      <div className="flex flex-col h-full">
        <div className="flex relative">
          <div className="flex flex-col mr-[50px]">
            <span className="font-bold text-grayscale-primary">
              {t('Create Audience')}
            </span>
            <span className="text-xs text-grayscale-secondary">
              {t(
                'Audience is based on locations and professions you select below. Once created it will visible in your audience list.'
              )}
            </span>
          </div>
          <button
            className="h-10 w-10 flex justify-center items-center rounded bg-white shadow-atobi text-grayscale-secondary absolute right-0"
            onClick={close}
          >
            <CloseLineIcon />
          </button>
        </div>

        <form
          className="flex flex-col h-full mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label
              className="block font-bold text-sm text-grayscale-primary mb-2"
              htmlFor="audience"
            >
              {t('Audience Name')}
              <span className="text-error">*</span>
            </label>
            <Input2
              register={register}
              name="name"
              placeholder="Type name for audience"
              isSearch={false}
            />
          </div>
          <div className="mb-4">
            <span className="block font-bold text-sm text-grayscale-primary mb-2">
              {t('Filters')}
            </span>
            <div className="flex justify-between">
              <div className="flex flex-col w-[212px] relative">
                <LocationDropdown
                  control={control}
                  preSelectedLocations={selectedLocations}
                />
                <span className="text-xs text-grayscale-secondary">
                  <span className="text-error">*</span>
                  {tc('required')}
                </span>
              </div>
              <div className="w-[212px] relative">
                <ProfessionsDropdown
                  selectedProfessions={selectedProfessions}
                  professions={professions}
                  control={control}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Information className="text-focus" />
            <span className="text-xs text-grayscale-secondary ml-3">
              {t(
                'New employees will automatically join the audience based on their location & profession'
              )}
            </span>
          </div>
          <AudienceUsers isLoading={isLoadingUsers} users={users} />
          <div className="flex justify-center w-full mt-auto">
            {(isCreating || isUpdating) && <Spinner />}
            {!isCreating && !isUpdating && (
              <button
                className={cx('w-[248px] h-12 rounded-xl text-sm', {
                  'bg-focus text-white hover:bg-hover-primary':
                    formState.isValid,
                  'bg-gray-light text-grayscale-secondary': !formState.isValid,
                })}
              >
                {id ? t('Update Audience') : t('Save Audience')}
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AudienceModal;
