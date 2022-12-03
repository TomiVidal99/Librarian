import { IFilter } from "../../../../../../models";
import "./FilterItem.style.scss"

interface IProps {
  filter: IFilter;
  handleRemoveFilter: (id: string) => void
}

export const FilterItem = ({filter, handleRemoveFilter}: IProps): JSX.Element => {
  return (
    <li aria-label={filter.type} className="filter-item" key={filter.id}>
      <button onClick={() => handleRemoveFilter(filter.id)}>
        {filter.content}
      </button>
    </li>
  );
};
