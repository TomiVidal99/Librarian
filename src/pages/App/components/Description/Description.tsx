import { useContext } from "react";
import { LanguageContext } from "../../../../state";

export const Description = () => {
  const { getTranslated } = useContext(LanguageContext);
  return (
    <div className="description-container">
      <p className="capitalize">{getTranslated("description")}</p>
    </div>
  );
};
