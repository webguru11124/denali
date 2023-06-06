import styled from '@emotion/styled';
import { Logo, PrivacyPolicyLink, ToastContainer } from 'app/components';
import { useUrlQuery } from 'app/hooks';
import useOpenIdManager from 'app/hooks/useOpenIdManager';
import { useLoginTranslation } from 'app/internationalization/hooks';
import { outsideRoutes } from 'app/router';
import loginBackground from 'assets/images/login-background.svg';
import React, { useState } from 'react';

import LoginContext from './LoginContext';
import LoginStep from './LoginStep';
import { LoginStep as LoginStepType, LoginFlow } from './types';
import useTenantsMutation from './useTenantsMutation';

const LoginContainer = styled.div`
  background: url(${loginBackground});
  background-repeat: no-repeat;
  background-size: cover;
`;

const ContentContainer = styled.div`
  height: 46.5rem; // 774px
`;

const StepContainer = styled.div`
  width: 431px;
`;

const getFirstFlowStep = (flow: LoginFlow) => {
  switch (flow) {
    case LoginFlow.login:
      return LoginStepType.email;
    case LoginFlow.changePassword:
      return LoginStepType.resetPasswordVerifyToken;
    default:
      throw new Error(`Unknown login flow: ${flow}`);
  }
};

const nextLoginFlowStep = (step: LoginStepType) => {
  switch (step) {
    case LoginStepType.email:
      return LoginStepType.selectTenant;
    case LoginStepType.selectTenant:
      return LoginStepType.password;
    default:
      return step;
  }
};

const nextChangePasswordFlowStep = (step: LoginStepType) => {
  switch (step) {
    case LoginStepType.resetPasswordVerifyToken:
      return LoginStepType.resetPassword;
    default:
      return step;
  }
};

interface LoginFlowState {
  step: LoginStepType;
  flow: LoginFlow;
}

const DEFAULT_FLOW_STATE = {
  step: LoginStepType.email,
  flow: LoginFlow.login,
};

const Login: React.FC = () => {
  const { t } = useLoginTranslation();
  const { mutateAsync } = useTenantsMutation();

  const [loginFlow, setLoginFlow] =
    useState<LoginFlowState>(DEFAULT_FLOW_STATE);

  useOpenIdManager().redirectCallback();

  const [emailToken, setEmailToken] = useState<string | undefined>();

  // When user is redirected back from identity server with oidc,
  // we want to avoid flickering, so we check if url has code param
  // if yes, we wait while open id client will make requests to fetch token, user info
  // and will be logged in
  const queryCode = useUrlQuery('code');
  const queryLogout = useUrlQuery('logout');
  if (queryCode || queryLogout) {
    return <div />;
  }

  return (
    <LoginContainer className="w-screen h-screen flex justify-center items-center">
      <ToastContainer />
      <ContentContainer className="bg-light relative shadow-card rounded-lg py-12 px-18 flex flex-col items-center">
        {loginFlow.step !== LoginStepType.selectTenant && (
          <div>
            <Logo size="lg" />
          </div>
        )}
        <LoginContext.Provider
          value={{
            loginFlow: loginFlow.flow,
            currentStep: loginFlow.step,
            emailToken,
            emailTokenRetrieved: setEmailToken,
            onNext: () => {
              setLoginFlow((prevFlow) => {
                switch (prevFlow.flow) {
                  case LoginFlow.login:
                    return {
                      ...prevFlow,
                      step: nextLoginFlowStep(prevFlow.step),
                    };
                  case LoginFlow.changePassword:
                    return {
                      ...prevFlow,
                      step: nextChangePasswordFlowStep(prevFlow.step),
                    };
                  default:
                    throw new Error(`Unknown login flow: ${loginFlow}`);
                }
              });
            },
            loginFlowChanged: (flow) => {
              setLoginFlow({
                flow,
                step: getFirstFlowStep(flow),
              });
            },
            resetSteps: () => {
              setLoginFlow(DEFAULT_FLOW_STATE);
            },
          }}
        >
          <StepContainer className="my-auto">
            <LoginStep />
          </StepContainer>
        </LoginContext.Provider>
        <div className="text-center mt-18 text-grayscale-secondary">
          {t('By continuing, you agree to Atobi’s')}{' '}
          <a
            target="_blank"
            className="text-focus"
            href={outsideRoutes.termsOfService.create()}
            rel="noreferrer"
          >
            {t('Terms of Service')}
          </a>
          <br />
          {t('and')}{' '}
          <PrivacyPolicyLink
            text={`${t('Privacy Policy')}`}
            className="text-focus"
          />
        </div>
      </ContentContainer>
    </LoginContainer>
  );
};

export default Login;
