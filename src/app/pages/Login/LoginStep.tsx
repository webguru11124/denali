import {
  FeatureNames,
  useFeatures,
} from '@paralleldrive/react-feature-toggles';
import { isActiveFeatureName } from 'app/utils';
import { FC, useContext } from 'react';

import LoginContext from './LoginContext';
import LoginEmail from './LoginEmail';
import LoginPasswordIdentityServer from './LoginPasswordIdentityServer';
import LoginPasswordLocal from './LoginPasswordLocal';
import LoginVerify from './LoginVerify';
import ResetPassword from './ResetPassword';
import SelectTenant from './SelectTenant';
import { LoginStep as LoginStepType, LoginFlow } from './types';

const getLoginFlowComponent = (step: LoginStepType, features: FeatureNames) => {
  switch (step) {
    case LoginStepType.selectTenant:
      return SelectTenant;
    case LoginStepType.password:
      return LoginPasswordLocal;

    default:
      throw new Error(`Unknown step in login flow: ${step}`);
  }
};

const getPasswordFlowComponent = (step: LoginStepType) => {
  switch (step) {
    case LoginStepType.resetPasswordVerifyToken:
      return LoginVerify;
    case LoginStepType.resetPassword:
      return ResetPassword;
    default:
      throw new Error(`Unknown step in password reset flow: ${step}`);
  }
};

const getComponent = (
  step: LoginStepType,
  flow: LoginFlow,
  features: FeatureNames
) => {
  if (step === LoginStepType.email) {
    return LoginEmail;
  }

  switch (flow) {
    case LoginFlow.login:
      return getLoginFlowComponent(step, features);
    case LoginFlow.changePassword:
      return getPasswordFlowComponent(step);
    default:
      throw new Error(`Unknown login flow: ${flow}`);
  }
};

const LoginStep: FC = () => {
  const { currentStep, loginFlow } = useContext(LoginContext);
  const features = useFeatures();

  const StepComponent = isActiveFeatureName('identityServer', features)
    ? LoginPasswordIdentityServer
    : getComponent(currentStep, loginFlow, features);
  return (
    <div>
      <StepComponent />
    </div>
  );
};

export default LoginStep;
