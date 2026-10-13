"use strict";

// Pure quiz mechanics shared by every quiz type. UI rendering stays in script.js.
const QuizEngine = Object.freeze({
  normalize(value) {
    return String(value).normalize("NFKC").trim().toLocaleLowerCase("en");
  },

  shuffle(items, random = Math.random) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index--) {
      const swapIndex = Math.floor(random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  },

  createQuestionDeck(pool, random = Math.random) {
    return this.shuffle(pool, random);
  },

  createGame(pool, count, allowedCounts, random = Math.random) {
    if (!allowedCounts.includes(count) || count > pool.length) throw new Error("Unsupported question count.");
    const game = this.createQuestionDeck(pool, random).slice(0, count);
    if (new Set(game.map((item) => item.id)).size !== count) throw new Error("Duplicate questions are not allowed.");
    return game;
  },

  createDistractorPool(country, pool, type, language) {
    const correct = type.answer(country, language);
    const correctKey = type.answerKey(country);
    const seenDisplay = new Set([this.normalize(correct)]);
    const seenKeys = new Set([correctKey]);
    const candidates = [];
    for (const candidate of type.answerCandidates(pool, language)) {
      const displayKey = this.normalize(candidate.label);
      if (seenKeys.has(candidate.key) || seenDisplay.has(displayKey)) continue;
      seenKeys.add(candidate.key);
      seenDisplay.add(displayKey);
      candidates.push(candidate.label);
    }
    return candidates;
  },

  createOptions(country, pool, type, language, random = Math.random) {
    const distractors = this.shuffle(this.createDistractorPool(country, pool, type, language), random).slice(0, 3);
    if (distractors.length !== 3) throw new Error("Four distinct answer choices could not be created.");
    return this.shuffle([type.answer(country, language), ...distractors], random);
  },

  grade(selected, correct) {
    return this.normalize(selected) === this.normalize(correct);
  },

  recordMistake({ questionIndex, subject, questionTitle, options, selectedAnswer, correctAnswer, countryId }) {
    return Object.freeze({ questionIndex, subject, questionTitle, options: [...options], selectedAnswer, correctAnswer, countryId });
  },

  summarize(score, total) {
    if (!Number.isInteger(score) || !Number.isInteger(total) || total < 1 || score < 0 || score > total) {
      throw new Error("Invalid quiz result.");
    }
    return Object.freeze({ score, total, percentage: Math.round(score / total * 100) });
  }
});

