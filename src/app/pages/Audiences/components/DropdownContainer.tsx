import { Input2, ScrollbarContainer } from 'app/components';
import { useComponentsTranslation } from 'app/internationalization/hooks';
import { ReactNode } from 'react';

interface DropdownContainerProps {
  total: number;
  children: ReactNode;
  onChange: (value: string) => void;
  selectAll: VoidFunction;
  deSelectAll: VoidFunction;
}

const DropdownContainer = ({
  total,
  children,
  onChange,
  selectAll,
  deSelectAll,
}: DropdownContainerProps) => {
  const { t } = useComponentsTranslation();

  return (
    <div className="border border-gray-light rounded max-w-[352px] shadow-atobi absolute max-h-[394px] bg-white overflow-y-auto z-10">
      <div className="mr-1">
        <div className="px-3 pt-3">
          <Input2
            onChange={(e) => onChange(e.target.value)}
            onClear={() => onChange('')}
            placeholder={t('Search...')}
            isSearch={true}
            className="h-10"
          />
        </div>

        <ScrollbarContainer className="max-h-[282px] px-3 pb-3 mt-1">
          {children && children}
        </ScrollbarContainer>
      </div>

      <button
        className="flex w-full justify-center items-center h-10 bg-grayscale-bg-dark"
        onClick={() => (total > 0 ? deSelectAll() : selectAll())}
        type="button"
      >
        <span className="text-xs text-focus">
          {total > 0 ? 'Deselect All' : 'Select All'}
        </span>
      </button>
    </div>
  );
};

export default DropdownContainer;
