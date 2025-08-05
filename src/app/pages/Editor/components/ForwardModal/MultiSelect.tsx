import { ScrollbarContainer } from 'app/components';
import config from 'app/config';
import {
  useArticlesTranslation,
  useCommonTranslation,
} from 'app/internationalization/hooks';
import { useEffect, useMemo, useState } from 'react';
import { Control, useController } from 'react-hook-form';
import Select, { StylesConfig, components, MenuListProps } from 'react-select';
import {
  SharedTenants,
  SharingStatusOverviewResponse,
} from 'submodules/common-ui/generated/api/gcs';

import { FormFields } from './formSchema';

type SelectOption = {
  value: number;
  label: string;
};

interface MultiSelectProps {
  control: Control<FormFields, unknown>;
  isLoading: boolean;
  statusOverview?: SharingStatusOverviewResponse;
  sharingTenants?: SharedTenants;
}

const MultiSelect = ({
  control,
  isLoading,
  statusOverview,
  sharingTenants,
}: MultiSelectProps) => {
  const { t } = useArticlesTranslation();
  const { t: ct } = useCommonTranslation();

  const sharedTenants = useMemo(() => {
    return sharingTenants?.receivers
      ?.map((r) => ({ value: r.id, label: r.name }))
      .filter((f) => statusOverview?.every((s) => s.tenantName !== f.label));
  }, [sharingTenants, statusOverview]);

  const [selectedTennants, setSelectedTennants] = useState<SelectOption[]>([]);

  const onTenantChange = (option?: SelectOption) => {
    if (!option) return;

    const exists = selectedTennants?.find((v) => v.value === option.value);

    setSelectedTennants((prev) => {
      if (!prev) {
        return [option];
      }

      if (exists) {
        return prev?.filter((p) => p.value !== exists.value);
      }

      return [...prev, option];
    });
  };

  const {
    field: { onChange },
  } = useController({
    control,
    name: 'tennants',
  });

  useEffect(() => {
    onChange(selectedTennants?.map((st) => st.value));
  }, [selectedTennants, onChange]);

  const selectStyles: StylesConfig<SelectOption, true> = {
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: config.colors['focus-background'],
      borderRadius: '32px',
      height: '28px',
      padding: '6px 12px',
      display: 'flex',
      alignItems: 'center',
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: config.colors['focus'],
      padding: '0px',
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: config.colors['grayscale-secondary'],
      ':hover': {
        backgroundColor: 'transparent',
        color: config.colors['grayscale-secondary'],
      },
    }),
    indicatorsContainer: (styles) => ({
      ...styles,
      display: 'none',
    }),
    control: (styles) => ({
      ...styles,
      borderColor: 'transparent',
      ':hover': {
        borderColor: 'transparent',
      },
      minHeight: '52px',
      borderRadius: '12px',
      backgroundColor: config.colors['grayscale-bg-dark'],
    }),
    option: (styles) => ({
      ...styles,
      borderRadius: '4px',
      ':hover': {
        backgroundColor: config.colors['hover-blue'],
      },
      backgroundColor: '#FFFFFF',
      cursor: 'pointer',
    }),
    menu: (styles) => ({
      ...styles,
      width: '224px',
      borderRadius: '12px',
    }),
    menuList: (styles) => ({
      ...styles,
      borderRadius: '12px',
      padding: '4px',
      maxHeight: 'initial',
    }),
  };

  const MenuList = (props: MenuListProps<SelectOption, true>) => {
    return (
      <components.MenuList {...props}>
        <ScrollbarContainer className="max-h-[224px] p-3">
          {props.children}
          <button
            type="button"
            className="w-full h-10 bg-hover-blue text-focus mt-4 rounded-[4px]"
            onClick={() => {
              if (!sharedTenants) return;
              setSelectedTennants(sharedTenants);
            }}
          >
            {t('Add all')}
          </button>
        </ScrollbarContainer>
      </components.MenuList>
    );
  };

  return (
    <div className="mt-4">
      <Select
        isLoading={isLoading}
        loadingMessage={() => <span>{ct('Loading...')}</span>}
        captureMenuScroll={false}
        options={sharedTenants}
        isMulti
        styles={selectStyles}
        placeholder="Find Team..."
        components={{ MenuList }}
        value={selectedTennants}
        onChange={(v, a) => onTenantChange(a.option ?? a.removedValue)}
      />
    </div>
  );
};

export default MultiSelect;
