import { Flex, Input } from "../../../../components";
import {
  FilterType,
  IDestinationFolder,
  IFilter,
} from "../../../../../../models";
import "./PickFiltersSection.style.scss";
import { useContext } from "react";
import { IGlobalState, LanguageContext } from "../../../../../../state";
import { isFilterCorrect } from "../../utils";
import uuid from "react-uuid";
import { FilterItem } from "../FilterItem/FilterItem";

interface IProps {
  state: IGlobalState;
  folder: IDestinationFolder;
  setFolder: React.Dispatch<React.SetStateAction<IDestinationFolder>>;
}

export const PickFiltersSection = ({
  state,
  folder,
  setFolder,
}: IProps): JSX.Element => {
  const { getTranslated } = useContext(LanguageContext);
  const handleRemoveFilter = (id: string): void => {
    setFolder({
      ...folder,
      filters: [...folder.filters.filter((f) => f.id !== id)],
    });
  };
  const handleAddFilter = (content: string, type: FilterType): void => {
    // TODO: make the priority system.
    const newFilter: IFilter = {
      id: uuid(),
      type,
      content,
      priority: 1,
    };
    const warningText = {
      title: getTranslated("repeatedFilterTitleAlert"),
      body: getTranslated("repeatedFilterBodyAlert"),
    };
    const isCorrect = isFilterCorrect(
      newFilter,
      state.destinationFolders,
      warningText
    );
    if (!isCorrect) return;
    setFolder({
      ...folder,
      filters: [...folder.filters, newFilter],
    });
  };
  return (
    <div className="pick-filters-container">
      <Flex type="column">
        <Input
          style="name"
          placeholder={getTranslated("filterLabelNamePlaceholder")}
          callbackChange={(f: string) => handleAddFilter(f, "name")}
        />
        <Input
          style="format"
          placeholder={getTranslated("filterLabelFormatPlaceholder")}
          callbackChange={(f: string) => handleAddFilter(f, "format")}
        />
        <Input
          style="regex"
          placeholder={getTranslated("filterLabelRegexPlaceholder")}
          callbackChange={(f: string) => handleAddFilter(f, "regex")}
        />
      </Flex>
      <ul className="pick-filters__list">
        {folder.filters.map((filter) => (
          <FilterItem
            key={filter.id}
            filter={filter}
            handleRemoveFilter={handleRemoveFilter}
          />
        ))}
      </ul>
    </div>
  );
};
