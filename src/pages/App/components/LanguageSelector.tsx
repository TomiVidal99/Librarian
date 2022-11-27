import { MouseEvent, useEffect } from "react";
import { LanguageType } from "../../../hooks";

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
}: IProps) => {
  useEffect(() => {
    console.log(`default language: ${defaultValue}`);
  }, []);
  const handleClick = (
    event: MouseEvent<HTMLSelectElement, globalThis.MouseEvent>
  ): void => {
    const options = event.target.options;
    const lang = options[options.selectedIndex].innerHTML;
    selectedLanguageCallback(lang);
  };
  return (
    <div className="language-selector-container">
      <select
        onClick={(e) => handleClick(e)}
        name="language"
        className="language-selector"
        defaultValue={defaultValue}
      >
        {availableLanguages.map((lang) => {
          return (
            <option className="language-selector-option" key={lang}>
              {lang}
            </option>
          );
        })}
      </select>
    </div>
  );
};
