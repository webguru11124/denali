import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { FC, ReactElement } from 'react';

import { TabValue } from '../../types';

interface Tab {
  label: string;
  id: TabValue;
  render: () => ReactElement;
}

const HeightContainer = styled.div`
  height: 45px;
`;

interface TabsProps {
  tabs: Array<Tab>;
  selectedTabId: string;
  onClick: (id: TabValue) => void;
}

const Tabs: FC<TabsProps> = ({ tabs, onClick, selectedTabId }) => {
  const selectedTab = tabs.find(({ id }) => id === selectedTabId);

  if (!selectedTab) throw new Error('[Tabs]: no selected tag');
  return (
    <div className="flex flex-col h-full flex-grow">
      <HeightContainer className="w-full border-b border-gray-dark">
        {tabs.map(({ label, id }) => {
          const isSelected = id === selectedTabId;
          return (
            <button key={id} type="button" onClick={() => onClick(id)}>
              <HeightContainer
                className={cx(
                  'relative mr-8',
                  isSelected
                    ? 'text-focus font-bold'
                    : 'text-grayscale-secondary'
                )}
              >
                {label}
                {isSelected && (
                  <div className="absolute bottom-0 w-full border-b-2 border-focus h-1" />
                )}
              </HeightContainer>
            </button>
          );
        })}
      </HeightContainer>
      <div className="flex-1">{selectedTab.render()}</div>
    </div>
  );
};

export default Tabs;
