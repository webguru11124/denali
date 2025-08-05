import React from 'react';
import { useHistory } from 'react-router-dom';
import ArrowLeftIcon from 'remixicon-react/ArrowLeftSLineIcon';

const BackButton: React.FC = () => {
  const history = useHistory();
  return (
    <button
      type="button"
      onClick={history.goBack}
      className="p-2 border border-gray-light rounded-lg mr-auto text-grayscale-secondary"
    >
      <ArrowLeftIcon />
    </button>
  );
};

export default BackButton;
