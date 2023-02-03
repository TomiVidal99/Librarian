import { useLanguage } from "@hooks";
import { IGlobalReducerAction } from "@models";
import { ACTIONS } from "@services";
import { IGlobalState, LanguageContext } from "@state";
import {
  Checkbox,
  Description,
  DestinationFolderList,
  OriginFolderList,
  Section,
} from "@components";
import { LanguageSelector } from "../../styled-components/SelectLanguage";
import { RecentlyMovedList, ResetSettings } from "./components";
import { Icon } from "@iconify/react";
import bookshelfIcon from "@iconify/icons-game-icons/bookshelf";
import booksIcon from "@iconify/icons-emojione-monotone/books";

interface IProps {
  state: IGlobalState;
  dispatch: React.Dispatch<IGlobalReducerAction>;
}

export const Settings = ({ state, dispatch }: IProps): JSX.Element => {
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
        <Icon
          className="app-container__background background-top"
          icon={booksIcon}
          inline={true}
        />
        <Icon
          className="app-container__background background-bottom"
          icon={bookshelfIcon}
          inline={true}
        />
        <Section border={false}>
          <h1 className="app-title">Librarian</h1>
        </Section>
        <Section sectionName={getTranslatedText("appDescriptionSection")}>
          <Description />
        </Section>
        {state.recentlyMovedFolders.length > 0 ? (
          <Section sectionName={getTranslatedText("recentlyMovedSection")}>
            <RecentlyMovedList list={state.recentlyMovedFolders} />
          </Section>
        ) : null}
        <Section
          sectionName={getTranslatedText("originFoldersSection")}
          sectionDescription={getTranslatedText("originFoldersDescription")}
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
          sectionName={getTranslatedText("destinationFoldersSection")}
          sectionDescription={getTranslatedText(
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
        <Section sectionName={getTranslatedText("generalSettingsSection")}>
          <Checkbox
            label={getTranslatedText("generalNotificationsCheckbox")}
            callback={(e) => updateState({ ...state, generalNotifications: e })}
            defaultValue={state.generalNotifications}
          />
          <Checkbox
            label={getTranslatedText("archivesNotificationsCheckbox")}
            callback={(e) =>
              updateState({ ...state, archivesNotifications: e })
            }
            defaultValue={state.archivesNotifications}
          />
          <Checkbox
            label={getTranslatedText("canMoveFilesCheckbox")}
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
            defaultValue={currentLanguage}
          />
          <Checkbox
            label={getTranslatedText("autoLaunchCheckbox")}
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
