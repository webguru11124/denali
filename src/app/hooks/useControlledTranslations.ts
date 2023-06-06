import { resources } from 'app/api/internationalization';
import { useSelector } from 'app/hooks';
import { selectors } from 'app/store/auth';
import { useQuery } from 'react-query';

interface Props {
  texts: Array<string>;
  isTranslated: boolean;
}

export const getQueryKey = (targetLanguage: string, texts: Array<string>) => [
  'translations',
  targetLanguage,
  ...texts,
];

const useControlledTranslations = ({ isTranslated, texts }: Props) => {
  const targetLanguage = useSelector(selectors.getTranslationLanguage) ?? 'en';

  const queryFn = () =>
    resources.translate(texts.map((text) => ({ targetLanguage, text })));

  const { data: response, isLoading } = useQuery(
    getQueryKey(targetLanguage, texts),
    queryFn,
    { enabled: isTranslated }
  );

  const translations = isTranslated
    ? response?.data.data.map((item) => item.translation) ?? texts
    : texts;

  return { translations, isTranslating: isLoading };
};

export default useControlledTranslations;
