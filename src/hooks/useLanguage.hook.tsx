import { useEffect, useState } from "react";
import { ILanguage, LanguageType} from "../utils";

const DEFAULT_LANGUAGE: LanguageType = "en-US";

// TODO: think how to reuse this from the backend
const DEFAULT_TRANSLATION = "TRANSLATION NOT FOUND";
function parseTranslation(text: string): string {
  return text[0].toUpperCase() + text.substring(1);
}

export const useLanguage = (): [LanguageType, (arg0: string) => string] => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageType>(DEFAULT_LANGUAGE);
  const [translation, setTranslation] = useState<ILanguage>({});

  // get language and translation from main
  useEffect(() => {
    window.api.getLanguage((currentLang, newTranslation) => {
      setCurrentLanguage(currentLang);
      setTranslation(newTranslation);
    });
    window.api.sendLanguageToRenderer();
  }, [])

  function getTranslatedText(key: string): string {
    return parseTranslation(translation[key] || DEFAULT_TRANSLATION);
  }

  return [currentLanguage, getTranslatedText];
};
