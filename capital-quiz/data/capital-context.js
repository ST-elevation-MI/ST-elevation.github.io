"use strict";

const CAPITAL_CONTEXT = {
  BJ: { ko: ["공식 수도", "공식 수도는 포르토노보이며, 주요 정부 기관은 코토누에 있습니다."], ja: ["公式首都", "公式首都はポルトノボで、主要な政府機関はコトヌーにあります。"], en: ["official capital", "Porto-Novo is the official capital; most government institutions are in Cotonou."] },
  BO: { ko: ["헌법상 수도", "헌법상 수도는 수크레이며, 정부 소재지는 라파스입니다."], ja: ["憲法上の首都", "憲法上の首都はスクレで、政府所在地はラパスです。"], en: ["constitutional capital", "Sucre is the constitutional capital; the seat of government is La Paz."] },
  GQ: { ko: ["수도", "2026년 1월 수도를 말라보에서 시우다드데라파스로 변경했습니다."], ja: ["首都", "2026年1月、首都はマラボからシウダ・デ・ラ・パスへ変更されました。"], en: ["capital", "In January 2026, the capital changed from Malabo to Ciudad de la Paz."] },
  SZ: { ko: ["행정 수도", "행정 수도는 음바바네이며, 왕실·입법 중심지는 로밤바입니다."], ja: ["行政首都", "行政首都はムババーネで、王室・立法の中心地はロバンバです。"], en: ["administrative capital", "Mbabane is the administrative capital; Lobamba is the royal and legislative center."] },
  ID: { ko: ["", "누산타라로 수도 이전을 추진 중이며, 이 퀴즈는 이전 대통령령 발효 전의 자카르타를 기준으로 합니다."], ja: ["", "ヌサンタラへの首都移転が進められていますが、このクイズでは関連する大統領令の発効前のジャカルタを基準とします。"], en: ["", "The move to Nusantara is in progress; this quiz uses Jakarta until the relevant presidential decree takes effect."] },
  IL: { ko: ["이스라엘이 지정한 수도", "이스라엘은 예루살렘을 수도로 지정하고 있습니다. 도시의 국제적 지위는 분쟁 중입니다."], ja: ["イスラエルが定める首都", "イスラエルはエルサレムを首都と定めていますが、同市の国際的地位には争いがあります。"], en: ["capital designated by Israel", "Israel designates Jerusalem as its capital; the city's international status remains disputed."] },
  MY: { ko: ["수도", "수도는 쿠알라룸푸르이며, 행정 중심지는 푸트라자야입니다."], ja: ["首都", "首都はクアラルンプールで、行政の中心地はプトラジャヤです。"], en: ["capital", "Kuala Lumpur is the capital; Putrajaya is the administrative center."] },
  NR: { ko: ["정부 소재지", "공식 수도가 없는 나라로, 야렌에 정부 기관이 있습니다."], ja: ["政府所在地", "公式の首都はなく、政府機関はヤレン地区にあります。"], en: ["seat of government", "Nauru has no official capital; its government offices are in Yaren."] },
  NL: { ko: ["헌법상 수도", "수도는 암스테르담이며, 정부 소재지는 헤이그입니다."], ja: ["憲法上の首都", "首都はアムステルダムで、政府所在地はデン・ハーグです。"], en: ["constitutional capital", "Amsterdam is the capital; the seat of government is The Hague."] },
  ZA: { ko: ["행정 수도", "행정 수도는 프리토리아, 입법 수도는 케이프타운, 사법 수도는 블룸폰테인입니다."], ja: ["行政首都", "行政首都はプレトリア、立法首都はケープタウン、司法首都はブルームフォンテーンです。"], en: ["administrative capital", "Pretoria is the administrative capital, Cape Town the legislative capital, and Bloemfontein the judicial capital."] },
  LK: { ko: ["입법 수도", "입법 수도는 스리자야와르데네푸라코테이며, 콜롬보도 주요 정부 기능을 담당합니다."], ja: ["立法首都", "立法首都はスリジャヤワルダナプラコッテで、コロンボも主要な政府機能を担っています。"], en: ["legislative capital", "Sri Jayawardenepura Kotte is the legislative capital; Colombo also hosts major government functions."] },
  CH: { ko: ["연방 정부 소재지", "베른은 스위스의 연방시이자 연방 정부 소재지입니다."], ja: ["連邦政府所在地", "ベルンはスイスの連邦都市であり、連邦政府の所在地です。"], en: ["seat of the federal government", "Bern is Switzerland's federal city and the seat of the federal government."] }
};

if (typeof module !== "undefined" && module.exports) module.exports = CAPITAL_CONTEXT;
