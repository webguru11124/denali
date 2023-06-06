import styled from '@emotion/styled';
import logoLg from 'assets/icons/logo-lg.svg';
import logo from 'assets/icons/logo.svg';
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'lg';
  visible?: boolean;
}

const StyledImage = styled.img<LogoProps>`
  width: ${({ size, visible }) =>
    visible ? (size === 'sm' ? '105px' : '200px') : '0px'};
  height: ${({ size, visible }) =>
    visible ? (size === 'sm' ? '36px' : '82px') : '0px'};
  opacity: ${({ visible }) => (visible ? '1' : '0')};
`;

const Logo: React.FC<LogoProps> = ({ size = 'sm', visible }) => (
  <StyledImage
    visible={visible}
    size={size}
    src={size === 'sm' ? logo : logoLg}
    alt="Atobi"
    className="duration-300"
  />
);

export default Logo;
