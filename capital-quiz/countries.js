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
    "countryJa": "アフガニスタン",
    "capitalKo": "카불",
    "capitalEn": "Kabul",
    "capitalJa": "カーブル",
    "continent": "Asia"
  },
  {
    "id": "AL",
    "countryKo": "알바니아",
    "countryEn": "Albania",
    "countryJa": "アルバニア",
    "capitalKo": "티라나",
    "capitalEn": "Tirana",
    "capitalJa": "ティラナ",
    "continent": "Europe"
  },
  {
    "id": "DZ",
    "countryKo": "알제리",
    "countryEn": "Algeria",
    "countryJa": "アルジェリア",
    "capitalKo": "알제",
    "capitalEn": "Algiers",
    "capitalJa": "アルジェ",
    "continent": "Africa"
  },
  {
    "id": "AD",
    "countryKo": "안도라",
    "countryEn": "Andorra",
    "countryJa": "アンドラ",
    "capitalKo": "안도라라베야",
    "capitalEn": "Andorra la Vella",
    "capitalJa": "アンドラ・ラ・ベリャ",
    "continent": "Europe"
  },
  {
    "id": "AO",
    "countryKo": "앙골라",
    "countryEn": "Angola",
    "countryJa": "アンゴラ",
    "capitalKo": "루안다",
    "capitalEn": "Luanda",
    "capitalJa": "ルアンダ",
    "continent": "Africa"
  },
  {
    "id": "AG",
    "countryKo": "앤티가 바부다",
    "countryEn": "Antigua and Barbuda",
    "countryJa": "アンティグア・バーブーダ",
    "capitalKo": "세인트존스",
    "capitalEn": "Saint John's",
    "capitalJa": "セイント・ジョンズ",
    "continent": "North America"
  },
  {
    "id": "AR",
    "countryKo": "아르헨티나",
    "countryEn": "Argentina",
    "countryJa": "アルゼンチン",
    "capitalKo": "부에노스아이레스",
    "capitalEn": "Buenos Aires",
    "capitalJa": "ブエノスアイレス",
    "continent": "South America"
  },
  {
    "id": "AM",
    "countryKo": "아르메니아",
    "countryEn": "Armenia",
    "countryJa": "アルメニア",
    "capitalKo": "예레반",
    "capitalEn": "Yerevan",
    "capitalJa": "イェレヴァン",
    "continent": "Asia"
  },
  {
    "id": "AU",
    "countryKo": "호주",
    "countryEn": "Australia",
    "countryJa": "オーストラリア",
    "capitalKo": "캔버라",
    "capitalEn": "Canberra",
    "capitalJa": "キャンベラ",
    "continent": "Oceania"
  },
  {
    "id": "AT",
    "countryKo": "오스트리아",
    "countryEn": "Austria",
    "countryJa": "オーストリア",
    "capitalKo": "빈",
    "capitalEn": "Vienna",
    "capitalJa": "ウィーン",
    "continent": "Europe"
  },
  {
    "id": "AZ",
    "countryKo": "아제르바이잔",
    "countryEn": "Azerbaijan",
    "countryJa": "アゼルバイジャン",
    "capitalKo": "바쿠",
    "capitalEn": "Baku",
    "capitalJa": "バクー",
    "continent": "Asia"
  },
  {
    "id": "BS",
    "countryKo": "바하마",
    "countryEn": "Bahamas (The)",
    "countryJa": "バハマ",
    "capitalKo": "나소",
    "capitalEn": "Nassau",
    "capitalJa": "ナッソー",
    "continent": "North America"
  },
  {
    "id": "BH",
    "countryKo": "바레인",
    "countryEn": "Bahrain",
    "countryJa": "バーレーン",
    "capitalKo": "마나마",
    "capitalEn": "Manama",
    "capitalJa": "マナーマ",
    "continent": "Asia"
  },
  {
    "id": "BD",
    "countryKo": "방글라데시",
    "countryEn": "Bangladesh",
    "countryJa": "バングラデシュ",
    "capitalKo": "다카",
    "capitalEn": "Dhaka",
    "capitalJa": "ダッカ",
    "continent": "Asia"
  },
  {
    "id": "BB",
    "countryKo": "바베이도스",
    "countryEn": "Barbados",
    "countryJa": "バルバドス",
    "capitalKo": "브리지타운",
    "capitalEn": "Bridgetown",
    "capitalJa": "ブリッジタウン",
    "continent": "North America"
  },
  {
    "id": "BY",
    "countryKo": "벨라루스",
    "countryEn": "Belarus",
    "countryJa": "ベラルーシ",
    "capitalKo": "민스크",
    "capitalEn": "Minsk",
    "capitalJa": "ミンスク",
    "continent": "Europe"
  },
  {
    "id": "BE",
    "countryKo": "벨기에",
    "countryEn": "Belgium",
    "countryJa": "ベルギー",
    "capitalKo": "브뤼셀",
    "capitalEn": "Brussels",
    "capitalJa": "ブリュッセル",
    "continent": "Europe"
  },
  {
    "id": "BZ",
    "countryKo": "벨리즈",
    "countryEn": "Belize",
    "countryJa": "ベリーズ",
    "capitalKo": "벨모판",
    "capitalEn": "Belmopan",
    "capitalJa": "ベルモパン",
    "continent": "North America"
  },
  {
    "id": "BJ",
    "countryKo": "베냉",
    "countryEn": "Benin",
    "countryJa": "ベナン",
    "capitalKo": "포르토노보",
    "capitalEn": "Porto-Novo",
    "capitalJa": "ポルトノボ",
    "continent": "Africa",
    "capitalQualifierKo": "공식 수도",
    "capitalNoteKo": "공식 수도는 포르토노보이며, 주요 정부 기관은 코토누에 있습니다."
  },
  {
    "id": "BT",
    "countryKo": "부탄",
    "countryEn": "Bhutan",
    "countryJa": "ブータン",
    "capitalKo": "팀푸",
    "capitalEn": "Thimphu",
    "capitalJa": "ティンプー",
    "continent": "Asia"
  },
  {
    "id": "BO",
    "countryKo": "볼리비아",
    "countryEn": "Bolivia (Plurinational State of)",
    "countryJa": "ボリビア",
    "capitalKo": "수크레",
    "capitalEn": "Sucre",
    "capitalJa": "スクレ",
    "continent": "South America",
    "capitalQualifierKo": "헌법상 수도",
    "capitalNoteKo": "헌법상 수도는 수크레이며, 정부 소재지는 라파스입니다."
  },
  {
    "id": "BA",
    "countryKo": "보스니아 헤르체고비나",
    "countryEn": "Bosnia and Herzegovina",
    "countryJa": "ボスニア・ヘルツェゴビナ",
    "capitalKo": "사라예보",
    "capitalEn": "Sarajevo",
    "capitalJa": "サラエヴォ",
    "continent": "Europe"
  },
  {
    "id": "BW",
    "countryKo": "보츠와나",
    "countryEn": "Botswana",
    "countryJa": "ボツワナ",
    "capitalKo": "가보로네",
    "capitalEn": "Gaborone",
    "capitalJa": "ハボローネ",
    "continent": "Africa"
  },
  {
    "id": "BR",
    "countryKo": "브라질",
    "countryEn": "Brazil",
    "countryJa": "ブラジル",
    "capitalKo": "브라질리아",
    "capitalEn": "Brasilia",
    "capitalJa": "ブラジリア",
    "continent": "South America"
  },
  {
    "id": "BN",
    "countryKo": "브루나이",
    "countryEn": "Brunei Darussalam",
    "countryJa": "ブルネイ",
    "capitalKo": "반다르스리브가완",
    "capitalEn": "Bandar Seri Begawan",
    "capitalJa": "バンダルスリブガワン",
    "continent": "Asia"
  },
  {
    "id": "BG",
    "countryKo": "불가리아",
    "countryEn": "Bulgaria",
    "countryJa": "ブルガリア",
    "capitalKo": "소피아",
    "capitalEn": "Sofia",
    "capitalJa": "ソフィア",
    "continent": "Europe"
  },
  {
    "id": "BF",
    "countryKo": "부르키나파소",
    "countryEn": "Burkina Faso",
    "countryJa": "ブルキナファソ",
    "capitalKo": "와가두구",
    "capitalEn": "Ouagadougou",
    "capitalJa": "ワガドゥグー",
    "continent": "Africa"
  },
  {
    "id": "BI",
    "countryKo": "부룬디",
    "countryEn": "Burundi",
    "countryJa": "ブルンジ",
    "capitalKo": "기테가",
    "capitalEn": "Gitega",
    "capitalJa": "ギテガ",
    "continent": "Africa"
  },
  {
    "id": "CV",
    "countryKo": "카보베르데",
    "countryEn": "Cabo Verde",
    "countryJa": "カーボベルデ",
    "capitalKo": "프라이아",
    "capitalEn": "Praia",
    "capitalJa": "プライア",
    "continent": "Africa"
  },
  {
    "id": "KH",
    "countryKo": "캄보디아",
    "countryEn": "Cambodia",
    "countryJa": "カンボジア",
    "capitalKo": "프놈펜",
    "capitalEn": "Phnom Penh",
    "capitalJa": "プノンペン",
    "continent": "Asia"
  },
  {
    "id": "CM",
    "countryKo": "카메룬",
    "countryEn": "Cameroon",
    "countryJa": "カメルーン",
    "capitalKo": "야운데",
    "capitalEn": "Yaounde",
    "capitalJa": "ヤウンデ",
    "continent": "Africa"
  },
  {
    "id": "CA",
    "countryKo": "캐나다",
    "countryEn": "Canada",
    "countryJa": "カナダ",
    "capitalKo": "오타와",
    "capitalEn": "Ottawa",
    "capitalJa": "オタワ",
    "continent": "North America"
  },
  {
    "id": "CF",
    "countryKo": "중앙아프리카공화국",
    "countryEn": "Central African Republic",
    "countryJa": "中央アフリカ共和国",
    "capitalKo": "방기",
    "capitalEn": "Bangui",
    "capitalJa": "バンギ",
    "continent": "Africa"
  },
  {
    "id": "TD",
    "countryKo": "차드",
    "countryEn": "Chad",
    "countryJa": "チャド",
    "capitalKo": "은자메나",
    "capitalEn": "N'Djamena",
    "capitalJa": "ンジャメナ",
    "continent": "Africa"
  },
  {
    "id": "CL",
    "countryKo": "칠레",
    "countryEn": "Chile",
    "countryJa": "チリ",
    "capitalKo": "산티아고",
    "capitalEn": "Santiago",
    "capitalJa": "サンティアゴ",
    "continent": "South America"
  },
  {
    "id": "CN",
    "countryKo": "중국",
    "countryEn": "China",
    "countryJa": "中華人民共和国",
    "capitalKo": "베이징",
    "capitalEn": "Beijing",
    "capitalJa": "北京",
    "continent": "Asia"
  },
  {
    "id": "CO",
    "countryKo": "콜롬비아",
    "countryEn": "Colombia",
    "countryJa": "コロンビア",
    "capitalKo": "보고타",
    "capitalEn": "Bogota",
    "capitalJa": "ボゴタ",
    "continent": "South America"
  },
  {
    "id": "KM",
    "countryKo": "코모로",
    "countryEn": "Comoros",
    "countryJa": "コモロ",
    "capitalKo": "모로니",
    "capitalEn": "Moroni",
    "capitalJa": "モロニ",
    "continent": "Africa"
  },
  {
    "id": "CG",
    "countryKo": "콩고공화국",
    "countryEn": "Congo",
    "countryJa": "コンゴ共和国",
    "capitalKo": "브라자빌",
    "capitalEn": "Brazzaville",
    "capitalJa": "ブラザヴィル",
    "continent": "Africa"
  },
  {
    "id": "CR",
    "countryKo": "코스타리카",
    "countryEn": "Costa Rica",
    "countryJa": "コスタリカ",
    "capitalKo": "산호세",
    "capitalEn": "San Jose",
    "capitalJa": "サンホセ",
    "continent": "North America"
  },
  {
    "id": "CI",
    "countryKo": "코트디부아르",
    "countryEn": "Côte d'Ivoire",
    "countryJa": "コートジボワール",
    "capitalKo": "야무수크로",
    "capitalEn": "Yamoussoukro",
    "capitalJa": "ヤムスクロ",
    "continent": "Africa"
  },
  {
    "id": "HR",
    "countryKo": "크로아티아",
    "countryEn": "Croatia",
    "countryJa": "クロアチア",
    "capitalKo": "자그레브",
    "capitalEn": "Zagreb",
    "capitalJa": "ザグレブ",
    "continent": "Europe"
  },
  {
    "id": "CU",
    "countryKo": "쿠바",
    "countryEn": "Cuba",
    "countryJa": "キューバ",
    "capitalKo": "아바나",
    "capitalEn": "Havana",
    "capitalJa": "ハバナ",
    "continent": "North America"
  },
  {
    "id": "CY",
    "countryKo": "키프로스",
    "countryEn": "Cyprus",
    "countryJa": "キプロス",
    "capitalKo": "니코시아",
    "capitalEn": "Nicosia",
    "capitalJa": "ニコシア",
    "continent": "Asia"
  },
  {
    "id": "CZ",
    "countryKo": "체코",
    "countryEn": "Czechia",
    "countryJa": "チェコ共和国",
    "capitalKo": "프라하",
    "capitalEn": "Prague",
    "capitalJa": "プラハ",
    "continent": "Europe"
  },
  {
    "id": "KP",
    "countryKo": "북한",
    "countryEn": "Democratic People's Republic of Korea",
    "countryJa": "朝鮮民主主義人民共和国",
    "capitalKo": "평양",
    "capitalEn": "Pyongyang",
    "capitalJa": "平壌",
    "continent": "Asia"
  },
  {
    "id": "CD",
    "countryKo": "콩고민주공화국",
    "countryEn": "Democratic Republic of the Congo",
    "countryJa": "コンゴ民主共和国",
    "capitalKo": "킨샤사",
    "capitalEn": "Kinshasa",
    "capitalJa": "キンシャサ",
    "continent": "Africa"
  },
  {
    "id": "DK",
    "countryKo": "덴마크",
    "countryEn": "Denmark",
    "countryJa": "デンマーク",
    "capitalKo": "코펜하겐",
    "capitalEn": "Copenhagen",
    "capitalJa": "コペンハーゲン",
    "continent": "Europe"
  },
  {
    "id": "DJ",
    "countryKo": "지부티",
    "countryEn": "Djibouti",
    "countryJa": "ジブチ",
    "capitalKo": "지부티",
    "capitalEn": "Djibouti",
    "capitalJa": "ジブチ",
    "continent": "Africa"
  },
  {
    "id": "DM",
    "countryKo": "도미니카 연방",
    "countryEn": "Dominica",
    "countryJa": "ドミニカ国",
    "capitalKo": "로조",
    "capitalEn": "Roseau",
    "capitalJa": "ロゾー",
    "continent": "North America"
  },
  {
    "id": "DO",
    "countryKo": "도미니카공화국",
    "countryEn": "Dominican Republic",
    "countryJa": "ドミニカ共和国",
    "capitalKo": "산토도밍고",
    "capitalEn": "Santo Domingo",
    "capitalJa": "サント・ドミンゴ",
    "continent": "North America"
  },
  {
    "id": "EC",
    "countryKo": "에콰도르",
    "countryEn": "Ecuador",
    "countryJa": "エクアドル",
    "capitalKo": "키토",
    "capitalEn": "Quito",
    "capitalJa": "キト",
    "continent": "South America"
  },
  {
    "id": "EG",
    "countryKo": "이집트",
    "countryEn": "Egypt",
    "countryJa": "エジプト",
    "capitalKo": "카이로",
    "capitalEn": "Cairo",
    "capitalJa": "カイロ",
    "continent": "Africa"
  },
  {
    "id": "SV",
    "countryKo": "엘살바도르",
    "countryEn": "El Salvador",
    "countryJa": "エルサルバドル",
    "capitalKo": "산살바도르",
    "capitalEn": "San Salvador",
    "capitalJa": "サンサルバドル",
    "continent": "North America"
  },
  {
    "id": "GQ",
    "countryKo": "적도기니",
    "countryEn": "Equatorial Guinea",
    "countryJa": "赤道ギニア",
    "capitalKo": "시우다드데라파스",
    "capitalEn": "Ciudad de la Paz",
    "capitalJa": "シウダー・デ・ラ・パス",
    "continent": "Africa",
    "capitalQualifierKo": "수도",
    "capitalNoteKo": "2026년 1월 수도를 말라보에서 시우다드데라파스로 변경했습니다."
  },
  {
    "id": "ER",
    "countryKo": "에리트레아",
    "countryEn": "Eritrea",
    "countryJa": "エリトリア",
    "capitalKo": "아스마라",
    "capitalEn": "Asmara",
    "capitalJa": "アスマラ",
    "continent": "Africa"
  },
  {
    "id": "EE",
    "countryKo": "에스토니아",
    "countryEn": "Estonia",
    "countryJa": "エストニア",
    "capitalKo": "탈린",
    "capitalEn": "Tallinn",
    "capitalJa": "タリン",
    "continent": "Europe"
  },
  {
    "id": "SZ",
    "countryKo": "에스와티니",
    "countryEn": "Eswatini",
    "countryJa": "エスワティニ",
    "capitalKo": "음바바네",
    "capitalEn": "Mbabane",
    "capitalJa": "ムババーネ",
    "continent": "Africa",
    "capitalQualifierKo": "행정 수도",
    "capitalNoteKo": "행정 수도는 음바바네이며, 왕실·입법 중심지는 로밤바입니다."
  },
  {
    "id": "ET",
    "countryKo": "에티오피아",
    "countryEn": "Ethiopia",
    "countryJa": "エチオピア",
    "capitalKo": "아디스아바바",
    "capitalEn": "Addis Ababa",
    "capitalJa": "アディスアベバ",
    "continent": "Africa"
  },
  {
    "id": "FJ",
    "countryKo": "피지",
    "countryEn": "Fiji",
    "countryJa": "フィジー",
    "capitalKo": "수바",
    "capitalEn": "Suva",
    "capitalJa": "スバ",
    "continent": "Oceania"
  },
  {
    "id": "FI",
    "countryKo": "핀란드",
    "countryEn": "Finland",
    "countryJa": "フィンランド",
    "capitalKo": "헬싱키",
    "capitalEn": "Helsinki",
    "capitalJa": "ヘルシンキ",
    "continent": "Europe"
  },
  {
    "id": "FR",
    "countryKo": "프랑스",
    "countryEn": "France",
    "countryJa": "フランス",
    "capitalKo": "파리",
    "capitalEn": "Paris",
    "capitalJa": "パリ",
    "continent": "Europe"
  },
  {
    "id": "GA",
    "countryKo": "가봉",
    "countryEn": "Gabon",
    "countryJa": "ガボン",
    "capitalKo": "리브르빌",
    "capitalEn": "Libreville",
    "capitalJa": "リーブルヴィル",
    "continent": "Africa"
  },
  {
    "id": "GM",
    "countryKo": "감비아",
    "countryEn": "Gambia (The)",
    "countryJa": "ガンビア",
    "capitalKo": "반줄",
    "capitalEn": "Banjul",
    "capitalJa": "バンジュール",
    "continent": "Africa"
  },
  {
    "id": "GE",
    "countryKo": "조지아",
    "countryEn": "Georgia",
    "countryJa": "ジョージア",
    "capitalKo": "트빌리시",
    "capitalEn": "Tbilisi",
    "capitalJa": "トビリシ",
    "continent": "Asia"
  },
  {
    "id": "DE",
    "countryKo": "독일",
    "countryEn": "Germany",
    "countryJa": "ドイツ",
    "capitalKo": "베를린",
    "capitalEn": "Berlin",
    "capitalJa": "ベルリン",
    "continent": "Europe"
  },
  {
    "id": "GH",
    "countryKo": "가나",
    "countryEn": "Ghana",
    "countryJa": "ガーナ",
    "capitalKo": "아크라",
    "capitalEn": "Accra",
    "capitalJa": "アクラ",
    "continent": "Africa"
  },
  {
    "id": "GR",
    "countryKo": "그리스",
    "countryEn": "Greece",
    "countryJa": "ギリシャ",
    "capitalKo": "아테네",
    "capitalEn": "Athens",
    "capitalJa": "アテネ",
    "continent": "Europe"
  },
  {
    "id": "GD",
    "countryKo": "그레나다",
    "countryEn": "Grenada",
    "countryJa": "グレナダ",
    "capitalKo": "세인트조지스",
    "capitalEn": "Saint George's",
    "capitalJa": "セントジョージズ",
    "continent": "North America"
  },
  {
    "id": "GT",
    "countryKo": "과테말라",
    "countryEn": "Guatemala",
    "countryJa": "グアテマラ",
    "capitalKo": "과테말라시티",
    "capitalEn": "Guatemala City",
    "capitalJa": "グアテマラシティ",
    "continent": "North America"
  },
  {
    "id": "GN",
    "countryKo": "기니",
    "countryEn": "Guinea",
    "countryJa": "ギニア",
    "capitalKo": "코나크리",
    "capitalEn": "Conakry",
    "capitalJa": "コナクリ",
    "continent": "Africa"
  },
  {
    "id": "GW",
    "countryKo": "기니비사우",
    "countryEn": "Guinea-Bissau",
    "countryJa": "ギニアビサウ共和国",
    "capitalKo": "비사우",
    "capitalEn": "Bissau",
    "capitalJa": "ビサウ",
    "continent": "Africa"
  },
  {
    "id": "GY",
    "countryKo": "가이아나",
    "countryEn": "Guyana",
    "countryJa": "ガイアナ",
    "capitalKo": "조지타운",
    "capitalEn": "Georgetown",
    "capitalJa": "ジョージタウン",
    "continent": "South America"
  },
  {
    "id": "HT",
    "countryKo": "아이티",
    "countryEn": "Haiti",
    "countryJa": "ハイチ",
    "capitalKo": "포르토프랭스",
    "capitalEn": "Port-au-Prince",
    "capitalJa": "ポルトープランス",
    "continent": "North America"
  },
  {
    "id": "HN",
    "countryKo": "온두라스",
    "countryEn": "Honduras",
    "countryJa": "ホンジュラス",
    "capitalKo": "테구시갈파",
    "capitalEn": "Tegucigalpa",
    "capitalJa": "テグシガルパ",
    "continent": "North America"
  },
  {
    "id": "HU",
    "countryKo": "헝가리",
    "countryEn": "Hungary",
    "countryJa": "ハンガリー",
    "capitalKo": "부다페스트",
    "capitalEn": "Budapest",
    "capitalJa": "ブダペスト",
    "continent": "Europe"
  },
  {
    "id": "IS",
    "countryKo": "아이슬란드",
    "countryEn": "Iceland",
    "countryJa": "アイスランド",
    "capitalKo": "레이캬비크",
    "capitalEn": "Reykjavik",
    "capitalJa": "レイキャヴィーク",
    "continent": "Europe"
  },
  {
    "id": "IN",
    "countryKo": "인도",
    "countryEn": "India",
    "countryJa": "インド",
    "capitalKo": "뉴델리",
    "capitalEn": "New Delhi",
    "capitalJa": "ニューデリー",
    "continent": "Asia"
  },
  {
    "id": "ID",
    "countryKo": "인도네시아",
    "countryEn": "Indonesia",
    "countryJa": "インドネシア",
    "capitalKo": "자카르타",
    "capitalEn": "Jakarta",
    "capitalJa": "ジャカルタ",
    "continent": "Asia",
    "capitalNoteKo": "누산타라로 수도 이전을 추진 중이며, 이 퀴즈는 이전 대통령령 발효 전의 자카르타를 기준으로 합니다."
  },
  {
    "id": "IR",
    "countryKo": "이란",
    "countryEn": "Iran (Islamic Republic of)",
    "countryJa": "イラン",
    "capitalKo": "테헤란",
    "capitalEn": "Tehran",
    "capitalJa": "テヘラン",
    "continent": "Asia"
  },
  {
    "id": "IQ",
    "countryKo": "이라크",
    "countryEn": "Iraq",
    "countryJa": "イラク",
    "capitalKo": "바그다드",
    "capitalEn": "Baghdad",
    "capitalJa": "バグダード",
    "continent": "Asia"
  },
  {
    "id": "IE",
    "countryKo": "아일랜드",
    "countryEn": "Ireland",
    "countryJa": "アイルランド",
    "capitalKo": "더블린",
    "capitalEn": "Dublin",
    "capitalJa": "ダブリン",
    "continent": "Europe"
  },
  {
    "id": "IL",
    "countryKo": "이스라엘",
    "countryEn": "Israel",
    "countryJa": "イスラエル",
    "capitalKo": "예루살렘",
    "capitalEn": "Jerusalem",
    "capitalJa": "エルサレム",
    "continent": "Asia",
    "capitalQualifierKo": "이스라엘이 지정한 수도",
    "capitalNoteKo": "이스라엘은 예루살렘을 수도로 지정하고 있습니다. 도시의 국제적 지위는 분쟁 중입니다."
  },
  {
    "id": "IT",
    "countryKo": "이탈리아",
    "countryEn": "Italy",
    "countryJa": "イタリア",
    "capitalKo": "로마",
    "capitalEn": "Rome",
    "capitalJa": "ローマ",
    "continent": "Europe"
  },
  {
    "id": "JM",
    "countryKo": "자메이카",
    "countryEn": "Jamaica",
    "countryJa": "ジャマイカ",
    "capitalKo": "킹스턴",
    "capitalEn": "Kingston",
    "capitalJa": "キングストン",
    "continent": "North America"
  },
  {
    "id": "JP",
    "countryKo": "일본",
    "countryEn": "Japan",
    "countryJa": "日本",
    "capitalKo": "도쿄",
    "capitalEn": "Tokyo",
    "capitalJa": "東京",
    "continent": "Asia"
  },
  {
    "id": "JO",
    "countryKo": "요르단",
    "countryEn": "Jordan",
    "countryJa": "ヨルダン",
    "capitalKo": "암만",
    "capitalEn": "Amman",
    "capitalJa": "アンマン",
    "continent": "Asia"
  },
  {
    "id": "KZ",
    "countryKo": "카자흐스탄",
    "countryEn": "Kazakhstan",
    "countryJa": "カザフスタン",
    "capitalKo": "아스타나",
    "capitalEn": "Astana",
    "capitalJa": "アスタナ",
    "continent": "Asia"
  },
  {
    "id": "KE",
    "countryKo": "케냐",
    "countryEn": "Kenya",
    "countryJa": "ケニア",
    "capitalKo": "나이로비",
    "capitalEn": "Nairobi",
    "capitalJa": "ナイロビ",
    "continent": "Africa"
  },
  {
    "id": "KI",
    "countryKo": "키리바시",
    "countryEn": "Kiribati",
    "countryJa": "キリバス",
    "capitalKo": "사우스타라와",
    "capitalEn": "South Tarawa",
    "capitalJa": "サウス・タラワ",
    "continent": "Oceania"
  },
  {
    "id": "KW",
    "countryKo": "쿠웨이트",
    "countryEn": "Kuwait",
    "countryJa": "クウェート",
    "capitalKo": "쿠웨이트시티",
    "capitalEn": "Kuwait City",
    "capitalJa": "クウェート",
    "continent": "Asia"
  },
  {
    "id": "KG",
    "countryKo": "키르기스스탄",
    "countryEn": "Kyrgyzstan",
    "countryJa": "キルギス",
    "capitalKo": "비슈케크",
    "capitalEn": "Bishkek",
    "capitalJa": "ビシュケク",
    "continent": "Asia"
  },
  {
    "id": "LA",
    "countryKo": "라오스",
    "countryEn": "Lao People's Democratic Republic",
    "countryJa": "ラオス",
    "capitalKo": "비엔티안",
    "capitalEn": "Vientiane",
    "capitalJa": "ヴィエンチャン",
    "continent": "Asia"
  },
  {
    "id": "LV",
    "countryKo": "라트비아",
    "countryEn": "Latvia",
    "countryJa": "ラトビア",
    "capitalKo": "리가",
    "capitalEn": "Riga",
    "capitalJa": "リガ",
    "continent": "Europe"
  },
  {
    "id": "LB",
    "countryKo": "레바논",
    "countryEn": "Lebanon",
    "countryJa": "レバノン",
    "capitalKo": "베이루트",
    "capitalEn": "Beirut",
    "capitalJa": "ベイルート",
    "continent": "Asia"
  },
  {
    "id": "LS",
    "countryKo": "레소토",
    "countryEn": "Lesotho",
    "countryJa": "レソト",
    "capitalKo": "마세루",
    "capitalEn": "Maseru",
    "capitalJa": "マセル",
    "continent": "Africa"
  },
  {
    "id": "LR",
    "countryKo": "라이베리아",
    "countryEn": "Liberia",
    "countryJa": "リベリア",
    "capitalKo": "몬로비아",
    "capitalEn": "Monrovia",
    "capitalJa": "モンロビア",
    "continent": "Africa"
  },
  {
    "id": "LY",
    "countryKo": "리비아",
    "countryEn": "Libya",
    "countryJa": "リビア",
    "capitalKo": "트리폴리",
    "capitalEn": "Tripoli",
    "capitalJa": "トリポリ",
    "continent": "Africa"
  },
  {
    "id": "LI",
    "countryKo": "리히텐슈타인",
    "countryEn": "Liechtenstein",
    "countryJa": "リヒテンシュタイン",
    "capitalKo": "파두츠",
    "capitalEn": "Vaduz",
    "capitalJa": "ファドゥーツ",
    "continent": "Europe"
  },
  {
    "id": "LT",
    "countryKo": "리투아니아",
    "countryEn": "Lithuania",
    "countryJa": "リトアニア",
    "capitalKo": "빌뉴스",
    "capitalEn": "Vilnius",
    "capitalJa": "ヴィルニュス",
    "continent": "Europe"
  },
  {
    "id": "LU",
    "countryKo": "룩셈부르크",
    "countryEn": "Luxembourg",
    "countryJa": "ルクセンブルク",
    "capitalKo": "룩셈부르크",
    "capitalEn": "Luxembourg",
    "capitalJa": "ルクセンブルク",
    "continent": "Europe"
  },
  {
    "id": "MG",
    "countryKo": "마다가스카르",
    "countryEn": "Madagascar",
    "countryJa": "マダガスカル",
    "capitalKo": "안타나나리보",
    "capitalEn": "Antananarivo",
    "capitalJa": "アンタナナリボ",
    "continent": "Africa"
  },
  {
    "id": "MW",
    "countryKo": "말라위",
    "countryEn": "Malawi",
    "countryJa": "マラウイ",
    "capitalKo": "릴롱궤",
    "capitalEn": "Lilongwe",
    "capitalJa": "リロングウェ",
    "continent": "Africa"
  },
  {
    "id": "MY",
    "countryKo": "말레이시아",
    "countryEn": "Malaysia",
    "countryJa": "マレーシア",
    "capitalKo": "쿠알라룸푸르",
    "capitalEn": "Kuala Lumpur",
    "capitalJa": "クアラルンプール",
    "continent": "Asia",
    "capitalQualifierKo": "수도",
    "capitalNoteKo": "수도는 쿠알라룸푸르이며, 행정 중심지는 푸트라자야입니다."
  },
  {
    "id": "MV",
    "countryKo": "몰디브",
    "countryEn": "Maldives",
    "countryJa": "モルディブ",
    "capitalKo": "말레",
    "capitalEn": "Male",
    "capitalJa": "マレ",
    "continent": "Asia"
  },
  {
    "id": "ML",
    "countryKo": "말리",
    "countryEn": "Mali",
    "countryJa": "マリ共和国",
    "capitalKo": "바마코",
    "capitalEn": "Bamako",
    "capitalJa": "バマコ",
    "continent": "Africa"
  },
  {
    "id": "MT",
    "countryKo": "몰타",
    "countryEn": "Malta",
    "countryJa": "マルタ",
    "capitalKo": "발레타",
    "capitalEn": "Valletta",
    "capitalJa": "バレッタ",
    "continent": "Europe"
  },
  {
    "id": "MH",
    "countryKo": "마셜제도",
    "countryEn": "Marshall Islands",
    "countryJa": "マーシャル諸島",
    "capitalKo": "마주로",
    "capitalEn": "Majuro",
    "capitalJa": "マジュロ",
    "continent": "Oceania"
  },
  {
    "id": "MR",
    "countryKo": "모리타니",
    "countryEn": "Mauritania",
    "countryJa": "モーリタニア",
    "capitalKo": "누악쇼트",
    "capitalEn": "Nouakchott",
    "capitalJa": "ヌアクショット",
    "continent": "Africa"
  },
  {
    "id": "MU",
    "countryKo": "모리셔스",
    "countryEn": "Mauritius",
    "countryJa": "モーリシャス",
    "capitalKo": "포트루이스",
    "capitalEn": "Port Louis",
    "capitalJa": "ポートルイス",
    "continent": "Africa"
  },
  {
    "id": "MX",
    "countryKo": "멕시코",
    "countryEn": "Mexico",
    "countryJa": "メキシコ",
    "capitalKo": "멕시코시티",
    "capitalEn": "Mexico City",
    "capitalJa": "メキシコシティ",
    "continent": "North America"
  },
  {
    "id": "FM",
    "countryKo": "미크로네시아 연방",
    "countryEn": "Micronesia (Federated States of)",
    "countryJa": "ミクロネシア連邦",
    "capitalKo": "팔리키르",
    "capitalEn": "Palikir",
    "capitalJa": "パリキール",
    "continent": "Oceania"
  },
  {
    "id": "MC",
    "countryKo": "모나코",
    "countryEn": "Monaco",
    "countryJa": "モナコ",
    "capitalKo": "모나코",
    "capitalEn": "Monaco",
    "capitalJa": "モナコ",
    "continent": "Europe"
  },
  {
    "id": "MN",
    "countryKo": "몽골",
    "countryEn": "Mongolia",
    "countryJa": "モンゴル国",
    "capitalKo": "울란바토르",
    "capitalEn": "Ulaanbaatar",
    "capitalJa": "ウランバートル",
    "continent": "Asia"
  },
  {
    "id": "ME",
    "countryKo": "몬테네그로",
    "countryEn": "Montenegro",
    "countryJa": "モンテネグロ",
    "capitalKo": "포드고리차",
    "capitalEn": "Podgorica",
    "capitalJa": "ポドゴリツァ",
    "continent": "Europe"
  },
  {
    "id": "MA",
    "countryKo": "모로코",
    "countryEn": "Morocco",
    "countryJa": "モロッコ",
    "capitalKo": "라바트",
    "capitalEn": "Rabat",
    "capitalJa": "ラバト",
    "continent": "Africa"
  },
  {
    "id": "MZ",
    "countryKo": "모잠비크",
    "countryEn": "Mozambique",
    "countryJa": "モザンビーク",
    "capitalKo": "마푸투",
    "capitalEn": "Maputo",
    "capitalJa": "マプト",
    "continent": "Africa"
  },
  {
    "id": "MM",
    "countryKo": "미얀마",
    "countryEn": "Myanmar",
    "countryJa": "ミャンマー",
    "capitalKo": "네피도",
    "capitalEn": "Nay Pyi Taw",
    "capitalJa": "ネピドー",
    "continent": "Asia"
  },
  {
    "id": "NA",
    "countryKo": "나미비아",
    "countryEn": "Namibia",
    "countryJa": "ナミビア",
    "capitalKo": "빈트후크",
    "capitalEn": "Windhoek",
    "capitalJa": "ウィントフック",
    "continent": "Africa"
  },
  {
    "id": "NR",
    "countryKo": "나우루",
    "countryEn": "Nauru",
    "countryJa": "ナウル",
    "capitalKo": "야렌",
    "capitalEn": "Yaren",
    "capitalJa": "ヤレン",
    "continent": "Oceania",
    "capitalQualifierKo": "정부 소재지",
    "capitalNoteKo": "공식 수도가 없는 나라로, 야렌에 정부 기관이 있습니다."
  },
  {
    "id": "NP",
    "countryKo": "네팔",
    "countryEn": "Nepal",
    "countryJa": "ネパール",
    "capitalKo": "카트만두",
    "capitalEn": "Kathmandu",
    "capitalJa": "カトマンズ",
    "continent": "Asia"
  },
  {
    "id": "NL",
    "countryKo": "네덜란드",
    "countryEn": "Netherlands (Kingdom of the)",
    "countryJa": "オランダ王国",
    "capitalKo": "암스테르담",
    "capitalEn": "Amsterdam",
    "capitalJa": "アムステルダム",
    "continent": "Europe",
    "capitalQualifierKo": "헌법상 수도",
    "capitalNoteKo": "수도는 암스테르담이며, 정부 소재지는 헤이그입니다."
  },
  {
    "id": "NZ",
    "countryKo": "뉴질랜드",
    "countryEn": "New Zealand",
    "countryJa": "ニュージーランド",
    "capitalKo": "웰링턴",
    "capitalEn": "Wellington",
    "capitalJa": "ウェリントン",
    "continent": "Oceania"
  },
  {
    "id": "NI",
    "countryKo": "니카라과",
    "countryEn": "Nicaragua",
    "countryJa": "ニカラグア",
    "capitalKo": "마나과",
    "capitalEn": "Managua",
    "capitalJa": "マナグア",
    "continent": "North America"
  },
  {
    "id": "NE",
    "countryKo": "니제르",
    "countryEn": "Niger",
    "countryJa": "ニジェール",
    "capitalKo": "니아메",
    "capitalEn": "Niamey",
    "capitalJa": "ニアメ",
    "continent": "Africa"
  },
  {
    "id": "NG",
    "countryKo": "나이지리아",
    "countryEn": "Nigeria",
    "countryJa": "ナイジェリア",
    "capitalKo": "아부자",
    "capitalEn": "Abuja",
    "capitalJa": "アブジャ",
    "continent": "Africa"
  },
  {
    "id": "MK",
    "countryKo": "북마케도니아",
    "countryEn": "North Macedonia",
    "countryJa": "北マケドニア",
    "capitalKo": "스코페",
    "capitalEn": "Skopje",
    "capitalJa": "スコピエ",
    "continent": "Europe"
  },
  {
    "id": "NO",
    "countryKo": "노르웨이",
    "countryEn": "Norway",
    "countryJa": "ノルウェー王国",
    "capitalKo": "오슬로",
    "capitalEn": "Oslo",
    "capitalJa": "オスロ",
    "continent": "Europe"
  },
  {
    "id": "OM",
    "countryKo": "오만",
    "countryEn": "Oman",
    "countryJa": "オマーン",
    "capitalKo": "무스카트",
    "capitalEn": "Muscat",
    "capitalJa": "マスカット",
    "continent": "Asia"
  },
  {
    "id": "PK",
    "countryKo": "파키스탄",
    "countryEn": "Pakistan",
    "countryJa": "パキスタン",
    "capitalKo": "이슬라마바드",
    "capitalEn": "Islamabad",
    "capitalJa": "イスラマバード",
    "continent": "Asia"
  },
  {
    "id": "PW",
    "countryKo": "팔라우",
    "countryEn": "Palau",
    "countryJa": "パラオ",
    "capitalKo": "응게룰무드",
    "capitalEn": "Ngerulmud",
    "capitalJa": "ンゲルルムッド",
    "continent": "Oceania"
  },
  {
    "id": "PA",
    "countryKo": "파나마",
    "countryEn": "Panama",
    "countryJa": "パナマ",
    "capitalKo": "파나마시티",
    "capitalEn": "Panama City",
    "capitalJa": "パナマシティ",
    "continent": "North America"
  },
  {
    "id": "PG",
    "countryKo": "파푸아뉴기니",
    "countryEn": "Papua New Guinea",
    "countryJa": "パプアニューギニア",
    "capitalKo": "포트모르즈비",
    "capitalEn": "Port Moresby",
    "capitalJa": "ポートモレスビー",
    "continent": "Oceania"
  },
  {
    "id": "PY",
    "countryKo": "파라과이",
    "countryEn": "Paraguay",
    "countryJa": "パラグアイ",
    "capitalKo": "아순시온",
    "capitalEn": "Asuncion",
    "capitalJa": "アスンシオン",
    "continent": "South America"
  },
  {
    "id": "PE",
    "countryKo": "페루",
    "countryEn": "Peru",
    "countryJa": "ペルー",
    "capitalKo": "리마",
    "capitalEn": "Lima",
    "capitalJa": "リマ",
    "continent": "South America"
  },
  {
    "id": "PH",
    "countryKo": "필리핀",
    "countryEn": "Philippines",
    "countryJa": "フィリピン",
    "capitalKo": "마닐라",
    "capitalEn": "Manila",
    "capitalJa": "マニラ",
    "continent": "Asia"
  },
  {
    "id": "PL",
    "countryKo": "폴란드",
    "countryEn": "Poland",
    "countryJa": "ポーランド",
    "capitalKo": "바르샤바",
    "capitalEn": "Warsaw",
    "capitalJa": "ワルシャワ",
    "continent": "Europe"
  },
  {
    "id": "PT",
    "countryKo": "포르투갈",
    "countryEn": "Portugal",
    "countryJa": "ポルトガル",
    "capitalKo": "리스본",
    "capitalEn": "Lisbon",
    "capitalJa": "リスボン",
    "continent": "Europe"
  },
  {
    "id": "QA",
    "countryKo": "카타르",
    "countryEn": "Qatar",
    "countryJa": "カタール",
    "capitalKo": "도하",
    "capitalEn": "Doha",
    "capitalJa": "ドーハ",
    "continent": "Asia"
  },
  {
    "id": "KR",
    "countryKo": "대한민국",
    "countryEn": "Republic of Korea",
    "countryJa": "大韓民国",
    "capitalKo": "서울",
    "capitalEn": "Seoul",
    "capitalJa": "ソウル",
    "continent": "Asia"
  },
  {
    "id": "MD",
    "countryKo": "몰도바",
    "countryEn": "Republic of Moldova",
    "countryJa": "モルドバ",
    "capitalKo": "키시너우",
    "capitalEn": "Chisinau",
    "capitalJa": "キシナウ",
    "continent": "Europe"
  },
  {
    "id": "RO",
    "countryKo": "루마니아",
    "countryEn": "Romania",
    "countryJa": "ルーマニア",
    "capitalKo": "부쿠레슈티",
    "capitalEn": "Bucharest",
    "capitalJa": "ブカレスト",
    "continent": "Europe"
  },
  {
    "id": "RU",
    "countryKo": "러시아",
    "countryEn": "Russian Federation",
    "countryJa": "ロシア",
    "capitalKo": "모스크바",
    "capitalEn": "Moscow",
    "capitalJa": "モスクワ",
    "continent": "Europe"
  },
  {
    "id": "RW",
    "countryKo": "르완다",
    "countryEn": "Rwanda",
    "countryJa": "ルワンダ",
    "capitalKo": "키갈리",
    "capitalEn": "Kigali",
    "capitalJa": "キガリ",
    "continent": "Africa"
  },
  {
    "id": "KN",
    "countryKo": "세인트키츠 네비스",
    "countryEn": "Saint Kitts and Nevis",
    "countryJa": "セントクリストファー・ネイビス",
    "capitalKo": "바스테르",
    "capitalEn": "Basseterre",
    "capitalJa": "バセテール",
    "continent": "North America"
  },
  {
    "id": "LC",
    "countryKo": "세인트루시아",
    "countryEn": "Saint Lucia",
    "countryJa": "セントルシア",
    "capitalKo": "캐스트리스",
    "capitalEn": "Castries",
    "capitalJa": "カストリーズ",
    "continent": "North America"
  },
  {
    "id": "VC",
    "countryKo": "세인트빈센트 그레나딘",
    "countryEn": "Saint Vincent and the Grenadines",
    "countryJa": "セントビンセント・グレナディーン",
    "capitalKo": "킹스타운",
    "capitalEn": "Kingstown",
    "capitalJa": "キングスタウン",
    "continent": "North America"
  },
  {
    "id": "WS",
    "countryKo": "사모아",
    "countryEn": "Samoa",
    "countryJa": "サモア",
    "capitalKo": "아피아",
    "capitalEn": "Apia",
    "capitalJa": "アピア",
    "continent": "Oceania"
  },
  {
    "id": "SM",
    "countryKo": "산마리노",
    "countryEn": "San Marino",
    "countryJa": "サンマリノ",
    "capitalKo": "산마리노",
    "capitalEn": "San Marino",
    "capitalJa": "サンマリノ",
    "continent": "Europe"
  },
  {
    "id": "ST",
    "countryKo": "상투메 프린시페",
    "countryEn": "Sao Tome and Principe",
    "countryJa": "サントメ・プリンシペ",
    "capitalKo": "상투메",
    "capitalEn": "Sao Tome",
    "capitalJa": "サントメ",
    "continent": "Africa"
  },
  {
    "id": "SA",
    "countryKo": "사우디아라비아",
    "countryEn": "Saudi Arabia",
    "countryJa": "サウジアラビア",
    "capitalKo": "리야드",
    "capitalEn": "Riyadh",
    "capitalJa": "リヤド",
    "continent": "Asia"
  },
  {
    "id": "SN",
    "countryKo": "세네갈",
    "countryEn": "Senegal",
    "countryJa": "セネガル",
    "capitalKo": "다카르",
    "capitalEn": "Dakar",
    "capitalJa": "ダカール",
    "continent": "Africa"
  },
  {
    "id": "RS",
    "countryKo": "세르비아",
    "countryEn": "Serbia",
    "countryJa": "セルビア",
    "capitalKo": "베오그라드",
    "capitalEn": "Belgrade",
    "capitalJa": "ベオグラード",
    "continent": "Europe"
  },
  {
    "id": "SC",
    "countryKo": "세이셸",
    "countryEn": "Seychelles",
    "countryJa": "セーシェル",
    "capitalKo": "빅토리아",
    "capitalEn": "Victoria",
    "capitalJa": "ヴィクトリア",
    "continent": "Africa"
  },
  {
    "id": "SL",
    "countryKo": "시에라리온",
    "countryEn": "Sierra Leone",
    "countryJa": "シエラレオネ",
    "capitalKo": "프리타운",
    "capitalEn": "Freetown",
    "capitalJa": "フリータウン",
    "continent": "Africa"
  },
  {
    "id": "SG",
    "countryKo": "싱가포르",
    "countryEn": "Singapore",
    "countryJa": "シンガポール",
    "capitalKo": "싱가포르",
    "capitalEn": "Singapore",
    "capitalJa": "シンガポール",
    "continent": "Asia"
  },
  {
    "id": "SK",
    "countryKo": "슬로바키아",
    "countryEn": "Slovakia",
    "countryJa": "スロバキア",
    "capitalKo": "브라티슬라바",
    "capitalEn": "Bratislava",
    "capitalJa": "ブラチスラヴァ",
    "continent": "Europe"
  },
  {
    "id": "SI",
    "countryKo": "슬로베니아",
    "countryEn": "Slovenia",
    "countryJa": "スロベニア",
    "capitalKo": "류블랴나",
    "capitalEn": "Ljubljana",
    "capitalJa": "リュブリャナ",
    "continent": "Europe"
  },
  {
    "id": "SB",
    "countryKo": "솔로몬제도",
    "countryEn": "Solomon Islands",
    "countryJa": "ソロモン諸島",
    "capitalKo": "호니아라",
    "capitalEn": "Honiara",
    "capitalJa": "ホニアラ",
    "continent": "Oceania"
  },
  {
    "id": "SO",
    "countryKo": "소말리아",
    "countryEn": "Somalia",
    "countryJa": "ソマリア",
    "capitalKo": "모가디슈",
    "capitalEn": "Mogadishu",
    "capitalJa": "モガディシュ",
    "continent": "Africa"
  },
  {
    "id": "ZA",
    "countryKo": "남아프리카공화국",
    "countryEn": "South Africa",
    "countryJa": "南アフリカ共和国",
    "capitalKo": "프리토리아",
    "capitalEn": "Pretoria",
    "capitalJa": "プレトリア",
    "continent": "Africa",
    "capitalQualifierKo": "행정 수도",
    "capitalNoteKo": "행정 수도는 프리토리아, 입법 수도는 케이프타운, 사법 수도는 블룸폰테인입니다."
  },
  {
    "id": "SS",
    "countryKo": "남수단",
    "countryEn": "South Sudan",
    "countryJa": "南スーダン",
    "capitalKo": "주바",
    "capitalEn": "Juba",
    "capitalJa": "ジュバ",
    "continent": "Africa"
  },
  {
    "id": "ES",
    "countryKo": "스페인",
    "countryEn": "Spain",
    "countryJa": "スペイン王国",
    "capitalKo": "마드리드",
    "capitalEn": "Madrid",
    "capitalJa": "マドリード",
    "continent": "Europe"
  },
  {
    "id": "LK",
    "countryKo": "스리랑카",
    "countryEn": "Sri Lanka",
    "countryJa": "スリランカ",
    "capitalKo": "스리자야와르데네푸라코테",
    "capitalEn": "Sri Jayawardenepura Kotte",
    "capitalJa": "スリジャヤワルダナプラコッテ",
    "continent": "Asia",
    "capitalQualifierKo": "입법 수도",
    "capitalNoteKo": "입법 수도는 스리자야와르데네푸라코테이며, 콜롬보도 주요 정부 기능을 담당합니다."
  },
  {
    "id": "SD",
    "countryKo": "수단",
    "countryEn": "Sudan",
    "countryJa": "スーダン",
    "capitalKo": "하르툼",
    "capitalEn": "Khartoum",
    "capitalJa": "ハルツーム",
    "continent": "Africa"
  },
  {
    "id": "SR",
    "countryKo": "수리남",
    "countryEn": "Suriname",
    "countryJa": "スリナム",
    "capitalKo": "파라마리보",
    "capitalEn": "Paramaribo",
    "capitalJa": "パラマリボ",
    "continent": "South America"
  },
  {
    "id": "SE",
    "countryKo": "스웨덴",
    "countryEn": "Sweden",
    "countryJa": "スウェーデン",
    "capitalKo": "스톡홀름",
    "capitalEn": "Stockholm",
    "capitalJa": "ストックホルム",
    "continent": "Europe"
  },
  {
    "id": "CH",
    "countryKo": "스위스",
    "countryEn": "Switzerland",
    "countryJa": "スイス",
    "capitalKo": "베른",
    "capitalEn": "Bern",
    "capitalJa": "ベルン",
    "continent": "Europe",
    "capitalQualifierKo": "연방 정부 소재지",
    "capitalNoteKo": "베른은 스위스의 연방시이자 연방 정부 소재지입니다."
  },
  {
    "id": "SY",
    "countryKo": "시리아",
    "countryEn": "Syrian Arab Republic",
    "countryJa": "シリア",
    "capitalKo": "다마스쿠스",
    "capitalEn": "Damascus",
    "capitalJa": "ダマスカス",
    "continent": "Asia"
  },
  {
    "id": "TJ",
    "countryKo": "타지키스탄",
    "countryEn": "Tajikistan",
    "countryJa": "タジキスタン",
    "capitalKo": "두샨베",
    "capitalEn": "Dushanbe",
    "capitalJa": "ドゥシャンベ",
    "continent": "Asia"
  },
  {
    "id": "TH",
    "countryKo": "태국",
    "countryEn": "Thailand",
    "countryJa": "タイ王国",
    "capitalKo": "방콕",
    "capitalEn": "Bangkok",
    "capitalJa": "バンコク",
    "continent": "Asia"
  },
  {
    "id": "TL",
    "countryKo": "동티모르",
    "countryEn": "Timor-Leste",
    "countryJa": "東ティモール",
    "capitalKo": "딜리",
    "capitalEn": "Dili",
    "capitalJa": "ディリ",
    "continent": "Asia"
  },
  {
    "id": "TG",
    "countryKo": "토고",
    "countryEn": "Togo",
    "countryJa": "トーゴ",
    "capitalKo": "로메",
    "capitalEn": "Lome",
    "capitalJa": "ロメ",
    "continent": "Africa"
  },
  {
    "id": "TO",
    "countryKo": "통가",
    "countryEn": "Tonga",
    "countryJa": "トンガ",
    "capitalKo": "누쿠알로파",
    "capitalEn": "Nuku'alofa",
    "capitalJa": "ヌクアロファ",
    "continent": "Oceania"
  },
  {
    "id": "TT",
    "countryKo": "트리니다드 토바고",
    "countryEn": "Trinidad and Tobago",
    "countryJa": "トリニダード・トバゴ",
    "capitalKo": "포트오브스페인",
    "capitalEn": "Port of Spain",
    "capitalJa": "ポートオブスペイン",
    "continent": "North America"
  },
  {
    "id": "TN",
    "countryKo": "튀니지",
    "countryEn": "Tunisia",
    "countryJa": "チュニジア",
    "capitalKo": "튀니스",
    "capitalEn": "Tunis",
    "capitalJa": "チュニス",
    "continent": "Africa"
  },
  {
    "id": "TR",
    "countryKo": "튀르키예",
    "countryEn": "Türkiye",
    "countryJa": "トルコ",
    "capitalKo": "앙카라",
    "capitalEn": "Ankara",
    "capitalJa": "アンカラ",
    "continent": "Asia"
  },
  {
    "id": "TM",
    "countryKo": "투르크메니스탄",
    "countryEn": "Turkmenistan",
    "countryJa": "トルクメニスタン",
    "capitalKo": "아시가바트",
    "capitalEn": "Ashgabat",
    "capitalJa": "アシガバート",
    "continent": "Asia"
  },
  {
    "id": "TV",
    "countryKo": "투발루",
    "countryEn": "Tuvalu",
    "countryJa": "ツバル",
    "capitalKo": "푸나푸티",
    "capitalEn": "Funafuti",
    "capitalJa": "フナフティ",
    "continent": "Oceania"
  },
  {
    "id": "UG",
    "countryKo": "우간다",
    "countryEn": "Uganda",
    "countryJa": "ウガンダ",
    "capitalKo": "캄팔라",
    "capitalEn": "Kampala",
    "capitalJa": "カンパラ",
    "continent": "Africa"
  },
  {
    "id": "UA",
    "countryKo": "우크라이나",
    "countryEn": "Ukraine",
    "countryJa": "ウクライナ",
    "capitalKo": "키이우",
    "capitalEn": "Kyiv",
    "capitalJa": "キーウ",
    "continent": "Europe"
  },
  {
    "id": "AE",
    "countryKo": "아랍에미리트",
    "countryEn": "United Arab Emirates",
    "countryJa": "アラブ首長国連邦",
    "capitalKo": "아부다비",
    "capitalEn": "Abu Dhabi",
    "capitalJa": "アブダビ",
    "continent": "Asia"
  },
  {
    "id": "GB",
    "countryKo": "영국",
    "countryEn": "United Kingdom of Great Britain and Northern Ireland",
    "countryJa": "イギリス",
    "capitalKo": "런던",
    "capitalEn": "London",
    "capitalJa": "ロンドン",
    "continent": "Europe"
  },
  {
    "id": "TZ",
    "countryKo": "탄자니아",
    "countryEn": "United Republic of Tanzania",
    "countryJa": "タンザニア",
    "capitalKo": "도도마",
    "capitalEn": "Dodoma",
    "capitalJa": "ドドマ",
    "continent": "Africa"
  },
  {
    "id": "US",
    "countryKo": "미국",
    "countryEn": "United States of America",
    "countryJa": "アメリカ合衆国",
    "capitalKo": "워싱턴 D.C.",
    "capitalEn": "Washington, D.C.",
    "capitalJa": "ワシントンD.C.",
    "continent": "North America"
  },
  {
    "id": "UY",
    "countryKo": "우루과이",
    "countryEn": "Uruguay",
    "countryJa": "ウルグアイ",
    "capitalKo": "몬테비데오",
    "capitalEn": "Montevideo",
    "capitalJa": "モンテビデオ",
    "continent": "South America"
  },
  {
    "id": "UZ",
    "countryKo": "우즈베키스탄",
    "countryEn": "Uzbekistan",
    "countryJa": "ウズベキスタン",
    "capitalKo": "타슈켄트",
    "capitalEn": "Tashkent",
    "capitalJa": "タシュケント",
    "continent": "Asia"
  },
  {
    "id": "VU",
    "countryKo": "바누아투",
    "countryEn": "Vanuatu",
    "countryJa": "バヌアツ",
    "capitalKo": "포트빌라",
    "capitalEn": "Port Vila",
    "capitalJa": "ポートビラ",
    "continent": "Oceania"
  },
  {
    "id": "VE",
    "countryKo": "베네수엘라",
    "countryEn": "Venezuela (Bolivarian Republic of)",
    "countryJa": "ベネズエラ",
    "capitalKo": "카라카스",
    "capitalEn": "Caracas",
    "capitalJa": "カラカス",
    "continent": "South America"
  },
  {
    "id": "VN",
    "countryKo": "베트남",
    "countryEn": "Viet Nam",
    "countryJa": "ベトナム",
    "capitalKo": "하노이",
    "capitalEn": "Hanoi",
    "capitalJa": "ハノイ",
    "continent": "Asia"
  },
  {
    "id": "YE",
    "countryKo": "예멘",
    "countryEn": "Yemen",
    "countryJa": "イエメン",
    "capitalKo": "사나",
    "capitalEn": "Sana'a",
    "capitalJa": "サヌア",
    "continent": "Asia"
  },
  {
    "id": "ZM",
    "countryKo": "잠비아",
    "countryEn": "Zambia",
    "countryJa": "ザンビア",
    "capitalKo": "루사카",
    "capitalEn": "Lusaka",
    "capitalJa": "ルサカ",
    "continent": "Africa"
  },
  {
    "id": "ZW",
    "countryKo": "짐바브웨",
    "countryEn": "Zimbabwe",
    "countryJa": "ジンバブエ",
    "capitalKo": "하라레",
    "capitalEn": "Harare",
    "capitalJa": "ハラレ",
    "continent": "Africa"
  }
];

function validateCountries(data) {
  if (!Array.isArray(data) || data.length !== 193) throw new Error("국가 데이터는 정확히 193개여야 합니다.");
  const fields = ["id", "countryKo", "countryEn", "countryJa", "capitalKo", "capitalEn", "capitalJa", "continent"];
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
