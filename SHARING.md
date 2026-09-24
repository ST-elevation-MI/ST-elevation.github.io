# GitHub Pages로 퀴즈 공유하기

## 현재 점검 결과와 공개 범위

현재 앱은 서버·로그인·DB·외부 라이브러리·분석 도구 없이 브라우저에서 실행됩니다. 검토한 파일에서 인증키나 개인정보, 외부 전송 코드를 찾지 못했습니다. 이는 현재 파일의 검토 결과이며 보안 보증이나 GitHub 계정·기존 저장소 이력 감사는 아닙니다. 현재 폴더에는 Git 저장소 이력이 없습니다.

GitHub Pages에는 선택한 정적 파일만 올라갑니다. 방문자가 이 사이트를 열어 내 PC의 다른 폴더에 접근하는 것은 아닙니다. 다만 공개 저장소에 커밋한 모든 파일과 과거 이력은 사이트 배포 여부와 별개로 공개됩니다. HTML/CSS/JS와 수도 정답 데이터는 브라우저가 받아야 하므로 방문자가 볼 수 있습니다. 점수도 브라우저에서 변경할 수 있으므로 공인 순위나 상품 지급 근거로 사용하지 않습니다.

## 적용한 보호 조치

- scripts/build-site.cjs가 index.html, style.css, countries.js, script.js만 _site에 복사합니다. 테스트·문서·설정·다른 파일은 사이트에 배포되지 않습니다. 심볼릭 링크와 남은 빌드 파일이 있으면 중단합니다.
- CSP: 같은 출처의 JS/CSS만 허용하고 외부 통신, 플러그인, 폼 전송을 차단합니다. 인라인 스크립트와 eval은 허용하지 않습니다.
- Referrer 정책: 다른 페이지에 현재 주소를 보내지 않습니다.
- .gitignore: 환경변수·키·로컬 설정 파일 등이 실수로 새 커밋에 들어가는 것을 줄입니다. 이미 추적된 파일이나 이력에서 비밀을 삭제해 주지는 않습니다.
- 배포는 main 브랜치만 허용하며 테스트 성공 후 진행합니다. Pages 배포 권한은 deploy 작업에만 부여합니다. 별도 PAT를 코드에 넣지 않습니다.
- CSP meta는 서버 인증이나 접근 제어가 아닙니다. frame-ancestors 등 HTTP 헤더가 필요한 보호는 이 파일로 제공하지 않습니다.

## 처음 게시하는 방법

1. 이 퀴즈만을 위한 새 GitHub 저장소를 만듭니다. 무료 계정이면 Public 저장소를 사용할 수 있습니다. 비공개 소스 저장소에서 Pages를 쓰려면 지원 요금제를 확인하세요. Public 저장소의 코드·문서·커밋 이력은 모두 공개된다고 생각해야 합니다.
2. 업로드 전 변경 목록을 검토하고 프로젝트 파일, scripts/, tests/, .github/workflows/pages.yml, .gitignore를 main 브랜치에 올립니다. 개인 문서·키·비밀번호는 넣지 마세요. 커밋 이메일을 숨기고 싶으면 GitHub의 noreply 주소를 설정하세요.
3. 저장소 Settings → Pages → Build and deployment → Source에서 **GitHub Actions**를 선택합니다. 브랜치 루트 전체를 배포하는 방식 대신 제공된 워크플로를 사용하세요.
4. Actions → Publish capital quiz → Run workflow → main으로 실행합니다. 이후 main에 push하면 테스트 후 다시 배포됩니다.
5. Settings → Pages에서 **Enforce HTTPS**를 확인합니다. 처음에는 기본 github.io 주소를 사용하면 별도 도메인/DNS 설정이 필요 없습니다.
6. 배포 성공 후 표시되는 `https://사용자명.github.io/저장소명/` 주소를 공유합니다. 상대방에게 저장소 쓰기 권한이나 GitHub 비밀번호를 줄 필요가 없습니다.

공유 후 확인: 비로그인 창에서 게임 시작·정답 자동 진행·오답 수동 진행을 확인하세요. 사이트 주소 뒤의 `/DATA_SOURCES.md`, `/tests/quiz.test.cjs`, `/.env`는 이 워크플로의 배포 산출물에 없으므로 파일을 제공하지 않아야 합니다. 공개 저장소에서는 문서와 테스트가 GitHub 저장소 URL로는 보일 수 있습니다.

현재는 로컬 파일과 배포 구성을 준비한 상태이며 원격 저장소 생성·업로드·Pages 활성화·실제 공개는 수행하지 않았습니다.

## 특정 사람만 보게 하려면

일반적인 공개 GitHub Pages는 링크를 아는 사람만을 위한 인증 서비스가 아닙니다. URL을 받은 사람이 다시 공유할 수 있고 검색될 수도 있습니다. robots.txt나 JavaScript 비밀번호는 접근 제어가 아닙니다. 특정 사용자만 허용하려면 GitHub Enterprise Cloud 조직의 지원되는 비공개 Pages 또는 별도의 서버 측 인증을 제공하는 호스팅이 필요합니다. 이 프로젝트에는 가짜 클라이언트 비밀번호를 넣지 않았습니다.

## 로컬 검증

```sh
node tests/quiz.test.cjs
node tests/security.test.cjs
node scripts/build-site.cjs
```

_site가 이미 있으면 내용을 검토하고 이전 빌드 폴더를 삭제한 다음 다시 빌드합니다. GitHub Actions는 매번 새 체크아웃에서 빌드합니다.

공식 문서:
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https
- https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site
