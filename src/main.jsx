// main.jsx
// - React 앱을 실행할 때, 라우팅 기능을 쓰려면 BrowserRouter로 App을 감싼다
// - 이렇게 해두면 Link로 페이지 이동(/, /ledger)이 가능해진다

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);