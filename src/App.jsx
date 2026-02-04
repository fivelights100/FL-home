// App.jsx: 화면 전체 레이아웃(헤더/메인/푸터)을 한 번에 구성하는 파일
import "./App.css";

export default function App() {
  return (
    <div className="page">
      {/* 헤더: 사이트 제목 + 간단 메뉴 */}
      <header className="header">
        <div className="logo">프엘팀</div>
        <nav className="nav">
          <a href="#about">소개</a>
          <a href="#projects">프로젝트</a>
          <a href="#contact">연락</a>
        </nav>
      </header>

      {/* 메인: 한 화면짜리 랜딩(히어로 섹션) */}
      <main className="main">
        <section className="hero">
          <h1>프엘팀 메인 홈페이지</h1>
          <p>
            React(Vite)로 만든 단일 페이지를 AWS에 배포해서 “서버에서 실행되는지” 먼저 확인합니다.
          </p>

          <div className="cta">
            <a className="btn" href="#projects">프로젝트 보기</a>
            <a className="btn ghost" href="#contact">문의하기</a>
          </div>
        </section>

        {/* 소개 섹션 */}
        <section id="about" className="section">
          <h2>소개</h2>
          <p>
            프엘팀은 (여기에 팀 소개 한 줄) — 지금은 배포 성공이 목표라서 구조를 단순하게 가져갑니다.
          </p>
        </section>

        {/* 프로젝트 섹션 */}
        <section id="projects" className="section">
          <h2>프로젝트</h2>
          <ul className="list">
            <li>프로젝트 A - 한 줄 설명</li>
            <li>프로젝트 B - 한 줄 설명</li>
            <li>프로젝트 C - 한 줄 설명</li>
          </ul>
        </section>

        {/* 연락 섹션 */}
        <section id="contact" className="section">
          <h2>연락</h2>
          <p>이메일: example@puelteam.com (나중에 실제로 교체)</p>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="footer">
        <small>© {new Date().getFullYear()} 프엘팀. All rights reserved.</small>
      </footer>
    </div>
  );
}
