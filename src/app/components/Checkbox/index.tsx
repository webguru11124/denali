/* eslint-disable jsx-a11y/label-has-associated-control */
import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import checkedIcon from 'assets/icons/checked.svg';
import uncheckedIcon from 'assets/icons/unchecked.svg';
import React, { forwardRef, HTMLAttributes, MouseEventHandler } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  id: string;
  checked?: boolean;
  onClick?: MouseEventHandler<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = forwardRef<HTMLInputElement, Props>(
  ({ id, checked, onChange, onClick, className }: Props, ref) => {
    return (
      <div
        className={cx('relative flex', className)}
        onClick={onClick}
        role="presentation"
      >
        <StyledCheckbox
          id={id}
          name={id}
          ref={ref}
          type="checkbox"
          onChange={onChange}
          checked={checked}
        />
        <label htmlFor={id}></label>
      </div>
    );
  }
);

const StyledCheckbox = styled.input`
  width: 20px;
  height: 20px;
  margin-top: 6px;
  opacity: 0;
  clip-path: circle(45% at 50% 50%);

  &:focus-visible + label::before {
    border-radius: 3px;
    outline: 2px solid #015ecc;
  }

  &:not(:checked) + label::before {
    content: url(${uncheckedIcon});
    display: flex;
    position: absolute;
    text-align: center;
    height: 22px;
    width: 22px;
    left: -2px;
    top: 3px;
  }

  &:checked + label::before {
    content: url(${checkedIcon});
    display: flex;
    position: absolute;
    text-align: center;
    height: 22px;
    width: 22px;
    left: -2px;
    top: 3px;
  }
`;

export type { Props as CheckBoxProps };
export default CheckBox;
