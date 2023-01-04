import path from "path";
import fs from "fs";
import { LanguageType } from "../hooks";

interface ILanguage {
  [key: string]: string;
}

let currentLanguage: LanguageType;
let translation: ILanguage;
const DEFAULT_TRANSLATION = "TRANSLATION NOT FOUND";

/**
 * Returns the current selected language, i.e 'es-AR'
 */
export function getCurrentLanguage(): string {
  return currentLanguage;
}

/**
 * Sets the current language, updating the translations.
 * @param {LanguageType} language
 */
export async function setLanguage(language: LanguageType): Promise<void> {
  currentLanguage = language;
  await updateLanguageDictionary(language);
}

/**
 * Reads the language files corresponding to the current language and
 * sets the translations
 */
async function updateLanguageDictionary(language: LanguageType): Promise<void> {
  const filepath = path.resolve(
    __dirname,
    `../../assets/languages/${language}.json`
  );
  return await new Promise((resolve, reject) => {
    fs.readFile(filepath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
        throw err;
      }
      translation = JSON.parse(data) as ILanguage;
      resolve();
    });
  });
}

/**
 * Returns the translation with the correct format (capitalized).
 */
function parseTranslation(text: string): string {
  return text[0].toUpperCase() + text.substring(1);
}

/**
 * Returns the translation of a given key.
 * @argument {string} key Key in the translation file.
 * @returns {string} translation Translation contained inside the translation file.
 */
export function getTranslated(key: string): string {
  return parseTranslation(translation[key] || DEFAULT_TRANSLATION);
}
