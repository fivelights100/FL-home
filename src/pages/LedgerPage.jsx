// LedgerPage.jsx
// - FL 가계부 소개 페이지
// - public/downloads/FL_AccountBook.zip 파일을 다운로드하도록 링크를 제공한다

import { Link } from "react-router-dom";
import logo from "../assets/fl-logo.png";

export default function LedgerPage() {
  return (
    <div className="page">
      {/* 상단: 간단 헤더(홈으로 돌아가기 제공) */}
      <header className="ledger-top">
        <div className="ledger-top-inner">
          <img src={logo} alt="FL Lab" className="brand-logo" />
          <div className="ledger-title">FL 가계부</div>

          <Link to="/" className="btn ghost">
            홈으로
          </Link>
        </div>
      </header>

      <main className="main">
        <section className="card">
          <div className="card-head">
            <h2>소개</h2>
            <p>FL 가계부의 목적과 기능을 간단히 소개합니다.</p>
          </div>

          <div className="card-body">
            <div className="feature">
              <div className="dot" />
              <div>
                <div className="feature-title">빠른 기록</div>
                <div className="feature-desc">수입/지출을 간단히 입력하고 정리합니다.</div>
              </div>
            </div>

            <div className="feature">
              <div className="dot" />
              <div>
                <div className="feature-title">내보내기/백업</div>
                <div className="feature-desc">필요할 때 파일로 받아서 보관할 수 있습니다.</div>
              </div>
            </div>

            {/* 다운로드 버튼 */}
            <div style={{ marginTop: 14 }}>
              <a className="btn primary" href="/downloads/FL_AccountBook.zip" download>
                FL 가계부 다운로드
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <small>© {new Date().getFullYear()} FL Lab</small>
      </footer>
    </div>
  );
}