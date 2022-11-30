import { MouseEvent } from "react";
import "./Button.style.scss";

interface IProps {
  content: string;
  children?: JSX.Element;
  callback: (arg0: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const Button = ({
  content,
  children,
  callback,
  className = "",
}: IProps): JSX.Element => {
  return (
    <button onClick={(e) => callback(e)} className={`btn ${className}`}>
      <div className="btn__content capitalize">{content}</div>
      {children}
    </button>
  );
};
