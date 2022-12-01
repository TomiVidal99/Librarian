import { LanguageContext } from "../../state";
import { useLanguage } from "../../hooks";
import { Description, OriginFolderList, Section } from "./components";
import { LanguageSelector } from "./styled-components/SelectLanguage";

import "./App.style.scss";
import { IDestinationFolder, IOriginFolder } from "../../models";
import uuid from "react-uuid";
import { useState } from "react";
import { DestinationFolderList } from "./components/DestinationFolders/DestinationFolderList";

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

const DESTINATION_FOLDERS_DEFAULT: IDestinationFolder[] = [
  {
    id: uuid(),
    name: "pdfs",
    path: "/home/tomii/Documents/pdfs",
    date: new Date(),
    filters: [],
  },
  {
    id: uuid(),
    name: "documentos",
    path: "/home/tomii/Documents",
    date: new Date(),
    filters: [],
  },
];

export const App = () => {
  const [currentLanguage, setLanguage, getTranslatedText, supportedLanguages] =
    useLanguage();
  const appVersion = `${getTranslatedText("appVersion")} 2.0.0`;
  const [originFolders, setOriginFolders] = useState<IOriginFolder[]>(
    ORIGIN_FOLDERS_DEFAULT
  );
  const [destinationFolders, setDestinationFolders] = useState<
    IDestinationFolder[]
  >(DESTINATION_FOLDERS_DEFAULT);
  const updateOriginFolderList = (newFolders: IOriginFolder[]): void => {
    // TODO: this just be some reducer function to better handle the state
    setOriginFolders(newFolders);
  };
  const updateDestinationFolderList = (
    newFolders: IDestinationFolder[]
  ): void => {
    // TODO: same as updateOriginFolderList
    setDestinationFolders(newFolders);
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
          sectionName={getTranslatedText("originFoldersSection")}
          sectionDescription={getTranslatedText("originFoldersDescription")}
        >
          <OriginFolderList
            folders={originFolders}
            updateFolders={updateOriginFolderList}
          />
        </Section>
        <Section
          sectionName={getTranslatedText("destinationFoldersSection")}
          sectionDescription={getTranslatedText("destinationFoldersDescription")}
        >
          <DestinationFolderList folders={destinationFolders} updateFolders={updateDestinationFolderList} />
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
