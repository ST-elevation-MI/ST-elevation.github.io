# 수도 퀴즈의 엔진과 화면

디자인을 전면 교체할 때 수정할 코드는 `ui/`에 모아 두었습니다. `engine/`은 HTML, CSS, DOM, 브라우저에 의존하지 않으며 Node에서도 그대로 실행됩니다.

```text
capital-quiz/
├─ engine/
│  ├─ quiz-engine.js      균등 셔플·4지선다 생성·채점·결과 계산
│  ├─ quiz-types.js       3개 유형의 문제/정답 규칙·언어/범위 설정
│  └─ quiz-session.js     대륙 필터·진행 상태·점수·오답·복습
├─ data/
│  ├─ countries.js        193개국 한·영·일 이름·수도·대륙
│  └─ capital-context.js  복수 수도 등 표기 예외와 설명
├─ ui/
│  ├─ index.html          공용 화면 템플릿
│  ├─ style.css           색상·레이아웃·반응형 디자인
│  ├─ quiz-view.js        DOM 렌더링·접근성·버튼 이벤트
│  ├─ messages.js         공통 다국어 UI 문구
│  └─ quiz-type-text.js   유형별 다국어 안내 문구
├─ app.js                 엔진과 화면 연결·정답 후 0.9초 자동 진행
├─ scripts/               다국어 SEO 페이지 생성·Pages 빌드
└─ tests/                 엔진·화면 연결·배포 검증
```

## 연결 방식

`QuizSession`이 모든 게임 상태를 소유합니다. `snapshot()`은 현재 문제, 고정된 선택지, 선택한 답, 점수, 오답 목록을 읽기 전용 객체로 돌려줍니다. `QuizView`는 이 객체를 화면에 표시하고 선택지 번호를 `QuizController`에 전달합니다. 채점과 오답 기록은 화면의 글자나 CSS 클래스를 읽지 않습니다.

문제와 선택지는 `start()`에서 생성됩니다. 다시 그리거나 복습할 때는 최초 문제의 객체를 재사용하므로 출제된 선택지와 순서가 유지됩니다. 엔진에 타이머는 없으며 자동 진행 시간은 `app.js`에서 관리합니다.

| Session API | 역할 |
| --- | --- |
| `configure({ typeId, language, continent, count })` | 홈 화면에서 설정 변경; 유효하지 않으면 false |
| `start()` | 새 문제와 선택지를 만들고 점수 초기화 |
| `submitAnswer(index)` | 0~3 선택지 번호로 채점; 중복/복습 답변은 무시 |
| `next()` | 답변한 문제에서 다음 문제나 결과로 이동 |
| `review(mistakeIndex)` | 결과에서 해당 오답의 원본 문제와 선지 복원 |
| `returnToResults()` | 복습에서 결과로 복귀 |
| `reset()` | 설정을 유지하면서 홈으로 이동 |
| `snapshot()` | 표시할 현재 상태 조회 |

## 디자인 교체

레이아웃이나 색상 변경은 `ui/index.html`과 `ui/style.css`에서 합니다. 요소 ID, 선택지 버튼 구성, 화면 전환 방식이 바뀌면 `ui/quiz-view.js`를 함께 수정합니다. 새 화면 구현체는 `bind(actions)`, `render(state, { focus })`, `languageHref(language)`를 제공하면 기존 컨트롤러와 연결할 수 있습니다. 그 외 화면 내부의 DOM 구조나 CSS 이름은 엔진의 계약에 포함되지 않습니다.

다국어 SEO 제목·설명·canonical·hreflang은 `scripts/locales.cjs`가 생성합니다. HTML 템플릿의 번역 대상 ID를 바꾸면 이 생성기의 매핑도 갱신합니다. 배포는 저장소 루트의 `_site`에 생성되며 `/ko/`, `/en/`, `/ja/` 및 Practice URL을 사용합니다.

## 검증

저장소 루트에서 실행합니다.

```sh
node capital-quiz/tests/quiz.test.cjs
node capital-quiz/tests/ui.test.cjs
node capital-quiz/tests/security.test.cjs
node capital-quiz/scripts/build-site.cjs
```

`quiz.test.cjs`는 화면 파일을 로드하지 않고 엔진의 출제·채점·복습을 검사합니다. `ui.test.cjs`는 현재 화면 및 다른 화면 구현체를 같은 엔진에 연결하여 동작을 확인합니다. `security.test.cjs`는 허용한 배포 파일과 66개 언어별 페이지의 실제 자산 경로를 검증합니다.
