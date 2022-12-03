import { useContext, useState } from "react";
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
  const handlePickedDestinationFolder = async (): Promise<void> => {
    const foldersPaths = await window.api.pickAFolder(false);
    const name = getFolderName(foldersPaths[0]);
    setDestinationFolder({
      ...destinationFolder,
      path: foldersPaths.length === 0 ? "" : foldersPaths[0],
      name,
    });
  };
  const handleAddDestinationFolder = () => {
    // TODO: add alerts when the data it's not valid
    const isValid = isValidDestinationFolder(destinationFolder);
    console.log(`is the folder valid to send: ${isValid}\n`);
    console.log(destinationFolder);
    if (!isValid) return;
    dispatch({
      type: ACTIONS.ADD_DESTINATION_FOLDER,
      payload: destinationFolder,
    });
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
        <Flex>
          <InlineDisplay
            content={destinationFolder ? destinationFolder?.path : ""}
            placeholder={getTranslated("destinatonFolderDisplayPlaceholder")}
            clickCallback={handlePickedDestinationFolder}
          />
          <Button
            content={getTranslated("pickDestinationFoder")}
            callback={handlePickedDestinationFolder}
          />
        </Flex>
        <PickFiltersSection
          folder={destinationFolder}
          setFolder={setDestinationFolder}
        />
        <Flex className="filter-page__bottom-btns">
          <Button
            content={getTranslated("addDestinationFolder")}
            callback={handleAddDestinationFolder}
            type="add"
          />
          <Button
            content={getTranslated("cancelDestinationFolder")}
            callback={handleCancel}
            type="delete"
          />
        </Flex>
      </Section>
    </main>
  );
};
