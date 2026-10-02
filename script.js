"use strict";

const QUESTION_COUNTS = [10, 25, 50];
const SUPPORTED_LANGUAGES = ["ko", "ja", "en"];
const TEXT = {
  ko: {
    title: "WORLD CAPITAL QUIZ · 세계 수도 퀴즈", brandHome: "WORLD CAPITAL QUIZ 홈", mainMenu: "메인 메뉴", home: "홈", restart: "다시 시작", score: "점수", menu: "메뉴",
    introAria: "퀴즈 소개", introEyebrow: "작은 도전, 넓어지는 세계", introTitle: "수도를 맞히며, 세계 한 바퀴!", introCopy: "나라 이름을 보고 알맞은 수도를 골라보세요.",
    instructionsTitle: "게임 안내", instructionsCopy: "선택한 문제 수만큼 무작위로 뽑은 나라의 수도를 맞혀보세요. 정답마다 1점을 얻습니다. 선택 후에는 답을 바꿀 수 없어요. 정답이면 자동으로 다음 문제로 넘어가며, 오답이면 해설을 확인한 뒤 다음 문제 버튼을 눌러주세요.", instructionsAccessibility: "키보드의 Tab과 Enter로도 모든 버튼을 사용할 수 있습니다.",
    homeMode: "나만의 세계 여행", setupRound: "게임 설정", homeTitle: "어디까지 도전해볼까요?", homeDescription: "UN 회원국 193개국 중 새로운 나라들을 만나보세요.", language: "언어", questionCountLegend: "출제 문제 수", questionUnit: "문제", count10Tip: "가볍게 시작", count25Tip: "조금 더 멀리", count50Tip: "세계 탐험 도전", homeTip: "시간 제한 없이, 나만의 속도로 즐겨보세요.",
    gameAria: "세계 수도 퀴즈", gameMode: "세계 수도 도전", progressLabel: "완료한 문제", questionRound: "세계의 수도", questionHint: "아래에서 정답 하나를 선택하세요", answersLabel: "수도 선택지",
    resultRound: "퀴즈 완료!", resultCopy: "세상을 알아가는 여행, 한 번 더 떠나볼까요?", mistakeReview: "오답 복습", perfectReview: "모든 문제를 맞혔어요. 복습할 오답이 없습니다!", gameBottomCopy: "배우는 즐거움, 발견하는 재미 ✦", countryCountCopy: "UN 회원국 193개국을 만나는 여행", freshQuestions: "매번 새로운 문제", noTimeLimit: "시간 제한 없이 천천히", footer: "세계를 탐험하세요. 한 번에 하나의 수도씩.",
    setupSummary: (count) => `${count}개의 나라, ${count}개의 질문이 기다리고 있어요.`, journey: (count) => `지구 한 바퀴, ${count}개의 질문`, questionCount: (index, total) => `문제 ${index} / ${total}`, questionTitle: (qualifier) => qualifier ? `이 나라의 ${qualifier}는?` : "이 나라의 수도는?", ready: "준비되셨나요? 세계 여행을 시작해요!", next: "다음 문제 →", results: "결과 보기 →", correct: "정답입니다! 멋지게 맞혔어요.", wrong: (answer) => `오답입니다. 정답은 ${answer}입니다.`, correctAdvance: "정답입니다! 잠시 후 다음 문제로 넘어갑니다.", correctResult: "정답입니다! 잠시 후 결과를 확인하세요.", completed: (total) => `${total}문제 완료`, perfect: "완벽합니다!", great: "훌륭합니다!", good: "잘했습니다!", practice: "조금 더 연습해봅시다!", reviewAria: (country) => `${country} 오답 문제 다시 보기`, myAnswer: (answer) => `내 답: ${answer}`, correctAnswer: (answer) => `정답: ${answer}`, reviewCount: (index, total) => `오답 복습 ${index} / ${total}`, reviewFeedback: (selected, correct) => `내 답은 ${selected}, 정답은 ${correct}입니다.`, backResults: "결과로 돌아가기 →", correctAria: (answer) => `${answer}, 정답`, wrongAria: (answer) => `${answer}, 오답`, selectedWrongAria: (answer) => `${answer}, 내가 선택한 오답`
  },
  ja: {
    title: "WORLD CAPITAL QUIZ · 世界の首都クイズ", brandHome: "WORLD CAPITAL QUIZ ホーム", mainMenu: "メインメニュー", home: "ホーム", restart: "もう一度", score: "スコア", menu: "メニュー",
    introAria: "クイズ紹介", introEyebrow: "小さな挑戦、広がる世界", introTitle: "首都を当てて、世界を一周！", introCopy: "国名を見て、正しい首都を選びましょう。",
    instructionsTitle: "遊び方", instructionsCopy: "選んだ問題数だけ国がランダムに出題されます。正解すると1点です。一度選んだ答えは変更できません。正解時は自動で次へ進み、不正解時は解説を確認してから次の問題へ進みます。", instructionsAccessibility: "TabキーとEnterキーでも、すべてのボタンを操作できます。",
    homeMode: "自分だけの世界旅行", setupRound: "ゲーム設定", homeTitle: "どこまで挑戦しますか？", homeDescription: "国連加盟国193か国から、新しい国々に出会いましょう。", language: "言語", questionCountLegend: "問題数", questionUnit: "問", count10Tip: "気軽にスタート", count25Tip: "もう少し遠くへ", count50Tip: "世界探検に挑戦", homeTip: "制限時間はありません。自分のペースで楽しみましょう。",
    gameAria: "世界の首都クイズ", gameMode: "世界の首都チャレンジ", progressLabel: "完了した問題", questionRound: "世界の首都", questionHint: "正しい答えを1つ選んでください", answersLabel: "首都の選択肢",
    resultRound: "クイズ完了！", resultCopy: "世界を知る旅に、もう一度出かけませんか？", mistakeReview: "間違いを復習", perfectReview: "全問正解です。復習する間違いはありません！", gameBottomCopy: "学ぶ喜び、発見する楽しさ ✦", countryCountCopy: "国連加盟国193か国を巡る旅", freshQuestions: "毎回新しい問題", noTimeLimit: "時間制限なし", footer: "世界を探検しよう。一度に一つの首都から。",
    setupSummary: (count) => `${count}か国、${count}問が待っています。`, journey: (count) => `世界一周、${count}問`, questionCount: (index, total) => `第${index}問 / ${total}`, questionTitle: (qualifier) => qualifier ? `この国の${qualifier}は？` : "この国の首都は？", ready: "準備はできましたか？ 世界旅行を始めましょう！", next: "次の問題 →", results: "結果を見る →", correct: "正解です！ お見事です。", wrong: (answer) => `不正解です。正解は${answer}です。`, correctAdvance: "正解です！ まもなく次の問題へ進みます。", correctResult: "正解です！ まもなく結果を表示します。", completed: (total) => `${total}問完了`, perfect: "パーフェクト！", great: "素晴らしい！", good: "よくできました！", practice: "もう少し練習してみましょう！", reviewAria: (country) => `${country}の間違えた問題を確認`, myAnswer: (answer) => `あなたの答え：${answer}`, correctAnswer: (answer) => `正解：${answer}`, reviewCount: (index, total) => `間違いの復習 ${index} / ${total}`, reviewFeedback: (selected, correct) => `あなたの答えは${selected}、正解は${correct}です。`, backResults: "結果に戻る →", correctAria: (answer) => `${answer}、正解`, wrongAria: (answer) => `${answer}、不正解`, selectedWrongAria: (answer) => `${answer}、選んだ不正解`
  },
  en: {
    title: "WORLD CAPITAL QUIZ", brandHome: "WORLD CAPITAL QUIZ home", mainMenu: "Main menu", home: "Home", restart: "Restart", score: "Score", menu: "Menu",
    introAria: "Quiz introduction", introEyebrow: "A small challenge, a wider world", introTitle: "Guess the capitals and travel the world!", introCopy: "Read the country name and choose its capital.",
    instructionsTitle: "How to play", instructionsCopy: "Countries are chosen at random for the number of questions you select. Each correct answer earns one point, and answers cannot be changed after selection. Correct answers advance automatically; after a wrong answer, review the explanation and continue with the Next button.", instructionsAccessibility: "All buttons can also be used with Tab and Enter.",
    homeMode: "Your world journey", setupRound: "GAME SETUP", homeTitle: "How far will you go?", homeDescription: "Meet new countries among all 193 UN member states.", language: "Language", questionCountLegend: "Number of questions", questionUnit: "questions", count10Tip: "Quick start", count25Tip: "Travel farther", count50Tip: "World explorer", homeTip: "No time limit—enjoy the quiz at your own pace.",
    gameAria: "World capital quiz", gameMode: "World capital challenge", progressLabel: "Questions completed", questionRound: "CAPITALS OF THE WORLD", questionHint: "Choose one correct answer below", answersLabel: "Capital choices",
    resultRound: "QUIZ COMPLETE!", resultCopy: "Ready to take another journey around the world?", mistakeReview: "Review mistakes", perfectReview: "You got every question right. There are no mistakes to review!", gameBottomCopy: "The joy of learning and discovery ✦", countryCountCopy: "A journey through 193 UN member states", freshQuestions: "New questions every game", noTimeLimit: "No time limit", footer: "EXPLORE THE WORLD. ONE CAPITAL AT A TIME.",
    setupSummary: (count) => `${count} countries and ${count} questions are waiting.`, journey: (count) => `Around the world in ${count} questions`, questionCount: (index, total) => `Question ${index} / ${total}`, questionTitle: (qualifier) => qualifier ? `What is this country's ${qualifier}?` : "What is this country's capital?", ready: "Ready? Let's begin our journey around the world!", next: "Next question →", results: "View results →", correct: "Correct! Great job.", wrong: (answer) => `Not quite. The correct answer is ${answer}.`, correctAdvance: "Correct! Moving to the next question shortly.", correctResult: "Correct! Your results will appear shortly.", completed: (total) => `${total} questions completed`, perfect: "Perfect!", great: "Excellent!", good: "Well done!", practice: "Keep practicing!", reviewAria: (country) => `Review the missed question for ${country}`, myAnswer: (answer) => `Your answer: ${answer}`, correctAnswer: (answer) => `Correct answer: ${answer}`, reviewCount: (index, total) => `Mistake review ${index} / ${total}`, reviewFeedback: (selected, correct) => `Your answer was ${selected}; the correct answer is ${correct}.`, backResults: "Back to results →", correctAria: (answer) => `${answer}, correct`, wrongAria: (answer) => `${answer}, incorrect`, selectedWrongAria: (answer) => `${answer}, your incorrect choice`
  }
};

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

let selectedCount = 10;
let total = 10;
let screen = "home";
let language = "ko";
const $ = (id) => document.getElementById(id);
let questions = [];
let current = 0;
let score = 0;
let mistakes = [];
let answered = false;
let advanceTimer = null;
const AUTO_ADVANCE_DELAY = 900;

function tr(key, ...args) {
  const value = TEXT[language][key];
  return typeof value === "function" ? value(...args) : value;
}

function countryName(country) {
  return language === "ko" ? country.countryKo : language === "ja" ? country.countryJa : country.countryEn;
}

function capitalName(country) {
  return language === "ko" ? country.capitalKo : language === "ja" ? country.capitalJa : country.capitalEn;
}

function capitalContext(country, index) {
  return CAPITAL_CONTEXT[country.id]?.[language]?.[index] || "";
}

function applyLanguage() {
  document.documentElement.lang = language;
  document.title = tr("title");
  const staticText = {
    "nav-home": "home", "header-restart-label": "restart", "header-score-label": "score", "menu-label": "menu",
    "intro-eyebrow": "introEyebrow", "intro-title": "introTitle", "intro-copy": "introCopy",
    "instructions-title": "instructionsTitle", "instructions-copy": "instructionsCopy", "instructions-accessibility": "instructionsAccessibility",
    "home-mode-label": "homeMode", "setup-round-label": "setupRound", "home-title": "homeTitle", "home-description": "homeDescription", "language-label": "language", "question-count-legend": "questionCountLegend",
    "count-unit-10": "questionUnit", "count-unit-25": "questionUnit", "count-unit-50": "questionUnit", "count-tip-10": "count10Tip", "count-tip-25": "count25Tip", "count-tip-50": "count50Tip", "home-tip": "homeTip",
    "game-mode-label": "gameMode", "score-label": "score", "question-round-label": "questionRound", "question-hint": "questionHint",
    "result-round-label": "resultRound", "result-copy": "resultCopy", "mistake-review-title": "mistakeReview", "perfect-review": "perfectReview", "result-restart-label": "restart",
    "game-bottom-copy": "gameBottomCopy", "country-count-copy": "countryCountCopy", "fresh-questions-copy": "freshQuestions", "no-time-limit-copy": "noTimeLimit", "page-footer": "footer"
  };
  for (const [id, key] of Object.entries(staticText)) $(id).textContent = tr(key);
  $("language-select").value = language;
  $("brand-home").setAttribute("aria-label", tr("brandHome"));
  $("main-nav").setAttribute("aria-label", tr("mainMenu"));
  $("intro").setAttribute("aria-label", tr("introAria"));
  $("game-screen").setAttribute("aria-label", tr("gameAria"));
  $("progress").setAttribute("aria-label", tr("progressLabel"));
  $("answers").setAttribute("aria-label", tr("answersLabel"));
  $("setup-summary").textContent = tr("setupSummary", selectedCount);
}

function setLanguage(nextLanguage) {
  if (!SUPPORTED_LANGUAGES.includes(nextLanguage) || screen !== "home") return;
  language = nextLanguage;
  applyLanguage();
}

function shuffle(items, random = Math.random) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Every game starts from all 193 countries and creates a fresh Fisher-Yates
// permutation. Taking the first N entries therefore gives every country the
// same N / 193 chance of appearing, independently of previous games.
function createQuestionDeck(random = Math.random) {
  return shuffle(countries, random);
}

function createGame(count = total) {
  if (!QUESTION_COUNTS.includes(count)) throw new Error("지원하지 않는 문제 수입니다.");
  const game = createQuestionDeck().slice(0, count);
  if (new Set(game.map((country) => country.id)).size !== count) {
    throw new Error("게임 내 국가가 중복되었습니다.");
  }
  return game;
}
function capitalKey(name) {
  return name.normalize("NFKC").trim().toLocaleLowerCase("en");
}

function createDistractorPool(country) {
  const seenDisplay = new Set([capitalKey(capitalName(country))]);
  const seenEn = new Set([capitalKey(country.capitalEn)]);
  const candidates = [];
  for (const other of countries) {
    const display = capitalKey(capitalName(other));
    const en = capitalKey(other.capitalEn);
    if (other.id === country.id || seenDisplay.has(display) || seenEn.has(en)) continue;
    seenDisplay.add(display);
    seenEn.add(en);
    candidates.push(capitalName(other));
  }
  return candidates;
}

function createOptions(country, random = Math.random) {
  // Deduplicate first, then shuffle the unique pool. Each eligible capital now
  // has the same 3 / pool-size chance of appearing as a distractor.
  const distractors = shuffle(createDistractorPool(country), random).slice(0, 3);
  if (distractors.length !== 3) throw new Error("서로 다른 수도 선택지 4개를 만들 수 없습니다.");
  // A separate Fisher-Yates pass gives the correct answer and distractors an
  // equal 1 / 4 chance of occupying each answer position.
  return shuffle([capitalName(country), ...distractors], random);
}

function updateProgress(completed) {
  $("score").textContent = score;
  $("header-score").textContent = score;
  $("progress").setAttribute("aria-valuenow", completed);
  $("progress-fill").style.width = `${completed / total * 100}%`;
}
function setQuestionCount(count) {
  if (!QUESTION_COUNTS.includes(count)) return;
  selectedCount = count;
  for (const option of QUESTION_COUNTS) {
    $(`count-${option}`).setAttribute("aria-pressed", String(option === count));
  }
  $("setup-summary").textContent = tr("setupSummary", count);
}
function cancelAutoAdvance() {
  clearTimeout(advanceTimer);
  advanceTimer = null;
}
function showHome(focus = true) {
  cancelAutoAdvance();
  screen = "home";
  questions = [];
  current = 0;
  score = 0;
  mistakes = [];
  answered = false;
  $("home-screen").hidden = false;
  $("game-screen").hidden = true;
  $("header-restart").hidden = true;
  $("instructions").hidden = true;
  $("menu-toggle").setAttribute("aria-expanded", "false");
  updateProgress(0);
  if (focus) $("home-title").focus();
}
function startQuiz(focus = true) {
  cancelAutoAdvance();
  total = selectedCount;
  screen = "game";
  questions = createGame();
  $("home-screen").hidden = true;
  $("game-screen").hidden = false;
  $("header-restart").hidden = false;
  $("progress").setAttribute("aria-valuemax", total);
  $("journey-label").textContent = tr("journey", total);
  current = 0;
  score = 0;
  mistakes = [];
  $("result-screen").hidden = true;
  $("question-screen").hidden = false;
  renderQuestion(focus);
}
function renderQuestion(focus = true) {
  answered = false;
  const country = questions[current];
  const capital = capitalName(country);
  const qualifier = capitalContext(country, 0);
  $("question-count").textContent = tr("questionCount", current + 1, total);
  $("country").textContent = countryName(country);
  $("question-title").textContent = tr("questionTitle", qualifier);
  $("capital-note").hidden = true;
  $("capital-note").textContent = "";
  $("feedback").textContent = tr("ready");
  $("feedback").className = "";
  $("next").hidden = true;
  $("next").textContent = current === total - 1 ? tr("results") : tr("next");
  $("answers").replaceChildren();
  createOptions(country).forEach((name, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer";
    button.dataset.capital = name;
    button.setAttribute("aria-label", name);
    const number = document.createElement("span");
    number.className = "number";
    number.textContent = index + 1;
    number.setAttribute("aria-hidden", "true");
    const label = document.createElement("span");
    label.className = "answer-name";
    label.textContent = name;
    const mark = document.createElement("span");
    mark.className = "mark";
    mark.setAttribute("aria-hidden", "true");
    button.append(number, label, mark);
    button.addEventListener("click", () => selectAnswer(button, capital));
    $("answers").append(button);
  });
  updateProgress(current);
  if (focus) $("country").focus();
}
function selectAnswer(selected, capital) {
  if (screen !== "game" || answered) return;
  answered = true;
  const correct = selected.dataset.capital === capital;
  if (correct) score++;
  else mistakes.push({
    questionIndex: current,
    countryKo: countryName(questions[current]),
    questionTitle: $("question-title").textContent,
    options: [...$("answers").children].map((button) => button.dataset.capital),
    selectedCapitalKo: selected.dataset.capital,
    correctCapitalKo: capital
  });
  for (const button of $("answers").children) {
    button.disabled = true;
    if (button.dataset.capital === capital) {
      button.classList.add("correct");
      button.querySelector(".mark").textContent = "✓";
      button.setAttribute("aria-label", tr("correctAria", button.dataset.capital));
    } else if (button === selected) {
      button.classList.add("wrong");
      button.querySelector(".mark").textContent = "✕";
      button.setAttribute("aria-label", tr("wrongAria", button.dataset.capital));
    } else button.classList.add("muted");
  }
  $("feedback").textContent = correct ? tr("correct") : tr("wrong", capital);
  $("feedback").className = correct ? "success" : "error";
  const note = capitalContext(questions[current], 1);
  $("capital-note").textContent = note || "";
  $("capital-note").hidden = !note;
  $("next").hidden = correct;
  updateProgress(current + 1);
  if (correct) {
    $("feedback").textContent = current === total - 1
      ? tr("correctResult")
      : tr("correctAdvance");
    advanceTimer = setTimeout(() => {
      advanceTimer = null;
      advanceQuestion();
    }, AUTO_ADVANCE_DELAY);
  }
}
function showResults() {
  screen = "result";
  $("question-screen").hidden = true;
  $("result-screen").hidden = false;
  $("question-count").textContent = tr("completed", total);
  $("result-total").textContent = `/ ${total}`;
  $("result-score").textContent = score;
  $("percentage").textContent = `${Math.round(score / total * 100)}%`;
  $("result-message").textContent = score === total ? tr("perfect") : score / total >= 0.8 ? tr("great") : score / total >= 0.5 ? tr("good") : tr("practice");
  $("mistake-list").replaceChildren();
  $("perfect-review").hidden = mistakes.length !== 0;
  for (const mistake of mistakes) {
    const item = document.createElement("li");
    item.className = "mistake-item";
    const reviewButton = document.createElement("button");
    reviewButton.type = "button";
    reviewButton.className = "mistake-button";
    reviewButton.setAttribute("aria-label", tr("reviewAria", mistake.countryKo));
    const country = document.createElement("strong");
    country.textContent = mistake.countryKo;
    const selectedAnswer = document.createElement("span");
    selectedAnswer.className = "mistake-selected";
    selectedAnswer.textContent = tr("myAnswer", mistake.selectedCapitalKo);
    const correctAnswer = document.createElement("span");
    correctAnswer.className = "mistake-correct";
    correctAnswer.textContent = tr("correctAnswer", mistake.correctCapitalKo);
    reviewButton.append(country, selectedAnswer, correctAnswer);
    reviewButton.addEventListener("click", () => showMistakeReview(mistake));
    item.append(reviewButton);
    $("mistake-list").append(item);
  }
  $("result-message").focus();
}
function showMistakeReview(mistake) {
  cancelAutoAdvance();
  screen = "review";
  $("result-screen").hidden = true;
  $("question-screen").hidden = false;
  $("question-count").textContent = tr("reviewCount", mistakes.indexOf(mistake) + 1, mistakes.length);
  $("country").textContent = mistake.countryKo;
  $("question-title").textContent = mistake.questionTitle;
  const note = capitalContext(questions[mistake.questionIndex], 1);
  $("capital-note").textContent = note || "";
  $("capital-note").hidden = !note;
  $("feedback").textContent = tr("reviewFeedback", mistake.selectedCapitalKo, mistake.correctCapitalKo);
  $("feedback").className = "error";
  $("next").hidden = false;
  $("next").textContent = tr("backResults");
  $("answers").replaceChildren();
  mistake.options.forEach((name, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer";
    button.dataset.capital = name;
    button.disabled = true;
    const number = document.createElement("span");
    number.className = "number";
    number.textContent = index + 1;
    number.setAttribute("aria-hidden", "true");
    const label = document.createElement("span");
    label.className = "answer-name";
    label.textContent = name;
    const mark = document.createElement("span");
    mark.className = "mark";
    mark.setAttribute("aria-hidden", "true");
    if (name === mistake.correctCapitalKo) {
      button.classList.add("correct");
      mark.textContent = "✓";
      button.setAttribute("aria-label", tr("correctAria", name));
    } else if (name === mistake.selectedCapitalKo) {
      button.classList.add("wrong");
      mark.textContent = "✕";
      button.setAttribute("aria-label", tr("selectedWrongAria", name));
    } else {
      button.classList.add("muted");
      button.setAttribute("aria-label", name);
    }
    button.append(number, label, mark);
    $("answers").append(button);
  });
  $("country").focus();
}
function advanceQuestion() {
  if (screen !== "game" || !answered || current >= total) return;
  cancelAutoAdvance();
  current++;
  if (current === total) showResults();
  else renderQuestion();
}
$("next").addEventListener("click", () => {
  if ($("next").hidden) return;
  if (screen === "review") showResults();
  else advanceQuestion();
});
$("header-restart").addEventListener("click", () => startQuiz());
$("result-restart").addEventListener("click", () => startQuiz());
$("menu-toggle").addEventListener("click", () => {
  const open = $("instructions").hidden;
  $("instructions").hidden = !open;
  $("menu-toggle").setAttribute("aria-expanded", String(open));
});
for (const count of QUESTION_COUNTS) {
  $(`count-${count}`).addEventListener("click", () => setQuestionCount(count));
}
$("language-select").addEventListener("change", (event) => setLanguage(event.target.value));
for (const id of ["brand-home", "nav-home"]) {
  $(id).addEventListener("click", (event) => {
    event.preventDefault();
    showHome();
  });
}
$("play").addEventListener("click", () => startQuiz());
applyLanguage();
showHome(false);
