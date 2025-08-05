import { cx } from '@emotion/css';
import dayjs from 'dayjs';
import { ArrowDown2, SmsTracking } from 'iconsax-react';
import { useState } from 'react';
import { Article } from 'submodules/common-ui/generated/api/gcs';

interface SharedCommentPopupProps {
  article: Article;
}

const SharedCommentPopup = ({ article }: SharedCommentPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col items-end fixed bottom-0 right-0 mr-6 mb-6">
      {isOpen && (
        <div className="flex flex-col p-2 bg-white rounded-[24px] rounded-br-[9px] max-w-[392px] z-10 transform translate-y-1">
          <div className="flex flex-col rounded-xl rounded-br-[1px] bg-gray px-4 py-2">
            <div className="flex">
              <SmsTracking size={20} />
              <span className="ml-2 text-sm font-bold">
                {article.originalTenant?.name ?? ''}
              </span>
            </div>

            <span className="my-1 text-sm">
              {article?.sharingComment ?? ''}
            </span>
            <span className="text-xs">
              {dayjs(article.createdAt).format('DD MMM YYYY')}
            </span>
          </div>
        </div>
      )}

      <button
        className={cx(
          'flex items-center justify-center w-10 h-10 bg-gray rounded',
          { 'rounded-tr-[4px]': isOpen }
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen && <ArrowDown2 size={24} className="text-focus" />}
        {!isOpen && <SmsTracking size={24} className="text-focus" />}
      </button>
    </div>
  );
};

export default SharedCommentPopup;
