import { useContext, useEffect, useState } from "react";
import { ACTIONS } from "../../../../services";
import { IDestinationFolder, IGlobalReducerAction } from "../../../../models";
import { IGlobalState, LanguageContext } from "../../../../state";
import { Button, InlineDisplay, Section } from "../../components";
import { Flex } from "../../components/Flex/Flex";

import "./Filters.style.scss";
import uuid from "react-uuid";
import { PickFiltersSection } from "./components";
import { isValidDestinationFolder } from "./utils";
import { getFolderName } from "../../components/OriginFolders/utils";

interface IProps {
  state: IGlobalState;
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

export const Filters = ({ state, dispatch }: IProps): JSX.Element => {
  const { getTranslated } = useContext(LanguageContext);
  const [destinationFolder, setDestinationFolder] =
    useState<IDestinationFolder>(createInitialDestinationFolder());
  const handlePickedDestinationFolder = ({ name, path }: { name: string; path: string }): void => {
    setDestinationFolder({
      ...destinationFolder,
      path,
      name,
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
        <InlineDisplay
          placeholder={getTranslated("destinatonFolderDisplayPlaceholder")}
          clickCallback={handlePickedDestinationFolder}
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
