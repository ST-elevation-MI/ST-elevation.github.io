"use strict";

// The only runtime module that knows element IDs, markup and CSS classes.
class QuizView {
  #document;
  #messages;
  #typeText;
  #continentNames;
  #continentSlugs;
  #capitalContext;
  #counts;
  #pageKind;
  #language = null;
  #actions;
  #renderedQuestion = null;
  #renderedPhase = null;

  constructor({ document, messages, typeText, continentNames, continentSlugs, capitalContext, questionCounts }) {
    this.#document = document;
    this.#messages = messages;
    this.#typeText = typeText;
    this.#continentNames = continentNames;
    this.#continentSlugs = continentSlugs;
    this.#capitalContext = capitalContext;
    this.#counts = questionCounts;
    this.#pageKind = document.body?.dataset?.pageKind || "hub";
  }

  static pageSettings(document) {
    return {
      typeId: document.body?.dataset?.quizType,
      continent: document.body?.dataset?.continent,
      language: document.documentElement.lang
    };
  }

  #get(id) { return this.#document.getElementById(id); }
  #tr(key, ...args) {
    const value = this.#messages[this.#language][key];
    return typeof value === "function" ? value(...args) : value;
  }
  #setCurrent(element, current) {
    if (current) element.setAttribute("aria-current", "page");
    else element.removeAttribute("aria-current");
  }

  bind(actions) {
    this.#actions = actions;
    for (const id of ["play", "header-restart", "result-restart"]) this.#get(id).addEventListener("click", () => actions.start());
    for (const count of this.#counts) this.#get(`count-${count}`).addEventListener("click", () => actions.setCount(count));
    this.#get("next").addEventListener("click", () => {
      if (!this.#get("next").hidden) actions.next();
    });
    this.#get("language-select").addEventListener("change", event => actions.setLanguage(event.target.value));
    this.#get("menu-toggle").addEventListener("click", () => {
      const open = this.#get("instructions").hidden;
      this.#get("instructions").hidden = !open;
      this.#get("menu-toggle").setAttribute("aria-expanded", String(open));
    });
  }

  languageHref(language) { return this.#get(`language-link-${language}`).href; }

  #localize(state) {
    this.#language = state.config.language;
    this.#document.documentElement.lang = this.#language;
    const isQuizPage = this.#pageKind === "quiz";
    if (!isQuizPage) this.#document.title = this.#tr("title");
    const staticText = {
      "nav-home": "home", "header-restart-label": "restart", "header-score-label": "score", "menu-label": "menu",
      "intro-eyebrow": "introEyebrow", "instructions-title": "instructionsTitle", "instructions-copy": "instructionsCopy", "instructions-accessibility": "instructionsAccessibility",
      "home-mode-label": "homeMode", "setup-round-label": "setupRound", "language-label": "language", "quiz-type-legend": "quizTypeLegend", "scope-legend": "scopeLegend", "scope-all": "scopeAll", "question-count-legend": "questionCountLegend",
      "count-unit-10": "questionUnit", "count-unit-25": "questionUnit", "count-unit-50": "questionUnit", "count-tip-10": "count10Tip", "count-tip-25": "count25Tip", "count-tip-50": "count50Tip", "home-tip": "homeTip",
      "score-label": "score", "question-hint": "questionHint", "result-round-label": "resultRound", "result-copy": "resultCopy", "mistake-review-title": "mistakeReview", "perfect-review": "perfectReview", "result-restart-label": "restart",
      "game-bottom-copy": "gameBottomCopy", "country-count-copy": "countryCountCopy", "fresh-questions-copy": "freshQuestions", "no-time-limit-copy": "noTimeLimit", "page-footer": "footer"
    };
    if (!isQuizPage) Object.assign(staticText, { "intro-title": "introTitle", "intro-copy": "introCopy", "home-title": "homeTitle", "home-description": "homeDescription" });
    for (const [id, key] of Object.entries(staticText)) this.#get(id).textContent = this.#tr(key);
    const type = this.#typeText[state.config.typeId];
    if (isQuizPage) this.#get("instructions-copy").textContent = type.instructions[this.#language];
    for (const [typeId, text] of Object.entries(this.#typeText)) {
      this.#get(`type-name-${typeId}`).textContent = text.name[this.#language];
      this.#get(`type-tip-${typeId}`).textContent = text.description[this.#language];
      this.#setCurrent(this.#get(`type-${typeId}`), isQuizPage && typeId === state.config.typeId);
    }
    for (const [continent, names] of Object.entries(this.#continentNames)) {
      const link = this.#get(`scope-${this.#continentSlugs[continent]}`);
      link.textContent = names[this.#language];
      this.#setCurrent(link, isQuizPage && continent === state.config.continent);
    }
    this.#setCurrent(this.#get("scope-all"), isQuizPage && state.config.continent === null);
    this.#get("language-select").value = this.#language;
    this.#get("brand-home").setAttribute("aria-label", this.#tr("brandHome"));
    this.#get("main-nav").setAttribute("aria-label", this.#tr("mainMenu"));
    this.#get("intro").setAttribute("aria-label", this.#tr("introAria"));
    this.#get("game-screen").setAttribute("aria-label", type.name[this.#language]);
    this.#get("progress").setAttribute("aria-label", this.#tr("progressLabel"));
    this.#get("language-links").setAttribute("aria-label", this.#tr("language"));
    this.#get("scope-options").setAttribute("aria-label", this.#tr("scopeLegend"));
    for (const language of Object.keys(this.#messages)) this.#setCurrent(this.#get(`language-link-${language}`), language === this.#language);
  }

  render(state, { focus = true } = {}) {
    // State comes from the session; no score or answer is read back from the DOM.
    if (state.phase === "home" || this.#language !== state.config.language) this.#localize(state);
    this.#get("home-screen").hidden = state.phase !== "home";
    this.#get("game-screen").hidden = state.phase === "home";
    this.#get("header-restart").hidden = state.phase === "home";
    this.#get("question-screen").hidden = !["question", "review"].includes(state.phase);
    this.#get("result-screen").hidden = state.phase !== "result";
    this.#get("score").textContent = state.score;
    this.#get("header-score").textContent = state.score;
    this.#get("progress").setAttribute("aria-valuemax", state.total);
    this.#get("progress").setAttribute("aria-valuenow", state.completed);
    this.#get("progress-fill").style.width = `${state.completed / state.total * 100}%`;
    if (state.phase === "home") {
      this.#renderedQuestion = null;
      this.#get("instructions").hidden = true;
      this.#get("menu-toggle").setAttribute("aria-expanded", "false");
      for (const count of this.#counts) {
        this.#get(`count-${count}`).disabled = !state.availableCounts.includes(count);
        this.#get(`count-${count}`).setAttribute("aria-pressed", String(count === state.config.count));
      }
      this.#get("setup-summary").textContent = this.#tr("setupSummary", state.config.count);
      if (focus) this.#get("home-title").focus();
      return;
    }
    const type = this.#typeText[state.config.typeId];
    const scope = state.config.continent ? this.#continentNames[state.config.continent][this.#language] : null;
    this.#get("game-mode-label").textContent = scope ? `${scope} · ${type.name[this.#language]}` : type.name[this.#language];
    this.#get("question-round-label").textContent = type.round[this.#language];
    this.#get("answers").setAttribute("aria-label", type.answersLabel[this.#language]);
    this.#get("journey-label").textContent = this.#tr("journey", state.total);
    if (state.phase === "result") this.#renderResults(state, focus);
    else this.#renderQuestion(state, focus);
  }

  #renderQuestion(state, focus) {
    const { question, answer } = state;
    const isReview = state.phase === "review";
    const type = this.#typeText[state.config.typeId];
    const context = state.config.typeId === "country-to-capital" ? this.#capitalContext[question.countryId]?.[this.#language] : null;
    this.#get("question-count").textContent = isReview
      ? this.#tr("reviewCount", state.reviewIndex + 1, state.mistakes.length)
      : this.#tr("questionCount", question.index + 1, state.total);
    this.#get("country").textContent = question.subject;
    this.#get("country").className = `${question.subjectKind}-subject`;
    this.#get("country").setAttribute("aria-label", type.subjectAria?.[this.#language] || question.subject);
    this.#get("question-title").textContent = context?.[0] ? this.#tr("questionTitle", context[0]) : type.question[this.#language];
    const note = answer ? context?.[1] || "" : "";
    this.#get("capital-note").textContent = note;
    this.#get("capital-note").hidden = !note;
    this.#get("next").hidden = !isReview && (!answer || answer.isCorrect);
    this.#get("next").textContent = isReview ? this.#tr("backResults") : question.index === state.total - 1 ? this.#tr("results") : this.#tr("next");
    const feedback = this.#get("feedback");
    feedback.className = answer ? answer.isCorrect ? "success" : "error" : "";
    feedback.textContent = isReview ? this.#tr("reviewFeedback", answer.selectedAnswer, question.correctAnswer)
      : !answer ? this.#tr("ready")
      : answer.isCorrect ? this.#tr(question.index === state.total - 1 ? "correctResult" : "correctAdvance")
      : this.#tr("wrong", question.correctAnswer);
    this.#renderChoices(state);
    if (focus) this.#get("country").focus();
  }

  #renderChoices(state) {
    const { question, answer } = state;
    if (this.#renderedQuestion !== question || this.#renderedPhase !== state.phase) {
      this.#get("answers").replaceChildren();
      question.options.forEach((label, index) => {
        const button = this.#document.createElement("button");
        button.type = "button";
        button.dataset.optionIndex = String(index);
        const number = this.#document.createElement("span");
        number.className = "number";
        number.textContent = index + 1;
        number.setAttribute("aria-hidden", "true");
        const name = this.#document.createElement("span");
        name.className = "answer-name";
        name.textContent = label;
        const mark = this.#document.createElement("span");
        mark.className = "mark";
        mark.setAttribute("aria-hidden", "true");
        button.append(number, name, mark);
        button.addEventListener("click", () => this.#actions.answer(index));
        this.#get("answers").append(button);
      });
      this.#renderedQuestion = question;
      this.#renderedPhase = state.phase;
    }
    [...this.#get("answers").children].forEach((button, index) => {
      const correct = answer && index === question.correctIndex;
      const selectedWrong = answer && !answer.isCorrect && index === answer.selectedIndex;
      button.disabled = Boolean(answer);
      button.className = `answer${correct ? " correct" : selectedWrong ? " wrong" : answer ? " muted" : ""}`;
      button.querySelector(".answer-name").textContent = question.options[index];
      button.querySelector(".mark").textContent = correct ? "✓" : selectedWrong ? "✕" : "";
      button.setAttribute("aria-label", correct ? this.#tr("correctAria", question.options[index])
        : selectedWrong ? this.#tr(state.phase === "review" ? "selectedWrongAria" : "wrongAria", question.options[index])
        : question.options[index]);
    });
  }

  #renderResults(state, focus) {
    this.#renderedQuestion = null;
    this.#get("question-count").textContent = this.#tr("completed", state.total);
    this.#get("result-total").textContent = `/ ${state.total}`;
    this.#get("result-score").textContent = state.result.score;
    this.#get("percentage").textContent = `${state.result.percentage}%`;
    this.#get("result-message").textContent = state.score === state.total ? this.#tr("perfect")
      : state.score / state.total >= 0.8 ? this.#tr("great") : state.score / state.total >= 0.5 ? this.#tr("good") : this.#tr("practice");
    this.#get("perfect-review").hidden = state.mistakes.length !== 0;
    this.#get("mistake-list").replaceChildren();
    state.mistakes.forEach((mistake, index) => {
      const item = this.#document.createElement("li");
      item.className = "mistake-item";
      const button = this.#document.createElement("button");
      button.type = "button";
      button.className = "mistake-button";
      button.setAttribute("aria-label", this.#tr("reviewAria", mistake.question.subject));
      const subject = this.#document.createElement("strong");
      subject.textContent = mistake.question.subject;
      const selected = this.#document.createElement("span");
      selected.className = "mistake-selected";
      selected.textContent = this.#tr("myAnswer", mistake.selectedAnswer);
      const correct = this.#document.createElement("span");
      correct.className = "mistake-correct";
      correct.textContent = this.#tr("correctAnswer", mistake.correctAnswer);
      button.append(subject, selected, correct);
      button.addEventListener("click", () => this.#actions.review(index));
      item.append(button);
      this.#get("mistake-list").append(item);
    });
    if (focus) this.#get("result-message").focus();
  }
}

if (typeof module !== "undefined" && module.exports) module.exports = QuizView;
