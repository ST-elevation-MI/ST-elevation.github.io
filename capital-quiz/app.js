"use strict";

// Connects a session to a replaceable view. It contains no selectors or CSS rules.
class QuizController {
  #session;
  #view;
  #navigate;
  #setTimer;
  #clearTimer;
  #advanceTimer = null;

  constructor({ session, view, navigate,
    setTimer = (callback, delay) => setTimeout(callback, delay), clearTimer = id => clearTimeout(id) }) {
    this.#session = session;
    this.#view = view;
    this.#navigate = navigate;
    this.#setTimer = setTimer;
    this.#clearTimer = clearTimer;
    view.bind({
      start: () => this.start(), setCount: count => this.configure({ count }),
      setLanguage: language => this.setLanguage(language), answer: index => this.answer(index),
      next: () => this.next(), review: index => this.review(index)
    });
    this.#render(false);
  }

  #render(focus = true) { this.#view.render(this.#session.snapshot(), { focus }); }
  #cancelAdvance() {
    this.#clearTimer(this.#advanceTimer);
    this.#advanceTimer = null;
  }
  getState() { return this.#session.snapshot(); }
  configure(changes) {
    if (!this.#session.configure(changes)) return false;
    this.#render(false);
    return true;
  }
  setLanguage(language) {
    if (!this.#session.configure({ language })) return;
    if (this.#navigate) this.#navigate(this.#view.languageHref(language));
    else this.#render(false);
  }
  start() {
    this.#cancelAdvance();
    this.#session.start();
    this.#render();
  }
  home() {
    this.#cancelAdvance();
    this.#session.reset();
    this.#render();
  }
  answer(index) {
    const answer = this.#session.submitAnswer(index);
    if (!answer) return;
    this.#render(false);
    if (answer.isCorrect) this.#advanceTimer = this.#setTimer(() => {
      this.#advanceTimer = null;
      this.next();
    }, 900);
  }
  next() {
    const state = this.#session.snapshot();
    const changed = state.phase === "review" ? this.#session.returnToResults() : this.#session.next();
    if (!changed) return;
    this.#cancelAdvance();
    this.#render();
  }
  review(index) {
    if (!this.#session.review(index)) return;
    this.#cancelAdvance();
    this.#render();
  }
}

if (typeof module !== "undefined" && module.exports) module.exports = QuizController;
else {
  const settings = QuizView.pageSettings(document);
  const session = new QuizSession({
    countries, types: QUIZ_TYPES, engine: QuizEngine, languages: QUIZ_LANGUAGES, questionCounts: QUIZ_QUESTION_COUNTS,
    typeId: QUIZ_TYPE_IDS.includes(settings.typeId) ? settings.typeId : "country-to-capital",
    language: QUIZ_LANGUAGES.includes(settings.language) ? settings.language : "ko",
    continent: CONTINENT_IDS.includes(settings.continent) ? settings.continent : null
  });
  const view = new QuizView({
    document, messages: QUIZ_MESSAGES, typeText: QUIZ_TYPE_TEXT, continentNames: CONTINENT_NAMES,
    continentSlugs: CONTINENT_SLUGS, capitalContext: CAPITAL_CONTEXT, questionCounts: QUIZ_QUESTION_COUNTS
  });
  new QuizController({ session, view, navigate: href => window.location.assign(href) });
}
