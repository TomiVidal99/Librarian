import { IGlobalReducerAction } from "../../../../models";
import { IGlobalState } from "../../../../state";

interface IProps {
  state: IGlobalState;
  dispatch: React.Dispatch<IGlobalReducerAction>;
}

export const Filters = ({ state, dispatch }: IProps): JSX.Element => {
  return (
    <main className="filter-page-container">
      <h1>FILTERS</h1>
    </main>
  );
};
