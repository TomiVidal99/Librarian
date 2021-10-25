/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MODULES ~~~~~ */
import { ChangeEvent, ReactElement, useReducer, useState } from 'react';
import getRandomIds from 'renderer/utils/getRandomIds';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ COMPONENTS ~~~~~ */
import '../styles/FiltersMenu.global.css';
import SelectFolders from './SelectFolders';
import Filter from './Filter';
import NoItemsWarning from './NoItemsWarning';
import Button from './Button';

// import AddIconSVG from '../../../assets/icons/AddIconSVG.svg';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TYPES ~~~~~ */
interface DisplayPathProps {
  folder: string;
  path: string;
}
interface SelectFilterProps {
  label: string;
  placeholder: string;
  filterType: FiltersType;
  callback: (arg0: FilterType) => void;
  disabled?: boolean;
}
interface StateType {
  names: FilterType[];
  formats: FilterType[];
  regexs: FilterType[];
  folderpath: {
    folder: string;
    path: string;
  };
}
type ActionsKeyType = keyof typeof ACTIONS;
interface ActionType {
  type: typeof ACTIONS[ActionsKeyType];
  payload: any;
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ AddIconSVG ~~~~~ */
const AddIconSVG = () => {
  return (
    <svg
      className="filter_icon"
      id="add-icon"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill="#435168" fillOpacity="0.21" />
      <rect x="18" y="10" width="4" height="20" rx="2" fill="#5C9E45" />
      <rect
        x="10"
        y="22"
        width="4"
        height="20"
        rx="2"
        transform="rotate(-90 10 22)"
        fill="#5C9E45"
      />
    </svg>
  );
};
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DisplayPath COMPONENT ~~~~~ */
const DisplayPath = ({ folder, path }: DisplayPathProps) => {
  return (
    <div className="display_path_container">
      <p className="display_path__folder">{folder}</p>
      <p className="display_path__path">{path}</p>
    </div>
  );
};

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DestinationPath ~~~~~ */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SelectFilter COMPONENT ~~~~~ */
const SelectFilter = ({
  label,
  placeholder,
  filterType,
  callback,
  disabled = false,
}: SelectFilterProps): ReactElement => {
  const [val, setVal] = useState<string>('');

  // submits the new filter with the value of the input and the type given by the component
  const submitFilter = (e: any) => {
    e.preventDefault();
    // console.log('submitting new filter: ', filterType, val);
    callback({ type: filterType, content: val, id: getRandomIds() });
    setVal('');
  };

  // updates the value of the input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setVal(newVal);
  };
  return (
    <form className="filter_form" onSubmit={submitFilter}>
      <label className="filter_container" htmlFor="addButton">
        {label}
        <input
          filtertype={filterType}
          id="addButton"
          name="addButton"
          min="1"
          max="10"
          type="text"
          placeholder={placeholder}
          onChange={(e) => {
            handleChange(e);
          }}
          onSubmit={submitFilter}
          className="filter_input"
          value={val}
          disabled={disabled}
        />
        <div
          role="presentation"
          onClick={submitFilter}
          className="filter_icon_container"
        >
          <AddIconSVG />
        </div>
      </label>
    </form>
  );
};
SelectFilter.defaultProps = {
  disabled: false,
};

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ REDUCER ~~~~~ */
const ACTIONS = {
  UPDATE_NAMES: 'update-names',
  UPDATE_FORMATS: 'update-formats',
  UPDATE_REGEXS: 'update-regexs',
  REMOVE_NAMES: 'remove-names',
  REMOVE_FORMATS: 'remove-formats',
  REMOVE_REGEXS: 'remove-regexs',
  UPDATE_FOLDER: 'update-folderpath',
} as const;
const reducer = (state: StateType, action: ActionType) => {
  console.log('reducer called: ', { state, action });
  switch (action.type) {
    // updates the name filters
    case ACTIONS.UPDATE_NAMES:
      return {
        ...state,
        names: [...state.names, ...action.payload.names],
      };

    // updates the format filters
    case ACTIONS.UPDATE_FORMATS:
      return {
        ...state,
        formats: [...state.formats, ...action.payload.formats],
      };

    case ACTIONS.UPDATE_REGEXS:
      // updates the regex filters
      return {
        ...state,
        regexs: [...state.regexs, ...action.payload.regexs],
      };

    case ACTIONS.REMOVE_NAMES:
      return {
        ...state,
        names: [...state.names.filter(({ id }) => id !== action.payload.id)],
      };

    case ACTIONS.REMOVE_FORMATS:
      return {
        ...state,
        formats: [
          ...state.formats.filter(({ id }) => id !== action.payload.id),
        ],
      };

    case ACTIONS.REMOVE_REGEXS:
      return {
        ...state,
        regexs: [...state.regexs.filter(({ id }) => id !== action.payload.id)],
      };

    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folderpath: action.payload,
      };

    default:
      return state;
  }
};
const initialState: StateType = {
  names: [],
  formats: [],
  regexs: [],
  folderpath: {
    folder: '',
    path: '',
  },
};
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MAIN CONTENT ~ */
const FiltersMenu = (): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // submits the destination folder with the parameters
  const handleSumbitFolder = (): void => {
    console.log('should upload the data');
    window.electron.ipcRenderer.sendNewDestinationFolder(state);
    window.close();
  };

  // when the user select a new destination folder path
  const gotFolders = ({ canceled, filePaths }: SelectedFoldersType) => {
    // console.log('Got folders', filePaths);
    if (canceled) return;
    const folder = filePaths[0].split('/')[filePaths[0].split('/').length - 1];
    const folderpath = {
      folder,
      path: filePaths[0],
    };
    dispatch({ type: ACTIONS.UPDATE_FOLDER, payload: folderpath });
  };

  // handles the filter delete when a filter is deleted
  const handleDeleteFilter = (type: FiltersType, id: string): void => {
    console.log(`Should delete filter with index: ${type}, ${id}`);

    // TODO: for some reason a switch statement wont work here??? wtf??
    if (type === 'name') {
      dispatch({ type: ACTIONS.REMOVE_NAMES, payload: { id } });
    } else if (type === 'format') {
      dispatch({ type: ACTIONS.REMOVE_FORMATS, payload: { id } });
    } else if (type === 'regex') {
      dispatch({ type: ACTIONS.REMOVE_REGEXS, payload: { id } });
    } else {
      console.error(`Expected: name, format or regex. Got: ${type}`);
    }
  };
  const displayFilters = (filterList: any) => {
    // console.log(filterList);
    return filterList.map(({ type, content, id }: FilterType) => {
      return (
        <Filter
          type={type}
          content={content}
          deleteItemCallback={() => {
            handleDeleteFilter(type, id);
          }}
          key={id}
        />
      );
    });
  };
  const handleFilterAdded = ({ type, content, id }: FilterType) => {
    // console.log('should add new filter: ', type, content);
    switch (type) {
      case 'name':
        dispatch({
          type: ACTIONS.UPDATE_NAMES,
          payload: {
            names: [
              {
                type,
                content,
                id,
              },
            ],
          },
        });
        break;
      case 'format':
        dispatch({
          type: ACTIONS.UPDATE_FORMATS,
          payload: {
            formats: [
              {
                type,
                content,
                id,
              },
            ],
          },
        });
        break;
      case 'regex':
        dispatch({
          type: ACTIONS.UPDATE_REGEXS,
          payload: {
            regexs: [
              {
                type,
                content,
                id,
              },
            ],
          },
        });
        break;
      default:
        console.error(`Expected: name, format or regex. got: ${type}`);
    }
  };
  return (
    <div className="filters_menu">
      <h1 className="filters_menu__title">Add Filters</h1>
      <div className="destination_path_container">
        {state.folderpath.folder !== '' ? (
          <DisplayPath
            folder={state.folderpath.folder}
            path={state.folderpath.path}
          />
        ) : null}
        <SelectFolders
          buttonText={
            state.folderpath.folder === '' ? 'Pick a Folder' : 'Change Folder'
          }
          options={{
            title: 'Select a Destination Folder',
            buttonLabel: 'Select Folder',
            properties: ['openDirectory'],
          }}
          gotFoldersCallback={gotFolders}
        />
      </div>
      <SelectFilter
        filterType="name"
        label="By Name"
        callback={handleFilterAdded}
        placeholder="i.e: homework"
      />
      <SelectFilter
        filterType="format"
        label="By Format"
        callback={handleFilterAdded}
        placeholder="i.e: pdf"
      />
      <SelectFilter
        filterType="regex"
        label="By Regex"
        callback={handleFilterAdded}
        placeholder="NOT AVAILABLE YET"
        disabled
      />
      <div className="filters_list_container">
        <ul className="filters_list">
          {state.names.length === 0 &&
          state.formats.length === 0 &&
          state.regexs.length === 0 ? (
            <NoItemsWarning
              variant="filters"
              style={{ color: 'black', fontSize: 'var(--fs-secondary)' }}
            />
          ) : null}
          {displayFilters(state.names)}
          {displayFilters(state.formats)}
          {displayFilters(state.regexs)}
        </ul>
        <div className="filters_list_label">
          <div className="filter_name filter_label">BY NAME</div>
          <div className="filter_format filter_label">BY FORMAT</div>
          <div className="filter_regex filter_label">BY REGEX</div>
        </div>
      </div>
      {state.names.length !== 0 ||
      state.formats.length !== 0 ||
      state.regexs.length !== 0 ? (
        <Button content="Add This Folder" callback={handleSumbitFolder} />
      ) : null}
    </div>
  );
};

export default FiltersMenu;
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */
