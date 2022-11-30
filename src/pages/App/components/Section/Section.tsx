import "./Section.style.scss";

interface IProps {
  children: JSX.Element;
  sectionName?: string;
  border?: boolean;
}

export const Section = ({
  children,
  sectionName = "",
  border: border = true,
}: IProps): JSX.Element => {
  return (
    <section
      aria-description={sectionName}
      className={`app-section ${border ? "" : "section-no-border"}`}
    >
      {children}
    </section>
  );
};
