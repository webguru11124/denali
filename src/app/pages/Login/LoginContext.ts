import { createContext } from 'react';

import { LoginStep, LoginFlow } from './types';

interface LoginContext {
  currentStep: LoginStep;
  onNext: () => void;
  emailToken: string | undefined;
  emailTokenRetrieved: (token: string) => void;
  resetSteps: () => void;
  loginFlowChanged: (flow: LoginFlow) => void;
  loginFlow: LoginFlow;
}

const loginContext = createContext<LoginContext>({
  currentStep: LoginStep.email,
  onNext: () => null,
  resetSteps: () => null,
  emailToken: undefined,
  emailTokenRetrieved: () => null,
  loginFlowChanged: () => null,
  loginFlow: LoginFlow.login,
});

export default loginContext;
