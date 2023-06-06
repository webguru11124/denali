import { useArticlesTranslation } from 'app/internationalization/hooks';

import DropdownContainer from '../DropdownContainer';

import TextBlockOption from './TextBlockOption';

const TextBlockDropdown = () => {
  const { t } = useArticlesTranslation();
  return (
    <DropdownContainer>
      <span className="flex text-lg text-grayscale-primary">
        {t('Text Styles')}
      </span>
      <TextBlockOption
        type={{
          tag: 'h1',
          type: 'heading',
        }}
        className={'text-xl font-bold'}
        text={t('Heading')}
      />
      <TextBlockOption
        type={{
          tag: 'h2',
          type: 'heading',
        }}
        className={'font-bold'}
        text={t('Subheading')}
      />
      <TextBlockOption
        type={{
          type: 'paragraph',
        }}
        className={'text-xs'}
        text={t('Body')}
      />
      <TextBlockOption
        type={{
          tag: 'ul',
          type: 'list',
        }}
        className={'text-xs'}
        text={`• ${t('Bullet')}`}
      />
      <TextBlockOption
        type={{
          tag: 'ol',
          type: 'list',
        }}
        className={'text-xs'}
        text={`1. ${t('Number')}`}
      />
    </DropdownContainer>
  );
};

export default TextBlockDropdown;
