import { useLanguage } from "@hooks";
import { useContext } from "react";
import { IGlobalReducerAction } from "../../../../models";
import { ACTIONS } from "../../../../services";
import { IGlobalState, LanguageContext } from "../../../../state";
import { Description, OriginFolderList, Section } from "../../components";
import { Checkbox } from "../../components/Checkbox/Checkbox";
import { DestinationFolderList } from "../../components/DestinationFolders/DestinationFolderList";
import { LanguageSelector } from "../../styled-components/SelectLanguage";
import { ResetSettings } from "./components";
import { RecentlyMovedList } from "./components/RecentlyMoved/RecentlyMovedList";

interface IProps {
  state: IGlobalState;
  dispatch: React.Dispatch<IGlobalReducerAction>;
}

export const Settings = ({ state, dispatch }: IProps): JSX.Element => {
  const { getTranslated, getLang } = useContext(LanguageContext);
  const [currentLanguage, getTranslatedText] = useLanguage();
  const updateState = (state: IGlobalState) => {
    dispatch({
      type: ACTIONS.UPDATE_STATE,
      payload: state,
    });
  };
  return (
    <LanguageContext.Provider
      value={{
        getLang: currentLanguage,
        getTranslated: getTranslatedText,
      }}
    >
      <main className="app-container">
        <Section border={false}>
          <h1 className="app-title">Librarian</h1>
        </Section>
        <Section sectionName={getTranslated("appDescriptionSection")}>
          <Description />
        </Section>
        {state.recentlyMovedFolders.length > 0 ? (
          <Section sectionName={getTranslated("recentlyMovedSection")}>
            <RecentlyMovedList list={state.recentlyMovedFolders} />
          </Section>
        ) : null}
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
            removeFolders={(toKeep, toRemove) => {
              dispatch({
                type: ACTIONS.REMOVE_ORIGIN_FOLDERS,
                payload: { toKeep, toRemove },
              });
            }}
          />
        </Section>
        <Section
          sectionName={getTranslated("destinationFoldersSection")}
          sectionDescription={getTranslated("destinationFoldersDescription")}
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
          <Checkbox
            label={getTranslated("generalNotificationsCheckbox")}
            callback={(e) => updateState({ ...state, generalNotifications: e })}
            defaultValue={state.generalNotifications}
          />
          <Checkbox
            label={getTranslated("archivesNotificationsCheckbox")}
            callback={(e) =>
              updateState({ ...state, archivesNotifications: e })
            }
            defaultValue={state.archivesNotifications}
          />
          <Checkbox
            label={getTranslated("canMoveFilesCheckbox")}
            callback={(e) => updateState({ ...state, canMoveFiles: e })}
            defaultValue={state.canMoveFiles}
          />
          <LanguageSelector
            availableLanguages={["es-AR", "en-US"]}
            selectedLanguageCallback={(lang) =>
              dispatch({
                type: ACTIONS.UPDATE_LANGUAGE,
                payload: lang,
              })
            }
            defaultValue={getLang}
          />
          <Checkbox
            label={getTranslated("autoLaunchCheckbox")}
            callback={(e) =>
              dispatch({
                type: ACTIONS.TOGGLE_AUTO_LAUNCH,
                payload: e,
              })
            }
            defaultValue={state.autoLaunch}
          />
          <ResetSettings />
        </Section>
        <footer className="footer">
          <p className="capitalize">{state.appVersion}</p>
        </footer>
      </main>
    </LanguageContext.Provider>
  );
};
