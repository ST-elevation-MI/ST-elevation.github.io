# 국가 데이터와 검증

확인일: 2026-09-25. 기본 문제 데이터는 UN 회원국 193개국으로 한정합니다.

## 회원국 기준

- UN Member States: https://www.un.org/about-us/member-states
- 원회원국 49개국의 현재 UN 헌장 기록: https://treaties.un.org/pages/ViewDetails.aspx?chapter=1&clang=_en&mtdsg_no=I-1&src=IND
- 이후 가입 144개국의 UN 공식 가입 기록: https://treaties.un.org/pages/ViewDetails.aspx?chapter=1&clang=_en&mtdsg_no=I-2&src=IND

Member States 웹페이지는 검색으로 확인했으나 본문 직접 다운로드는 403으로 차단되었습니다. 완전성 자동 검증에는 UN Treaty Collection의 두 공식 표를 실제 다운로드하여 사용했습니다. 두 표의 국가 집합은 정확히 193개이며 countries.js와 누락 0개, 추가 0개로 일치합니다. Czech Republic/Czechia, St./Saint, Gambia/Gambia (The) 등 명칭 차이를 정규화했습니다. 검증용 목록과 출처는 tests/un-members.json에 보존했습니다. 이 기준은 UNESCO 회원국 목록과 다릅니다.

바티칸/교황청, 팔레스타인, 대만, 코소보, 쿡제도, 니우에 및 속령은 포함하지 않습니다.

## 수도 표기와 예외

수도 교차 확인 참고: UNGEGN 지명 데이터 안내 https://unstats.un.org/unsd/geoinfo/geonames/About.htm 및 미국 국무부 국가·수도 표 https://2021-2025.state.gov/independent-states-in-the-world/ . UN 회원국 목록 자체는 수도의 출처가 아닙니다. 한국어 표기는 퀴즈용으로 작성했습니다.

- 적도기니: 2026-01-02 정부 발표에 따라 Ciudad de la Paz / 시우다드데라파스. https://www.guineaecuatorialpress.com/noticias/el_presidente_de_la_republica_proclama_la_ciudad_de_la_paz_como_capital_de_la_republica_de_guinea_ecuatorial_con_la_firma_de_un_decreto_ley
- 인도네시아: 자카르타. 2026-05-12 헌법재판소는 수도 이전 대통령령 발효 전 자카르타의 지위를 확인했습니다. 이전 발효 시 갱신이 필요합니다. https://www.mkri.id/public/content/persidangan/putusan/putusan_mkri_14254_1778573044.pdf
- 나우루: 공식 수도가 없어 정부 소재지인 야렌을 출제하며 문제에 구분을 명시합니다. https://cove.army.gov.au/article/kyr-nauru-information
- 남아공: 행정 수도 프리토리아, 에스와티니: 행정 수도 음바바네, 볼리비아: 헌법상 수도 수크레, 스리랑카: 입법 수도 스리자야와르데네푸라코테, 스위스: 연방 정부 소재지 베른. 각 기준을 문제와 해설에 표시합니다.
- 이스라엘: 이스라엘이 지정한 수도 예루살렘을 묻고 국제적 지위가 분쟁 중임을 해설에 표시합니다.
- 네덜란드·말레이시아·베냉은 수도와 별도 정부/행정 소재지를 해설로 구분합니다.

continent는 Asia, Africa, Europe, North America, South America, Oceania 중 하나입니다. 대륙을 걸치는 국가는 UN 지리 분류를 따라 러시아는 Europe, 튀르키예·카자흐스탄·키프로스·아르메니아·아제르바이잔·조지아는 Asia로 분류했습니다. 미주는 남미/북미로 나누며 중미·카리브해는 북미에 포함합니다.

## 실행과 재검증

index.html을 브라우저에서 열면 실행됩니다. 외부 라이브러리나 네트워크 요청이 없습니다.

```sh
node tests/quiz.test.cjs
```

테스트는 실제 countries.js/script.js를 Node VM과 작은 DOM 대역에서 실행합니다. 데이터/로직 테스트이며 브라우저 레이아웃 테스트를 대체하지 않습니다.

검증 범위: 정확히 193개, UN 기준 목록과 집합 일치, countryEn/id 중복 없음, 필수 필드와 수도 비어 있지 않음, 비회원국 제외, 1,000게임 국가 중복 없음, 193개국 × 100회 선택지 중복 없음, 점수 0~10 모든 결과 분기, 재선택 차단, 다음 문제, 다시 시작.
