import { cx } from '@emotion/css';
import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { VerticalChevron } from 'app/components';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { ArrowForwardSquare, Calendar, ProfileAdd, Send } from 'iconsax-react';
import noop from 'lodash/noop';
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

interface PublishDropdownProps {
  disabled: boolean;
  onPublishClick: VoidFunction;
  addCollaboratorClick: VoidFunction;
  onScheduleClick: VoidFunction;
  onShareClick?: VoidFunction;
}

const PublishDropdown = ({
  disabled,
  onPublishClick,
  addCollaboratorClick,
  onScheduleClick,
  onShareClick,
}: PublishDropdownProps) => {
  const { t } = useArticlesTranslation();
  const { data: user } = useAuthenticatedUser();

  const [open, setOpen] = useState(false);

  const forwardDisabled = disabled || onShareClick === undefined;
  const hasConnectAccess = user?.permissions.modules.connectAccess;

  return (
    <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
      <div className="flex relative">
        <button
          className={cx(
            'flex items-center justify-center ml-4 w-[120px] h-10 rounded-l-xl border-transparent',
            {
              'bg-focus text-white': !disabled,
              'bg-gray-light text-grayscale-secondary': disabled,
            }
          )}
          disabled={disabled}
          onClick={() => onPublishClick()}
        >
          <Send size={24} className="mr-2" />
          <span className="text-sm">{t('Publish')}</span>
        </button>
        <div
          className={cx(
            'flex items-center justify-center ml-0.5 w-[36px] rounded-r-xl text border-transparent',
            {
              'bg-focus text-white': !disabled,
              'bg-gray-light text-grayscale-secondary': disabled,
            }
          )}
        >
          <VerticalChevron
            disabled={disabled}
            onClick={() => setOpen((prev) => !prev)}
            open={open}
            className={cx('w-4', {
              'text-white': !disabled,
              'text-grayscale-secondary': disabled,
            })}
          />
        </div>

        {open && (
          <div className="flex flex-col absolute w-[218px] bg-white z-50 rounded-lg shadow-lg top-10 right-0 bg-clip-padding shadow-atobi">
            <button
              className="flex items-center justify-between hover:bg-focus-background px-4 py-2 rounded-t-lg"
              onClick={addCollaboratorClick}
            >
              <div>
                <ProfileAdd size={24} />
              </div>
              <div className="flex flex-col items-start justify-center text-start ml-2.5">
                <span className="text-sm">{t('Add Collaborators')}</span>
                <span className="text-xs text-grayscale-secondary">
                  {t('Add others to collaborate on the article')}
                </span>
              </div>
            </button>
            {hasConnectAccess && (
              <>
                <button
                  className="flex items-center justify-between hover:bg-focus-background px-4 py-2"
                  onClick={onScheduleClick}
                >
                  <div>
                    <Calendar size={24} />
                  </div>
                  <div className="flex flex-col items-start justify-center text-start ml-2.5">
                    <span className="text-sm">{t('Schedule')}</span>
                    <span className="text-xs text-grayscale-secondary">
                      {t('Schedule for later publishing')}
                    </span>
                  </div>
                </button>
                <button
                  className={cx(
                    'flex items-center justify-between px-4 py-2 rounded-b-lg',
                    { 'hover:bg-focus-background': !forwardDisabled }
                  )}
                  onClick={onShareClick}
                  disabled={forwardDisabled}
                >
                  <div>
                    <ArrowForwardSquare
                      size={24}
                      className={cx({
                        'text-grayscale-secondary': forwardDisabled,
                        'text-black': !forwardDisabled,
                      })}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center text-start ml-2.5">
                    <span
                      className={cx('text-sm', {
                        'text-grayscale-secondary': forwardDisabled,
                        'text-black': !forwardDisabled,
                      })}
                    >
                      {t('Forward')}
                    </span>
                    <span className="text-xs text-grayscale-secondary">
                      {t('Forward copy to external teams outside your company')}
                    </span>
                  </div>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default PublishDropdown;
