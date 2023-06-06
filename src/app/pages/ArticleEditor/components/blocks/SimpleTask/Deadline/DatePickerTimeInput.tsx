import { cx } from '@emotion/css';
import { ScrollbarContainer, VerticalChevron } from 'app/components';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import dayjs from 'dayjs';
import { Clock } from 'iconsax-react';
import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import CheckLineIcon from 'remixicon-react/CheckLineIcon';

const DatePickerTimeInput = forwardRef<
  HTMLButtonElement,
  {
    onChange?: (value: string) => void;
    date?: string;
  }
>(({ onChange, date }, ref) => {
  const [selected, setSelected] = useState<string>('');
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { t } = useArticlesTranslation();

  const openUpOrDown = () => {
    if (!dropdownRef || !dropdownRef.current) return;

    if (
      window.innerHeight -
        (dropdownRef.current.getBoundingClientRect().bottom -
          dropdownRef.current.scrollHeight) <
      dropdownRef.current.scrollHeight
    ) {
      dropdownRef.current.classList.replace('top-8', 'bottom-8');
      return;
    }

    dropdownRef.current.classList.replace('bottom-8', 'top-8');
  };

  useLayoutEffect(() => {
    if (!open) return;
    openUpOrDown();
  }, [open]);

  useEffect(() => {
    return () => setOpen(false);
  }, []);

  const selectedTime = (time: string) => {
    return selected === time;
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
      <div className="flex justify-between">
        <div className="flex items-center text-grayscale-secondary text-sm mr-5">
          <Clock size={16} className="mr-2" />
          <span>{t('Set Time (members local time)')}</span>
        </div>

        <div
          className="flex items-center justify-center relative bg-hover-blue rounded w-[88px] py-1 ml-4"
          role="presentation"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="mr-2 text-sm text-focus">
            {date ? `${dayjs(date).format('HH')}:00` : '12:00'}
          </span>
          <VerticalChevron size={12} className="text-focus" open={open} />
          {open && (
            <div ref={dropdownRef} className="absolute top-8 -left-1">
              <ScrollbarContainer className="rounded h-[250px]">
                <div className="flex flex-col bg-white w-[88px]">
                  {[...Array(24)].map((_, index) => {
                    if (index < 10) {
                      return (
                        <button
                          ref={ref}
                          key={index}
                          className={cx(
                            'text-sm w-full h-[36px] px-3 font-normal flex items-center justify-between whitespace-nowrap bg-transparent hover:bg-hover-blue text-black',
                            { 'rounded-t': index === 0 },
                            {
                              'rounded-b': index === 23,
                            }
                          )}
                          onClick={() => {
                            onChange?.(`0${index}:00`);
                            setSelected(`0${index}:00`);
                          }}
                        >
                          <span>{`0${index}:00`}</span>
                          {selectedTime(`0${index}:00`) && (
                            <CheckLineIcon size={20} className="text-focus" />
                          )}
                        </button>
                      );
                    }

                    return (
                      <button
                        ref={ref}
                        key={index}
                        className={cx(
                          'text-sm w-full h-[36px] px-3 font-normal flex items-center justify-between whitespace-nowrap hover:bg-hover-blue text-black',
                          { 'rounded-t': index === 0 },
                          {
                            'rounded-b': index === 23,
                          }
                        )}
                        onClick={() => {
                          onChange?.(`${index}:00`);
                          setSelected(`${index}:00`);
                        }}
                      >
                        <span>{`${index}:00`}</span>
                        {selectedTime(`${index}:00`) && (
                          <CheckLineIcon size={20} className="text-focus" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </ScrollbarContainer>
            </div>
          )}
        </div>
      </div>
    </OutsideClickHandler>
  );
});

export default DatePickerTimeInput;
