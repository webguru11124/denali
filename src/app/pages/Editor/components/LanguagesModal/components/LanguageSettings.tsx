import { ActionsDropdown } from 'app/components';
import { useIsVisible } from 'app/hooks';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { actions, selectors } from 'app/store/editor';
import { Language } from 'app/store/editor/types';
import { ReactComponent as ThreeDots } from 'assets/icons/three_dots_vertical.svg';
import { Edit2, LocationTick, Trash } from 'iconsax-react';
import noop from 'lodash/noop';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Popover } from 'react-tiny-popover';
import { toast } from 'react-toastify';

import UndoToast from '../../Toast/UndoToast';

interface LanguageSettingsProps {
  language: Language;
  parentRef: HTMLDivElement;
}

const LanguageSettings = ({ language, parentRef }: LanguageSettingsProps) => {
  const { name, code, isDefault, active } = language;
  const [open, setOpen] = useState(false);

  const { t } = useArticlesTranslation();
  const dispatch = useDispatch();
  const languages = useSelector(selectors.getSelectedLanguages);
  const mainLanguage = languages.find((l) => l.isDefault) || {
    name,
    code,
    isDefault,
    active,
  };

  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(ref);

  useEffect(() => {
    if (!isVisible) setOpen(false);
  }, [isVisible]);

  const clearToasts = () => {
    toast.dismiss();
    toast.clearWaitingQueue();
  };

  const setMainLanguage = () => {
    dispatch(actions.setMainLanguage(code));
    clearToasts();
    toast(
      <UndoToast
        text={`${t('The Main Language as been changed to')} ${name}`}
        icon={<span className="text-lg2">✨</span>}
        onClick={() => dispatch(actions.setMainLanguage(mainLanguage.code))}
      />,
      {
        position: 'bottom-center',
        autoClose: 8000,
        closeButton: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        containerId: 'Languages',
      }
    );
  };

  const removeLanguage = () => {
    dispatch(actions.removeLanguage(code));
    clearToasts();
    toast(
      <UndoToast
        text={`${name} ${t('was removed')}`}
        icon={<span className="text-lg2">✨</span>}
        onClick={() => {
          dispatch(actions.addLanguage({ name, code, isDefault, active }));
          toast.dismiss();
        }}
      />,
      {
        position: 'bottom-center',
        autoClose: 8000,
        closeButton: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        containerId: 'Languages',
      }
    );
  };

  const items = [
    {
      text: `${t('Set as Main Language')}`,
      Icon: LocationTick,
      disabled: isDefault,
      onClick: setMainLanguage,
    },
    {
      text: `${t('Auto-Translate')}`,
      Icon: Edit2,
      disabled: isDefault,
      tag: true,
      onClick: noop,
    },
    {
      text: `${t('Delete')}`,
      Icon: Trash,
      disabled: isDefault || active,
      onClick: removeLanguage,
    },
  ];

  return (
    <Popover
      ref={ref}
      containerClassName="z-50"
      isOpen={open}
      positions={['bottom']}
      align="end"
      onClickOutside={() => setOpen(false)}
      content={<ActionsDropdown items={items} />}
      parentElement={parentRef}
    >
      <div className="ml-auto">
        <div className="flex justify-center">
          <div className="relative rounded-xl border border-grayscale-bg-dark shadow-atobi bg-white">
            <button
              onClick={() => setOpen((isOpen) => !isOpen)}
              className="w-10 h-10 flex items-center justify-center whitespace-nowrap z-999"
              type="button"
              data-bs-toggle="dropdown"
            >
              <ThreeDots />
            </button>
          </div>
        </div>
      </div>
    </Popover>
  );
};

export default LanguageSettings;
