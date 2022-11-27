import { useEffect, useState } from "react";
import ES_LANGUAGE_JSON from "../../assets/languages/es-AR.json";
import EN_LANGUAGE_JSON from "../../assets/languages/en-US.json";

export type LanguageType = "en-US" | "es-AR";
const DEFAULT_LANGUAGE: LanguageType = "en-US" as const;
const DEFAULT_NO_MESSAGE_RESPONSE = "TRANSLATION NOT FOUND" as const;

export const useLanguage = (): [
  LanguageType,
  (arg0: LanguageType) => Promise<void>,
  (arg0: string) => string,
  LanguageType[]
] => {
  const [currentLanguage, setCurrentLanguage] =
    useState<LanguageType>(DEFAULT_LANGUAGE);
  const [translations, setTranslations] = useState<any>(null);
  const SUPPORTED_LANGUAGES: LanguageType[] = ["en-US", "es-AR"];

  const switchLanguages = (language: LanguageType): void => {
    switch (language) {
      case "en-US":
        setTranslations(EN_LANGUAGE_JSON);
        setCurrentLanguage(language);
        break;
      case "es-AR":
        setTranslations(ES_LANGUAGE_JSON);
        setCurrentLanguage(language);
        break;
    }
  };

  // load the selected language and if all went correctly update the current language selected.
  const loadLanguageAssets = async (language: LanguageType): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (currentLanguage === language)
        reject("The selected language its already set");
      resolve(switchLanguages(language));
    });
  };

  const setLanguage = (language: LanguageType): Promise<void> => {
    return new Promise((resolve, reject) => {
      loadLanguageAssets(language)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const getTranslatedText = (id: string): string => {
    if (translations === null) return DEFAULT_NO_MESSAGE_RESPONSE;
    const translatedText = translations[id] || DEFAULT_NO_MESSAGE_RESPONSE;
    return translatedText;
  };

  // set default language based on user preferences and load the initial language.
  useEffect(() => {
    const defaultUserLanguage = navigator.language;
    let languageUpdateFlag = false;
    if (defaultUserLanguage) {
      SUPPORTED_LANGUAGES.forEach((language) => {
        if (language.split(defaultUserLanguage).length > 1) {
          // match
          switchLanguages(language);
          languageUpdateFlag = true;
        }
      });
    }
    if (!languageUpdateFlag) {
      // if there was no default language found
      switchLanguages(DEFAULT_LANGUAGE);
    }
  }, []);

  return [currentLanguage, setLanguage, getTranslatedText, SUPPORTED_LANGUAGES];
};
