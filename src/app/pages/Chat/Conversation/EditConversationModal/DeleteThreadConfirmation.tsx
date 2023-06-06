import { Button } from 'app/components';
import { useChatTranslation } from 'app/internationalization/hooks';
import { routes } from 'app/router';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { useRemoveThreadMutation, useThreadId } from '../../hooks';

interface DeleteThreadConfirmationProps {
  onCancel: () => void;
}

const DeleteThreadConfirmation: FC<DeleteThreadConfirmationProps> = ({
  onCancel,
}) => {
  const threadId = useThreadId();
  const { mutate, isLoading } = useRemoveThreadMutation();
  const history = useHistory();
  const { t } = useChatTranslation();
  return (
    <div className="w-full flex flex-col flex-1">
      <p>{t('Are you sure you want to delete this group?')}</p>
      <div className="row mt-8">
        <div className="col-5 offset-2">
          <Button onClick={onCancel} variant="secondary">
            {t('Cancel')}
          </Button>
        </div>
        <div className="col-5">
          <Button
            disabled={isLoading}
            variant="primary"
            onClick={() =>
              mutate(threadId, {
                onSuccess: () => {
                  history.push(routes.chat.create());
                },
              })
            }
          >
            {t('Delete')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteThreadConfirmation;
