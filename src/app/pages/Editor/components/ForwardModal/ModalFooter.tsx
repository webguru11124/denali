import { cx } from '@emotion/css';
import { PageLoader } from 'app/components';
import { useArticlesTranslation } from 'app/internationalization/hooks';

import { Mode } from '.';

interface ModalFooterProps {
  mode: Mode;
  submitDisabled: boolean;
  isLoading: boolean;
}
const ModalFooter = ({ mode, submitDisabled, isLoading }: ModalFooterProps) => {
  const { t } = useArticlesTranslation();
  return mode === 'save' ? (
    <div className="flex items-center justify-center w-full px-6">
      {isLoading ? (
        <div className="h-12 mb-4 mt-5">
          <PageLoader />
        </div>
      ) : (
        <button
          type="submit"
          className={cx(
            'w-[170px] h-12 rounded-xl text-sm border-transparent  mb-4 mt-5',
            {
              'bg-focus text-white': !submitDisabled,
              'bg-gray-light text-grayscale-secondary': submitDisabled,
            }
          )}
          disabled={submitDisabled}
        >
          {t('Forward')}
        </button>
      )}
    </div>
  ) : (
    <div className="flex w-full items-center justify-end h-10 mt-4 bg-grayscale-bg-dark text-grayscale-secondary rounded-b-lg">
      <span className="ml-3 mr-5 text-xs">
        {t('Looking to connect with a team that isn’t on the list? Contact')}{' '}
        <a href="">
          <u>Atobi Support</u>
        </a>
      </span>
    </div>
  );
};

export default ModalFooter;
