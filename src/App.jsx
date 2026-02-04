import "./App.css";
import logo from "./assets/fl-logo.png";

export default function App() {
  return (
    <div className="page">
      {/* ===== 상단 고정 네비게이션(Glass + Neon) ===== */}
      <header className="topbar">
        <div className="topbar-inner">
          {/* 로고 + 타이틀 */}
          <a className="brand" href="#top">
            <img className="brand-logo" src={logo} alt="FL Lab" />
            <div className="brand-text">
              <div className="brand-title">FL Lab</div>
              <div className="brand-tag">Frontend · Future · Lab</div>
            </div>
          </a>

          {/* 메뉴(앵커 이동) */}
          <nav className="menu">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* ===== 히어로(상단 메인 비주얼) ===== */}
      <section id="top" className="hero">
        {/* 배경 효과(빛 번짐 + 라인 + 점) */}
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-noise" />

        {/* 히어로 내용 */}
        <div className="hero-inner">
          {/* 로고 강조 카드 */}
          <div className="hero-badge">
            <img className="hero-logo" src={logo} alt="FL Lab Logo" />
          </div>

          {/* 타이틀/설명 */}
          <h1 className="hero-title">
            Build with <span className="grad">Neon</span> Precision
          </h1>
          <p className="hero-subtitle">
            FL Lab은 프론트엔드 실험과 구현을 즐기는 팀입니다. 빠르게 만들고, 깔끔하게 다듬고,
            멋지게 배포합니다.
          </p>

          {/* 버튼 */}
          <div className="hero-cta">
            <a className="btn primary" href="#projects">프로젝트 보기</a>
            <a className="btn ghost" href="#contact">문의하기</a>
          </div>

          {/* 작은 상태/뱃지 */}
          <div className="hero-meta">
            <span className="pill">Vite + React</span>
            <span className="pill">AWS Amplify Deployed</span>
            <span className="pill">FL Lab Main</span>
          </div>
        </div>
      </section>

      {/* ===== 본문(카드 섹션) ===== */}
      <main className="main">
        {/* About 카드 */}
        <section id="about" className="card">
          <div className="card-head">
            <h2>About</h2>
            <p>팀 소개와 방향성을 짧고 강하게.</p>
          </div>

          <div className="card-body">
            <div className="feature">
              <div className="dot" />
              <div>
                <div className="feature-title">실험 → 검증 → 배포</div>
                <div className="feature-desc">
                  아이디어를 빠르게 프로토타입으로 만들고, 개선해서 배포까지 이어갑니다.
                </div>
              </div>
            </div>

            <div className="feature">
              <div className="dot" />
              <div>
                <div className="feature-title">디자인/개발 균형</div>
                <div className="feature-desc">
                  보기 좋은 UI를 목표로 하되, 유지보수 가능한 구조를 우선합니다.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects 카드 (3열 그리드) */}
        <section id="projects" className="card">
          <div className="card-head">
            <h2>Projects</h2>
            <p>대표 프로젝트를 카드로 보여줍니다(나중에 내용만 교체하면 됨).</p>
          </div>

          <div className="grid3">
            <article className="mini">
              <div className="mini-top">
                <span className="mini-tag">Prototype</span>
                <span className="mini-tag glow">Neon UI</span>
              </div>
              <h3>FL Landing</h3>
              <p>팀의 첫 메인 홈페이지. 배포/운영 경험을 쌓는 기반.</p>
            </article>

            <article className="mini">
              <div className="mini-top">
                <span className="mini-tag">Frontend</span>
                <span className="mini-tag glow">Speed</span>
              </div>
              <h3>Component Lab</h3>
              <p>재사용 가능한 UI 컴포넌트를 모아두는 라이브러리.</p>
            </article>

            <article className="mini">
              <div className="mini-top">
                <span className="mini-tag">Deploy</span>
                <span className="mini-tag glow">AWS</span>
              </div>
              <h3>Release Pipeline</h3>
              <p>Amplify 기반 자동배포 흐름 정리 및 템플릿화.</p>
            </article>
          </div>
        </section>

        {/* Contact 카드 */}
        <section id="contact" className="card">
          <div className="card-head">
            <h2>Contact</h2>
            <p>연락 채널을 깔끔하게.</p>
          </div>

          <div className="contact-row">
            <div className="contact-item">
              <div className="contact-label">Email</div>
              <div className="contact-value">example@fllab.com</div>
            </div>
            <div className="contact-item">
              <div className="contact-label">GitHub</div>
              <div className="contact-value">github.com/your-org</div>
            </div>
            <div className="contact-item">
              <div className="contact-label">Status</div>
              <div className="contact-value">Online · Deployed</div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== 푸터 ===== */}
      <footer className="footer">
        <small>© {new Date().getFullYear()} FL Lab. All rights reserved.</small>
      </footer>
    </div>
  );
}