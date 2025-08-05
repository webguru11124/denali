import { cx } from '@emotion/css';
import { types } from 'app/api/missions';
import { TagSelect, HideableContent, ButtonTag } from 'app/components';
import React from 'react';

interface Tag {
  id: string;
  label: string;
  value: string;
}

interface MissionTagsProps {
  tags: Array<types.MissionTag>;
  selectedTags: Array<string>;
  onTagClick: (tag: Tag) => void;
}

const MissionTags: React.FC<MissionTagsProps> = ({
  onTagClick,
  selectedTags,
  tags,
}) => {
  // Split selected categories from unselected
  // to display as separate lists
  const selectedFilteredCategories = tags.filter(({ id }) =>
    selectedTags.includes(String(id))
  );
  const filteredCategories = tags.filter(
    ({ id }) => !selectedTags.includes(String(id))
  );

  const hasCategoriesToDisplay = Boolean(selectedFilteredCategories.length);

  return (
    <div>
      <div
        className={cx(
          'transition-all duration-300',
          hasCategoriesToDisplay ? 'opacity-1' : 'opacity-0'
        )}
      >
        <div>
          {selectedFilteredCategories.map(({ id, name }) => (
            <ButtonTag
              key={id}
              isActive
              onClick={() => {
                onTagClick({ id: String(id), value: String(id), label: name });
              }}
            >
              {name}
            </ButtonTag>
          ))}
        </div>
      </div>
      <div>
        <HideableContent maxHeight={105}>
          <TagSelect
            onTagClick={onTagClick}
            selectedTagsIds={selectedTags}
            tags={filteredCategories.map(({ id, name }) => ({
              id: String(id),
              value: String(id),
              label: name,
            }))}
          />
        </HideableContent>
      </div>
    </div>
  );
};

export default MissionTags;
