import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordInput, Button, Alert } from 'app/components';
import { useUrlQuery } from 'app/hooks';
import {
  useLoginTranslation,
  useErrorTranslation,
} from 'app/internationalization/hooks';
import { routes } from 'app/router';
import { isAxiosError } from 'axios';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Trans } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import KeyIcon from 'remixicon-react/Key2LineIcon';

import LoginContext from './LoginContext';
import { LoginFlow } from './types';
import useLoginMutation from './useLoginMutation';
import { loginPasswordSchema } from './validationSchema';

const LoginPasswordLocal: React.FC = () => {
  const { resetSteps, loginFlowChanged } = useContext(LoginContext);

  if (!resetSteps) throw new Error('Component does not have context');
  const { t } = useLoginTranslation();
  const { t: tError } = useErrorTranslation();
  const queryEmail = useUrlQuery('email');
  const queryToken = useUrlQuery('token');
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginPasswordSchema),
    defaultValues: {
      password: '',
      email: '',
    },
  });

  const { login, isLoading, error } = useLoginMutation();

  useEffect(() => {
    if (queryToken) {
      loginFlowChanged(LoginFlow.changePassword);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderErrorMessage = () => {
    if (!error) return null;

    if (isAxiosError(error) && error?.response?.status === 401) {
      return (
        <Alert variant="error" className="mb-3">
          <Trans
            components={{ bold: <span className="font-bold" /> }}
            i18nKey="login.Your password was incorrect."
          />
        </Alert>
      );
    }

    return (
      <Alert variant="error" className="mb-3">
        {tError('Something went wrong, please try again')}
      </Alert>
    );
  };

  return (
    <div>
      <p className="text-center text-lg font-bold">{t('Welcome Back 👋')}</p>
      <form
        className="mt-8"
        onSubmit={handleSubmit(({ password }) => {
          if (queryEmail) {
            login({
              username: queryEmail,
              password,
            });
          }
        })}
      >
        <PasswordInput
          error={errors.email?.message}
          register={register}
          placeholder={`${t('Enter your password')}`}
          className="mb-3"
          name="password"
          icon={<KeyIcon />}
        />
        {renderErrorMessage()}
        {queryEmail && (
          <div className="flex justify-between">
            <button
              type="button"
              className="text-focus focus:outline-none"
              disabled={isLoading}
              onClick={() => {
                loginFlowChanged(LoginFlow.changePassword);
              }}
            >
              {t('Forgot password?')}
            </button>
            <button
              type="button"
              className="text-focus focus:outline-none"
              disabled={isLoading}
              onClick={() => {
                history.replace(routes.login.create());
                resetSteps();
              }}
            >
              {t('Use a different email address')}
            </button>
          </div>
        )}
        <Button
          loading={isLoading}
          className="mt-4"
          variant="primary"
          type="submit"
        >
          {t('Continue')}
        </Button>
        <Button
          disabled={isLoading}
          variant="secondary"
          onClick={() => loginFlowChanged(LoginFlow.changePassword)}
          className="mt-2"
          type="button"
        >
          {t('New to Atobi?')}
          <span className="text-focus font-bold ml-1">{t('Sign up')}</span>
        </Button>
      </form>
    </div>
  );
};
export default LoginPasswordLocal;
