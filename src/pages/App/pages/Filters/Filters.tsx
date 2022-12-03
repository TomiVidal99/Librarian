import { useContext, useState } from "react";
import {
  IDestinationFolder,
  IGlobalReducerAction,
  IPC_CALLS,
} from "../../../../models";
import { IGlobalState, LanguageContext } from "../../../../state";
import { Button, InlineDisplay, Section } from "../../components";
import { Flex } from "../../components/Flex/Flex";

import "./Filters.style.scss";

interface IProps {
  state: IGlobalState;
  dispatch: React.Dispatch<IGlobalReducerAction>;
}

export const Filters = ({ state, dispatch }: IProps): JSX.Element => {
  const { getTranslated } = useContext(LanguageContext);
  const [destinationFolder, setDestinationFolder] =
    useState<IDestinationFolder | null>(null);
  const handlePickedDestinationFolder = () => {
    console.warn("TODO: yet to implement");
    // window.api.request(IPC_CALLS.OPEN_FOLDERS_DIALOG, [() => {
    //   console.log("");
    // }]);
  };
  const handleAddDestinationFolder = () => {
    console.warn("TODO: yet to implement");
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
            content={destinationFolder ? destinationFolder?.name : ""}
            placeholder={getTranslated("destinatonFolderDisplayPlaceholder")}
          />
          <Button
            content={getTranslated("pickDestinationFoder")}
            callback={handlePickedDestinationFolder}
          />
        </Flex>
        <Button
          className="filter-page__add-destination-folder"
          content={getTranslated("addDestinationFolder")}
          callback={handleAddDestinationFolder}
          type="add"
        />
      </Section>
    </main>
  );
};
