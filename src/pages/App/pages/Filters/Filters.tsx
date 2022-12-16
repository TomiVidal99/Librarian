import { useContext, useEffect, useState } from "react";
import { ACTIONS } from "../../../../services";
import { IDestinationFolder, IGlobalReducerAction } from "../../../../models";
import { IGlobalState, LanguageContext } from "../../../../state";
import { Button, Input, Section } from "../../components";
import { Flex } from "../../components/Flex/Flex";

import "./Filters.style.scss";
import uuid from "react-uuid";
import { PickFiltersSection } from "./components";
import { isValidDestinationFolder } from "./utils";
import { warningAlert } from "../../../../utils/handle-alerts.utils";

interface IProps {
  dispatch: React.Dispatch<IGlobalReducerAction>;
}

const createInitialDestinationFolder = (): IDestinationFolder => {
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
};

export const Filters = ({ dispatch }: IProps): JSX.Element => {
  const { getTranslated } = useContext(LanguageContext);
  const [state, setState] = useState<IGlobalState | null>(null);
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
          title: getTranslated("destinationFolderAlreadySelectedWarningTitle"),
          body:
            getTranslated("destinationFolderAlreadySelectedWarningBody").concat(
              ...alreadyHasThisPath[0].filters.map(
                (f, i) => `${i > 0 ? "," : ""} '${f.content} (${f.type})'`
              )
            ),
          foldername: path,
          folderpath: "lasdkjasldkjsal",
        })
        // window.api.popWarning(
        //   getTranslated("destinationFolderAlreadySelectedWarningTitle"),
        //   getTranslated("destinationFolderAlreadySelectedWarningBody").concat(
        //     ...alreadyHasThisPath[0].filters.map(
        //       (f) => `'${f.content}(${f.type})' `
        //     )
        //   )
        // );
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
        title: getTranslated("noDestinationFolderSelectedTitleAlert"),
        body: getTranslated("noDestinationFolderSelectedBodyAlert"),
      },
      noFiltersText: {
        title: getTranslated("noDestinationFiltersSelectedTitleAlert"),
        body: getTranslated("noDestinationFiltersSelectedBodyAlert"),
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
    <main className="filter-page-container">
      <Section
        className="filter-page"
        sectionName={getTranslated("addDestinationFolderSection")}
        sectionDescription={getTranslated("addDestinationFolderDescription")}
      >
        <Input
          type="pick"
          style="add"
          placeholder={getTranslated("destinatonFolderDisplayPlaceholder")}
          callbackClick={handlePickedDestinationFolder}
        />
        <PickFiltersSection
          folder={destinationFolder}
          setFolder={setDestinationFolder}
        />
        <Flex className="filter-page__bottom-btns">
          <Button
            content={getTranslated("addDestinationFolder")}
            callback={handleAddDestinationFolder}
            type="add"
            important={true}
          />
          <Button
            content={getTranslated("cancelDestinationFolder")}
            callback={handleCancel}
            type="delete"
            important={true}
          />
        </Flex>
      </Section>
    </main>
  );
};
