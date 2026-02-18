// HomePage.jsx
// - 메인 페이지(홈) 구성
// - Projects 섹션의 "FL 가계부" 카드를 클릭하면 /ledger로 이동하게 만든다

import { Link } from "react-router-dom";
import logo from "../assets/fl-logo.png";
import { useAuth } from "../auth/AuthContext.jsx";

export default function HomePage() {
  // 로그인 상태
  // - topbar에서 로그인/로그아웃 버튼을 노출하기 위해 사용한다.
  const { user, attributes, signOut } = useAuth();

  return (
    <div className="page">
      {/* ===== 상단 Topbar (Glass) ===== */}
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <img className="brand-logo" src={logo} alt="FL Lab Logo" />
            <div className="brand-text">
              <div className="brand-title">FL Lab</div>
              <div className="brand-tag">Neon / Glass UI</div>
            </div>
          </div>

          <nav className="menu">
            <Link to="/">Home</Link>
            <Link to="/ledger">Ledger</Link>
            <Link to="/login">Login</Link>
          </nav>

          {/* 로그인 버튼 영역 */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {user ? (
              <>
                <span className="pill" title="로그인됨">
                  {attributes?.email ?? "Signed in"}
                </span>
                <button className="btn ghost" type="button" onClick={signOut}>
                  로그아웃
                </button>
              </>
            ) : (
              <Link className="btn primary" to="/login">
                로그인
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ===== 히어로(상단 메인 비주얼) ===== */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-noise" />

        <div className="hero-inner">
          <div className="hero-badge">
            <img className="hero-logo" src={logo} alt="FL Lab Logo" />
          </div>

          <h1 className="hero-title">
            Build with <span className="grad">Neon</span> Precision
          </h1>
          <p className="hero-subtitle">
            FL Lab은 프론트엔드 실험과 구현을 즐기는 팀입니다.
          </p>
        </div>
      </section>

      {/* ===== 본문 ===== */}
      <main className="main">
        {/* Projects 카드 */}
        <section id="projects" className="card">
          <div className="card-head">
            <h2>Projects</h2>
            <p>카드를 클릭하면 해당 프로젝트 페이지로 이동합니다.</p>
          </div>

          <div className="grid3">
            {/* ✅ FL 가계부 카드: 클릭 시 /ledger 이동 */}
            <Link to="/ledger" className="mini mini-link">
              <div className="mini-top">
                <span className="mini-tag">Product</span>
                <span className="mini-tag glow">Download</span>
              </div>
              <h3>FL 가계부</h3>
              <p>간단 소개 + 다운로드 페이지로 이동합니다.</p>
            </Link>

            {/* 나머지 카드들은 일단 유지 */}
            <article className="mini">
              <div className="mini-top">
                <span className="mini-tag">Frontend</span>
                <span className="mini-tag glow">UI</span>
              </div>
              <h3>Component Lab</h3>
              <p>재사용 가능한 UI 컴포넌트 실험.</p>
            </article>

            <article className="mini">
              <div className="mini-top">
                <span className="mini-tag">Deploy</span>
                <span className="mini-tag glow">AWS</span>
              </div>
              <h3>Release Pipeline</h3>
              <p>Amplify 기반 자동배포 흐름.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer">
        <small>© {new Date().getFullYear()} FL Lab</small>
      </footer>
    </div>
  );
}