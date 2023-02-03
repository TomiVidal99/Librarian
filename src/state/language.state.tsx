import { createContext } from "react";
import { LanguageType } from "../utils";

declare interface ILanguageContext {
  getLang: LanguageType;
  getTranslated: (arg0: string) => string;
}

export const defaultValue: ILanguageContext = {
  getLang: "en-US",
  getTranslated: () => "DEFAULT TRANSLATION",
};

export const LanguageContext = createContext(defaultValue);
