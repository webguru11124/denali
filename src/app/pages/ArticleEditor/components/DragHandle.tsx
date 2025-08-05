import { cx } from '@emotion/css';
import config from 'app/config';
import dragArea from 'assets/icons/drag.svg';
import { ArrowDown, ArrowUp } from 'iconsax-react';
import { Component, ReactElement } from 'react';

interface DragHandleProps {
  selected: boolean;
  moveBlock: (to: 'up' | 'down') => void;
  drag: <
    B extends
      | HTMLElement
      | ReactElement<
          any,
          | string
          | ((props: any) => ReactElement<any, any>)
          | (new (props: any) => Component<any, any, any>)
        >
  >(
    element: B
  ) => B;
}

const DragHandle = ({ selected, moveBlock, drag }: DragHandleProps) => {
  return (
    <div
      className={cx(
        'absolute -left-[2.3rem] top-[calc(50%-3rem)] rounded-tl rounded-bl bg-white shadow-atobi flex items-center justify-center flex-col gap-2 p-1',
        { hidden: !selected }
      )}
    >
      <ArrowUp
        className="opacity-70 cursor-pointer hover:opacity-100"
        color={config.colors['grayscale-secondary']}
        size={24}
        onClick={() => moveBlock('up')}
      />
      <div ref={(ref) => ref && drag(ref)}>
        <img
          className="opacity-70 cursor-pointer hover:opacity-100"
          src={dragArea}
          alt=""
        />
      </div>
      <ArrowDown
        className="opacity-70 cursor-pointer hover:opacity-100"
        color={config.colors['grayscale-secondary']}
        size={24}
        onClick={() => moveBlock('down')}
      />
    </div>
  );
};

export default DragHandle;
