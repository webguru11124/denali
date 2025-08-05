import { cx } from '@emotion/css';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { Gallery, TickSquare } from 'iconsax-react';
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import CheckLineIcon from 'remixicon-react/CheckLineIcon';
import {
  MediaTaskBlockTypeEnum,
  SimpleTaskBlockTypeEnum,
} from 'submodules/common-ui/generated/api/gcs';

interface PrivacyProps {
  disabled?: boolean;
  type: MediaTaskBlockTypeEnum | SimpleTaskBlockTypeEnum;
  onClick: (type: MediaTaskBlockTypeEnum | SimpleTaskBlockTypeEnum) => void;
}

const TaskType = ({ disabled, type, onClick }: PrivacyProps) => {
  const { t } = useArticlesTranslation();

  const [open, setOpen] = useState(false);

  const options = [
    {
      taskType: SimpleTaskBlockTypeEnum.SimpleTask,
      name: 'Task',
      text: t('Confirm and track if something is done'),
      Icon: TickSquare,
      className: '',
      click: () => onClick(SimpleTaskBlockTypeEnum.SimpleTask),
    },
    {
      taskType: MediaTaskBlockTypeEnum.MediaTask,
      name: 'Media Task',
      text: t('Get visual confirmation of how it looks'),
      Icon: Gallery,
      className: 'rounded-b-lg',
      click: () => onClick(MediaTaskBlockTypeEnum.MediaTask),
    },
  ];

  const toggleDropdown = () => {
    if (disabled) return;
    setOpen((prev) => !prev);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
      <div className="relative">
        {type === SimpleTaskBlockTypeEnum.SimpleTask ? (
          <TickSquare
            size={20}
            className="text-[#9798C8] mr-3"
            onClick={toggleDropdown}
          />
        ) : (
          <Gallery
            size={20}
            className="text-[#9798C8] mr-3"
            onClick={toggleDropdown}
          />
        )}
        {open && (
          <div className="absolute bg-white rounded-lg z-50 shadow-lg m-0 bg-clip-padding left-2 top-8 transform -translate-y-2 shadow-atobi p3">
            <div className="flex items-center h-10 pl-4">
              <span className="text-xs text-black font-bold">
                {t('Actions')}
              </span>
            </div>
            {options.map((opt) => {
              const { taskType, name, text, className, Icon, click } = opt;
              return (
                <button
                  key={text}
                  className={cx(
                    'text-sm w-full px-3 py-2 font-normal flex items-center whitespace-nowrap bg-transparent hover:bg-hover-blue text-black',
                    className
                  )}
                  onClick={() => click()}
                >
                  <Icon size={20} className="text-[#9798C8] mr-3" />

                  <div className="flex flex-col mr-2 items-start">
                    <span className="text-black">{name}</span>
                    <span className="text-grayscale-secondary">{text}</span>
                  </div>

                  <CheckLineIcon
                    size={20}
                    className={cx('text-focus ml-auto', {
                      invisible: taskType !== type,
                    })}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default TaskType;
