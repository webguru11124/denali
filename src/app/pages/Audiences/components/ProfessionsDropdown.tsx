import { Profession } from 'app/api/professions/types';
import { Checkbox } from 'app/components';
import { useAudiencesTranslation } from 'app/internationalization/hooks';
import { UserOctagon } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { Control, useController } from 'react-hook-form';
import OutsideClickHandler from 'react-outside-click-handler';
import ReactTooltip from 'react-tooltip';

import { FormFields } from './audienceFormSchema';
import DropdownContainer from './DropdownContainer';
import DropdownInput from './DropdownInput';

interface LocationDropdownProps {
  selectedProfessions: Profession[];
  professions: Profession[] | undefined;
  control: Control<FormFields, unknown>;
}

const ProfessionsDropdown = ({
  selectedProfessions,
  professions,
  control,
}: LocationDropdownProps) => {
  const {
    field: { onChange: onFieldChange, value: fieldValue },
  } = useController({
    control,
    name: 'professions',
  });

  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [value, setValue] = useState(fieldValue || []);
  const [filteredProfessions, setFilteredProfessions] = useState(professions);

  const { t } = useAudiencesTranslation();

  useEffect(() => {
    if (open && filteredProfessions) ReactTooltip.rebuild();
  }, [open, filteredProfessions]);

  useEffect(() => {
    const filtered = professions?.filter((profession) =>
      profession.name
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase())
    );

    setFilteredProfessions(filtered);
  }, [searchValue, professions]);

  useEffect(() => setValue(fieldValue), [fieldValue]);

  useEffect(() => {
    if (selectedProfessions.length > 0) {
      const ids = selectedProfessions.map((sp) => sp.id);

      onFieldChange(ids);
    }
  }, [selectedProfessions, onFieldChange]);

  const selectAll = (): void => {
    const values: Array<number> = [];

    filteredProfessions?.forEach((val) => values.push(val.id));

    onFieldChange(values);
  };

  const deSelectAll = (): void => {
    onFieldChange([]);
  };

  const onChange = (id: number) => {
    if (!value.includes(id)) {
      onFieldChange([...value, id]);
      return;
    }

    const updated = fieldValue.filter((v) => v !== id);

    onFieldChange(updated);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
      <div>
        <DropdownInput
          text={t('All Professions')}
          Icon={UserOctagon}
          totalSelected={fieldValue.length ?? 0}
          open={open}
          onClick={() => setOpen((prev) => !prev)}
        />
        {open && (
          <DropdownContainer
            total={fieldValue.length ?? 0}
            onChange={setSearchValue}
            deSelectAll={deSelectAll}
            selectAll={selectAll}
          >
            {filteredProfessions &&
              filteredProfessions.map((profession, index) => {
                return (
                  <div className="flex items-center mt-5" key={index}>
                    <Checkbox
                      id={profession.name}
                      onChange={() => onChange(profession.id)}
                      checked={value?.includes(profession.id)}
                    />
                    <span
                      data-tip={profession.name}
                      className="ml-2 text-sm text-grayscale-primary whitespace-nowrap overflow-hidden overflow-ellipsis"
                    >
                      {profession.name}
                    </span>
                  </div>
                );
              })}
          </DropdownContainer>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default ProfessionsDropdown;
