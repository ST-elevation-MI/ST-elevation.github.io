"use strict";

const QUIZ_TYPE_IDS = Object.freeze(["country-to-capital", "capital-to-country", "flag-to-country"]);

const CONTINENT_NAMES = Object.freeze({
  Africa: { ko: "아프리카", ja: "アフリカ", en: "Africa" },
  Asia: { ko: "아시아", ja: "アジア", en: "Asia" },
  Europe: { ko: "유럽", ja: "ヨーロッパ", en: "Europe" },
  "North America": { ko: "북아메리카", ja: "北アメリカ", en: "North America" },
  "South America": { ko: "남아메리카", ja: "南アメリカ", en: "South America" },
  Oceania: { ko: "오세아니아", ja: "オセアニア", en: "Oceania" }
});

const CONTINENT_IDS = Object.freeze(["Africa", "Asia", "Europe", "North America", "South America", "Oceania"]);
const CONTINENT_SLUGS = Object.freeze({
  Africa: "africa",
  Asia: "asia",
  Europe: "europe",
  "North America": "north-america",
  "South America": "south-america",
  Oceania: "oceania"
});

function localizedCountry(country, language) {
  return language === "ko" ? country.countryKo : language === "ja" ? country.countryJa : country.countryEn;
}

function localizedCapital(country, language) {
  return language === "ko" ? country.capitalKo : language === "ja" ? country.capitalJa : country.capitalEn;
}

function flagEmoji(country) {
  return [...country.id].map((letter) => String.fromCodePoint(127397 + letter.charCodeAt(0))).join("");
}

function countryCandidates(pool, language) {
  return pool.map((country) => ({ key: country.id, label: localizedCountry(country, language) }));
}

function capitalCandidates(pool, language) {
  return pool.map((country) => ({ key: country.capitalEn.normalize("NFKC").toLocaleLowerCase("en"), label: localizedCapital(country, language) }));
}

const QUIZ_TYPES = Object.freeze({
  "country-to-capital": Object.freeze({
    id: "country-to-capital",
    name: { ko: "국가 → 수도", ja: "国 → 首都", en: "Country → Capital" },
    description: { ko: "나라 이름을 보고 수도 맞히기", ja: "国名から首都を当てる", en: "Choose the capital for each country" },
    instructions: { ko: "선택한 문제 수만큼 국가가 무작위로 출제됩니다. 나라 이름을 보고 올바른 수도를 고르세요.", ja: "選んだ問題数だけ国がランダムに出題されます。国名を見て正しい首都を選んでください。", en: "Countries are selected at random for your chosen game length. Read each country and choose its capital." },
    round: { ko: "세계의 수도", ja: "世界の首都", en: "CAPITALS OF THE WORLD" },
    question: { ko: "이 나라의 수도는?", ja: "この国の首都は？", en: "What is this country's capital?" },
    answersLabel: { ko: "수도 선택지", ja: "首都の選択肢", en: "Capital choices" },
    subject: localizedCountry,
    subjectAria: localizedCountry,
    subjectClass: "country-subject",
    answer: localizedCapital,
    answerKey: (country) => country.capitalEn.normalize("NFKC").toLocaleLowerCase("en"),
    answerCandidates: capitalCandidates,
    showCapitalContext: true
  }),
  "capital-to-country": Object.freeze({
    id: "capital-to-country",
    name: { ko: "수도 → 국가", ja: "首都 → 国", en: "Capital → Country" },
    description: { ko: "수도를 보고 나라 맞히기", ja: "首都から国を当てる", en: "Choose the country for each capital" },
    instructions: { ko: "선택한 문제 수만큼 수도가 무작위로 출제됩니다. 수도 이름을 보고 올바른 국가를 고르세요.", ja: "選んだ問題数だけ首都がランダムに出題されます。首都名を見て正しい国を選んでください。", en: "Capitals are selected at random for your chosen game length. Read each capital and choose its country." },
    round: { ko: "수도로 찾는 나라", ja: "首都から国を探す", en: "COUNTRIES BY CAPITAL" },
    question: { ko: "이 수도가 있는 나라는?", ja: "この首都がある国は？", en: "Which country has this capital?" },
    answersLabel: { ko: "국가 선택지", ja: "国の選択肢", en: "Country choices" },
    subject: localizedCapital,
    subjectAria: localizedCapital,
    subjectClass: "capital-subject",
    answer: localizedCountry,
    answerKey: (country) => country.id,
    answerCandidates: countryCandidates,
    showCapitalContext: false
  }),
  "flag-to-country": Object.freeze({
    id: "flag-to-country",
    name: { ko: "국기 → 국가", ja: "国旗 → 国", en: "Flag → Country" },
    description: { ko: "국기를 보고 나라 맞히기", ja: "国旗から国を当てる", en: "Choose the country for each flag" },
    instructions: { ko: "선택한 문제 수만큼 국기가 무작위로 출제됩니다. 국기를 보고 올바른 국가를 고르세요.", ja: "選んだ問題数だけ国旗がランダムに出題されます。国旗を見て正しい国を選んでください。", en: "Flags are selected at random for your chosen game length. Look at each flag and choose its country." },
    round: { ko: "세계의 국기", ja: "世界の国旗", en: "FLAGS OF THE WORLD" },
    question: { ko: "이 국기의 나라는?", ja: "この国旗はどの国？", en: "Which country does this flag represent?" },
    answersLabel: { ko: "국가 선택지", ja: "国の選択肢", en: "Country choices" },
    subject: flagEmoji,
    subjectAria: (_country, language) => ({ ko: "국기 문제", ja: "国旗の問題", en: "Flag question" })[language],
    subjectClass: "flag-subject",
    answer: localizedCountry,
    answerKey: (country) => country.id,
    answerCandidates: countryCandidates,
    showCapitalContext: false
  })
});

if (typeof module !== "undefined" && module.exports) {
  module.exports = { QUIZ_TYPE_IDS, QUIZ_TYPES, CONTINENT_IDS, CONTINENT_NAMES, CONTINENT_SLUGS };
}
