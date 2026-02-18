// src/auth/AuthContext.jsx
// - 이 파일의 목적: "로그인 상태"를 앱 어디서든 쉽게 쓰도록 Context로 제공하기.
// - 제공하는 것들:
//   1) user: 현재 로그인한 사용자(없으면 null)
//   2) loading: 현재 로그인 상태 확인 중인지
//   3) signIn / signUp / confirmSignUp / signOut: 인증 관련 액션
// - 내부적으로 AWS Amplify Auth(aws-amplify/auth)를 사용한다.

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

// Amplify Auth API (v6)
// - signIn: 아이디/비밀번호 로그인
// - signUp: 회원가입
// - confirmSignUp: 이메일/문자 확인코드로 가입 확정
// - signOut: 로그아웃
// - getCurrentUser: 현재 로그인 유저 조회(세션 유효 시)
import {
  signIn,
  signUp,
  confirmSignUp,
  signOut,
  getCurrentUser,
  fetchUserAttributes,
} from "aws-amplify/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // user
  // - Amplify의 "현재 로그인된 사용자"를 담는다.
  // - 로그인 전/세션 만료 시 null.
  const [user, setUser] = useState(null);

  // attributes
  // - 로그인한 사용자의 이메일 등 부가 정보
  const [attributes, setAttributes] = useState(null);

  // loading
  // - 앱 시작 시 "세션 확인"이 끝나기 전까지 true
  const [loading, setLoading] = useState(true);

  // refresh
  // - 현재 세션을 확인하고 user/attributes를 최신 상태로 맞춘다.
  const refresh = useCallback(async () => {
    try {
      setLoading(true);

      // 현재 로그인 유저 조회
      const current = await getCurrentUser();
      setUser(current);

      // 부가정보(예: email) 조회
      const attrs = await fetchUserAttributes();
      setAttributes(attrs);
    } catch {
      // 로그인 안 된 상태거나 세션이 만료된 경우
      setUser(null);
      setAttributes(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // 앱 최초 마운트 시 한 번 세션 확인
  useEffect(() => {
    refresh();
  }, [refresh]);

  // 로그인
  // - 성공 시 refresh로 상태를 맞춘다.
  const doSignIn = useCallback(async ({ username, password }) => {
    const result = await signIn({ username, password });
    await refresh();
    return result;
  }, [refresh]);

  // 회원가입
  // - 이메일을 username으로 사용(일반적인 Cognito 설정)
  const doSignUp = useCallback(async ({ username, password, email }) => {
    const result = await signUp({
      username,
      password,
      options: {
        userAttributes: {
          email: email ?? username,
        },
      },
    });
    return result;
  }, []);

  // 가입 확인(코드 입력)
  const doConfirmSignUp = useCallback(async ({ username, confirmationCode }) => {
    const result = await confirmSignUp({ username, confirmationCode });
    return result;
  }, []);

  // 로그아웃
  const doSignOut = useCallback(async () => {
    await signOut();
    setUser(null);
    setAttributes(null);
  }, []);

  // value
  // - 불필요한 리렌더를 줄이기 위해 useMemo로 묶어준다.
  const value = useMemo(
    () => ({
      user,
      attributes,
      loading,
      refresh,
      signIn: doSignIn,
      signUp: doSignUp,
      confirmSignUp: doConfirmSignUp,
      signOut: doSignOut,
    }),
    [user, attributes, loading, refresh, doSignIn, doSignUp, doConfirmSignUp, doSignOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth는 <AuthProvider> 내부에서만 사용할 수 있어요.");
  return ctx;
}
