"use strict";

// UN membership reference: https://www.un.org/about-us/member-states
// Reviewed 2026-09-25. countryEn follows UN Member States names.
// id: ISO 3166-1 alpha-2. Continents use UN geographic placement,
// splitting the Americas into North America (including Caribbean) and South America.
// One quiz answer per country; special capital roles are explained in the UI.
// Sources and maintenance notes: DATA_SOURCES.md.
const countries = [
  {
    "id": "AF",
    "countryKo": "아프가니스탄",
    "countryEn": "Afghanistan",
    "capitalKo": "카불",
    "capitalEn": "Kabul",
    "continent": "Asia"
  },
  {
    "id": "AL",
    "countryKo": "알바니아",
    "countryEn": "Albania",
    "capitalKo": "티라나",
    "capitalEn": "Tirana",
    "continent": "Europe"
  },
  {
    "id": "DZ",
    "countryKo": "알제리",
    "countryEn": "Algeria",
    "capitalKo": "알제",
    "capitalEn": "Algiers",
    "continent": "Africa"
  },
  {
    "id": "AD",
    "countryKo": "안도라",
    "countryEn": "Andorra",
    "capitalKo": "안도라라베야",
    "capitalEn": "Andorra la Vella",
    "continent": "Europe"
  },
  {
    "id": "AO",
    "countryKo": "앙골라",
    "countryEn": "Angola",
    "capitalKo": "루안다",
    "capitalEn": "Luanda",
    "continent": "Africa"
  },
  {
    "id": "AG",
    "countryKo": "앤티가 바부다",
    "countryEn": "Antigua and Barbuda",
    "capitalKo": "세인트존스",
    "capitalEn": "Saint John's",
    "continent": "North America"
  },
  {
    "id": "AR",
    "countryKo": "아르헨티나",
    "countryEn": "Argentina",
    "capitalKo": "부에노스아이레스",
    "capitalEn": "Buenos Aires",
    "continent": "South America"
  },
  {
    "id": "AM",
    "countryKo": "아르메니아",
    "countryEn": "Armenia",
    "capitalKo": "예레반",
    "capitalEn": "Yerevan",
    "continent": "Asia"
  },
  {
    "id": "AU",
    "countryKo": "호주",
    "countryEn": "Australia",
    "capitalKo": "캔버라",
    "capitalEn": "Canberra",
    "continent": "Oceania"
  },
  {
    "id": "AT",
    "countryKo": "오스트리아",
    "countryEn": "Austria",
    "capitalKo": "빈",
    "capitalEn": "Vienna",
    "continent": "Europe"
  },
  {
    "id": "AZ",
    "countryKo": "아제르바이잔",
    "countryEn": "Azerbaijan",
    "capitalKo": "바쿠",
    "capitalEn": "Baku",
    "continent": "Asia"
  },
  {
    "id": "BS",
    "countryKo": "바하마",
    "countryEn": "Bahamas (The)",
    "capitalKo": "나소",
    "capitalEn": "Nassau",
    "continent": "North America"
  },
  {
    "id": "BH",
    "countryKo": "바레인",
    "countryEn": "Bahrain",
    "capitalKo": "마나마",
    "capitalEn": "Manama",
    "continent": "Asia"
  },
  {
    "id": "BD",
    "countryKo": "방글라데시",
    "countryEn": "Bangladesh",
    "capitalKo": "다카",
    "capitalEn": "Dhaka",
    "continent": "Asia"
  },
  {
    "id": "BB",
    "countryKo": "바베이도스",
    "countryEn": "Barbados",
    "capitalKo": "브리지타운",
    "capitalEn": "Bridgetown",
    "continent": "North America"
  },
  {
    "id": "BY",
    "countryKo": "벨라루스",
    "countryEn": "Belarus",
    "capitalKo": "민스크",
    "capitalEn": "Minsk",
    "continent": "Europe"
  },
  {
    "id": "BE",
    "countryKo": "벨기에",
    "countryEn": "Belgium",
    "capitalKo": "브뤼셀",
    "capitalEn": "Brussels",
    "continent": "Europe"
  },
  {
    "id": "BZ",
    "countryKo": "벨리즈",
    "countryEn": "Belize",
    "capitalKo": "벨모판",
    "capitalEn": "Belmopan",
    "continent": "North America"
  },
  {
    "id": "BJ",
    "countryKo": "베냉",
    "countryEn": "Benin",
    "capitalKo": "포르토노보",
    "capitalEn": "Porto-Novo",
    "continent": "Africa",
    "capitalQualifierKo": "공식 수도",
    "capitalNoteKo": "공식 수도는 포르토노보이며, 주요 정부 기관은 코토누에 있습니다."
  },
  {
    "id": "BT",
    "countryKo": "부탄",
    "countryEn": "Bhutan",
    "capitalKo": "팀푸",
    "capitalEn": "Thimphu",
    "continent": "Asia"
  },
  {
    "id": "BO",
    "countryKo": "볼리비아",
    "countryEn": "Bolivia (Plurinational State of)",
    "capitalKo": "수크레",
    "capitalEn": "Sucre",
    "continent": "South America",
    "capitalQualifierKo": "헌법상 수도",
    "capitalNoteKo": "헌법상 수도는 수크레이며, 정부 소재지는 라파스입니다."
  },
  {
    "id": "BA",
    "countryKo": "보스니아 헤르체고비나",
    "countryEn": "Bosnia and Herzegovina",
    "capitalKo": "사라예보",
    "capitalEn": "Sarajevo",
    "continent": "Europe"
  },
  {
    "id": "BW",
    "countryKo": "보츠와나",
    "countryEn": "Botswana",
    "capitalKo": "가보로네",
    "capitalEn": "Gaborone",
    "continent": "Africa"
  },
  {
    "id": "BR",
    "countryKo": "브라질",
    "countryEn": "Brazil",
    "capitalKo": "브라질리아",
    "capitalEn": "Brasilia",
    "continent": "South America"
  },
  {
    "id": "BN",
    "countryKo": "브루나이",
    "countryEn": "Brunei Darussalam",
    "capitalKo": "반다르스리브가완",
    "capitalEn": "Bandar Seri Begawan",
    "continent": "Asia"
  },
  {
    "id": "BG",
    "countryKo": "불가리아",
    "countryEn": "Bulgaria",
    "capitalKo": "소피아",
    "capitalEn": "Sofia",
    "continent": "Europe"
  },
  {
    "id": "BF",
    "countryKo": "부르키나파소",
    "countryEn": "Burkina Faso",
    "capitalKo": "와가두구",
    "capitalEn": "Ouagadougou",
    "continent": "Africa"
  },
  {
    "id": "BI",
    "countryKo": "부룬디",
    "countryEn": "Burundi",
    "capitalKo": "기테가",
    "capitalEn": "Gitega",
    "continent": "Africa"
  },
  {
    "id": "CV",
    "countryKo": "카보베르데",
    "countryEn": "Cabo Verde",
    "capitalKo": "프라이아",
    "capitalEn": "Praia",
    "continent": "Africa"
  },
  {
    "id": "KH",
    "countryKo": "캄보디아",
    "countryEn": "Cambodia",
    "capitalKo": "프놈펜",
    "capitalEn": "Phnom Penh",
    "continent": "Asia"
  },
  {
    "id": "CM",
    "countryKo": "카메룬",
    "countryEn": "Cameroon",
    "capitalKo": "야운데",
    "capitalEn": "Yaounde",
    "continent": "Africa"
  },
  {
    "id": "CA",
    "countryKo": "캐나다",
    "countryEn": "Canada",
    "capitalKo": "오타와",
    "capitalEn": "Ottawa",
    "continent": "North America"
  },
  {
    "id": "CF",
    "countryKo": "중앙아프리카공화국",
    "countryEn": "Central African Republic",
    "capitalKo": "방기",
    "capitalEn": "Bangui",
    "continent": "Africa"
  },
  {
    "id": "TD",
    "countryKo": "차드",
    "countryEn": "Chad",
    "capitalKo": "은자메나",
    "capitalEn": "N'Djamena",
    "continent": "Africa"
  },
  {
    "id": "CL",
    "countryKo": "칠레",
    "countryEn": "Chile",
    "capitalKo": "산티아고",
    "capitalEn": "Santiago",
    "continent": "South America"
  },
  {
    "id": "CN",
    "countryKo": "중국",
    "countryEn": "China",
    "capitalKo": "베이징",
    "capitalEn": "Beijing",
    "continent": "Asia"
  },
  {
    "id": "CO",
    "countryKo": "콜롬비아",
    "countryEn": "Colombia",
    "capitalKo": "보고타",
    "capitalEn": "Bogota",
    "continent": "South America"
  },
  {
    "id": "KM",
    "countryKo": "코모로",
    "countryEn": "Comoros",
    "capitalKo": "모로니",
    "capitalEn": "Moroni",
    "continent": "Africa"
  },
  {
    "id": "CG",
    "countryKo": "콩고공화국",
    "countryEn": "Congo",
    "capitalKo": "브라자빌",
    "capitalEn": "Brazzaville",
    "continent": "Africa"
  },
  {
    "id": "CR",
    "countryKo": "코스타리카",
    "countryEn": "Costa Rica",
    "capitalKo": "산호세",
    "capitalEn": "San Jose",
    "continent": "North America"
  },
  {
    "id": "CI",
    "countryKo": "코트디부아르",
    "countryEn": "Côte d'Ivoire",
    "capitalKo": "야무수크로",
    "capitalEn": "Yamoussoukro",
    "continent": "Africa"
  },
  {
    "id": "HR",
    "countryKo": "크로아티아",
    "countryEn": "Croatia",
    "capitalKo": "자그레브",
    "capitalEn": "Zagreb",
    "continent": "Europe"
  },
  {
    "id": "CU",
    "countryKo": "쿠바",
    "countryEn": "Cuba",
    "capitalKo": "아바나",
    "capitalEn": "Havana",
    "continent": "North America"
  },
  {
    "id": "CY",
    "countryKo": "키프로스",
    "countryEn": "Cyprus",
    "capitalKo": "니코시아",
    "capitalEn": "Nicosia",
    "continent": "Asia"
  },
  {
    "id": "CZ",
    "countryKo": "체코",
    "countryEn": "Czechia",
    "capitalKo": "프라하",
    "capitalEn": "Prague",
    "continent": "Europe"
  },
  {
    "id": "KP",
    "countryKo": "북한",
    "countryEn": "Democratic People's Republic of Korea",
    "capitalKo": "평양",
    "capitalEn": "Pyongyang",
    "continent": "Asia"
  },
  {
    "id": "CD",
    "countryKo": "콩고민주공화국",
    "countryEn": "Democratic Republic of the Congo",
    "capitalKo": "킨샤사",
    "capitalEn": "Kinshasa",
    "continent": "Africa"
  },
  {
    "id": "DK",
    "countryKo": "덴마크",
    "countryEn": "Denmark",
    "capitalKo": "코펜하겐",
    "capitalEn": "Copenhagen",
    "continent": "Europe"
  },
  {
    "id": "DJ",
    "countryKo": "지부티",
    "countryEn": "Djibouti",
    "capitalKo": "지부티",
    "capitalEn": "Djibouti",
    "continent": "Africa"
  },
  {
    "id": "DM",
    "countryKo": "도미니카 연방",
    "countryEn": "Dominica",
    "capitalKo": "로조",
    "capitalEn": "Roseau",
    "continent": "North America"
  },
  {
    "id": "DO",
    "countryKo": "도미니카공화국",
    "countryEn": "Dominican Republic",
    "capitalKo": "산토도밍고",
    "capitalEn": "Santo Domingo",
    "continent": "North America"
  },
  {
    "id": "EC",
    "countryKo": "에콰도르",
    "countryEn": "Ecuador",
    "capitalKo": "키토",
    "capitalEn": "Quito",
    "continent": "South America"
  },
  {
    "id": "EG",
    "countryKo": "이집트",
    "countryEn": "Egypt",
    "capitalKo": "카이로",
    "capitalEn": "Cairo",
    "continent": "Africa"
  },
  {
    "id": "SV",
    "countryKo": "엘살바도르",
    "countryEn": "El Salvador",
    "capitalKo": "산살바도르",
    "capitalEn": "San Salvador",
    "continent": "North America"
  },
  {
    "id": "GQ",
    "countryKo": "적도기니",
    "countryEn": "Equatorial Guinea",
    "capitalKo": "시우다드데라파스",
    "capitalEn": "Ciudad de la Paz",
    "continent": "Africa",
    "capitalQualifierKo": "수도",
    "capitalNoteKo": "2026년 1월 수도를 말라보에서 시우다드데라파스로 변경했습니다."
  },
  {
    "id": "ER",
    "countryKo": "에리트레아",
    "countryEn": "Eritrea",
    "capitalKo": "아스마라",
    "capitalEn": "Asmara",
    "continent": "Africa"
  },
  {
    "id": "EE",
    "countryKo": "에스토니아",
    "countryEn": "Estonia",
    "capitalKo": "탈린",
    "capitalEn": "Tallinn",
    "continent": "Europe"
  },
  {
    "id": "SZ",
    "countryKo": "에스와티니",
    "countryEn": "Eswatini",
    "capitalKo": "음바바네",
    "capitalEn": "Mbabane",
    "continent": "Africa",
    "capitalQualifierKo": "행정 수도",
    "capitalNoteKo": "행정 수도는 음바바네이며, 왕실·입법 중심지는 로밤바입니다."
  },
  {
    "id": "ET",
    "countryKo": "에티오피아",
    "countryEn": "Ethiopia",
    "capitalKo": "아디스아바바",
    "capitalEn": "Addis Ababa",
    "continent": "Africa"
  },
  {
    "id": "FJ",
    "countryKo": "피지",
    "countryEn": "Fiji",
    "capitalKo": "수바",
    "capitalEn": "Suva",
    "continent": "Oceania"
  },
  {
    "id": "FI",
    "countryKo": "핀란드",
    "countryEn": "Finland",
    "capitalKo": "헬싱키",
    "capitalEn": "Helsinki",
    "continent": "Europe"
  },
  {
    "id": "FR",
    "countryKo": "프랑스",
    "countryEn": "France",
    "capitalKo": "파리",
    "capitalEn": "Paris",
    "continent": "Europe"
  },
  {
    "id": "GA",
    "countryKo": "가봉",
    "countryEn": "Gabon",
    "capitalKo": "리브르빌",
    "capitalEn": "Libreville",
    "continent": "Africa"
  },
  {
    "id": "GM",
    "countryKo": "감비아",
    "countryEn": "Gambia (The)",
    "capitalKo": "반줄",
    "capitalEn": "Banjul",
    "continent": "Africa"
  },
  {
    "id": "GE",
    "countryKo": "조지아",
    "countryEn": "Georgia",
    "capitalKo": "트빌리시",
    "capitalEn": "Tbilisi",
    "continent": "Asia"
  },
  {
    "id": "DE",
    "countryKo": "독일",
    "countryEn": "Germany",
    "capitalKo": "베를린",
    "capitalEn": "Berlin",
    "continent": "Europe"
  },
  {
    "id": "GH",
    "countryKo": "가나",
    "countryEn": "Ghana",
    "capitalKo": "아크라",
    "capitalEn": "Accra",
    "continent": "Africa"
  },
  {
    "id": "GR",
    "countryKo": "그리스",
    "countryEn": "Greece",
    "capitalKo": "아테네",
    "capitalEn": "Athens",
    "continent": "Europe"
  },
  {
    "id": "GD",
    "countryKo": "그레나다",
    "countryEn": "Grenada",
    "capitalKo": "세인트조지스",
    "capitalEn": "Saint George's",
    "continent": "North America"
  },
  {
    "id": "GT",
    "countryKo": "과테말라",
    "countryEn": "Guatemala",
    "capitalKo": "과테말라시티",
    "capitalEn": "Guatemala City",
    "continent": "North America"
  },
  {
    "id": "GN",
    "countryKo": "기니",
    "countryEn": "Guinea",
    "capitalKo": "코나크리",
    "capitalEn": "Conakry",
    "continent": "Africa"
  },
  {
    "id": "GW",
    "countryKo": "기니비사우",
    "countryEn": "Guinea-Bissau",
    "capitalKo": "비사우",
    "capitalEn": "Bissau",
    "continent": "Africa"
  },
  {
    "id": "GY",
    "countryKo": "가이아나",
    "countryEn": "Guyana",
    "capitalKo": "조지타운",
    "capitalEn": "Georgetown",
    "continent": "South America"
  },
  {
    "id": "HT",
    "countryKo": "아이티",
    "countryEn": "Haiti",
    "capitalKo": "포르토프랭스",
    "capitalEn": "Port-au-Prince",
    "continent": "North America"
  },
  {
    "id": "HN",
    "countryKo": "온두라스",
    "countryEn": "Honduras",
    "capitalKo": "테구시갈파",
    "capitalEn": "Tegucigalpa",
    "continent": "North America"
  },
  {
    "id": "HU",
    "countryKo": "헝가리",
    "countryEn": "Hungary",
    "capitalKo": "부다페스트",
    "capitalEn": "Budapest",
    "continent": "Europe"
  },
  {
    "id": "IS",
    "countryKo": "아이슬란드",
    "countryEn": "Iceland",
    "capitalKo": "레이캬비크",
    "capitalEn": "Reykjavik",
    "continent": "Europe"
  },
  {
    "id": "IN",
    "countryKo": "인도",
    "countryEn": "India",
    "capitalKo": "뉴델리",
    "capitalEn": "New Delhi",
    "continent": "Asia"
  },
  {
    "id": "ID",
    "countryKo": "인도네시아",
    "countryEn": "Indonesia",
    "capitalKo": "자카르타",
    "capitalEn": "Jakarta",
    "continent": "Asia",
    "capitalNoteKo": "누산타라로 수도 이전을 추진 중이며, 이 퀴즈는 이전 대통령령 발효 전의 자카르타를 기준으로 합니다."
  },
  {
    "id": "IR",
    "countryKo": "이란",
    "countryEn": "Iran (Islamic Republic of)",
    "capitalKo": "테헤란",
    "capitalEn": "Tehran",
    "continent": "Asia"
  },
  {
    "id": "IQ",
    "countryKo": "이라크",
    "countryEn": "Iraq",
    "capitalKo": "바그다드",
    "capitalEn": "Baghdad",
    "continent": "Asia"
  },
  {
    "id": "IE",
    "countryKo": "아일랜드",
    "countryEn": "Ireland",
    "capitalKo": "더블린",
    "capitalEn": "Dublin",
    "continent": "Europe"
  },
  {
    "id": "IL",
    "countryKo": "이스라엘",
    "countryEn": "Israel",
    "capitalKo": "예루살렘",
    "capitalEn": "Jerusalem",
    "continent": "Asia",
    "capitalQualifierKo": "이스라엘이 지정한 수도",
    "capitalNoteKo": "이스라엘은 예루살렘을 수도로 지정하고 있습니다. 도시의 국제적 지위는 분쟁 중입니다."
  },
  {
    "id": "IT",
    "countryKo": "이탈리아",
    "countryEn": "Italy",
    "capitalKo": "로마",
    "capitalEn": "Rome",
    "continent": "Europe"
  },
  {
    "id": "JM",
    "countryKo": "자메이카",
    "countryEn": "Jamaica",
    "capitalKo": "킹스턴",
    "capitalEn": "Kingston",
    "continent": "North America"
  },
  {
    "id": "JP",
    "countryKo": "일본",
    "countryEn": "Japan",
    "capitalKo": "도쿄",
    "capitalEn": "Tokyo",
    "continent": "Asia"
  },
  {
    "id": "JO",
    "countryKo": "요르단",
    "countryEn": "Jordan",
    "capitalKo": "암만",
    "capitalEn": "Amman",
    "continent": "Asia"
  },
  {
    "id": "KZ",
    "countryKo": "카자흐스탄",
    "countryEn": "Kazakhstan",
    "capitalKo": "아스타나",
    "capitalEn": "Astana",
    "continent": "Asia"
  },
  {
    "id": "KE",
    "countryKo": "케냐",
    "countryEn": "Kenya",
    "capitalKo": "나이로비",
    "capitalEn": "Nairobi",
    "continent": "Africa"
  },
  {
    "id": "KI",
    "countryKo": "키리바시",
    "countryEn": "Kiribati",
    "capitalKo": "사우스타라와",
    "capitalEn": "South Tarawa",
    "continent": "Oceania"
  },
  {
    "id": "KW",
    "countryKo": "쿠웨이트",
    "countryEn": "Kuwait",
    "capitalKo": "쿠웨이트시티",
    "capitalEn": "Kuwait City",
    "continent": "Asia"
  },
  {
    "id": "KG",
    "countryKo": "키르기스스탄",
    "countryEn": "Kyrgyzstan",
    "capitalKo": "비슈케크",
    "capitalEn": "Bishkek",
    "continent": "Asia"
  },
  {
    "id": "LA",
    "countryKo": "라오스",
    "countryEn": "Lao People's Democratic Republic",
    "capitalKo": "비엔티안",
    "capitalEn": "Vientiane",
    "continent": "Asia"
  },
  {
    "id": "LV",
    "countryKo": "라트비아",
    "countryEn": "Latvia",
    "capitalKo": "리가",
    "capitalEn": "Riga",
    "continent": "Europe"
  },
  {
    "id": "LB",
    "countryKo": "레바논",
    "countryEn": "Lebanon",
    "capitalKo": "베이루트",
    "capitalEn": "Beirut",
    "continent": "Asia"
  },
  {
    "id": "LS",
    "countryKo": "레소토",
    "countryEn": "Lesotho",
    "capitalKo": "마세루",
    "capitalEn": "Maseru",
    "continent": "Africa"
  },
  {
    "id": "LR",
    "countryKo": "라이베리아",
    "countryEn": "Liberia",
    "capitalKo": "몬로비아",
    "capitalEn": "Monrovia",
    "continent": "Africa"
  },
  {
    "id": "LY",
    "countryKo": "리비아",
    "countryEn": "Libya",
    "capitalKo": "트리폴리",
    "capitalEn": "Tripoli",
    "continent": "Africa"
  },
  {
    "id": "LI",
    "countryKo": "리히텐슈타인",
    "countryEn": "Liechtenstein",
    "capitalKo": "파두츠",
    "capitalEn": "Vaduz",
    "continent": "Europe"
  },
  {
    "id": "LT",
    "countryKo": "리투아니아",
    "countryEn": "Lithuania",
    "capitalKo": "빌뉴스",
    "capitalEn": "Vilnius",
    "continent": "Europe"
  },
  {
    "id": "LU",
    "countryKo": "룩셈부르크",
    "countryEn": "Luxembourg",
    "capitalKo": "룩셈부르크",
    "capitalEn": "Luxembourg",
    "continent": "Europe"
  },
  {
    "id": "MG",
    "countryKo": "마다가스카르",
    "countryEn": "Madagascar",
    "capitalKo": "안타나나리보",
    "capitalEn": "Antananarivo",
    "continent": "Africa"
  },
  {
    "id": "MW",
    "countryKo": "말라위",
    "countryEn": "Malawi",
    "capitalKo": "릴롱궤",
    "capitalEn": "Lilongwe",
    "continent": "Africa"
  },
  {
    "id": "MY",
    "countryKo": "말레이시아",
    "countryEn": "Malaysia",
    "capitalKo": "쿠알라룸푸르",
    "capitalEn": "Kuala Lumpur",
    "continent": "Asia",
    "capitalQualifierKo": "수도",
    "capitalNoteKo": "수도는 쿠알라룸푸르이며, 행정 중심지는 푸트라자야입니다."
  },
  {
    "id": "MV",
    "countryKo": "몰디브",
    "countryEn": "Maldives",
    "capitalKo": "말레",
    "capitalEn": "Male",
    "continent": "Asia"
  },
  {
    "id": "ML",
    "countryKo": "말리",
    "countryEn": "Mali",
    "capitalKo": "바마코",
    "capitalEn": "Bamako",
    "continent": "Africa"
  },
  {
    "id": "MT",
    "countryKo": "몰타",
    "countryEn": "Malta",
    "capitalKo": "발레타",
    "capitalEn": "Valletta",
    "continent": "Europe"
  },
  {
    "id": "MH",
    "countryKo": "마셜제도",
    "countryEn": "Marshall Islands",
    "capitalKo": "마주로",
    "capitalEn": "Majuro",
    "continent": "Oceania"
  },
  {
    "id": "MR",
    "countryKo": "모리타니",
    "countryEn": "Mauritania",
    "capitalKo": "누악쇼트",
    "capitalEn": "Nouakchott",
    "continent": "Africa"
  },
  {
    "id": "MU",
    "countryKo": "모리셔스",
    "countryEn": "Mauritius",
    "capitalKo": "포트루이스",
    "capitalEn": "Port Louis",
    "continent": "Africa"
  },
  {
    "id": "MX",
    "countryKo": "멕시코",
    "countryEn": "Mexico",
    "capitalKo": "멕시코시티",
    "capitalEn": "Mexico City",
    "continent": "North America"
  },
  {
    "id": "FM",
    "countryKo": "미크로네시아 연방",
    "countryEn": "Micronesia (Federated States of)",
    "capitalKo": "팔리키르",
    "capitalEn": "Palikir",
    "continent": "Oceania"
  },
  {
    "id": "MC",
    "countryKo": "모나코",
    "countryEn": "Monaco",
    "capitalKo": "모나코",
    "capitalEn": "Monaco",
    "continent": "Europe"
  },
  {
    "id": "MN",
    "countryKo": "몽골",
    "countryEn": "Mongolia",
    "capitalKo": "울란바토르",
    "capitalEn": "Ulaanbaatar",
    "continent": "Asia"
  },
  {
    "id": "ME",
    "countryKo": "몬테네그로",
    "countryEn": "Montenegro",
    "capitalKo": "포드고리차",
    "capitalEn": "Podgorica",
    "continent": "Europe"
  },
  {
    "id": "MA",
    "countryKo": "모로코",
    "countryEn": "Morocco",
    "capitalKo": "라바트",
    "capitalEn": "Rabat",
    "continent": "Africa"
  },
  {
    "id": "MZ",
    "countryKo": "모잠비크",
    "countryEn": "Mozambique",
    "capitalKo": "마푸투",
    "capitalEn": "Maputo",
    "continent": "Africa"
  },
  {
    "id": "MM",
    "countryKo": "미얀마",
    "countryEn": "Myanmar",
    "capitalKo": "네피도",
    "capitalEn": "Nay Pyi Taw",
    "continent": "Asia"
  },
  {
    "id": "NA",
    "countryKo": "나미비아",
    "countryEn": "Namibia",
    "capitalKo": "빈트후크",
    "capitalEn": "Windhoek",
    "continent": "Africa"
  },
  {
    "id": "NR",
    "countryKo": "나우루",
    "countryEn": "Nauru",
    "capitalKo": "야렌",
    "capitalEn": "Yaren",
    "continent": "Oceania",
    "capitalQualifierKo": "정부 소재지",
    "capitalNoteKo": "공식 수도가 없는 나라로, 야렌에 정부 기관이 있습니다."
  },
  {
    "id": "NP",
    "countryKo": "네팔",
    "countryEn": "Nepal",
    "capitalKo": "카트만두",
    "capitalEn": "Kathmandu",
    "continent": "Asia"
  },
  {
    "id": "NL",
    "countryKo": "네덜란드",
    "countryEn": "Netherlands (Kingdom of the)",
    "capitalKo": "암스테르담",
    "capitalEn": "Amsterdam",
    "continent": "Europe",
    "capitalQualifierKo": "헌법상 수도",
    "capitalNoteKo": "수도는 암스테르담이며, 정부 소재지는 헤이그입니다."
  },
  {
    "id": "NZ",
    "countryKo": "뉴질랜드",
    "countryEn": "New Zealand",
    "capitalKo": "웰링턴",
    "capitalEn": "Wellington",
    "continent": "Oceania"
  },
  {
    "id": "NI",
    "countryKo": "니카라과",
    "countryEn": "Nicaragua",
    "capitalKo": "마나과",
    "capitalEn": "Managua",
    "continent": "North America"
  },
  {
    "id": "NE",
    "countryKo": "니제르",
    "countryEn": "Niger",
    "capitalKo": "니아메",
    "capitalEn": "Niamey",
    "continent": "Africa"
  },
  {
    "id": "NG",
    "countryKo": "나이지리아",
    "countryEn": "Nigeria",
    "capitalKo": "아부자",
    "capitalEn": "Abuja",
    "continent": "Africa"
  },
  {
    "id": "MK",
    "countryKo": "북마케도니아",
    "countryEn": "North Macedonia",
    "capitalKo": "스코페",
    "capitalEn": "Skopje",
    "continent": "Europe"
  },
  {
    "id": "NO",
    "countryKo": "노르웨이",
    "countryEn": "Norway",
    "capitalKo": "오슬로",
    "capitalEn": "Oslo",
    "continent": "Europe"
  },
  {
    "id": "OM",
    "countryKo": "오만",
    "countryEn": "Oman",
    "capitalKo": "무스카트",
    "capitalEn": "Muscat",
    "continent": "Asia"
  },
  {
    "id": "PK",
    "countryKo": "파키스탄",
    "countryEn": "Pakistan",
    "capitalKo": "이슬라마바드",
    "capitalEn": "Islamabad",
    "continent": "Asia"
  },
  {
    "id": "PW",
    "countryKo": "팔라우",
    "countryEn": "Palau",
    "capitalKo": "응게룰무드",
    "capitalEn": "Ngerulmud",
    "continent": "Oceania"
  },
  {
    "id": "PA",
    "countryKo": "파나마",
    "countryEn": "Panama",
    "capitalKo": "파나마시티",
    "capitalEn": "Panama City",
    "continent": "North America"
  },
  {
    "id": "PG",
    "countryKo": "파푸아뉴기니",
    "countryEn": "Papua New Guinea",
    "capitalKo": "포트모르즈비",
    "capitalEn": "Port Moresby",
    "continent": "Oceania"
  },
  {
    "id": "PY",
    "countryKo": "파라과이",
    "countryEn": "Paraguay",
    "capitalKo": "아순시온",
    "capitalEn": "Asuncion",
    "continent": "South America"
  },
  {
    "id": "PE",
    "countryKo": "페루",
    "countryEn": "Peru",
    "capitalKo": "리마",
    "capitalEn": "Lima",
    "continent": "South America"
  },
  {
    "id": "PH",
    "countryKo": "필리핀",
    "countryEn": "Philippines",
    "capitalKo": "마닐라",
    "capitalEn": "Manila",
    "continent": "Asia"
  },
  {
    "id": "PL",
    "countryKo": "폴란드",
    "countryEn": "Poland",
    "capitalKo": "바르샤바",
    "capitalEn": "Warsaw",
    "continent": "Europe"
  },
  {
    "id": "PT",
    "countryKo": "포르투갈",
    "countryEn": "Portugal",
    "capitalKo": "리스본",
    "capitalEn": "Lisbon",
    "continent": "Europe"
  },
  {
    "id": "QA",
    "countryKo": "카타르",
    "countryEn": "Qatar",
    "capitalKo": "도하",
    "capitalEn": "Doha",
    "continent": "Asia"
  },
  {
    "id": "KR",
    "countryKo": "대한민국",
    "countryEn": "Republic of Korea",
    "capitalKo": "서울",
    "capitalEn": "Seoul",
    "continent": "Asia"
  },
  {
    "id": "MD",
    "countryKo": "몰도바",
    "countryEn": "Republic of Moldova",
    "capitalKo": "키시너우",
    "capitalEn": "Chisinau",
    "continent": "Europe"
  },
  {
    "id": "RO",
    "countryKo": "루마니아",
    "countryEn": "Romania",
    "capitalKo": "부쿠레슈티",
    "capitalEn": "Bucharest",
    "continent": "Europe"
  },
  {
    "id": "RU",
    "countryKo": "러시아",
    "countryEn": "Russian Federation",
    "capitalKo": "모스크바",
    "capitalEn": "Moscow",
    "continent": "Europe"
  },
  {
    "id": "RW",
    "countryKo": "르완다",
    "countryEn": "Rwanda",
    "capitalKo": "키갈리",
    "capitalEn": "Kigali",
    "continent": "Africa"
  },
  {
    "id": "KN",
    "countryKo": "세인트키츠 네비스",
    "countryEn": "Saint Kitts and Nevis",
    "capitalKo": "바스테르",
    "capitalEn": "Basseterre",
    "continent": "North America"
  },
  {
    "id": "LC",
    "countryKo": "세인트루시아",
    "countryEn": "Saint Lucia",
    "capitalKo": "캐스트리스",
    "capitalEn": "Castries",
    "continent": "North America"
  },
  {
    "id": "VC",
    "countryKo": "세인트빈센트 그레나딘",
    "countryEn": "Saint Vincent and the Grenadines",
    "capitalKo": "킹스타운",
    "capitalEn": "Kingstown",
    "continent": "North America"
  },
  {
    "id": "WS",
    "countryKo": "사모아",
    "countryEn": "Samoa",
    "capitalKo": "아피아",
    "capitalEn": "Apia",
    "continent": "Oceania"
  },
  {
    "id": "SM",
    "countryKo": "산마리노",
    "countryEn": "San Marino",
    "capitalKo": "산마리노",
    "capitalEn": "San Marino",
    "continent": "Europe"
  },
  {
    "id": "ST",
    "countryKo": "상투메 프린시페",
    "countryEn": "Sao Tome and Principe",
    "capitalKo": "상투메",
    "capitalEn": "Sao Tome",
    "continent": "Africa"
  },
  {
    "id": "SA",
    "countryKo": "사우디아라비아",
    "countryEn": "Saudi Arabia",
    "capitalKo": "리야드",
    "capitalEn": "Riyadh",
    "continent": "Asia"
  },
  {
    "id": "SN",
    "countryKo": "세네갈",
    "countryEn": "Senegal",
    "capitalKo": "다카르",
    "capitalEn": "Dakar",
    "continent": "Africa"
  },
  {
    "id": "RS",
    "countryKo": "세르비아",
    "countryEn": "Serbia",
    "capitalKo": "베오그라드",
    "capitalEn": "Belgrade",
    "continent": "Europe"
  },
  {
    "id": "SC",
    "countryKo": "세이셸",
    "countryEn": "Seychelles",
    "capitalKo": "빅토리아",
    "capitalEn": "Victoria",
    "continent": "Africa"
  },
  {
    "id": "SL",
    "countryKo": "시에라리온",
    "countryEn": "Sierra Leone",
    "capitalKo": "프리타운",
    "capitalEn": "Freetown",
    "continent": "Africa"
  },
  {
    "id": "SG",
    "countryKo": "싱가포르",
    "countryEn": "Singapore",
    "capitalKo": "싱가포르",
    "capitalEn": "Singapore",
    "continent": "Asia"
  },
  {
    "id": "SK",
    "countryKo": "슬로바키아",
    "countryEn": "Slovakia",
    "capitalKo": "브라티슬라바",
    "capitalEn": "Bratislava",
    "continent": "Europe"
  },
  {
    "id": "SI",
    "countryKo": "슬로베니아",
    "countryEn": "Slovenia",
    "capitalKo": "류블랴나",
    "capitalEn": "Ljubljana",
    "continent": "Europe"
  },
  {
    "id": "SB",
    "countryKo": "솔로몬제도",
    "countryEn": "Solomon Islands",
    "capitalKo": "호니아라",
    "capitalEn": "Honiara",
    "continent": "Oceania"
  },
  {
    "id": "SO",
    "countryKo": "소말리아",
    "countryEn": "Somalia",
    "capitalKo": "모가디슈",
    "capitalEn": "Mogadishu",
    "continent": "Africa"
  },
  {
    "id": "ZA",
    "countryKo": "남아프리카공화국",
    "countryEn": "South Africa",
    "capitalKo": "프리토리아",
    "capitalEn": "Pretoria",
    "continent": "Africa",
    "capitalQualifierKo": "행정 수도",
    "capitalNoteKo": "행정 수도는 프리토리아, 입법 수도는 케이프타운, 사법 수도는 블룸폰테인입니다."
  },
  {
    "id": "SS",
    "countryKo": "남수단",
    "countryEn": "South Sudan",
    "capitalKo": "주바",
    "capitalEn": "Juba",
    "continent": "Africa"
  },
  {
    "id": "ES",
    "countryKo": "스페인",
    "countryEn": "Spain",
    "capitalKo": "마드리드",
    "capitalEn": "Madrid",
    "continent": "Europe"
  },
  {
    "id": "LK",
    "countryKo": "스리랑카",
    "countryEn": "Sri Lanka",
    "capitalKo": "스리자야와르데네푸라코테",
    "capitalEn": "Sri Jayawardenepura Kotte",
    "continent": "Asia",
    "capitalQualifierKo": "입법 수도",
    "capitalNoteKo": "입법 수도는 스리자야와르데네푸라코테이며, 콜롬보도 주요 정부 기능을 담당합니다."
  },
  {
    "id": "SD",
    "countryKo": "수단",
    "countryEn": "Sudan",
    "capitalKo": "하르툼",
    "capitalEn": "Khartoum",
    "continent": "Africa"
  },
  {
    "id": "SR",
    "countryKo": "수리남",
    "countryEn": "Suriname",
    "capitalKo": "파라마리보",
    "capitalEn": "Paramaribo",
    "continent": "South America"
  },
  {
    "id": "SE",
    "countryKo": "스웨덴",
    "countryEn": "Sweden",
    "capitalKo": "스톡홀름",
    "capitalEn": "Stockholm",
    "continent": "Europe"
  },
  {
    "id": "CH",
    "countryKo": "스위스",
    "countryEn": "Switzerland",
    "capitalKo": "베른",
    "capitalEn": "Bern",
    "continent": "Europe",
    "capitalQualifierKo": "연방 정부 소재지",
    "capitalNoteKo": "베른은 스위스의 연방시이자 연방 정부 소재지입니다."
  },
  {
    "id": "SY",
    "countryKo": "시리아",
    "countryEn": "Syrian Arab Republic",
    "capitalKo": "다마스쿠스",
    "capitalEn": "Damascus",
    "continent": "Asia"
  },
  {
    "id": "TJ",
    "countryKo": "타지키스탄",
    "countryEn": "Tajikistan",
    "capitalKo": "두샨베",
    "capitalEn": "Dushanbe",
    "continent": "Asia"
  },
  {
    "id": "TH",
    "countryKo": "태국",
    "countryEn": "Thailand",
    "capitalKo": "방콕",
    "capitalEn": "Bangkok",
    "continent": "Asia"
  },
  {
    "id": "TL",
    "countryKo": "동티모르",
    "countryEn": "Timor-Leste",
    "capitalKo": "딜리",
    "capitalEn": "Dili",
    "continent": "Asia"
  },
  {
    "id": "TG",
    "countryKo": "토고",
    "countryEn": "Togo",
    "capitalKo": "로메",
    "capitalEn": "Lome",
    "continent": "Africa"
  },
  {
    "id": "TO",
    "countryKo": "통가",
    "countryEn": "Tonga",
    "capitalKo": "누쿠알로파",
    "capitalEn": "Nuku'alofa",
    "continent": "Oceania"
  },
  {
    "id": "TT",
    "countryKo": "트리니다드 토바고",
    "countryEn": "Trinidad and Tobago",
    "capitalKo": "포트오브스페인",
    "capitalEn": "Port of Spain",
    "continent": "North America"
  },
  {
    "id": "TN",
    "countryKo": "튀니지",
    "countryEn": "Tunisia",
    "capitalKo": "튀니스",
    "capitalEn": "Tunis",
    "continent": "Africa"
  },
  {
    "id": "TR",
    "countryKo": "튀르키예",
    "countryEn": "Türkiye",
    "capitalKo": "앙카라",
    "capitalEn": "Ankara",
    "continent": "Asia"
  },
  {
    "id": "TM",
    "countryKo": "투르크메니스탄",
    "countryEn": "Turkmenistan",
    "capitalKo": "아시가바트",
    "capitalEn": "Ashgabat",
    "continent": "Asia"
  },
  {
    "id": "TV",
    "countryKo": "투발루",
    "countryEn": "Tuvalu",
    "capitalKo": "푸나푸티",
    "capitalEn": "Funafuti",
    "continent": "Oceania"
  },
  {
    "id": "UG",
    "countryKo": "우간다",
    "countryEn": "Uganda",
    "capitalKo": "캄팔라",
    "capitalEn": "Kampala",
    "continent": "Africa"
  },
  {
    "id": "UA",
    "countryKo": "우크라이나",
    "countryEn": "Ukraine",
    "capitalKo": "키이우",
    "capitalEn": "Kyiv",
    "continent": "Europe"
  },
  {
    "id": "AE",
    "countryKo": "아랍에미리트",
    "countryEn": "United Arab Emirates",
    "capitalKo": "아부다비",
    "capitalEn": "Abu Dhabi",
    "continent": "Asia"
  },
  {
    "id": "GB",
    "countryKo": "영국",
    "countryEn": "United Kingdom of Great Britain and Northern Ireland",
    "capitalKo": "런던",
    "capitalEn": "London",
    "continent": "Europe"
  },
  {
    "id": "TZ",
    "countryKo": "탄자니아",
    "countryEn": "United Republic of Tanzania",
    "capitalKo": "도도마",
    "capitalEn": "Dodoma",
    "continent": "Africa"
  },
  {
    "id": "US",
    "countryKo": "미국",
    "countryEn": "United States of America",
    "capitalKo": "워싱턴 D.C.",
    "capitalEn": "Washington, D.C.",
    "continent": "North America"
  },
  {
    "id": "UY",
    "countryKo": "우루과이",
    "countryEn": "Uruguay",
    "capitalKo": "몬테비데오",
    "capitalEn": "Montevideo",
    "continent": "South America"
  },
  {
    "id": "UZ",
    "countryKo": "우즈베키스탄",
    "countryEn": "Uzbekistan",
    "capitalKo": "타슈켄트",
    "capitalEn": "Tashkent",
    "continent": "Asia"
  },
  {
    "id": "VU",
    "countryKo": "바누아투",
    "countryEn": "Vanuatu",
    "capitalKo": "포트빌라",
    "capitalEn": "Port Vila",
    "continent": "Oceania"
  },
  {
    "id": "VE",
    "countryKo": "베네수엘라",
    "countryEn": "Venezuela (Bolivarian Republic of)",
    "capitalKo": "카라카스",
    "capitalEn": "Caracas",
    "continent": "South America"
  },
  {
    "id": "VN",
    "countryKo": "베트남",
    "countryEn": "Viet Nam",
    "capitalKo": "하노이",
    "capitalEn": "Hanoi",
    "continent": "Asia"
  },
  {
    "id": "YE",
    "countryKo": "예멘",
    "countryEn": "Yemen",
    "capitalKo": "사나",
    "capitalEn": "Sana'a",
    "continent": "Asia"
  },
  {
    "id": "ZM",
    "countryKo": "잠비아",
    "countryEn": "Zambia",
    "capitalKo": "루사카",
    "capitalEn": "Lusaka",
    "continent": "Africa"
  },
  {
    "id": "ZW",
    "countryKo": "짐바브웨",
    "countryEn": "Zimbabwe",
    "capitalKo": "하라레",
    "capitalEn": "Harare",
    "continent": "Africa"
  }
];

function validateCountries(data) {
  if (!Array.isArray(data) || data.length !== 193) throw new Error("국가 데이터는 정확히 193개여야 합니다.");
  const fields = ["id", "countryKo", "countryEn", "capitalKo", "capitalEn", "continent"];
  for (const country of data) {
    for (const field of fields) {
      if (typeof country[field] !== "string" || !country[field].trim()) {
        throw new Error(`비어 있는 국가 필드: ${country.id || "unknown"}.${field}`);
      }
    }
  }
  for (const field of ["id", "countryEn"]) {
    const values = data.map((country) => country[field].normalize("NFKC").trim().toLowerCase());
    if (new Set(values).size !== data.length) throw new Error(`중복 국가: ${field}`);
  }
  return true;
}
validateCountries(countries);
countries.forEach(Object.freeze);
Object.freeze(countries);
