// LedgerPage.jsx
// - PC/Android 버전 탭을 추가해서,
//   선택한 버전에 따라 소개/업데이트/다운로드가 다르게 보이도록 구성

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/fl-logo.png";

export default function LedgerPage() {
  /*
    [현재 선택된 버전 상태]
    - "pc" 또는 "android"
    - 기본값은 pc로 설정
  */
  const [mode, setMode] = useState("pc");

  /*
    [버전별 콘텐츠 데이터]
    - 소개(feature), 업데이트, 다운로드 링크를 버전별로 분리
    - 화면은 mode에 따라 이 데이터를 골라서 보여줌
  */
  const contentByMode = useMemo(
    () => ({
      pc: {
        label: "PC 버전",
        description: "Windows 환경에서 설치해서 사용하는 데스크톱 버전입니다.",
        downloadText: "PC 버전 다운로드",
        downloadHref:
          "https://s3.ap-northeast-2.amazonaws.com/fl-lab-downloads-1.0.0/FL_AccountBook_v1.0.0_Setup.exe",
        features: [
          {
            title: "빠른 기록",
            desc: "수입/지출을 간단히 입력하고 정리합니다.",
          },
          {
            title: "내보내기/백업",
            desc: "필요할 때 파일로 받아서 보관할 수 있습니다.",
          },
        ],
        updates: [
          {
            date: "2026-02-07",
            version: "PC v1.0.0",
            items: ["초기 릴리즈", "수입/지출 기록", "내보내기/백업 지원"],
          },
          {
            date: "2026-02-01",
            version: "PC v0.9.0",
            items: ["UI/UX 개선", "입력 폼 안정화"],
          },
        ],
      },

      android: {
        label: "Android 버전",
        description: "안드로이드에서 사용할 수 있는 모바일 버전입니다.",
        downloadText: "Android 버전 다운로드",
        // TODO: 실제 배포 링크가 생기면 여기만 교체하면 됨
        downloadHref: "#",
        features: [
          {
            title: "모바일 최적화",
            desc: "폰에서 한 손으로도 빠르게 기록할 수 있어요.",
          },
          {
            title: "동기화 준비",
            desc: "추후 계정/동기화 기능을 고려한 구조로 확장 예정입니다.",
          },
        ],
        updates: [
          {
            date: "2026-02-07",
            version: "Android v0.1.0",
            items: ["기획/프로토타입 진행", "UI 흐름 설계"],
          },
        ],
      },
    }),
    []
  );

  /*
    [현재 mode에 맞는 콘텐츠 선택]
    - 아래 렌더링은 current만 사용함
  */
  const current = contentByMode[mode];

  /*
    [Android 링크가 아직 없을 때 버튼 동작]
    - 디자인 큰 틀은 유지하면서, 링크가 없을 때는 비활성처럼 보이게 함
  */
  const isDownloadReady = current.downloadHref && current.downloadHref !== "#";

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
            <p>PC/Android 버전을 선택하면 내용이 버전에 맞게 바뀝니다.</p>
          </div>

          <div className="card-body">
            {/* 
              [PC/Android 탭 버튼]
              - 소개보다 상단에 배치
              - 기존 버튼 톤을 해치지 않도록 “얇은 글래스 버튼 2개” 형태
            */}
            <div className="mode-tabs">
              <button
                type="button"
                className={`mode-tab ${mode === "pc" ? "active" : ""}`}
                onClick={() => setMode("pc")}
              >
                PC 버전
              </button>
              <button
                type="button"
                className={`mode-tab ${mode === "android" ? "active" : ""}`}
                onClick={() => setMode("android")}
              >
                Android 버전
              </button>
            </div>

            {/* 
              [선택된 버전의 한 줄 설명]
              - 큰 레이아웃 변경 없이, 텍스트만 추가
            */}
            <div className="mode-desc">{current.description}</div>

            {/* 
              [버전별 소개(Feature) 영역]
              - current.features를 기반으로 렌더링
            */}
            {current.features.map((f) => (
              <div className="feature" key={f.title}>
                <div className="dot" />
                <div>
                  <div className="feature-title">{f.title}</div>
                  <div className="feature-desc">{f.desc}</div>
                </div>
              </div>
            ))}

            {/*
              [버전별 다운로드 버튼]
              - Android 링크가 아직 없으면 비활성/안내 문구 표시
              - 디자인 틀은 유지하되, 버튼 상태만 다르게 처리
            */}
            <div style={{ marginTop: 14 }}>
              {isDownloadReady ? (
                <a className="btn primary" href={current.downloadHref} download>
                  {current.downloadText}
                </a>
              ) : (
                <button className="btn primary disabled" type="button" disabled>
                  {current.downloadText} (준비 중)
                </button>
              )}
            </div>

            {/*
              [버전별 업데이트 영역]
              - current.updates를 렌더링
              - 기존 업데이트 박스 디자인 유지
            */}
            <div className="update">
              <div className="update-head">
                <div className="update-title">업데이트</div>
                <div className="update-sub">선택한 버전 기준으로 표시됩니다.</div>
              </div>

              <div className="update-list">
                {current.updates.map((u) => (
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

            {/* 
              [Android 준비중 안내]
              - “큰 변화” 없이 텍스트만 추가해서 사용자 혼란 방지
            */}
            {!isDownloadReady && (
              <div className="hint" style={{ marginTop: 10 }}>
                Android 버전은 현재 다운로드 링크를 준비 중입니다. 링크가 생기면
                LedgerPage.jsx의 <b>downloadHref</b>만 교체하면 됩니다.
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <small>© {new Date().getFullYear()} FL Lab</small>
      </footer>
    </div>
  );
}