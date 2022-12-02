import "./InlineDisplay.style.scss";

interface IProps {
  content: string;
  placeholder: string;
  className?: string;
}

export const InlineDisplay = ({
  className = "",
  content,
  placeholder,
}: IProps): JSX.Element => {
  return (
    <div className={`inline-display ${className}`}>
      {content === "" ? (
        <p className="inline-display__placeholder capitalize">{placeholder}</p>
      ) : (
        <p className="inline-display__content capitalize">{content}</p>
      )}
    </div>
  );
};
