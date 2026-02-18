// src/auth/ProtectedRoute.jsx
// - 이 파일의 목적: "로그인한 사용자만" 접근 가능한 라우트를 만들기.
// - 동작:
//   1) 세션 확인 중(loading)이면 간단한 로딩 UI를 보여준다.
//   2) 로그인 안 됐으면 /login으로 이동시키고, 원래 가려던 경로를 state로 넘긴다.
//   3) 로그인 되어 있으면 children을 렌더링한다.

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 로딩 중이면: 깜빡임 방지(로그인 상태 확정 전까지 대기)
  if (loading) {
    return (
      <div className="page">
        <main className="main">
          <section className="card">
            <div className="card-head">
              <h2>세션 확인 중…</h2>
              <p>로그인 상태를 확인하고 있습니다.</p>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // 로그인 안 됐으면: 로그인 페이지로 이동
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // 로그인 됐으면: 원래 컴포넌트 렌더
  return children;
}
