import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/noto-serif-kr/400.css";
import "@fontsource/noto-serif-kr/500.css";
import "@fontsource-variable/dm-sans";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
