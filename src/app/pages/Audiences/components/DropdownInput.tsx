import { cx } from '@emotion/css';
import { VerticalChevron } from 'app/components';
import { Icon as IconType } from 'iconsax-react';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface DropdownInputProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text: string;
  Icon: IconType;
  totalSelected: number;
  open: boolean;
  required?: boolean;
  onClick: VoidFunction;
}

const DropdownInput = ({
  text,
  Icon,
  totalSelected,
  open,
  required,
  onClick,
  className,
  ...rest
}: DropdownInputProps) => {
  return (
    <div
      {...rest}
      className={cx(
        'flex border border-gray-light rounded h-10 justify-start items-center',
        className
      )}
    >
      <Icon className="text-gray-dark ml-4" />
      <span className="text-sm text-grayscale-primary ml-2">
        {text}
        {required && <span className="text-error">*</span>}
      </span>
      {totalSelected > 0 && (
        <div className="flex justify-center items-center w-[25px] h-[25px] ml-2 bg-focus rounded-[6px] text-white text-sm">
          {totalSelected}
        </div>
      )}
      <div className="ml-auto mr-3">
        <VerticalChevron
          open={open}
          className="w-4 h-4"
          onClick={() => onClick()}
        />
      </div>
    </div>
  );
};

export default DropdownInput;
