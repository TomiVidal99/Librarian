import { useLanguage } from "../../hooks";
import "./App.style.scss";
import { Description } from "./components";

export const App = () => {
  const [currentLanguage, setLanguage, getTranslatedText, supportedLanguages] =
    useLanguage();
  return (
    <div className="app-container">
      <div className="app">
        <h1 className="app-title">Librarian</h1>
        <Description />
      </div>
      <div>
        <select>
            {supportedLanguages.map((lang: string) => (
              <option key={lang}>{lang}</option>
            ))}
        </select>
      </div>
    </div>
  );
};
