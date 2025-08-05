import { css } from '@emotion/css';
import { zodResolver } from '@hookform/resolvers/zod';
import { hooks } from 'app/api/auth';
import { Input, Button, SelectBox, Spinner, Alert } from 'app/components';
import { updateProfileSchema } from 'app/form/validation';
import { useRouteAlert, useSelector, useDispatch } from 'app/hooks';
import {
  useProfileTranslation,
  useErrorTranslation,
  useModulesTranslation,
} from 'app/internationalization/hooks';
import { routes } from 'app/router';
import { selectors, actions } from 'app/store/auth';
import { useForm, Controller } from 'react-hook-form';
import { Trans } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import PhoneIcon from 'remixicon-react/SmartphoneLineIcon';
import TranslateIcon from 'remixicon-react/TranslateIcon';
import UserIcon from 'remixicon-react/UserLineIcon';

import useLanguagesQuery from './useLanguagesQuery';
import useUpdateProfileMutation from './useUpdateProfileMutation';

const { useAuthenticatedUser } = hooks;

interface ProfileEditProps {
  onSubmit: () => void;
  isLoading: boolean;
}

const ProfileEdit = ({ onSubmit, isLoading }: ProfileEditProps) => {
  const { t } = useProfileTranslation();
  const { t: tModules } = useModulesTranslation();
  const { t: tError } = useErrorTranslation();
  const { data: languages, isLoading: isLanguagesLoading } =
    useLanguagesQuery();
  const dispatch = useDispatch();
  const selectedLanguage = useSelector(selectors.getTranslationLanguage);
  const history = useHistory();

  const { data: user } = useAuthenticatedUser();
  const {
    update,
    isError,
    isLoading: isProfileUpdating,
  } = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
    shouldFocusError: true,
    defaultValues: {
      first_name: user?.firstName || '',
      last_name: user?.lastName || '',
      phone: user?.phone || '',
      translation_language: selectedLanguage || '',
    },
    shouldUnregister: false,
  });

  useRouteAlert(
    isDirty && !isSubmitSuccessful,
    t('Your unsaved changes will be lost. Save changes before closing?')
  );

  if (isLanguagesLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const submit = (data: {
    first_name: string;
    last_name: string;
    phone: string;
    translation_language: string;
  }) => {
    if (!isProfileUpdating) {
      onSubmit();
      update(
        data,
        {
          onSuccess: () => {
            reset();
            toast.success('Changes saved');
            history.push(routes.profile.create('view'));
          },
        }
      );
    }
  };

  return (
    <div className="mt-6">
      <div className="mt-6">
        <p className="text-grayscale-primary text-lg">{tModules('Profile')}</p>
        <p className="text-grayscale-secondary text-sm mt-1">
          {t('Your name will be visible for your colleagues.')}
        </p>
      </div>
      <form onSubmit={handleSubmit(submit)}>
        {isError && (
          <Alert variant="error">
            {tError('Something went wrong, please try again')}
          </Alert>
        )}
        <div className="row">
          <div className="col-6 mt-6">
            <Input
              error={errors?.first_name?.message}
              icon={<UserIcon />}
              name="first_name"
              register={register}
              placeholder={`${t('First name')}`}
            />
          </div>
          <div className="col-6 mt-6">
            <Input
              error={errors?.last_name?.message}
              name="last_name"
              icon={<UserIcon />}
              register={register}
              placeholder={`${t('Last name')}`}
            />
          </div>
          <div className="col-6 mt-6">
            <Input
              error={errors?.phone?.message}
              name="phone"
              register={register}
              icon={<PhoneIcon />}
              placeholder={`${t('Phone number')}`}
            />
          </div>
          <div className="col-6" />
          <div className="col-6 mt-8">
            <p className="text-grayscale-primary text-lg">
              {t('Automatic Translation')}
            </p>
            <div className="text-grayscale-secondary mb-6 text-sm mt-1">
              <Trans
                i18nKey="profile.When clicking <icon/> translate content to the chosen language."
                components={{
                  icon: <TranslateIcon className="w-4 mx-1 inline" />,
                }}
              />
            </div>
            <Controller
              name="translation_language"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <SelectBox
                  optionsContainerClassName={css`
                    max-height: 200px !important;
                  `}
                  onChange={onChange}
                  options={
                    languages?.map(({ code, name }) => ({
                      value: code,
                      label: name,
                    })) || []
                  }
                  placeholder={`${t('Preferred translation language')}`}
                  value={value}
                  error={error?.message}
                />
              )}
            />
          </div>
          <div className="row mt-21">
            <div className="col-4 offset-4">
              <Button
                loading={isProfileUpdating || isLoading}
                type="submit"
                variant="primary"
              >
                {t('Save changes')}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
