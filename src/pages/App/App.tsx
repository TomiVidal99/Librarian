import { LanguageContext } from "../../state";
import { useLanguage } from "../../hooks";
import { Description, OriginFolderList, Section } from "./components";
import { LanguageSelector } from "./styled-components/SelectLanguage";

import "./App.style.scss";
import { IOriginFolder } from "../../models";
import uuid from "react-uuid";
import { useState } from "react";

const ORIGIN_FOLDERS_DEFAULT: IOriginFolder[] = [
  {
    id: uuid(),
    name: "temp",
    path: "/home/tomii/temp",
    date: new Date(),
  },
  {
    id: uuid(),
    name: "Github",
    path: "/home/tomii/Github",
    date: new Date(),
  },
];

export const App = () => {
  const [currentLanguage, setLanguage, getTranslatedText, supportedLanguages] =
    useLanguage();
  const appVersion = `${getTranslatedText("appVersion")} 2.0.0`;
  const [originFolders, setOriginFolders] = useState<IOriginFolder[]>(ORIGIN_FOLDERS_DEFAULT);
  const updateOriginFolderList = (newFolders: IOriginFolder[]): void => {
    // TODO: this just be some reducer function to better handle the state
    setOriginFolders(newFolders);
  };
  return (
    <LanguageContext.Provider
      value={{
        getLang: currentLanguage,
        setLang: setLanguage,
        getTranslated: getTranslatedText,
        languagesAvailables: supportedLanguages,
      }}
    >
      <main className="app-container">
        <Section border={false}>
          <h1 className="app-title">Librarian</h1>
        </Section>
        <Section sectionName={getTranslatedText("appDescriptionSection")}>
          <Description />
        </Section>
        <Section
          sectionDescription={getTranslatedText("originFoldersDescription")}
          sectionName={getTranslatedText("originFoldersSection")}
        >
          <OriginFolderList
            folders={originFolders}
            updateFolders={updateOriginFolderList}
          />
        </Section>
        <Section sectionName={getTranslatedText("generalSettingsSection")}>
          <LanguageSelector
            availableLanguages={supportedLanguages}
            selectedLanguageCallback={(lang) => setLanguage(lang)}
            defaultValue={currentLanguage}
          />
        </Section>
        <footer className="footer">
          <p className="capitalize">{appVersion}</p>
        </footer>
      </main>
    </LanguageContext.Provider>
  );
};
