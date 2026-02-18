// App.jsx
// - URL 경로에 따라 어떤 페이지(HomePage / LedgerPage)를 보여줄지 결정한다

import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage.jsx";
import LedgerPage from "./pages/LedgerPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* 로그인 페이지 */}
      <Route path="/login" element={<LoginPage />} />

      {/* 보호 라우트: 로그인한 사용자만 접근 */}
      <Route
        path="/ledger"
        element={
          <ProtectedRoute>
            <LedgerPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}