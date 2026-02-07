// LedgerPage.jsx
// - FL 가계부 소개 페이지
// - 다운로드 링크 제공 + (추가) 업데이트 영역

import { Link } from "react-router-dom";
import logo from "../assets/fl-logo.png";

export default function LedgerPage() {
  /* 
    [업데이트 데이터]
    - 여기 배열만 바꾸면 “업데이트” 칸 내용이 그대로 반영돼.
    - date: 표시용 날짜
    - version: 버전 텍스트
    - items: 변경사항 리스트
  */
  const updates = [
    {
      date: "2026-02-07",
      version: "v1.0.1",
      items: ["사용되지 않는 조회 버튼 제거", 
              "날짜 정렬과 금액 정렬 통합", 
              "기준일 재정렬(월~일 → 일~토)", 
              "각각의 조회 단위일 때 필요없는 UI 숨기게 변경"
             ],
    },
    {
      date: "2026-02-05",
      version: "v1.0.0",
      items: ["LTS 정식 출시"],
    },
  ];

  return (
    <div className="page">
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

            {/* 
              [다운로드 버튼]
              - 기존 디자인/버튼 스타일 그대로 유지
            */}
            <div style={{ marginTop: 14 }}>
              <a
                className="btn primary"
                href="https://s3.ap-northeast-2.amazonaws.com/fl-lab-downloads-1.0.0/FL_AccountBook_v1.0.0_Setup.exe"
                download
              >
                FL 가계부 다운로드
              </a>
            </div>

            {/*
              [업데이트 섹션]
              - “소개” 아래쪽에 자연스럽게 붙는 업데이트 박스
              - updates 배열을 map으로 렌더링
            */}
            <div className="update">
              <div className="update-head">
                <div className="update-title">업데이트</div>
                <div className="update-sub">최근 변경사항을 정리해둔 공간입니다.</div>
              </div>

              <div className="update-list">
                {updates.map((u) => (
                  <div className="update-item" key={`${u.date}-${u.version}`}>
                    <div className="update-meta">
                      <span className="update-version">{u.version}</span>
                      <span className="update-date">{u.date}</span>
                    </div>

                    <ul className="update-bullets">
                      {u.items.map((t, idx) => (
                        <li key={idx}>{t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
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