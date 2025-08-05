import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { ArrowUp2, ArrowDown2, Icon as IconType } from 'iconsax-react';
import { ReactNode, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import ReactTooltip from 'react-tooltip';

interface DropdownButtonProps {
  text?: string;
  Icon?: IconType;
  disabled?: boolean;
  buttonText: string;
  tooltipText: string;
  children: ReactNode;
}

const DropdownButton = ({
  text,
  Icon,
  disabled = false,
  buttonText,
  tooltipText,
  children: dropdown,
}: DropdownButtonProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Wrapper className="relative">
      <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
        <button
          className="flex w-full h-full justify-between"
          onClick={() => setOpen((prev) => !prev)}
          disabled={disabled}
        >
          <div
            className={cx(
              'text-grayscale-secondary mx-2 px-1 py-1 rounded h-full',
              {
                'bg-focus-background': open,
                'hover:bg-focus-background cursor-pointer': !disabled,
              }
            )}
          >
            <div
              data-tip
              data-for={buttonText}
              className="flex flex-col justify-between items-center h-full"
            >
              {Icon && !text && <Icon size={20} />}
              {text && !Icon && (
                <div className="flex items-center justify-center border rounded-sm w-6 h-6">
                  <span className="text-xs">{text.toUpperCase()}</span>
                </div>
              )}
              <div className="flex items-end text-xs">
                {buttonText}
                {open ? (
                  <ArrowUp2 className="h-3 w-3 ml-1" />
                ) : (
                  <ArrowDown2 className="h-3 w-3 ml-1" />
                )}
              </div>
            </div>
          </div>
        </button>
        {open && dropdown}
      </OutsideClickHandler>
      {!disabled && (
        <ReactTooltip
          id={buttonText}
          place="bottom"
          effect="solid"
          class="react-tooltip"
        >
          {tooltipText}
        </ReactTooltip>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  & > div:first-of-type {
    display: inline;
  }
`;

export default DropdownButton;
