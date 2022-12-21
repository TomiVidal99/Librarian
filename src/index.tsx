import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./pages";

import "./index.scss";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <App />
);
