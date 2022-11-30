import "./Section.style.scss";

interface IProps {
  children: JSX.Element;
  sectionName?: string;
  sectionDescription?: string;
  border?: boolean;
}

export const Section = ({
  children,
  sectionName = "",
  sectionDescription,
  border: border = true,
}: IProps): JSX.Element => {
  return (
    <section
      aria-description={sectionName}
      className={`app-section ${border ? "" : "section-no-border"}`}
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
