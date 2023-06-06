import { useArticlesTranslation } from 'app/internationalization/hooks';
import { Calendar, People, ArrowLeft, Notepad } from 'iconsax-react';
import CloseLineIcon from 'remixicon-react/CloseLineIcon';

import { Mode } from '.';

interface ModalHeaderProps {
  mode: Mode;
  hasConnections: boolean;
  onBack: VoidFunction;
  onClose: VoidFunction;
}

const ModalHeader = ({
  mode,
  hasConnections,
  onBack,
  onClose,
}: ModalHeaderProps) => {
  const { t } = useArticlesTranslation();
  return (
    <div className="flex flex-col h-full">
      {mode === 'view' && (
        <div className="relative">
          <label
            className="block font-bold text-grayscale-primary"
            htmlFor="collaborator"
          >
            {t('Forward article')}
          </label>
          {hasConnections && (
            <span className="text-grayscale-secondary text-xs">
              {t('Forward to external teams outside your company')}
            </span>
          )}

          {!hasConnections && (
            <>
              <span className="font-bold text-xs text-grayscale-secondary">
                {t('When you forward an article, the external team')}
              </span>
              <div className="flex items-center text-grayscale-secondary text-xs mt-[6px]">
                <Notepad size={16} />
                <span className="ml-[6px]">
                  {t('Receives a copy of the article')}
                </span>
              </div>
              <div className="flex items-center text-grayscale-secondary text-xs mt-[6px]">
                <Calendar size={16} />
                <span className="ml-[6px]">
                  {t('Can schedule and publish the article')}
                </span>
              </div>
              <div className="flex items-center text-grayscale-secondary text-xs mt-[6px]">
                <People size={16} />
                <span className="ml-[6px]">
                  {t('Collaborators & audiences you selected won’t be copied')}
                </span>
              </div>
            </>
          )}

          <button
            className="h-10 w-10 flex justify-center items-center rounded bg-white shadow-atobi text-grayscale-secondary absolute right-0 top-0"
            onClick={onClose}
          >
            <CloseLineIcon />
          </button>
        </div>
      )}

      {mode === 'save' && (
        <>
          <button className="flex items-center font-bold" onClick={onBack}>
            <ArrowLeft size={20} className="mr-2 text-grayscale-secondary" />
            {'Forward Article'}
          </button>
          <span className="text-xs text-grayscale-secondary">
            {t('Invite collaborators outside your company')}
          </span>
        </>
      )}
    </div>
  );
};

export default ModalHeader;
