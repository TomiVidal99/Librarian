import { useContext } from "react";
import { IGlobalReducerAction } from "../../../../models";
import { ACTIONS } from "../../../../services";
import { IGlobalState, LanguageContext  } from "../../../../state";
import { Description, OriginFolderList, Section } from "../../components";
import { DestinationFolderList } from "../../components/DestinationFolders/DestinationFolderList";
import { LanguageSelector } from "../../styled-components/SelectLanguage";
import { ResetSettings } from "./components";

interface IProps {
  state: IGlobalState;
  dispatch: React.Dispatch<IGlobalReducerAction>;
}

export const Settings = ({state, dispatch}: IProps): JSX.Element => {
  const { getTranslated, languagesAvailables, setLang, getLang  } = useContext(LanguageContext);
  return (
    <main className="app-container">
      <Section border={false}>
        <h1 className="app-title">Librarian</h1>
      </Section>
      <Section sectionName={getTranslated("appDescriptionSection")}>
        <Description />
      </Section>
      <Section
        sectionName={getTranslated("originFoldersSection")}
        sectionDescription={getTranslated("originFoldersDescription")}
      >
        <OriginFolderList
          folders={state.originFolders}
          addFolders={(folders) => {
            dispatch({
              type: ACTIONS.ADD_ORIGIN_FOLDER,
              payload: folders,
            });
          }}
          removeFolders={(folders) => {
            dispatch({
              type: ACTIONS.REMOVE_ORIGIN_FOLDERS,
              payload: folders,
            });
          }}
        />
      </Section>
      <Section
        sectionName={getTranslated("destinationFoldersSection")}
        sectionDescription={getTranslated(
          "destinationFoldersDescription"
        )}
      >
        <DestinationFolderList
          folders={state.destinationFolders}
          removeFolders={(folders) => {
            dispatch({
              type: ACTIONS.REMOVE_DESTINATION_FOLDERS,
              payload: folders,
            });
          }}
        />
      </Section>
      <Section sectionName={getTranslated("generalSettingsSection")}>
        <LanguageSelector
          availableLanguages={languagesAvailables}
          selectedLanguageCallback={(lang) => setLang(lang)}
          defaultValue={getLang}
        />
        <ResetSettings/>
      </Section>
      <footer className="footer">
        <p className="capitalize">{state.appVersion}</p>
      </footer>
    </main>
  )
}
