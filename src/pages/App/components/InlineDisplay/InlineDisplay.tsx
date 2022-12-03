import { ChangeEvent, useEffect, useState } from "react";
import "./InlineDisplay.style.scss";

interface IProps {
  content: string;
  placeholder: string;
  className?: string;
  clickCallback?: () => void;
}

export const InlineDisplay = ({
  className = "",
  content,
  placeholder,
  clickCallback,
}: IProps): JSX.Element => {
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    setValue(content);
  }, [content]);
  return (
    <input
      className={`inline-display ${
        content === "" ? "inline-display-empty" : "inline-display-content"
      }
      ${className}`}
      placeholder={placeholder + "..."}
      value={value}
      onClick={clickCallback}
      onChange={function() {}}
    />
  );
};
