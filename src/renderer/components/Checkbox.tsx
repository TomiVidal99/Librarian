/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MODULES ~~~~~ */
import { ReactElement, useEffect, useState } from 'react';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ COMPONENTS ~~~~~ */
import '../styles/Checkbox.global.css';
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TYPES ~~~~~ */
interface CheckboxProps {
  label: string;
  callback: (arg0: boolean) => void;
  name: string;
  checked?: boolean;
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MAIN CONTENT ~ */
const Checkbox = ({
  label,
  callback,
  name,
  checked = false,
}: CheckboxProps): ReactElement => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  // update on the checked prop
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  // when the checkbox is clicked
  const handleClick = () => {
    setIsChecked(!isChecked);
    callback(!isChecked);
  };

  return (
    <div className="checkbox">
      <label className="checkbox__label" htmlFor={name}>
        {label}
        <input
          className="checkbox__input"
          type="checkbox"
          id={name}
          onChange={handleClick}
          checked={isChecked}
          name={name}
        />
      </label>
    </div>
  );
};

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DEFAULT PROPS ~~~~~ */
Checkbox.defaultProps = {
  checked: false,
};

export default Checkbox;
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~ */
