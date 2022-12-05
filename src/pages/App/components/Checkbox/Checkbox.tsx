import { useEffect, useState } from "react";
import "./Checkbox.style.scss";

interface IProps {
  label: string;
  defaultValue: boolean;
  callback: (arg0: boolean) => void;
  className?: string;
}

export const Checkbox = ({
  label,
  defaultValue,
  callback,
  className = "",
}: IProps): JSX.Element => {
  const [value, setValue] = useState<boolean>(defaultValue);
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  const handleClick = () => {
    setValue(!value);
    callback(!value);
  };
  return (
    <div className={`checkbox-container ${className}`}>
      <label>
        <span className="checkbox__label capitalize">{label}</span>
        <input
          className="checkbox__input"
          type="checkbox"
          checked={value}
          onChange={() => handleClick()}
        />
      </label>
    </div>
  );
};
