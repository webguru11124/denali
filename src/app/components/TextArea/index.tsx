import { cx } from '@emotion/css';
import React, { TextareaHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  placeholder?: string;
  register?: UseFormRegister<any>;
  name: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  className,
  register,
  name,
  ...restProps
}) => (
  <textarea
    {...(register ? register(name) : {})}
    className={cx(
      'w-full p-4 resize-none focus:outline-none rounded-lg text-sm',
      className
    )}
    {...restProps}
  />
);

export default TextArea;
