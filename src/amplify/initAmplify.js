// src/amplify/initAmplify.js
// - 이 파일의 목적: "설정 파일이 있을 때만" AWS Amplify를 초기화하기.
// - 이유: (1) 설정 파일이 아직 없더라도 로컬 개발이 깨지지 않게 하고
//         (2) 나중에 Cognito/Amplify 설정을 추가했을 때 코드 수정 없이 바로 동작하게 하기

import { Amplify } from "aws-amplify";

// initAmplify
// - 프로젝트에 존재할 수 있는 Amplify 설정 파일 후보를 한 번에 스캔한다.
// - import.meta.glob({ eager:true })는 "있으면 가져오고, 없으면 무시"가 가능해서
//   설정 파일을 필수로 강제하지 않는다.
export function initAmplify() {
  // candidates
  // - amplify CLI(Gen1): src/aws-exports.js
  // - Amplify Gen2: src/amplify_outputs.json
  // - 일부 프로젝트: src/amplifyconfiguration.json
  const candidates = import.meta.glob(
    [
      "../aws-exports.js",
      "../amplify_outputs.json",
      "../amplifyconfiguration.json",
    ],
    { eager: true }
  );

  // config
  // - 위 후보 중 "가장 먼저 발견된" 설정을 사용한다.
  // - (aws-exports.js는 default export인 경우가 많아 둘 다 처리)
  const firstKey = Object.keys(candidates)[0];
  const raw = firstKey ? candidates[firstKey] : null;
  const config = raw?.default ?? raw;

  // 설정 파일이 없으면: 로그인 기능만 "비활성" 상태로 두고 앱은 정상 실행
  if (!config) {
    console.info(
      "[Amplify] 설정 파일을 찾지 못해서 초기화를 건너뜁니다. (aws-exports.js / amplify_outputs.json / amplifyconfiguration.json)"
    );
    return;
  }

  // 실제 Amplify 초기화
  // - Auth를 포함한 Amplify 기능을 사용하려면 configure가 반드시 필요하다.
  Amplify.configure(config);
  console.info("[Amplify] 설정 파일을 로드했습니다:", firstKey);
}
