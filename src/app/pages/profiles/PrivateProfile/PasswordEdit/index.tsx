import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordInput, Button, Alert } from 'app/components';
import { updatePasswordSchema } from 'app/form/validation';
import { useRouteAlert } from 'app/hooks';
import { useProfileTranslation } from 'app/internationalization/hooks';
import React from 'react';
import { useForm, useFormState } from 'react-hook-form';
import KeyIcon from 'remixicon-react/Key2LineIcon';

import useUpdatePasswordMutation from './useUpdatePasswordMutation';

const PasswordEdit: React.FC = () => {
  const { t } = useProfileTranslation();
  const { update, isLoading, isError } = useUpdatePasswordMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      current_password: '',
      password: '',
      password_confirmation: '',
    },
    resolver: zodResolver(updatePasswordSchema),
    shouldFocusError: true,
  });

  const { isDirty } = useFormState({ control });

  useRouteAlert(
    isDirty,
    t('Your unsaved changes will be lost. Save changes before closing?')
  );

  return (
    <div>
      <div className="mt-6">
        <p className="text-grayscale-primary text-lg">{t('Update Password')}</p>
      </div>
      <form
        onSubmit={handleSubmit((values) => {
          if (!isLoading) {
            update(values, {
              onSuccess: () => reset(),
            });
          }
        })}
      >
        <div className="row mt-4">
          <div className="col-6">
            <PasswordInput
              register={register}
              icon={<KeyIcon />}
              error={errors.current_password?.message}
              name="current_password"
              placeholder={`${t('Current password')}`}
            />
            {isError && (
              <Alert className="mt-2" variant="error">
                {t(
                  'Current password is incorrect. To reset your password, please sign out and select “Forgot password”'
                )}
              </Alert>
            )}
          </div>
        </div>
        <div className="row mt-12">
          <div className="col-6">
            <PasswordInput
              register={register}
              icon={<KeyIcon />}
              name="password"
              placeholder={`${t('New password')}`}
            />
            {errors.password && (
              <Alert className="mt-2" variant="error">
                {t(
                  'Password not secure enough. Please follow the guidelines below.'
                )}
              </Alert>
            )}
          </div>
          <div className="col-6" />
          <div className="col-6 mt-2">
            <PasswordInput
              register={register}
              icon={<KeyIcon />}
              name="password_confirmation"
              error={errors.password_confirmation?.message}
              placeholder={`${t('Confirm new password')}`}
            />
            <p className="mt-4 text-grayscale-secondary text-sm">
              {t(
                'Passwords must be at least 6 characters long and contain a capital letter and a number.'
              )}
            </p>
          </div>
        </div>
        <div className="row mt-21">
          <div className="col-4 offset-4">
            <Button loading={isLoading} type="submit" variant="primary">
              {t('Save changes')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PasswordEdit;
