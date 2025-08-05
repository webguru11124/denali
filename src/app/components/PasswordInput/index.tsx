import styled from '@emotion/styled';
import React, { useState } from 'react';
import EyeIcon from 'remixicon-react/EyeLineIcon';
import EyeOffIcon from 'remixicon-react/EyeOffLineIcon';

import Alert from '../Alert';
import Input, { InputProps } from '../Input';

const IconButton = styled.button`
  top: 50%;
  transform: translateY(-50%);
  right: 14px;
`;

const PasswordInput: React.FC<InputProps> = ({ error, ...restProps }) => {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <div>
      <div className="relative">
        <Input {...restProps} type={isHidden ? 'password' : 'text'} />
        <IconButton
          type="button"
          onClick={() => {
            setIsHidden((prevState) => !prevState);
          }}
          className="absolute text-focus"
        >
          {isHidden ? <EyeOffIcon /> : <EyeIcon />}
        </IconButton>
      </div>
      {error && <Alert variant="error">{error}</Alert>}
    </div>
  );
};

export default PasswordInput;
