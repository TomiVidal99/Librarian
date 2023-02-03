import { ReactNode } from "react";

import "./Flex.style.scss"

interface IProps {
  children: ReactNode;
  className?: string;
  type?: "row" | "column";
}

export const Flex = ({ className = "", children, type = "row" }: IProps): JSX.Element => {
  return (
    <div
      className={`flex-container ${
        type === "row" ? "" : "flex-column"
      } ${className}`}
    >
      {children}
    </div>
  );
};
