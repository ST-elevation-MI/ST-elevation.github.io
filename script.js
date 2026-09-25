"use strict";

const QUESTION_COUNTS = [10, 25, 50];
let selectedCount = 10;
let total = 10;
let screen = "home";
const $ = (id) => document.getElementById(id);
let questions = [];
let current = 0;
let score = 0;
let answered = false;
let advanceTimer = null;
const AUTO_ADVANCE_DELAY = 900;

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
  const seenKo = new Set([capitalKey(country.capitalKo)]);
  const seenEn = new Set([capitalKey(country.capitalEn)]);
  const candidates = [];
  for (const other of countries) {
    const ko = capitalKey(other.capitalKo);
    const en = capitalKey(other.capitalEn);
    if (other.id === country.id || seenKo.has(ko) || seenEn.has(en)) continue;
    seenKo.add(ko);
    seenEn.add(en);
    candidates.push(other.capitalKo);
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
  return shuffle([country.capitalKo, ...distractors], random);
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
  $("setup-summary").textContent = `${count}개의 나라, ${count}개의 질문이 기다리고 있어요.`;
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
  $("journey-label").textContent = `지구 한 바퀴, ${total}개의 질문`;
  current = 0;
  score = 0;
  $("result-screen").hidden = true;
  $("question-screen").hidden = false;
  renderQuestion(focus);
}
function renderQuestion(focus = true) {
  answered = false;
  const country = questions[current];
  const capital = country.capitalKo;
  $("question-count").textContent = `문제 ${current + 1} / ${total}`;
  $("country").textContent = country.countryKo;
  $("question-title").textContent = country.capitalQualifierKo ? `이 나라의 ${country.capitalQualifierKo}는?` : "이 나라의 수도는?";
  $("capital-note").hidden = true;
  $("capital-note").textContent = "";
  $("feedback").textContent = "준비되셨나요? 세계 여행을 시작해요!";
  $("feedback").className = "";
  $("next").hidden = true;
  $("next").textContent = current === total - 1 ? "결과 보기 →" : "다음 문제 →";
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
  for (const button of $("answers").children) {
    button.disabled = true;
    if (button.dataset.capital === capital) {
      button.classList.add("correct");
      button.querySelector(".mark").textContent = "✓";
      button.setAttribute("aria-label", `${button.dataset.capital}, 정답`);
    } else if (button === selected) {
      button.classList.add("wrong");
      button.querySelector(".mark").textContent = "✕";
      button.setAttribute("aria-label", `${button.dataset.capital}, 오답`);
    } else button.classList.add("muted");
  }
  $("feedback").textContent = correct ? "정답입니다! 멋지게 맞혔어요." : `오답입니다. 정답은 ${capital}입니다.`;
  $("feedback").className = correct ? "success" : "error";
  const note = questions[current].capitalNoteKo;
  $("capital-note").textContent = note || "";
  $("capital-note").hidden = !note;
  $("next").hidden = correct;
  updateProgress(current + 1);
  if (correct) {
    $("feedback").textContent = current === total - 1
      ? "정답입니다! 잠시 후 결과를 확인하세요."
      : "정답입니다! 잠시 후 다음 문제로 넘어갑니다.";
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
  $("question-count").textContent = `${total}문제 완료`;
  $("result-total").textContent = `/ ${total}`;
  $("result-score").textContent = score;
  $("percentage").textContent = `${Math.round(score / total * 100)}%`;
  $("result-message").textContent = score === total ? "완벽합니다!" : score / total >= 0.8 ? "훌륭합니다!" : score / total >= 0.5 ? "잘했습니다!" : "조금 더 연습해봅시다!";
  $("result-message").focus();
}
function advanceQuestion() {
  if (screen !== "game" || !answered || current >= total) return;
  cancelAutoAdvance();
  current++;
  if (current === total) showResults();
  else renderQuestion();
}
$("next").addEventListener("click", () => {
  if (!$("next").hidden) advanceQuestion();
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
for (const id of ["brand-home", "nav-home"]) {
  $(id).addEventListener("click", (event) => {
    event.preventDefault();
    showHome();
  });
}
$("play").addEventListener("click", () => startQuiz());
showHome(false);
