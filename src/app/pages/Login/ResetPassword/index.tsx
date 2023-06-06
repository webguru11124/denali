import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordInput, Button, Alert } from 'app/components';
import { changePasswordSchema } from 'app/form/validation';
import { useUrlQuery } from 'app/hooks';
import { useLoginTranslation } from 'app/internationalization/hooks';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import KeyIcon from 'remixicon-react/Key2LineIcon';

import LoginContext from '../LoginContext';
import useLoginMutation from '../useLoginMutation';

import useChangePasswordMutation from './useChangePasswordMutation';

const ResetPassword: React.FC = () => {
  const queryEmail = useUrlQuery('email');
  const { emailToken } = useContext(LoginContext);
  const {
    mutate: changePassword,
    isError,
    isLoading,
  } = useChangePasswordMutation();
  const { login, isLoading: isLoginLoading } = useLoginMutation();
  const { t } = useLoginTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  });

  const isRequestPending = isLoading || isLoginLoading;

  return (
    <div>
      <p className="text-center text-lg font-bold">
        {t('Choose Your Password 🔑')}
      </p>
      <p className="text-center mt-3">
        {t(
          'Passwords must be at least six characters long and contain a capital letter and a number.'
        )}
      </p>
      {isError && (
        <Alert variant="error">
          {t('Something went wrong, please restart the page and try again')}
        </Alert>
      )}
      <form
        className="mt-8"
        onSubmit={handleSubmit(({ password, passwordConfirmation }) => {
          if (queryEmail && emailToken) {
            changePassword(
              {
                token: emailToken,
                email: queryEmail,
                password,
                passwordConfirmation,
              },
              {
                onSuccess: () => {
                  toast.success(t('Password updated'));
                  login({
                    username: queryEmail,
                    password,
                  });
                },
              }
            );
          }
        })}
      >
        <PasswordInput
          error={errors.password?.message}
          register={register}
          placeholder={`${t('Enter new password')}`}
          className="mb-3"
          name="password"
          disabled={isRequestPending}
          icon={<KeyIcon />}
        />

        <PasswordInput
          error={errors.passwordConfirmation?.message}
          register={register}
          placeholder={`${t('Confirm password')}`}
          className="mb-3"
          disabled={isRequestPending}
          name="passwordConfirmation"
          icon={<KeyIcon />}
        />

        <Button
          disabled={isRequestPending}
          className="mt-4"
          variant="primary"
          type="submit"
        >
          {t('Continue')}
        </Button>
      </form>
    </div>
  );
};
export default ResetPassword;
