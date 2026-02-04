// App.jsx
// - URL 경로에 따라 어떤 페이지(HomePage / LedgerPage)를 보여줄지 결정한다

import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage.jsx";
import LedgerPage from "./pages/LedgerPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ledger" element={<LedgerPage />} />
    </Routes>
  );
}