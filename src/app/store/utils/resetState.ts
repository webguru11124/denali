import { actions as authActions } from '../auth';
import { actions as chatActions } from '../chat';
import { store } from '../index';
import { actions as kpiActions } from '../kpis';
import { actions as modalActions } from '../modal';
import { actions as navigationActions } from '../navigation';
import { actions as requestActions } from '../request';

const actionsToDispatch = [
  requestActions.stateReset(),
  authActions.stateReset(),
  kpiActions.stateReset(),
  modalActions.stateReset(),
  navigationActions.stateReset(),
  chatActions.stateReset(),
];

const resetState = () => {
  actionsToDispatch.forEach((action) => store.dispatch(action));
};

export default resetState;
