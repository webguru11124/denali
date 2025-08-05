import { selectors } from 'app/store/modal';
import { useSelector } from 'react-redux';
import { Prompt } from 'react-router-dom';

const SaveAlertHandler = () => {
  const saveAlert = useSelector(selectors.getSaveAlert);

  return (
    <>{saveAlert.message && <Prompt when message={saveAlert.message} />}</>
  );
};

export default SaveAlertHandler;
