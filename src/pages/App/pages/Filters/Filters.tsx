import { useEffect, useState } from "react";
import { ACTIONS } from "@services";
import { IDestinationFolder, IGlobalReducerAction } from "@models";
import { IGlobalState, LanguageContext } from "@state";
import { Button, Flex, Input, Section } from "@components";
import { useLanguage } from "@hooks";
import uuid from "react-uuid";
import { PickFiltersSection } from "./components";
import { isValidDestinationFolder } from "./utils";
import { warningAlert } from "../../../../utils/handle-alerts.utils";

import "./Filters.style.scss";

interface IProps {
  dispatch: React.Dispatch<IGlobalReducerAction>;
}

function createInitialDestinationFolder(): IDestinationFolder {
  const folder: IDestinationFolder = {
    id: uuid(),
    name: "",
    path: "",
    date: new Date(),
    filters: [
      // {
      //   id: uuid(),
      //   content: "pdf",
      //   type: "format",
      //   priority: 1,
      // },
      // {
      //   id: uuid(),
      //   content: "trabajos",
      //   type: "name",
      //   priority: 1,
      // },
      // {
      //   id: uuid(),
      //   content: "tps",
      //   type: "name",
      //   priority: 1,
      // },
      // {
      //   id: uuid(),
      //   content: "*tenicas.pdf",
      //   type: "regex",
      //   priority: 1,
      // },
    ],
  };
  return folder;
}

export const Filters = ({ dispatch }: IProps): JSX.Element => {
  const [currentLanguage, getTranslatedText] = useLanguage();
  const [state, setState] = useState<IGlobalState | null>(null);
  useEffect(() => {
    // get the destination folder to edit
    // window.api.getDestinationFolderToEdit((folderToEdit) => {
    //
    // })
  }, []);
  useEffect(() => {
    // get state from main
    window.api.getStateFromSettings((s) => {
      console.log("getting state from settings: ", s);
      setState(s);
    });
  }, []);
  useEffect(() => {
    // get state from main
    window.api.getState((s) => {
      console.log("getting state from main: ", s);
      setState(s);
    });
  }, []);
  const [destinationFolder, setDestinationFolder] =
    useState<IDestinationFolder>(createInitialDestinationFolder());
  const handlePickedDestinationFolder = ({
    name,
    path,
  }: {
    name: string;
    path: string;
  }): Promise<boolean> => {
    return new Promise((resolve) => {
      const alreadyHasThisPath = state.destinationFolders.filter(
        (f) => f.path === path
      );
      if (alreadyHasThisPath.length > 0) {
        warningAlert({
          title: getTranslatedText(
            "destinationFolderAlreadySelectedWarningTitle"
          ),
          body: getTranslatedText(
            "destinationFolderAlreadySelectedWarningBody"
          ).concat(
            ...alreadyHasThisPath[0].filters.map(
              (f, i) => `${i > 0 ? "," : ""} '${f.content} (${f.type})'`
            )
          ),
          foldername: path,
          folderpath: "lasdkjasldkjsal",
        });
        resolve(false);
      } else {
        setDestinationFolder({
          ...destinationFolder,
          path,
          name,
        });
        resolve(true);
      }
    });
  };
  useEffect(() => {
    dispatch({
      type: ACTIONS.ADD_DESTINATION_FOLDER,
      payload: createInitialDestinationFolder(),
    });
  }, []);
  const handleAddDestinationFolder = () => {
    const isValid = isValidDestinationFolder({
      folder: destinationFolder,
      noFolderText: {
        title: getTranslatedText("noDestinationFolderSelectedTitleAlert"),
        body: getTranslatedText("noDestinationFolderSelectedBodyAlert"),
      },
      noFiltersText: {
        title: getTranslatedText("noDestinationFiltersSelectedTitleAlert"),
        body: getTranslatedText("noDestinationFiltersSelectedBodyAlert"),
      },
      maxFiltersText: {
        title: getTranslatedText("maxFiltersTitleAlert"),
        body: getTranslatedText("maxFiltersBodyAlert"),
      },
    });
    if (!isValid) return;
    window.api.sendDestinationFolder(destinationFolder);
    window.close();
  };
  const handleCancel = () => {
    window.close();
  };
  return (
    <LanguageContext.Provider
      value={{
        getLang: currentLanguage,
        getTranslated: getTranslatedText,
      }}
    >
      <main className="filter-page-container">
        <Section
          className="filter-page"
          sectionName={getTranslatedText("addDestinationFolderSection")}
          sectionDescription={getTranslatedText(
            "addDestinationFolderDescription"
          )}
        >
          <Input
            type="pick"
            style="add"
            placeholder={getTranslatedText(
              "destinatonFolderDisplayPlaceholder"
            )}
            callbackClick={handlePickedDestinationFolder}
          />
          <PickFiltersSection
            state={state}
            folder={destinationFolder}
            setFolder={setDestinationFolder}
          />
          <Flex className="filter-page__bottom-btns">
            <Button
              content={getTranslatedText("addDestinationFolder")}
              callback={handleAddDestinationFolder}
              type="add"
              important={true}
            />
            <Button
              content={getTranslatedText("cancelDestinationFolder")}
              callback={handleCancel}
              type="delete"
              important={true}
            />
          </Flex>
        </Section>
      </main>
    </LanguageContext.Provider>
  );
};
