import { CodeInput, ButtonSpinner, Button, Alert } from 'app/components';
import { useUrlQuery } from 'app/hooks';
import { useLoginTranslation } from 'app/internationalization/hooks';
import React, { useState, useEffect, useContext } from 'react';
import { Trans } from 'react-i18next';

import LoginContext from '../LoginContext';

import usePasswordResetMutation from './usePasswordResetMutation';
import useValidateEmailTokenMutation from './useValidateEmailTokenMutation';

const LoginVerify: React.FC = () => {
  const { emailTokenRetrieved, onNext } = useContext(LoginContext);

  if (!emailTokenRetrieved) throw new Error('Component has no context');
  const { t } = useLoginTranslation();
  const queryToken = useUrlQuery('token');
  const [token, setToken] = useState(queryToken || '');
  const email = useUrlQuery('email');
  const { requestReset, isLoading: isPasswordResetLoading } =
    usePasswordResetMutation();
  const {
    mutate: validateToken,
    isLoading,
    isError,
  } = useValidateEmailTokenMutation();

  useEffect(() => {
    if (!queryToken) {
      requestReset(email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token.length !== 6) return undefined;

    validateToken(
      {
        email,
        token,
      },
      {
        onSuccess: (data) => {
          emailTokenRetrieved(data.data.resetToken);
          onNext();
        },
      }
    );
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <div className="flex flex-col items-center">
      <p className="text-center text-lg font-bold">{t('You Got Mail! ✉️')}</p>
      <p>
        <Trans
          values={{ email }}
          components={{ bold: <span className="font-bold" /> }}
          i18nKey="login.We sent temporary code"
        />
      </p>
      <div className="mt-8">
        <CodeInput
          value={token}
          onChange={(val) => {
            // Input breaks if we pass disabled prop
            if (!isLoading) {
              setToken(val);
            }
          }}
          name="security_code"
          autoFocus
          isValid={!isError}
        />
      </div>
      {isError && (
        <Alert variant="error" className="mt-2">
          <Trans
            i18nKey="login.The code was incorrect"
            components={{ bold: <span className="font-bold" /> }}
          />
        </Alert>
      )}
      <div className="w-full mt-8">
        <Button
          disabled={isLoading}
          variant="secondary"
          className="w-full flex justify-center"
          onClick={() => requestReset(email)}
        >
          {isLoading || isPasswordResetLoading ? (
            <ButtonSpinner />
          ) : (
            t('Get new code')
          )}
        </Button>
      </div>
    </div>
  );
};

export default LoginVerify;
