import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/fl-logo.png";
import { useAuth } from "../auth/AuthContext.jsx";

export default function LedgerPage() {
  // 로그인 상태
  // - Ledger는 ProtectedRoute로 보호되고 있지만, UX를 위해 상단에 계정/로그아웃 버튼을 둔다.
  const { attributes, signOut } = useAuth();

  // [PC/Android 선택 상태]
  const [mode, setMode] = useState("pc");

  // [업데이트/공지사항 탭 상태]
  // - "updates" 또는 "notices"
  const [updateTab, setUpdateTab] = useState("updates");

  const contentByMode = useMemo(
    () => ({
      pc: {
        label: "Windows 버전",
        description: "Windows 환경에서 설치해서 사용하는 데스크톱 버전",
        downloadText: "Windows 1.0.0 다운로드",
        downloadHref:
          "https://s3.ap-northeast-2.amazonaws.com/fl-lab-downloads-1.0.0/FL_AccountBook_v1.0.0_Setup.exe",
        features: [
          { title: "빠른 기록", desc: "수입/지출을 간단히 입력하고 정리하기 간편" },
          { title: "Excel 내보내기", desc: "필요할 때 Excel 파일로 받아서 한눈에 볼 수 있음" },
          { title: "DB 이동 및 백업", desc: "DB를 추출해 예상 못한 상황이 오더라도 복구 가능" },
        ],

        // ✅ 업데이트
        updates: [
          {
            date: "2026-02-12",
            version: "Windows v1.0.1 (23시~00시 사이 예정)",
            items: [
                "사용되지 않는 조회 버튼 제거",
                "날짜 정렬과 금액 정렬 통합",
                "기준일 재정렬(월~일 → 일~토)",
                "각각의 조회 단위일 때 필요없는 UI 숨기게 변경",
            ],
          },
          {
            date: "2026-02-05",
            version: "Windows v1.0.0",
            items: ["LTS 정식 출시"],
          },
        ],

        // ✅ 공지사항
        notices: [
          {
            date: "2026-02-12",
            title: "26.02.26 'FL 가계부 Windows' 업데이트 중단 및 용도 변경 예고",
            items: [
                "'FL 가계부 Android' 출시에 따라 Windows 버전의 유지가 무의미 함으로써 앞으로 업데이트가 제공되지 않을 예정",
                "2월 26일 마지막 업데이트 이후 용도가 변경될 예정 (자세한 내용은 2월 24일 예정)",
                "FL 가계부 Windows의 이전 버전을 선택해 다운받을 수 있게 링크 제공 예정"
            ],
          },
        ],
      },

      android: {
        label: "Android 버전",
        description: "안드로이드에서 사용할 수 있는 모바일 버전",
        downloadText: "Android 1.0.0b1 다운로드",
        downloadHref: "https://s3.ap-northeast-2.amazonaws.com/fl-accountbook-android-1.0.0b1-20260212-app-download/FL_AccountBook_1.0.0b1.apk",
        features: [
          { title: "모바일 최적화", desc: "폰에서 한 손으로도 빠르게 기록할 수 있음" },
          { title: "동기화 준비", desc: "추후 계정/동기화 기능을 고려한 구조로 확장 예정" },
        ],

        updates: [
          {
            date: "2026-02-12",
            version: "Android v1.0.0b1",
            items: ["Beta 출시"],
          },
        ],

        notices: [
          {
            date: "2026-02-12",
            title: "26년 2월 12일 Android 1.0.0b1 베타 버전 출시",
            items: ["15시 30분 부터 링크가 활성화 되어 다운받으실 수 있음"],
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
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span className="pill" title="로그인됨">
              {attributes?.email ?? "Signed in"}
            </span>
            <button className="btn ghost" type="button" onClick={signOut}>
              로그아웃
            </button>
            <Link to="/" className="btn ghost">홈으로</Link>
          </div>
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
                Windows
              </button>
              <button
                type="button"
                className={`mode-tab ${mode === "android" ? "active" : ""}`}
                onClick={() => setMode("android")}
              >
                Android
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
                <div className="update-sub">선택한 버전 기준으로 표시</div>
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
          </div>
        </section>
      </main>

      <footer className="footer">
        <small>© {new Date().getFullYear()} FL Lab</small>
      </footer>
    </div>
  );
}