import { createContext } from "react";
import { LanguageType } from "../hooks/useLanguage.hook";

declare interface ILanguageContext {
  getLang: LanguageType;
  setLang: (arg0: LanguageType) => Promise<void>;
  getTranslated: (arg0: string) => string;
  languagesAvailables: LanguageType[];
}

export const defaultValue: ILanguageContext = {
  getLang: "en-US",
  setLang: () => new Promise((resolve) => resolve()),
  getTranslated: () => "",
  languagesAvailables: [],
};

export const LanguageContext = createContext(defaultValue);
