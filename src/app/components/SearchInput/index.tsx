import { Input } from 'app/components';
import { useComponentsTranslation } from 'app/internationalization/hooks';
import { ChangeEvent } from 'react';
import CloseIcon from 'remixicon-react/CloseCircleFillIcon';
import SearchIcon from 'remixicon-react/SearchLineIcon';

interface SearchInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  onClear: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onChange,
  value,
  onClear,
}) => {
  const { t } = useComponentsTranslation();

  return (
    <Input
      value={value}
      onChange={onChange}
      icon={<SearchIcon />}
      placeholder={`${t('Search...')}`}
      name="search"
      iconEnd={
        value ? (
          <button
            className="text-grayscale-secondary flex items-center"
            type="button"
            onClick={onClear}
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        ) : undefined
      }
    />
  );
};

export default SearchInput;
