import { ReactNode } from "react";
import "./Section.style.scss";

interface IProps {
  children: ReactNode;
  className?: string;
  sectionName?: string;
  sectionDescription?: string;
  border?: boolean;
}

export const Section = ({
  children,
  className = "",
  sectionName = "",
  sectionDescription,
  border: border = true,
}: IProps): JSX.Element => {
  return (
    <section
      aria-description={sectionName}
      className={`app-section ${border ? "" : "section-no-border"} ${className}`}
    >
      {sectionDescription ? (
        <p className="app-section__description capitalize">
          {sectionDescription}
        </p>
      ) : null}

      {children}
    </section>
  );
};
