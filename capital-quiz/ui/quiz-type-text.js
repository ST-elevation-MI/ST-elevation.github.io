"use strict";

// Labels and explanations for the current interface; the engine only uses type IDs.
const QUIZ_TYPE_TEXT = Object.freeze({
  "country-to-capital": Object.freeze({
    name: { ko: "국가 → 수도", ja: "国 → 首都", en: "Country → Capital" },
    description: { ko: "나라 이름을 보고 수도 맞히기", ja: "国名から首都を当てる", en: "Choose the capital for each country" },
    instructions: { ko: "선택한 문제 수만큼 국가가 무작위로 출제됩니다. 나라 이름을 보고 올바른 수도를 고르세요.", ja: "選んだ問題数だけ国がランダムに出題されます。国名を見て正しい首都を選んでください。", en: "Countries are selected at random for your chosen game length. Read each country and choose its capital." },
    round: { ko: "세계의 수도", ja: "世界の首都", en: "CAPITALS OF THE WORLD" },
    question: { ko: "이 나라의 수도는?", ja: "この国の首都は？", en: "What is this country's capital?" },
    answersLabel: { ko: "수도 선택지", ja: "首都の選択肢", en: "Capital choices" }
  }),
  "capital-to-country": Object.freeze({
    name: { ko: "수도 → 국가", ja: "首都 → 国", en: "Capital → Country" },
    description: { ko: "수도를 보고 나라 맞히기", ja: "首都から国を当てる", en: "Choose the country for each capital" },
    instructions: { ko: "선택한 문제 수만큼 수도가 무작위로 출제됩니다. 수도 이름을 보고 올바른 국가를 고르세요.", ja: "選んだ問題数だけ首都がランダムに出題されます。首都名を見て正しい国を選んでください。", en: "Capitals are selected at random for your chosen game length. Read each capital and choose its country." },
    round: { ko: "수도로 찾는 나라", ja: "首都から国を探す", en: "COUNTRIES BY CAPITAL" },
    question: { ko: "이 수도가 있는 나라는?", ja: "この首都がある国は？", en: "Which country has this capital?" },
    answersLabel: { ko: "국가 선택지", ja: "国の選択肢", en: "Country choices" }
  }),
  "flag-to-country": Object.freeze({
    name: { ko: "국기 → 국가", ja: "国旗 → 国", en: "Flag → Country" },
    description: { ko: "국기를 보고 나라 맞히기", ja: "国旗から国を当てる", en: "Choose the country for each flag" },
    instructions: { ko: "선택한 문제 수만큼 국기가 무작위로 출제됩니다. 국기를 보고 올바른 국가를 고르세요.", ja: "選んだ問題数だけ国旗がランダムに出題されます。国旗を見て正しい国を選んでください。", en: "Flags are selected at random for your chosen game length. Look at each flag and choose its country." },
    round: { ko: "세계의 국기", ja: "世界の国旗", en: "FLAGS OF THE WORLD" },
    question: { ko: "이 국기의 나라는?", ja: "この国旗はどの国？", en: "Which country does this flag represent?" },
    subjectAria: { ko: "국기 문제", ja: "国旗の問題", en: "Flag question" },
    answersLabel: { ko: "국가 선택지", ja: "国の選択肢", en: "Country choices" }
  })
});

if (typeof module !== "undefined" && module.exports) module.exports = QUIZ_TYPE_TEXT;
