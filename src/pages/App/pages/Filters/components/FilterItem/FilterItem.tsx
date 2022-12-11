import { IFilter } from "../../../../../../models";
import "./FilterItem.style.scss";

interface IProps {
  filter: IFilter;
  handleRemoveFilter: (id: string) => void;
}

export const FilterItem = ({
  filter,
  handleRemoveFilter,
}: IProps): JSX.Element => {
  const handleClick = () => {
    handleRemoveFilter(filter.id);
  };
  return (
    <li aria-label={filter.type} className="filter-item" key={filter.id}>
      <button onClick={handleClick}>{filter.content}</button>
    </li>
  );
};
