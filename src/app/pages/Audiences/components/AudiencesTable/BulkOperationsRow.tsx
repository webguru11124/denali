import {
  useAudiencesTranslation,
  useComponentsTranslation,
} from 'app/internationalization/hooks';
import { routes } from 'app/router';
import { Trash, Eye } from 'iconsax-react';
import { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

import { useAudiencesContext } from '../../context';

const BulkOperationsRow = () => {
  const history = useHistory();
  const { selectedAudiences, setDeleteModalState } = useAudiencesContext();
  const { t } = useAudiencesTranslation();
  const { t: tc } = useComponentsTranslation();

  const Button = ({
    children,
    className,
    onClick,
  }: {
    children: ReactNode;
    onClick: VoidFunction;
    className?: string;
  }) => (
    <button
      className={`flex text-sm text-grayscale-secondary hover:text-grayscale-primary ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  return (
    <th colSpan={4}>
      <div className="flex items-end w-full mb-4 font-normal">
        {selectedAudiences.length === 1 && (
          <>
            <Button
              className="mr-8 ml-auto"
              onClick={() =>
                history.push(routes.audience.create(selectedAudiences[0]))
              }
            >
              <Eye />
              <span className="ml-4.5">{t('View Audience')}</span>
            </Button>

            <Button
              className="mr-8"
              onClick={() =>
                setDeleteModalState({ open: true, id: selectedAudiences[0] })
              }
            >
              <Trash />
              <span className="ml-4.5">{tc('Delete')}</span>
            </Button>
          </>
        )}
      </div>
    </th>
  );
};

export default BulkOperationsRow;
