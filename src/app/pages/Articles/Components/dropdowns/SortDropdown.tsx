import { useArticlesTranslation } from 'app/internationalization/hooks';

interface ItemProps {
  text: string;
  onClick: VoidFunction;
}

interface SortDropdownProps {
  items?: Array<ItemProps>;
}

const SortDropdown = ({ items }: SortDropdownProps) => {
  const { t } = useArticlesTranslation();
  const Item = ({ text, onClick }: ItemProps) => {
    return (
      <button
        className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 active:bg-focus-background text-start hover:bg-hover-blue active:text-focus"
        onClick={onClick}
      >
        {text}
      </button>
    );
  };
  return (
    <div className="dropdown-menu min-w-max absolute bg-white z-50 py-3 rounded-lg shadow-lg m-0 bg-clip-padding transform -translate-x-1/2 translate-y-8 flex flex-col shadow-atobi">
      <div className="pb-2 px-4 flex justify-start">
        <span className="text-sm text-grayscale-secondary font-normal">
          {t('Sort by:')}
        </span>
      </div>
      {items &&
        items.map((item, idx) => (
          <Item key={idx} text={item.text} onClick={item.onClick} />
        ))}
    </div>
  );
};

export default SortDropdown;
