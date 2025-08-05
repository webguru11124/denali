import styled from '@emotion/styled';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import avatar from 'assets/images/avatar-placeholder.png';
interface CollaboratorsDropdownProps {
  items?: Array<ItemProps>;
}
interface ItemProps {
  name: string;
  photo: string;
}
const CollaboratorsDropdown = ({ items }: CollaboratorsDropdownProps) => {
  const { t } = useArticlesTranslation();

  const Item = ({ name, photo }: ItemProps) => {
    return (
      <div className="dropdown-item text-sm pt-2.5 pr-4 font-normal flex items-center w-full whitespace-nowrap bg-transparent text-gray-700 cursor-pointer">
        <img src={photo} className="mr-2 w-6 h-6" alt="avatar" />
        <span>{name}</span>
      </div>
    );
  };
  return (
    <StyledContainer className="dropdown-menu min-w-max absolute bg-white z-50  rounded-lg shadow-lg m-0 bg-clip-padding px-4 py-4 shadow-atobi">
      <div className="flex">
        <div className="flex flex-col">
          <span className="text-sm text-grayscale-secondary font-normal">
            {t('Authors')}:
          </span>
          <Item name="Hannah Charles" photo={avatar} />
          <Item name="Beatrtiz Eric" photo={avatar} />
          <Item name="Hannah Charles" photo={avatar} />
          <Item name="Hannah Charles" photo={avatar} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-grayscale-secondary font-normal">
            {t('Publishers')}:
          </span>
          <Item name="Hannah Charles" photo={avatar} />
          <Item name="Beatrtiz Eric" photo={avatar} />
          <Item name="Hannah Charles" photo={avatar} />
          <Item name="Hannah Charles" photo={avatar} />
        </div>
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  transform: translateX(-7rem) translateY(1.5rem);
`;

export default CollaboratorsDropdown;
