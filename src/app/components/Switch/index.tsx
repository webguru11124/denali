import config from 'app/config';
import { FC } from 'react';
import SwitchLib, { ReactSwitchProps } from 'react-switch';

const Switch: FC<ReactSwitchProps> = (props) => (
  <SwitchLib
    height={32}
    onColor={config.colors.success}
    boxShadow={undefined}
    handleDiameter={28}
    checkedIcon={false}
    uncheckedIcon={false}
    {...props}
  />
);

export default Switch;
