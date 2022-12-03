import { FormEvent, useState } from "react";
import { FilterType } from "./../../../../../../models";
import { Icon } from "@iconify/react";
import addCircleRounded from "@iconify/icons-material-symbols/add-circle-rounded";

import "./FilterSelector.style.scss";

interface IProps {
  placeholder: string;
  label: string;
  type: FilterType;
  callback: (arg0: string) => void;
  className?: string;
}

export const FilterSelector = ({
  placeholder,
  label,
  type,
  callback,
  className = "",
}: IProps) => {
  const [value, setValue] = useState<string>("");
  const handleSubmitFilter = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    callback(value);
    setValue("");
  };
  return (
    <form
      aria-details={type}
      aria-label={label}
      onSubmit={handleSubmitFilter}
      className={`filter-selector ${className}`}
    >
      <label className="filter-selector__label">
        <span>{label}</span>
        <input
          className="filter-selector__input"
          name={`filter-${type}`}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
      <button className="filter-selector__submit-btn" type="submit">
        <Icon inline={true} icon={addCircleRounded} />
      </button>
    </form>
  );
};
