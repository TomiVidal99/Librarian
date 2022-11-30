import { MouseEvent, useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import arrowDropDownRounded from "@iconify/icons-material-symbols/arrow-drop-down-rounded";
import "./Select.style.scss";

interface IProps<T> {
  availableOptions: T[];
  selectedOptionsCallback: (arg0: T) => void;
  defaultValue: T;
}

export const Select = <T extends string>({
  availableOptions,
  selectedOptionsCallback,
  defaultValue,
}: IProps<T>): JSX.Element => {
  const listRef = useRef<HTMLDivElement>();
  const [selectedOption, setSelectedOptions] = useState<number>(
    availableOptions.indexOf(defaultValue)
  );
  useEffect(() => {
    setSelectedOptions(availableOptions.indexOf(defaultValue));
  }, [defaultValue]);
  const toggleOpenSelect = (): void => {
    listRef?.current?.classList.toggle("closed");
  };
  const handleClick = (
    event: MouseEvent<HTMLButtonElement>
  ): void => {
    const option = (event.target as HTMLButtonElement).innerHTML;
    setSelectedOptions(availableOptions.indexOf(option as T));
    selectedOptionsCallback(option as T);
    toggleOpenSelect();
  };
  return (
    <div ref={listRef} className="select-container closed">
      <div className="select">
        <button
          onClick={toggleOpenSelect}
          className="select__btn"
        >
          <div>{availableOptions[selectedOption] as string}</div>
          <Icon inline={true} icon={arrowDropDownRounded} />
        </button>
        <ul className="select__option-list">
          {availableOptions.map((_option) => {
            if (availableOptions.indexOf(_option) == selectedOption) return;
            return (
              <li className="select__option" key={_option as string}>
                <button
                  className="select__btn"
                  onClick={handleClick}
                >
                  {_option as string}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
