// main.jsx
// - React 앱을 실행할 때, 라우팅 기능을 쓰려면 BrowserRouter로 App을 감싼다
// - 이렇게 해두면 Link로 페이지 이동(/, /ledger)이 가능해진다

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

// initAmplify
// - (선택) AWS Amplify(Auth) 설정 파일이 존재하면 자동으로 읽어서 Amplify.configure를 호출한다.
// - 로컬/배포 환경에서 aws-exports.js(amplify CLI) 또는 amplify_outputs.json(Gen2)을
//   추가해두면, 코드 수정 없이 바로 로그인 기능이 연결된다.
import { initAmplify } from "./amplify/initAmplify.js";

// AuthProvider
// - 앱 전체에서 로그인 상태(현재 유저/로딩/로그인/로그아웃)를 공유한다.
import { AuthProvider } from "./auth/AuthContext.jsx";

// 앱 시작 시 한 번만 Amplify 초기화
initAmplify();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);