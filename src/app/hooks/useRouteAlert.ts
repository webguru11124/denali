import { useDispatch, useSelector } from 'app/hooks';
import { actions, selectors } from 'app/store/modal';
import { useEffect } from 'react';

const useRouteAlert = (shouldDisplay: boolean, message: string) => {
  const dispatch = useDispatch();
  const saveAlert = useSelector(selectors.getSaveAlert);
  useEffect(() => {
    if (!saveAlert.message && shouldDisplay) {
      dispatch(
        actions.saveAlertTriggered({
          message,
        })
      );
    } else if (!shouldDisplay && saveAlert.message) {
      dispatch(
        actions.saveAlertTriggered({
          message: null,
        })
      );
    }
  }, [saveAlert, dispatch, shouldDisplay, message]);

  useEffect(
    () => () => {
      dispatch(
        actions.saveAlertTriggered({
          message: null,
        })
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};

export default useRouteAlert;
