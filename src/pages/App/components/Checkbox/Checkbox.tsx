import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import radioButtonCheckedOutline from "@iconify/icons-material-symbols/radio-button-checked-outline";
import baselineRadioButtonUnchecked from "@iconify/icons-ic/baseline-radio-button-unchecked";
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
  const [checked, setValue] = useState<boolean>(defaultValue);
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  const handleClick = () => {
    setValue(!checked);
    callback(!checked);
  };
  return (
    <label className={`checkbox ${className}`}>
      <div className="capitalize">{label}</div>
      <button onClick={handleClick} className="checkbox__btn">
        {checked ? (
          <Icon color="green" inline={true} icon={radioButtonCheckedOutline} />
        ) : (
          <Icon color="red" inline={true} icon={baselineRadioButtonUnchecked} />
        )}
      </button>
    </label>
  );
};
