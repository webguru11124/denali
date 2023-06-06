import { css } from '@emotion/css';
import config from 'app/config';
import React from 'react';
import ReactCodeInputLib from 'react-code-input';

const inputClassName = css`
  input {
    :focus-visible {
      outline: none;
    }
  }
`;

const inputStyle = {
  fontFamily: 'Lato',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  paddingRight: '1rem',
  paddingLeft: '1rem',
  paddingTop: '0.75rem',
  paddingBottom: '0.75rem',
  border: `1px solid ${config.colors['gray-light']}`,
  width: '42px',
  backgroundColor: config.colors['grayscale-bg-dark'],
  borderRadius: '12px',
  marginRight: '0.5rem',
};

const inputStyleInvalid = {
  ...inputStyle,
  border: `1px solid ${config.colors.error}`,
};

interface CodeInputProps {
  name: string;
  autoFocus?: boolean;
  isValid?: boolean;
  onChange: (value: string) => void;
  value: string;
  fieldsAmount?: number;
}

const CodeInput: React.FC<CodeInputProps> = ({
  name,
  autoFocus,
  isValid,
  onChange,
  value,
  fieldsAmount = 6,
}) => (
  <ReactCodeInputLib
    name={name}
    inputMode="latin"
    type="text"
    onChange={onChange}
    value={value}
    fields={fieldsAmount}
    autoFocus={autoFocus}
    inputStyle={inputStyle}
    className={inputClassName}
    inputStyleInvalid={inputStyleInvalid}
    isValid={isValid}
  />
);

export default CodeInput;
