import addCircleRounded from "@iconify/icons-material-symbols/add-circle-rounded";
import { Icon } from "@iconify/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FilterType } from "../../../../models";
import { getFolderName } from "../OriginFolders/utils";
import "./InlineDisplay.style.scss";

interface IProps {
  placeholder: string;
  defaultValue?: string;
  type?: "text" | "pick";
  style?: "normal" | "add" | "remove" | FilterType;
  className?: string;
  callbackClick?: (arg0: { name: string; path: string }) => Promise<boolean>;
  callbackChange?: (arg0: string) => void;
}

export const InlineDisplay = ({
  className = "",
  defaultValue = "",
  type = "text",
  style = "normal",
  placeholder,
  callbackClick = () =>
    new Promise((_, reject) => {
      const err = "You must define a click callback";
      reject(err);
    }),
  callbackChange = () => {
    console.error("You must define a change callback");
  },
}: IProps): JSX.Element => {
  const [value, setValue] = useState<string>(defaultValue);
  const inputRef = useRef<HTMLInputElement>();
  const blurOutInput = () => {
    const curr = inputRef.current as HTMLInputElement;
    curr?.blur();
  };
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  const handleClick = async (): Promise<void> => {
    if (type === "text") return;
    const foldersPaths = await window.api.pickAFolder({
      multiSelection: false,
      defaultPath: value,
    });
    if (foldersPaths === undefined || foldersPaths.length === 0) return;
    const path = foldersPaths[0];
    const name = getFolderName(path);
    callbackClick({ name, path }).then((success) => {
      if (!success) return;
      setValue(path);
    });
    blurOutInput();
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === "pick") return;
    const val = e.target.value;
    setValue(val);
  };
  const handleSubmit = () => {
    if (type === "pick") {
      handleClick();
    } else {
      callbackChange(value);
    }
    blurOutInput();
  };
  return (
    <form
      aria-details={style}
      className={`inline-display-container ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        setValue("");
        blurOutInput();
      }}
    >
      <input
        ref={inputRef}
        className="inline-display"
        placeholder={placeholder}
        value={value}
        onClick={handleClick}
        type="text"
        spellCheck={false}
        onChange={handleOnChange}
      />
      {type === "text" || value === "" ? (
        <button onClick={handleSubmit} className="inline-display__btn">
          <Icon
            className="inline-display__icon"
            inline={true}
            icon={addCircleRounded}
          />
        </button>
      ) : null}
    </form>
  );
};
