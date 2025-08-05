import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Alert } from 'app/components';
import { useUrlQuery } from 'app/hooks';
import { useLoginTranslation } from 'app/internationalization/hooks';
import { routes } from 'app/router';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import MailIcon from 'remixicon-react/MailLineIcon';

import LoginContext from './LoginContext';
import useTenantsMutation from './useTenantsMutation';
import { loginEmailSchema } from './validationSchema';

const LoginEmail: React.FC = () => {
  const { onNext } = useContext(LoginContext);

  if (!onNext) throw new Error('Component does not have context');

  const { t } = useLoginTranslation();
  const queryEmail = useUrlQuery('email');
  const queryToken = useUrlQuery('token');
  const history = useHistory();

  const { getTenants, isLoading, isError } = useTenantsMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginEmailSchema),
    defaultValues: {
      email: queryEmail || '',
    },
  });

  const onSubmit = (callback: () => void) => {
    handleSubmit(({ email }) => {
      const queryParams = new URLSearchParams();
      queryParams.set('email', email);
      if (queryToken) {
        queryParams.set('token', queryToken);
      }

      history.replace({
        pathname: routes.login.create(),
        search: queryParams.toString(),
      });
      getTenants(email, callback);
    })();
  };

  useEffect(() => {
    if (queryEmail) {
      onSubmit(onNext);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p className="text-center text-lg font-bold mb-3">
        {t('Welcome to Atobi 👋')}
      </p>
      <p className="mb-2 text-center">
        {t(
          `Atobi is an invite-only work app. You have received an email with, further instructions.`
        )}
      </p>
      <p className="text-center mb-8">
        {t('Need help? Contact us at')}{' '}
        <a href={`mailto:${t('help@atobi.io')}`}>{t('help@atobi.io')}</a>
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(onNext);
        }}
      >
        <Input
          error={errors.email?.message}
          register={register}
          placeholder={`${t('Enter your email')}`}
          className="mb-4"
          name="email"
          icon={<MailIcon />}
        />
        {isError && (
          <Alert variant="error" className="mb-4">
            {t('Sorry, we couldn’t find an account with that email.')}
          </Alert>
        )}
        <Button
          loading={isLoading}
          variant="primary"
          type="submit"
          onClick={() => {
            onSubmit(onNext);
          }}
        >
          {t('Continue')}
        </Button>
      </form>
    </div>
  );
};

export default LoginEmail;
