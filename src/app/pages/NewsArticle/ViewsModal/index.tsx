import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { Modal, CloseButton } from 'app/components';
import { useNewsTranslation } from 'app/internationalization/hooks';
import { ReactNode, useState } from 'react';
import ArrowLeftIcon from 'remixicon-react/ArrowLeftSLineIcon';

import LocationView from './LocationView';
import PeopleList from './PeopleList';
import TeamsList from './TeamsList';

interface ViewsModalProps {
  onClose: () => void;
  articleId: number;
}

interface StyledButtonProps {
  isSelected: boolean;
  onClick: () => void;
  className?: string;
  children: ReactNode;
}

type View = 'teams' | 'people';

const ContentContainer = styled.div`
  width: 402px;
  height: 424px;
`;

const StyledButton = ({
  children,
  isSelected,
  onClick,
  className,
}: StyledButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cx(
      'border border-transparent py-3 px-4 text-focus rounded-2xl',
      {
        'border bg-focus-background border-focus': isSelected,
      },
      className
    )}
  >
    {children}
  </button>
);

interface SelectedLocation {
  id: number;
  name: string;
}
const ViewsModal = ({ onClose, articleId }: ViewsModalProps) => {
  const { t } = useNewsTranslation();
  const [selectedView, setSelectedView] = useState<View>('teams');
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation | null>(null);

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col">
        <div className="flex items-center h-12">
          {selectedLocation ? (
            <div className="flex items-center">
              <button
                onClick={() => setSelectedLocation(null)}
                type="button"
                className="p-1 bg-light rounded mr-3"
              >
                <ArrowLeftIcon className="text-grayscale-secondary" />
              </button>
              {selectedLocation.name}
            </div>
          ) : (
            <>
              <StyledButton
                onClick={() => setSelectedView('teams')}
                isSelected={selectedView === 'teams'}
                className="mr-4"
              >
                {t('Teams')}
              </StyledButton>
              <StyledButton
                onClick={() => setSelectedView('people')}
                isSelected={selectedView === 'people'}
              >
                {t('People')}
              </StyledButton>
            </>
          )}
          <CloseButton className="ml-auto" onClose={onClose} />
        </div>
        <div>
          <ContentContainer className="overflow-auto mt-4">
            {(() => {
              if (selectedLocation) {
                return (
                  <LocationView
                    articleId={articleId}
                    locationId={selectedLocation.id}
                  />
                );
              }

              switch (selectedView) {
                case 'teams':
                  return (
                    <TeamsList
                      onLocationSelect={(id, name) =>
                        setSelectedLocation({ id, name })
                      }
                      articleId={articleId}
                    />
                  );
                case 'people':
                  return <PeopleList articleId={articleId} />;
                default:
                  return null;
              }
            })()}
          </ContentContainer>
        </div>
      </div>
    </Modal>
  );
};

export default ViewsModal;
