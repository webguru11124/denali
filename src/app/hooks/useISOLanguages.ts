import { by639_1 } from 'iso-language-codes';

const useISOLanguages = ({ search = '' }: { search: string }) => {
  const languages: { name: string; code: string }[] = Object.keys(by639_1)
    .map((key) => {
      return { name: by639_1[key].name, code: by639_1[key].iso639_1 };
    })
    .filter((language) =>
      language.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (a.name > b.name) return 1;
      if (b.name > a.name) return -1;
      return 0;
    });

  return languages;
};

export default useISOLanguages;
