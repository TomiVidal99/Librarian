import { Routes, Route, BrowserRouter } from "react-router-dom";
import { IGlobalState, initialState, LanguageContext } from "../../state";
import { useLanguage } from "../../hooks";

import "./App.style.scss";
import { IDestinationFolder } from "../../models";
import { useEffect, useReducer } from "react";
import { ACTIONS, reducer } from "../../services";
import { Filters, NotFound, Settings } from "./pages";

// const ORIGIN_FOLDERS_DEFAULT: IOriginFolder[] = [
//   {
//     id: uuid(),
//     name: "temp",
//     path: "/home/tomii/temp",
//     date: new Date(),
//   },
//   {
//     id: uuid(),
//     name: "Github",
//     path: "/home/tomii/Github",
//     date: new Date(),
//   },
// ];
//
// const DESTINATION_FOLDERS_DEFAULT: IDestinationFolder[] = [
//   {
//     id: uuid(),
//     name: "pdfs",
//     path: "/home/tomii/Documents/pdfs",
//     date: new Date(),
//     filters: [],
//   },
//   {
//     id: uuid(),
//     name: "documentos",
//     path: "/home/tomii/Documents",
//     date: new Date(),
//     filters: [],
//   },
// ];
//
// const RECENTLY_MOVED_TEST: IRecentlyMovedFolder = {
//   id: uuid(),
//   name: "archivo_test",
//   origin: "/home/tomii/origin/",
//   destination: "/home/tomii/destino/",
//   time: new Date(),
//   filter: {
//     id: uuid(),
//     type: "name",
//     content: "test",
//     priority: 1,
//   },
// };

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentLanguage, setLanguage, getTranslatedText, supportedLanguages] =
    useLanguage();

  useEffect(() => {
    console.log("state updated: ", state);
  }, [state]);

  // listens to make a recently watched folder
  useEffect(() => {
    window.api.getRecentlyWatchedFolder((data) => {
      dispatch({
        type: ACTIONS.ADD_RECENTLY_MOVED,
        payload: data,
      });
    });
  }, []);

  // syncs the state given by the main
  useEffect(() => {
    window.api.getState((s: IGlobalState) => {
      dispatch({
        type: ACTIONS.UPDATE_STATE,
        payload: s,
      });
    });
  }, []);

  // get destination folders from the filters window
  useEffect(() => {
    window.api.recieveDestinationFolder((folder: IDestinationFolder) => {
      dispatch({
        type: ACTIONS.ADD_DESTINATION_FOLDER,
        payload: folder,
      });
    });
  }, []);

  // For testing porpouses
  // useEffect(() => {
  //   dispatch({
  //     type: ACTIONS.ADD_ORIGIN_FOLDER,
  //     payload: ORIGIN_FOLDERS_DEFAULT,
  //   });
  //   DESTINATION_FOLDERS_DEFAULT.forEach((folder) => {
  //     dispatch({
  //       type: ACTIONS.ADD_DESTINATION_FOLDER,
  //       payload: folder,
  //     });
  //   });
  // }, []);

  // useEffect(() => {
  //   console.log(window.location)
  //   const path = window.location.href;
  //   const routes = ["main_window", "filters_window"];
  //   routes.forEach((r) => {
  //     process.env.NODE_ENV === "production" ? 
  //     console.log(path.includes(r) ? window.location.pathname = `${path}/${r}` : false)
  //     : 
  //     console.log(path.includes(r) ? redirect(`/${r}`) : false)
  //   })
  // }, [window.location]);

  return (
    <LanguageContext.Provider
      value={{
        getLang: currentLanguage,
        setLang: setLanguage,
        getTranslated: getTranslatedText,
        languagesAvailables: supportedLanguages,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path={"/main_window"}
            element={<Settings state={state} dispatch={dispatch} />}
          />
          <Route
            path={"/filters_window"}
            element={<Filters dispatch={dispatch} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LanguageContext.Provider >
  );
};
