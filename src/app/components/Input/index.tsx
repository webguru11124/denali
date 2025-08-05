import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import React, { InputHTMLAttributes, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

import Alert from '../Alert';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  className?: string;
  inputClassName?: string;
  containerClassName?: string;
  inputPaddingClass?: string;
  register?: UseFormRegister<any>;
  error?: string;
  icon?: JSX.Element;
  iconEnd?: JSX.Element;
  contentEnd?: JSX.Element;
}

const IconContainer = styled.div`
  top: 50%;
  transform: translateY(-50%);
  left: 16px;
`;

const IconEndContainer = styled.div`
  top: 50%;
  transform: translateY(-50%);
  right: 16px;
`;

const StyledInput = styled.input`
  box-shadow: 0 0 0 30px #fbfafa inset !important;
`;

const Input: React.FC<InputProps> = ({
  name,
  register,
  inputClassName,
  id,
  error,
  className,
  icon,
  iconEnd,
  containerClassName,
  inputPaddingClass = '',
  onBlur,
  onFocus,
  value,
  contentEnd,
  ...restProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className={className}>
      <div
        className={cx(
          'input_container relative text-sm px-4 border border-transparent text-grayscale-secondary bg-grayscale-bg-dark rounded-lg',
          value ? 'border-focus' : 'focus-within:border-gray-dark',
          containerClassName
        )}
      >
        <IconContainer className="absolute">{icon}</IconContainer>

        <StyledInput
          className={cx(
            'w-full text-grayscale-primary placeholder-grayscale-secondary::placeholder bg-transparent focus:outline-none',
            {
              [inputPaddingClass]: Boolean(inputPaddingClass),
              'py-4': !inputPaddingClass,
              'pl-8': Boolean(icon),
              'pr-8': Boolean(iconEnd),
            },
            inputClassName
          )}
          {...(register ? register(name) : {})}
          {...restProps}
          onFocus={(e) => {
            setIsFocused(true);
            if (onFocus) onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
          }}
          value={value}
        />
        {iconEnd && (
          <IconEndContainer
            className={cx(
              'absolute',
              isFocused ? 'text-focus' : 'text-gray-dark'
            )}
          >
            {iconEnd}
          </IconEndContainer>
        )}
        {contentEnd && (
          <IconEndContainer className="absolute z-10">
            {contentEnd}
          </IconEndContainer>
        )}
      </div>

      {error && (
        <Alert variant="error" className="mt-2">
          <>{error}</>
        </Alert>
      )}
    </div>
  );
};

export type { InputProps };
export default Input;
