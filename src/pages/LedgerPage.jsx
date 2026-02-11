import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/fl-logo.png";

export default function LedgerPage() {
  // [PC/Android 선택 상태]
  const [mode, setMode] = useState("pc");

  // [업데이트/공지사항 탭 상태]
  // - "updates" 또는 "notices"
  const [updateTab, setUpdateTab] = useState("updates");

  const contentByMode = useMemo(
    () => ({
      pc: {
        label: "Windows 버전",
        description: "Windows 환경에서 설치해서 사용하는 데스크톱 버전입니다.",
        downloadText: "PC 버전 다운로드",
        downloadHref:
          "https://s3.ap-northeast-2.amazonaws.com/fl-lab-downloads-1.0.0/FL_AccountBook_v1.0.0_Setup.exe",
        features: [
          { title: "빠른 기록", desc: "수입/지출을 간단히 입력하고 정리하기가 간편합니다." },
          { title: "Excel 내보내기", desc: "필요할 때 Excel 파일로 받아서 한눈에 볼 수 있습니다." },
          { title: "DB 이동 및 백업", desc: "DB를 추출해 예상 못한 상황이 오더라도 복구가 가능합니다." },
        ],

        // ✅ 업데이트(기존)
        updates: [
          {
            date: "2026-02-07",
            version: "PC v1.0.0",
            items: ["초기 릴리즈", "수입/지출 기록", "내보내기/백업 지원"],
          },
        ],

        // ✅ 공지사항(추가)
        notices: [
          {
            date: "2026-02-08",
            title: "Windows Defender 안내",
            items: ["설치 시 경고가 뜨면 '추가 정보' → '실행'을 선택해주세요."],
          },
        ],
      },

      android: {
        label: "Android 버전",
        description: "안드로이드에서 사용할 수 있는 모바일 버전입니다.",
        downloadText: "Android 버전 다운로드",
        downloadHref: "#",
        features: [
          { title: "모바일 최적화", desc: "폰에서 한 손으로도 빠르게 기록할 수 있어요." },
          { title: "동기화 준비", desc: "추후 계정/동기화 기능을 고려한 구조로 확장 예정입니다." },
        ],

        updates: [
          {
            date: "2026-02-07",
            version: "Android v0.1.0",
            items: ["기획/프로토타입 진행", "UI 흐름 설계"],
          },
        ],

        notices: [
          {
            date: "2026-02-07",
            title: "Android 버전 준비 중",
            items: ["현재는 다운로드가 불가능하며, 링크가 생기면 즉시 공지할게요."],
          },
        ],
      },
    }),
    []
  );

  const current = contentByMode[mode];

  // [PC/Android 바꾸면 업데이트 탭은 유지되도록 둠]
  // 원하면 여기서 setUpdateTab("updates")로 초기화도 가능

  const isDownloadReady = current.downloadHref && current.downloadHref !== "#";

  // [현재 탭에 따라 보여줄 리스트 선택]
  const list =
    updateTab === "updates" ? current.updates : current.notices;

  return (
    <div className="page">
      <header className="ledger-top">
        <div className="ledger-top-inner">
          <img src={logo} alt="FL Lab" className="brand-logo" />
          <div className="ledger-title">FL 가계부</div>
          <Link to="/" className="btn ghost">홈으로</Link>
        </div>
      </header>

      <main className="main">
        <section className="card">
          <div className="card-head">
            <h2>소개</h2>
            <p>PC/Android 버전을 선택하면 내용이 버전에 맞게 바뀝니다.</p>
          </div>

          <div className="card-body">
            {/* [PC/Android 탭] */}
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

            <div className="mode-desc">{current.description}</div>

            {current.features.map((f) => (
              <div className="feature" key={f.title}>
                <div className="dot" />
                <div>
                  <div className="feature-title">{f.title}</div>
                  <div className="feature-desc">{f.desc}</div>
                </div>
              </div>
            ))}

            {/* [다운로드 버튼] */}
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

            {/* ✅ 업데이트 영역 (업데이트/공지사항 탭 추가) */}
            <div className="update">
              <div className="update-head">
                <div className="update-title">소식</div>
                <div className="update-sub">선택한 버전 기준으로 표시됩니다.</div>
              </div>

              {/* [업데이트/공지사항 탭] */}
              <div className="update-tabs">
                <button
                  type="button"
                  className={`mode-tab small ${updateTab === "updates" ? "active" : ""}`}
                  onClick={() => setUpdateTab("updates")}
                >
                  업데이트
                </button>
                <button
                  type="button"
                  className={`mode-tab small ${updateTab === "notices" ? "active" : ""}`}
                  onClick={() => setUpdateTab("notices")}
                >
                  공지사항
                </button>
              </div>

              <div className="update-list">
                {list.map((u) => (
                  <div
                    className="update-item"
                    key={`${u.date}-${u.version ?? u.title}`}
                  >
                    <div className="update-meta">
                      {/* 업데이트 탭이면 version, 공지사항 탭이면 title */}
                      <span className="update-version">
                        {updateTab === "updates" ? u.version : u.title}
                      </span>
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

            {!isDownloadReady && (
              <div className="hint" style={{ marginTop: 10 }}>
                Android 버전은 다운로드 링크를 준비 중입니다. 링크가 생기면{" "}
                <b>downloadHref</b>만 교체하면 됩니다.
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