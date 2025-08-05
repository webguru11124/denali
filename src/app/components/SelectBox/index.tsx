import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import ArrowDownIcon from 'remixicon-react/ArrowDownSLineIcon';

import Error from '../Error';

import Option from './Option';

interface OptionItem {
  label: string;
  value: string;
}

interface SelectBoxProps {
  options: Array<OptionItem>;
  placeholder?: string;
  onChange: (val: string) => void;
  value?: string;
  optionsContainerClassName?: string;
  error?: string;
}

const OptionsContainer = styled.div`
  transform: translateY(100%);
  bottom: 10px;
  box-sizing: content-box;
  left: -1px;
  overflow: auto;
`;

const SelectBox: React.FC<SelectBoxProps> = ({
  options,
  placeholder,
  onChange,
  value,
  optionsContainerClassName,
  error,
}) => {
  const [shouldDisplayOptions, setShouldDisplayOptions] = useState(false);
  const selectedOption = options.find(
    ({ value: optionValue }) => optionValue === value
  );
  return (
    <OutsideClickHandler onOutsideClick={() => setShouldDisplayOptions(false)}>
      <div className="rounded-lg bg-white border relative text-grayscale-primary border-gray-light">
        <div className="absolute z-10 -top-px left-0 overflow-hidden h-full w-full rounded-lg">
          {Boolean(selectedOption) && (
            <div className="w-full mb-0.5 h-0.5 bg-focus" />
          )}
        </div>
        <div className="relative z-20">
          <button
            className="flex items-center w-full py-4 pl-4 text-sm"
            onClick={() => {
              setShouldDisplayOptions((prev) => !prev);
            }}
            type="button"
          >
            {selectedOption?.label || placeholder}
            <ArrowDownIcon className="ml-auto mr-4" />
          </button>
          {shouldDisplayOptions && (
            <OptionsContainer
              className={cx(
                'bg-white border-t-0 z-20 rounded-b-lg pb-4 border border-gray-light absolute bottom-0 w-full',
                optionsContainerClassName
              )}
            >
              <div className="flex flex-col">
                {options.map(({ value: optionValue, label }) => (
                  <Option
                    key={optionValue}
                    label={label}
                    isSelected={value === optionValue}
                    onSelect={() => {
                      onChange(optionValue);
                      setShouldDisplayOptions(false);
                    }}
                  />
                ))}
              </div>
            </OptionsContainer>
          )}
        </div>
      </div>
      {error && (
        <div className="mt-2">
          <Error message={error} />
        </div>
      )}
    </OutsideClickHandler>
  );
};
export default SelectBox;
