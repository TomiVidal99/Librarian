import { LanguageContext } from "../../state";
import { useLanguage } from "../../hooks";
import { Description } from "./components";
import { LanguageSelector } from "./styled-components/SelectLanguage";

import "./App.style.scss";

export const App = () => {
  const [currentLanguage, setLanguage, getTranslatedText, supportedLanguages] =
    useLanguage();
  const appVersion =  `${getTranslatedText("appVersion")} 2.0.0`;
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
        <div className="app-section section-no-border">
          <h1 className="app-title">Librarian</h1>
        </div>
        <div className="app-section">
          <Description />
        </div>
        <div className="app-section">
          <LanguageSelector
            availableLanguages={supportedLanguages}
            selectedLanguageCallback={(lang) => setLanguage(lang)}
            defaultValue={currentLanguage}
          />
        </div>
        <footer className="footer">
          <p className="capitalize">{appVersion}</p>
        </footer>
      </div>
    </LanguageContext.Provider>
  );
};
