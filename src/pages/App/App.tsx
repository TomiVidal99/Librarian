import { LanguageContext } from "../../state";
import { useLanguage } from "../../hooks";
import { Description, LanguageSelector } from "./components";

import "./App.style.scss";

export const App = () => {
  const [currentLanguage, setLanguage, getTranslatedText, supportedLanguages] =
    useLanguage();
  return (
    <LanguageContext.Provider
      value={{
        getLang: currentLanguage,
        setLang: setLanguage,
        getTranslated: getTranslatedText,
        languagesAvailables: supportedLanguages,
      }}
    >
      <div className="app-container">
        <div className="app">
          <h1 className="app-title">Librarian</h1>
          <Description />
        </div>
        <div>
          <LanguageSelector
            availableLanguages={supportedLanguages}
            selectedLanguageCallback={(lang) => setLanguage(lang)}
            defaultValue={currentLanguage}
          />
        </div>
      </div>
    </LanguageContext.Provider>
  );
};
