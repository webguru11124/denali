import ButtonTag from '../ButtonTag';

interface Tag<T> {
  id: string;
  label: string;
  value: T;
}

interface TagSelectProps<T = string> {
  tags: Array<Tag<T>>;
  selectedTagsIds: Array<string>;
  onTagClick: (tag: Tag<T>) => void;
}

const TagSelect = <T extends any = string>({
  tags,
  selectedTagsIds,
  onTagClick,
}: TagSelectProps<T>) => (
  <div>
    {tags.map(({ label, value, id }) => (
      <ButtonTag
        key={id}
        onClick={() => onTagClick({ label, value, id })}
        isActive={selectedTagsIds.includes(id)}
      >
        {label}
      </ButtonTag>
    ))}
  </div>
);

export default TagSelect;
