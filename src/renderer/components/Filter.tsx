/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MODULES ~~~~~ */
import { ReactElement } from 'react';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ COMPONENTS ~~~~~ */
import '../styles/Filter.global.css';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TYPES ~~~~~ */
interface FilterProps {
  type: FiltersType;
  content: string;
  deleteItemCallback: () => void;
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MAIN CONTENT ~ */
const Filter = ({
  type,
  content,
  deleteItemCallback,
}: FilterProps): ReactElement => {
  return (
    <li
      role="presentation"
      onClick={deleteItemCallback}
      className="filters_list__item"
      filtertype={type}
    >
      <label htmlFor="filter-item" className="item__label">
        <div className="item__content">{content}</div>
        <svg
          className="item__delete_icon"
          id="delete-icon"
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.13623"
            y="10.7427"
            width="15"
            height="3"
            rx="1.5"
            transform="rotate(-45 0.13623 10.7427)"
            fill="#FF0000"
          />
          <rect
            x="2.12109"
            width="15"
            height="3"
            rx="1.5"
            transform="rotate(45 2.12109 0)"
            fill="#FF0000"
          />
        </svg>
      </label>
    </li>
  );
};

export default Filter;
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */
