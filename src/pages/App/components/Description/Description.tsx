import { useContext } from "react";
import { LanguageContext } from "../../../../state";

import "./Description.style.scss"

export const Description = () => {
  const { getTranslated } = useContext(LanguageContext);
  return (
    <div className="description-container">
      <p className="description__content capitalize">{getTranslated("description")}</p>
    </div>
  );
};
