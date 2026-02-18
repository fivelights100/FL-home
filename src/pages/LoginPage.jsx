// LoginPage.jsx
// - 이 페이지의 목적: 로그인/회원가입/가입확정(코드 입력)을 한 화면에서 처리.
// - 디자인은 기존 FL Lab 네온/글래스 스타일(.page/.card/.btn 등)을 그대로 사용한다.

import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/fl-logo.png";
import { useAuth } from "../auth/AuthContext.jsx";

export default function LoginPage() {
  const { user, attributes, signIn, signUp, confirmSignUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 로그인 후 돌아갈 경로
  // - ProtectedRoute에서 넘겨준 state.from을 우선 사용
  const redirectTo = useMemo(() => location.state?.from ?? "/", [location.state]);

  // 탭 상태
  // - "signin" | "signup" | "confirm"
  const [tab, setTab] = useState("signin");

  // 폼 상태
  // - Cognito 기본 패턴: username = email
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  // 메시지(에러/안내)
  const [message, setMessage] = useState(null);
  const [busy, setBusy] = useState(false);

  // 로그인 처리
  const onSignIn = async (e) => {
    e.preventDefault();
    setMessage(null);
    setBusy(true);
    try {
      await signIn({ username, password });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setMessage(err?.message ?? "로그인에 실패했습니다.");
    } finally {
      setBusy(false);
    }
  };

  // 회원가입 처리
  const onSignUp = async (e) => {
    e.preventDefault();
    setMessage(null);
    setBusy(true);
    try {
      const result = await signUp({ username, password, email });

      // 가입 후 바로 confirm 단계로 안내
      if (result?.nextStep?.signUpStep === "CONFIRM_SIGN_UP") {
        setTab("confirm");
        setMessage("가입 코드가 전송되었습니다. 이메일(또는 SMS)을 확인해 주세요.");
      } else {
        setMessage("회원가입 요청이 완료되었습니다. 안내 메일을 확인해 주세요.");
      }
    } catch (err) {
      setMessage(err?.message ?? "회원가입에 실패했습니다.");
    } finally {
      setBusy(false);
    }
  };

  // 가입 코드 확인 처리
  const onConfirm = async (e) => {
    e.preventDefault();
    setMessage(null);
    setBusy(true);
    try {
      await confirmSignUp({ username, confirmationCode: code });
      setTab("signin");
      setMessage("가입이 완료되었습니다. 이제 로그인해 주세요.");
    } catch (err) {
      setMessage(err?.message ?? "코드 확인에 실패했습니다.");
    } finally {
      setBusy(false);
    }
  };

  // 이미 로그인 상태면 간단 안내
  if (user) {
    return (
      <div className="page">
        <header className="ledger-top">
          <div className="ledger-top-inner">
            <img src={logo} alt="FL Lab" className="brand-logo" />
            <div className="ledger-title">로그인</div>
            <Link to={redirectTo} className="btn ghost">돌아가기</Link>
          </div>
        </header>

        <main className="main">
          <section className="card">
            <div className="card-head">
              <h2>이미 로그인 되어 있어요</h2>
              <p>
                {attributes?.email ? `현재 계정: ${attributes.email}` : "로그인 세션이 활성화되어 있습니다."}
              </p>
            </div>
            <div className="card-body">
              <Link to={redirectTo} className="btn primary">{redirectTo}로 이동</Link>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="ledger-top">
        <div className="ledger-top-inner">
          <img src={logo} alt="FL Lab" className="brand-logo" />
          <div className="ledger-title">로그인</div>
          <Link to="/" className="btn ghost">홈으로</Link>
        </div>
      </header>

      <main className="main">
        <section className="card">
          <div className="card-head">
            <h2>계정</h2>
            <p>로그인 / 회원가입 / 가입확정 코드를 한 번에 처리합니다.</p>
          </div>

          <div className="card-body">
            {/* 탭 */}
            <div className="mode-tabs" style={{ marginTop: 0 }}>
              <button
                type="button"
                className={`mode-tab ${tab === "signin" ? "active" : ""}`}
                onClick={() => setTab("signin")}
              >
                로그인
              </button>
              <button
                type="button"
                className={`mode-tab ${tab === "signup" ? "active" : ""}`}
                onClick={() => setTab("signup")}
              >
                회원가입
              </button>
              <button
                type="button"
                className={`mode-tab ${tab === "confirm" ? "active" : ""}`}
                onClick={() => setTab("confirm")}
              >
                가입확정
              </button>
            </div>

            {/* 공통 안내/에러 */}
            {message ? (
              <div className="auth-message" role="status">
                {message}
              </div>
            ) : null}

            {/* 공통 입력: username(email) */}
            {/* - 회원가입/확정/로그인 모두 username이 필요해서 상단에 공통 배치 */}
            <div className="field">
              <label className="field-label">아이디(이메일)</label>
              <input
                className="field-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="you@example.com"
                autoComplete="username"
              />
            </div>

            {/* 탭별 폼 */}
            {tab === "signin" ? (
              <form onSubmit={onSignIn} className="auth-form">
                <div className="field">
                  <label className="field-label">비밀번호</label>
                  <input
                    className="field-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                    type="password"
                    autoComplete="current-password"
                  />
                </div>

                <button className={`btn primary ${busy ? "disabled" : ""}`} disabled={busy}>
                  {busy ? "처리 중…" : "로그인"}
                </button>
              </form>
            ) : null}

            {tab === "signup" ? (
              <form onSubmit={onSignUp} className="auth-form">
                <div className="field">
                  <label className="field-label">이메일(선택)</label>
                  <input
                    className="field-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="(비워도 username 이메일을 사용)"
                    autoComplete="email"
                  />
                </div>

                <div className="field">
                  <label className="field-label">비밀번호</label>
                  <input
                    className="field-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                    type="password"
                    autoComplete="new-password"
                  />
                  <div className="field-help">
                    Cognito 정책(최소 길이/특수문자 등)에 따라 비밀번호 조건이 다를 수 있어요.
                  </div>
                </div>

                <button className={`btn primary ${busy ? "disabled" : ""}`} disabled={busy}>
                  {busy ? "처리 중…" : "회원가입"}
                </button>
              </form>
            ) : null}

            {tab === "confirm" ? (
              <form onSubmit={onConfirm} className="auth-form">
                <div className="field">
                  <label className="field-label">확인 코드</label>
                  <input
                    className="field-input"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="123456"
                    autoComplete="one-time-code"
                  />
                </div>

                <button className={`btn primary ${busy ? "disabled" : ""}`} disabled={busy}>
                  {busy ? "처리 중…" : "가입 확정"}
                </button>
              </form>
            ) : null}
          </div>
        </section>
      </main>

      <footer className="footer">
        <small>© {new Date().getFullYear()} FL Lab</small>
      </footer>
    </div>
  );
}
