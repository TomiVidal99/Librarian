import { Flex, InlineDisplay } from "@components";
import { FilterType, IDestinationFolder, IFilter } from "@models";
import "./PickFiltersSection.style.scss";
import { IGlobalState, LanguageContext } from "@state";
import { useContext } from "react";
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
  /**
   * Checks if the filter it's format and then it returns the Filter
   * with the content beginning with a dot.
   */
  const parseFormatFilter = (filter: IFilter): IFilter => {
    if (filter.type !== "format" || filter.content[0] === ".") return filter;
    return {
      ...filter,
      content: "." + filter.content,
    };
  };
  const handleAddFilter = (content: string, type: FilterType): void => {
    // TODO: make the priority system.
    const newFilter: IFilter = parseFormatFilter({
      id: uuid(),
      type,
      content,
      priority: 1,
    });
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
        <InlineDisplay
          style="name"
          placeholder={getTranslated("filterLabelNamePlaceholder")}
          callbackChange={(f: string) => handleAddFilter(f, "name")}
        />
        <InlineDisplay
          style="format"
          placeholder={getTranslated("filterLabelFormatPlaceholder")}
          callbackChange={(f: string) => handleAddFilter(f, "format")}
        />
        <InlineDisplay
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
