"use strict";

const QUIZ_TYPE_IDS = Object.freeze(["country-to-capital", "capital-to-country", "flag-to-country"]);
const QUIZ_LANGUAGES = Object.freeze(["ko", "ja", "en"]);
const QUIZ_QUESTION_COUNTS = Object.freeze([10, 25, 50]);

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
    subjectKind: "country",
    subject: localizedCountry,
    answer: localizedCapital,
    answerKey: (country) => country.capitalEn.normalize("NFKC").toLocaleLowerCase("en"),
    answerCandidates: capitalCandidates
  }),
  "capital-to-country": Object.freeze({
    id: "capital-to-country",
    subjectKind: "capital",
    subject: localizedCapital,
    answer: localizedCountry,
    answerKey: (country) => country.id,
    answerCandidates: countryCandidates
  }),
  "flag-to-country": Object.freeze({
    id: "flag-to-country",
    subjectKind: "flag",
    subject: flagEmoji,
    answer: localizedCountry,
    answerKey: (country) => country.id,
    answerCandidates: countryCandidates
  })
});

if (typeof module !== "undefined" && module.exports) {
  module.exports = { QUIZ_TYPE_IDS, QUIZ_TYPES, QUIZ_LANGUAGES, QUIZ_QUESTION_COUNTS, CONTINENT_IDS, CONTINENT_NAMES, CONTINENT_SLUGS };
}
