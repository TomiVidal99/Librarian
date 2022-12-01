import { BrowserRouter } from "react-router-dom";
import { initialState, LanguageContext } from "../../state";
import { useLanguage } from "../../hooks";

import "./App.style.scss";
import { IDestinationFolder, IOriginFolder } from "../../models";
import uuid from "react-uuid";
import { useEffect, useReducer } from "react";
import { ACTIONS, reducer } from "../../services";
import { Filters, Settings } from "./pages";
import { Route, Routes } from "react-router";

const ORIGIN_FOLDERS_DEFAULT: IOriginFolder[] = [
  {
    id: uuid(),
    name: "temp",
    path: "/home/tomii/temp",
    date: new Date(),
  },
  {
    id: uuid(),
    name: "Github",
    path: "/home/tomii/Github",
    date: new Date(),
  },
];

const DESTINATION_FOLDERS_DEFAULT: IDestinationFolder[] = [
  {
    id: uuid(),
    name: "pdfs",
    path: "/home/tomii/Documents/pdfs",
    date: new Date(),
    filters: [],
  },
  {
    id: uuid(),
    name: "documentos",
    path: "/home/tomii/Documents",
    date: new Date(),
    filters: [],
  },
];

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentLanguage, setLanguage, getTranslatedText, supportedLanguages] =
    useLanguage();

  useEffect(() => {
    dispatch({
      type: ACTIONS.ADD_ORIGIN_FOLDER,
      payload: ORIGIN_FOLDERS_DEFAULT,
    });
    dispatch({
      type: ACTIONS.ADD_DESTINATION_FOLDER,
      payload: DESTINATION_FOLDERS_DEFAULT,
    });
  }, []);
  return (
    <BrowserRouter>
      <LanguageContext.Provider
        value={{
          getLang: currentLanguage,
          setLang: setLanguage,
          getTranslated: getTranslatedText,
          languagesAvailables: supportedLanguages,
        }}
      >
        <Routes>
          <Route
            path="/main_window"
            element={<Settings state={state} dispatch={dispatch} />}
          />
          <Route
            path="/filters_window"
            element={<Filters state={state} dispatch={dispatch} />}
          />
        </Routes>
      </LanguageContext.Provider>
    </BrowserRouter>
  );
};
