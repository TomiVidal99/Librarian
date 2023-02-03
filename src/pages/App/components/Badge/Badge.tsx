import "./Badge.style.scss";

interface IProps {
  content: string;
  type?: "normal" | "warning";
  children?: JSX.Element;
}

export const Badge = ({
  content,
  children,
  type = "normal",
}: IProps): JSX.Element => {
  return (
    <div aria-label={type} className="badge">
      <p className="badge__content">{content}</p>
      {children}
    </div>
  );
};
