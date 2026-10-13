"use strict";

// Owns a complete game. Inputs and immutable snapshots are its only UI contract.
class QuizSession {
  #countries;
  #types;
  #engine;
  #languages;
  #counts;
  #random;
  #config;
  #pool;
  #phase = "home";
  #questions = [];
  #currentIndex = 0;
  #score = 0;
  #answers = [];
  #mistakes = [];
  #reviewIndex = null;

  constructor({ countries, types, engine, languages = ["ko", "ja", "en"], questionCounts = [10, 25, 50],
    typeId = "country-to-capital", language = "ko", continent = null, count = 10, random = Math.random }) {
    this.#countries = [...countries];
    this.#types = types;
    this.#engine = engine;
    this.#languages = [...languages];
    this.#counts = [...questionCounts];
    this.#random = random;
    if (!this.configure({ typeId, language, continent, count })) throw new Error("Unsupported quiz settings.");
  }

  configure(changes) {
    if (this.#phase !== "home") return false;
    const config = { ...this.#config, ...changes };
    if (!Object.hasOwn(this.#types, config.typeId) || !this.#languages.includes(config.language)) return false;
    if (config.continent !== null && !this.#countries.some(country => country.continent === config.continent)) return false;
    const pool = this.#countries.filter(country => config.continent === null || country.continent === config.continent);
    if (!Number.isInteger(config.count) || config.count < 1 || !this.#counts.includes(config.count) || config.count > pool.length) return false;
    this.#pool = pool;
    this.#config = Object.freeze(config);
    return true;
  }

  start() {
    const { typeId, language, count } = this.#config;
    const type = this.#types[typeId];
    const deck = this.#engine.createGame(this.#pool, count, this.#counts, this.#random);
    // Choices are fixed here, so rendering or reviewing never consumes randomness.
    const questions = deck.map((country, index) => {
      const options = this.#engine.createOptions(country, this.#pool, type, language, this.#random);
      const correctAnswer = type.answer(country, language);
      return Object.freeze({
        index, countryId: country.id, subjectKind: type.subjectKind, subject: type.subject(country, language),
        options: Object.freeze(options), correctAnswer,
        correctIndex: options.findIndex(option => this.#engine.grade(option, correctAnswer))
      });
    });
    this.#questions = questions;
    this.#answers = [];
    this.#mistakes = [];
    this.#currentIndex = 0;
    this.#score = 0;
    this.#reviewIndex = null;
    this.#phase = "question";
    return this.snapshot();
  }

  submitAnswer(selectedIndex) {
    if (this.#phase !== "question" || this.#answers[this.#currentIndex]) return null;
    const question = this.#questions[this.#currentIndex];
    if (!Number.isInteger(selectedIndex) || selectedIndex < 0 || selectedIndex >= question.options.length) return null;
    const selectedAnswer = question.options[selectedIndex];
    const isCorrect = this.#engine.grade(selectedAnswer, question.correctAnswer);
    const answer = Object.freeze({ selectedIndex, selectedAnswer, isCorrect });
    this.#answers[this.#currentIndex] = answer;
    if (isCorrect) this.#score++;
    else this.#mistakes.push(this.#engine.recordMistake({ question, selectedIndex }));
    return answer;
  }

  next() {
    if (this.#phase !== "question" || !this.#answers[this.#currentIndex]) return false;
    if (this.#currentIndex + 1 === this.#questions.length) this.#phase = "result";
    else this.#currentIndex++;
    return true;
  }

  review(mistakeIndex) {
    if (!["result", "review"].includes(this.#phase) || !Number.isInteger(mistakeIndex) || !this.#mistakes[mistakeIndex]) return false;
    this.#reviewIndex = mistakeIndex;
    this.#phase = "review";
    return true;
  }

  returnToResults() {
    if (this.#phase !== "review") return false;
    this.#reviewIndex = null;
    this.#phase = "result";
    return true;
  }

  reset() {
    this.#phase = "home";
    this.#questions = [];
    this.#answers = [];
    this.#mistakes = [];
    this.#currentIndex = 0;
    this.#score = 0;
    this.#reviewIndex = null;
    return this.snapshot();
  }

  snapshot() {
    const review = this.#phase === "review" ? this.#mistakes[this.#reviewIndex] : null;
    const question = review?.question || (this.#phase === "question" ? this.#questions[this.#currentIndex] : null);
    const answer = question ? this.#answers[question.index] || null : null;
    return Object.freeze({
      phase: this.#phase, config: this.#config,
      availableCounts: Object.freeze(this.#counts.filter(count => count <= this.#pool.length)),
      poolSize: this.#pool.length, total: this.#config.count, currentIndex: this.#currentIndex,
      completed: this.#answers.length, score: this.#score, question, answer,
      mistakes: Object.freeze([...this.#mistakes]), reviewIndex: this.#reviewIndex,
      result: ["result", "review"].includes(this.#phase) ? this.#engine.summarize(this.#score, this.#questions.length) : null
    });
  }
}

if (typeof module !== "undefined" && module.exports) module.exports = QuizSession;
