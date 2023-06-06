import { Language } from 'app/api/auth/types';

interface LanguageCellProps {
  language: Language;
}

const LanguageCell = ({
  language,
}: LanguageCellProps) => {
  return (
    <td>
      <div className="flex justify-start items-center max-w-md">
        <div className="text-grayscale-secondary flex flex-col justify-between min-w-0">
          {language && language.name}
        </div>
      </div>
    </td>
  );
};

export default LanguageCell;
