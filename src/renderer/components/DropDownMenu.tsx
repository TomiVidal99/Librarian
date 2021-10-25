/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MODULES ~~~~~ */
import { ReactElement, useEffect, useRef, useState } from 'react';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ COMPONENTS ~~~~~ */
import '../styles/DropDownMenu.global.css';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TYPES ~~~~~ */
interface DropDownMenuProps {
  options: string[];
  label: string;
  handleItemCallback: (arg0: string) => void;
  defaultValue?: number;
}
interface ListItemProps {
  option: string;
  callback: (arg0: string) => void;
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MAIN CONTENT ~ */
const ListItem = ({ option, callback }: ListItemProps): ReactElement => {
  return (
    <li
      role="presentation"
      onClick={() => {
        callback(option);
      }}
      className="dropdown_item"
    >
      {option}
    </li>
  );
};
const menuIsOpenedClass = 'dropdown_opened';
const DropDownMenu = ({
  options,
  defaultValue,
  label,
  handleItemCallback,
}: DropDownMenuProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<number>(defaultValue || 0);
  const listRef = useRef<HTMLUListElement | null>(null);
  useEffect(() => {
    if (defaultValue) setSelectedValue(defaultValue);
  }, [defaultValue]);
  // opens and closes the menu
  const toggleOpen = () => {
    if (listRef === null) return;
    if (isOpen) {
      listRef?.current?.classList.remove(menuIsOpenedClass);
    } else {
      listRef?.current?.classList.add(menuIsOpenedClass);
    }
    setIsOpen(!isOpen);
  };
  // handles the switch of the current displayed option
  const switchOptions = (value: string) => {
    options.forEach((val, index) => {
      if (val === value) {
        setSelectedValue(index);
      }
    });
  };
  return (
    <div role="presentation" onClick={toggleOpen} className="dropdown">
      {label}
      <div
        style={{
          backgroundColor: isOpen ? 'var(--opened-bg)' : 'var(--default-bg)',
        }}
        className="dropdown_container"
      >
        {options[selectedValue]}
        <ul
          style={{
            display: isOpen ? 'flex' : 'none',
          }}
          ref={listRef}
          className="dropdown_list"
        >
          {options.map((option) => {
            return (
              <ListItem
                key={option}
                option={option}
                callback={(payload) => {
                  switchOptions(payload);
                  handleItemCallback(payload);
                }}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

// default props
DropDownMenu.defaultProps = {
  defaultValue: 0,
};

export default DropDownMenu;
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */
