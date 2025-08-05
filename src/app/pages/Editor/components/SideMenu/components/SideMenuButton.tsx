import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import config from 'app/config';
import noop from 'lodash/noop';
import { ReactNode, useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

interface SideMenuButtonProps {
  children: ReactNode;
  first?: boolean;
  selected?: boolean;
  disabled?: boolean;
  onClick: VoidFunction;
}

const SideMenuButton = ({
  children,
  first,
  selected = false,
  disabled = false,
  onClick,
}: SideMenuButtonProps) => {
  const [isSelected, setSelected] = useState(selected);

  useEffect(() => {
    setSelected(selected);
  }, [selected]);

  return (
    <OutsideClickHandler
      onOutsideClick={() => (!selected ? setSelected(false) : noop)}
    >
      <StyledSideMenuButton
        disabled={disabled}
        isSelected={isSelected}
        onClick={(e) => {
          setSelected((prev) => (selected ? (prev ? prev : !prev) : true));

          onClick();
        }}
        className={cx('flex justify-center w-full', {
          'mt-10': !first,
          'opacity-[.4]': disabled,
        })}
      >
        {children}
      </StyledSideMenuButton>
    </OutsideClickHandler>
  );
};

interface Props {
  isSelected: boolean;
  disabled: boolean;
}

const StyledSideMenuButton = styled.button`
  border: 2px solid transparent;

  ${({ isSelected, disabled }: Props) => {
    if (disabled && !isSelected) return;
    if (!disabled && !isSelected) return;

    return `
        opacity: 1;
        color: ${config.colors.focus};
        border-left: 2px solid ${config.colors.focus};

        .dropdown {
            display: flex;
            top: 0;
            right: 0;
            transform: translateX(-110px);
        }

        & > svg {
            background-color: ${config.colors['focus-background']};
        }
    `;
  }}
`;

export default SideMenuButton;
