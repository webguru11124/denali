import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { selectors } from 'app/store/editor';
import { useSelector } from 'react-redux';

const useCurrentArticleLanguage = () => {
  const { data: user } = useAuthenticatedUser();
  const selectedLanguages = useSelector(selectors.getSelectedLanguages);

  const interfaceLanguage = user?.contentLanguage.uiLanguage;
  const exists = selectedLanguages.some(
    (lang) => lang.code === interfaceLanguage
  );

  const active = selectedLanguages.find((lang) => lang.active)?.code;
  const main = selectedLanguages.find((lang) => lang.isDefault)?.code;

  return active !== undefined ? active : exists ? interfaceLanguage : main;
};

export default useCurrentArticleLanguage;
