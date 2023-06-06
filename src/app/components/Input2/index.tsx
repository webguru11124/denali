import { css, cx } from '@emotion/css';
import { CloseCircle, SearchNormal1 } from 'iconsax-react';
import { InputHTMLAttributes, useRef, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  isSearch?: boolean;
  onClear?: VoidFunction;
  register?: UseFormRegister<any>;
}

const Input2 = ({
  placeholder,
  isSearch,
  onClear,
  onChange,
  register,
  name,
  className,
  ...rest
}: SearchProps) => {
  const [value, setValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const triggerInputChange = () => {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    )?.set;
    if (!nativeInputValueSetter || !inputRef.current) return;

    nativeInputValueSetter.call(inputRef.current, '');

    const ev = new Event('input', { bubbles: true });
    inputRef.current.dispatchEvent(ev);
  };

  return (
    <div className="w-full relative">
      {isSearch && (
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <SearchNormal1 className="w-5 h-5 text-grayscale-secondary" />
        </div>
      )}
      {value !== '' && onClear && (
        <button
          className="flex absolute inset-y-0 right-0 items-center mr-4"
          onClick={() => {
            triggerInputChange();
            onClear();
            setValue('');
          }}
        >
          <CloseCircle
            variant="Bold"
            className="w-5 h-5 text-grayscale-secondary"
          />
        </button>
      )}
      <input
        {...rest}
        {...(register && name ? register(name) : {})}
        {...(!register
          ? {
              onChange: (e) => {
                onChange?.(e);
                setValue(e.target.value);
              },
              ref: inputRef,
            }
          : {})}
        type="search"
        className={cx(
          className,
          'w-full flex-1 p-4 text-sm bg-grayscale-bg-dark rounded-xl outline outline-gray-dark hover:outline-grayscale-secondary focus-visible:outline-focus',
          { 'pl-10': isSearch },
          css(`
              &&::-webkit-search-decoration,
              &&::-webkit-search-cancel-button,
              &&::-webkit-search-results-button,
              &&::-webkit-search-results-decoration {
            -webkit-appearance:none;
          }`)
        )}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input2;
