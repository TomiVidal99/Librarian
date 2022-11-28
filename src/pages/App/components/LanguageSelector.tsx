import { MouseEvent, useEffect, useRef, useState } from "react";
import { LanguageType } from "../../../hooks";
import { Icon } from "@iconify/react";
import arrowDropDownRounded from "@iconify/icons-material-symbols/arrow-drop-down-rounded";
import "./styles/LanguageSelector.style.scss";

interface IProps {
  availableLanguages: LanguageType[];
  selectedLanguageCallback: (arg0: LanguageType) => void;
  defaultValue: LanguageType;
}

export const LanguageSelector = ({
  availableLanguages,
  selectedLanguageCallback,
  defaultValue,
}: IProps): JSX.Element => {
  const listRef = useRef<HTMLDivElement>();
  const [selectedOption, setSelectedOptions] = useState<number>(
    availableLanguages.indexOf(defaultValue)
  );
  useEffect(() => {
    setSelectedOptions(availableLanguages.indexOf(defaultValue));
  }, [defaultValue]);
  const toggleOpenSelect = (): void => {
    listRef?.current?.classList.toggle("closed");
  };
  const handleClick = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ): void => {
    const lang = (event.target as HTMLButtonElement).innerHTML;
    setSelectedOptions(availableLanguages.indexOf(lang as LanguageType));
    selectedLanguageCallback(lang as LanguageType);
    toggleOpenSelect();
  };
  return (
    <div ref={listRef} className="language-selector-container closed">
      <div className="language-selector">
        <button
          onClick={toggleOpenSelect}
          className="language-selector__selected-option language-selector__btn"
        >
          <div>{availableLanguages[selectedOption]}</div>
          <Icon inline={true} icon={arrowDropDownRounded} />
        </button>
        <ul className="language-selector__option-list">
          {availableLanguages.map((lang) => {
            if (availableLanguages.indexOf(lang) == selectedOption) return;
            return (
              <li className="language-selector__option" key={lang}>
                <button
                  className="language-selector__btn"
                  onClick={handleClick}
                >
                  {lang}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
