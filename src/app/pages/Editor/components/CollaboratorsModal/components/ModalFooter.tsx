import { cx } from '@emotion/css';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { Link1 } from 'iconsax-react';
import { toast } from 'react-toastify';

import SimpleToast from '../../Toast/SimpleToast';
import SimpleToastContainer from '../../Toast/SimpleToastContainer';

const ModalFooter = ({ articleId }: { articleId?: number }) => {
  const { t } = useArticlesTranslation();

  const copyToClipboard = () => {
    if (!articleId) return;

    navigator.clipboard.writeText(
      `${window.location.origin}/#/article-studio/editor/${articleId}/edit`
    );

    showToast(t('Link Copied'));
  };

  const showToast = (text: string) => {
    toast.dismiss();

    toast(<SimpleToast text={text} />, {
      position: 'bottom-center',
      autoClose: 8000,
      closeButton: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      containerId: 'LinkCopied',
    });
  };

  return (
    <>
      <button
        className={cx(
          'flex w-full items-center justify-end h-10 mt-4 bg-grayscale-bg-dark text-focus rounded-b-lg',
          { invisible: !articleId }
        )}
        onClick={copyToClipboard}
      >
        <Link1 size={24} />
        <span className="ml-3 mr-5 text-sm">{t('Copy link')}</span>
      </button>
      <SimpleToastContainer toastId="LinkCopied" />
    </>
  );
};

export default ModalFooter;
