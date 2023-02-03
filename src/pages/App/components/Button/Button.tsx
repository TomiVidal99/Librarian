import { MouseEvent } from "react";
import "./Button.style.scss";

interface IProps {
  content: string;
  type?: "normal" | "delete" | "add" | "edit";
  important?: boolean;
  children?: JSX.Element;
  callback: (arg0: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const Button = ({
  content,
  type = "normal",
  children,
  callback,
  className = "",
  important = false,
}: IProps): JSX.Element => {
  return (
    <button
      aria-details={important ? "important" : "normal"}
      onClick={(e) => callback(e)}
      className={`btn ${className} btn-${type}`}
    >
      <div className="btn__content capitalize">{content}</div>
      {children}
    </button>
  );
};
