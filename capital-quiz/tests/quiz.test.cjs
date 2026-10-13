'use strict';
// Runs without a document, window, HTML template or view module.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { countries, validateCountries } = require('../data/countries.js');
const { QUIZ_TYPES, QUIZ_TYPE_IDS, QUIZ_LANGUAGES, QUIZ_QUESTION_COUNTS, CONTINENT_IDS } = require('../engine/quiz-types.js');
const QuizEngine = require('../engine/quiz-engine.js');
const QuizSession = require('../engine/quiz-session.js');

const reference = JSON.parse(fs.readFileSync(path.join(__dirname, 'un-members.json'), 'utf8')).names;
assert.equal(countries.length, 193);
assert.deepEqual(countries.map(country => country.countryEn).sort(), reference.sort());
assert.equal(new Set(countries.map(country => country.id)).size, 193);
assert.ok(countries.every(country => country.countryJa.trim() && country.capitalKo.trim() && country.capitalEn.trim() && country.capitalJa.trim()));
for (const excluded of ['VA', 'PS', 'TW', 'XK', 'CK', 'NU', 'HK', 'MO']) assert.ok(!countries.some(country => country.id === excluded));
assert.throws(() => validateCountries(countries.slice(1)));
assert.throws(() => validateCountries(countries.map((country, i) => i === 1 ? { ...country, countryEn: countries[0].countryEn } : country)));
assert.throws(() => validateCountries(countries.map((country, i) => i === 1 ? { ...country, capitalKo: ' ' } : country)));

// Enumerate all random choices for a four-item Fisher-Yates shuffle.
const permutations = new Set();
for (const first of [0, 1, 2, 3]) for (const second of [0, 1, 2]) for (const third of [0, 1]) {
  const choices = [first / 4, second / 3, third / 2];
  permutations.add(QuizEngine.shuffle(['A', 'B', 'C', 'D'], () => choices.shift()).join(''));
}
assert.equal(permutations.size, 24);
const original = countries.map(country => country.id).join(',');
assert.notDeepEqual(QuizEngine.createQuestionDeck(countries, () => 0), QuizEngine.createQuestionDeck(countries, () => 0.9999999999999999));
for (const count of QUIZ_QUESTION_COUNTS) for (let game = 0; game < 1000; game++) {
  const deck = QuizEngine.createGame(countries, count, QUIZ_QUESTION_COUNTS);
  assert.equal(deck.length, count);
  assert.equal(new Set(deck.map(country => country.id)).size, count);
}
assert.equal(countries.map(country => country.id).join(','), original);
assert.throws(() => QuizEngine.createGame(countries, 193, QUIZ_QUESTION_COUNTS));
assert.throws(() => QuizEngine.createGame(countries, 0, [0]));
assert.throws(() => QuizEngine.createGame(countries, 1.5, [1.5]));
assert.equal(QuizEngine.grade('  Asia ', 'asia'), true);
assert.equal(QuizEngine.grade('Asia', 'Europe'), false);
assert.equal(QuizEngine.summarize(7, 10).percentage, 70);

for (const continent of [null, ...CONTINENT_IDS]) {
  const pool = countries.filter(country => continent === null || country.continent === continent);
  assert.ok(pool.length >= 10);
  for (const language of QUIZ_LANGUAGES) for (const typeId of QUIZ_TYPE_IDS) {
    const type = QUIZ_TYPES[typeId];
    const validAnswers = new Set(pool.map(country => type.answer(country, language)));
    for (const country of pool) {
      const options = QuizEngine.createOptions(country, pool, type, language);
      assert.equal(options.length, 4);
      assert.equal(new Set(options.map(QuizEngine.normalize)).size, 4);
      assert.equal(options.filter(option => QuizEngine.grade(option, type.answer(country, language))).length, 1);
      assert.ok(options.every(option => validAnswers.has(option)));
    }
  }
}
for (const country of countries) for (let repeat = 0; repeat < 100; repeat++) {
  const options = QuizEngine.createOptions(country, countries, QUIZ_TYPES['country-to-capital'], 'ko');
  assert.equal(new Set(options.map(QuizEngine.normalize)).size, 4);
}

function session(options = {}) {
  return new QuizSession({ countries, types: QUIZ_TYPES, engine: QuizEngine, ...options });
}

// Exercise the same session API a replacement interface will use.
for (const continent of [null, ...CONTINENT_IDS]) for (const language of QUIZ_LANGUAGES) for (const typeId of QUIZ_TYPE_IDS) {
  const pool = countries.filter(country => continent === null || country.continent === continent);
  const availableCounts = QUIZ_QUESTION_COUNTS.filter(count => count <= pool.length);
  for (const count of availableCounts) for (const expectedScore of [0, Math.floor(count / 2), count]) {
    const game = session({ typeId, language, continent, count });
    assert.deepEqual(game.snapshot().availableCounts, availableCounts);
    assert.equal(game.snapshot().poolSize, pool.length);
    assert.equal(game.review(0), false);
    game.start();
    assert.equal(game.configure({ language: 'ko' }), false);
    assert.equal(game.next(), false);
    const seen = new Set();
    const missed = [];
    for (let index = 0; index < count; index++) {
      const state = game.snapshot();
      const question = state.question;
      assert.equal(question.index, index);
      assert.ok(!seen.has(question.countryId));
      seen.add(question.countryId);
      assert.ok(pool.some(country => country.id === question.countryId));
      assert.equal(game.submitAnswer(-1), null);
      assert.equal(game.submitAnswer(4), null);
      const selectedIndex = index < expectedScore ? question.correctIndex : (question.correctIndex + 1) % 4;
      const answer = game.submitAnswer(selectedIndex);
      assert.equal(answer.isCorrect, index < expectedScore);
      assert.equal(game.submitAnswer(selectedIndex), null);
      assert.equal(game.snapshot().completed, index + 1);
      if (!answer.isCorrect) missed.push({ question, selectedIndex });
      assert.equal(game.next(), true);
    }
    const result = game.snapshot();
    assert.equal(result.phase, 'result');
    assert.equal(result.result.score, expectedScore);
    assert.equal(result.result.total, count);
    assert.equal(result.result.percentage, Math.round(expectedScore / count * 100));
    assert.equal(result.mistakes.length, count - expectedScore);
    assert.equal(game.next(), false);
    assert.equal(game.submitAnswer(0), null);
    missed.forEach(({ question, selectedIndex }, index) => {
      assert.equal(game.review(index), true);
      const review = game.snapshot();
      assert.equal(review.phase, 'review');
      assert.equal(review.question, question);
      assert.equal(review.answer.selectedIndex, selectedIndex);
      assert.deepEqual(review.question.options, question.options);
      assert.throws(() => review.question.options.push('changed'));
      assert.throws(() => { review.question.correctIndex = selectedIndex; });
      assert.equal(game.submitAnswer(question.correctIndex), null);
      assert.equal(game.returnToResults(), true);
      assert.equal(game.snapshot().result.score, expectedScore);
    });
    assert.equal(game.review(missed.length), false);
    game.start();
    assert.equal(game.snapshot().phase, 'question');
    assert.equal(game.snapshot().score, 0);
    assert.equal(game.snapshot().mistakes.length, 0);
    game.reset();
    assert.equal(game.snapshot().phase, 'home');
    assert.equal(game.snapshot().question, null);
    assert.equal(game.configure({ typeId: 'not-a-quiz' }), false);
    assert.equal(game.configure({ count: pool.length + 1 }), false);
  }
}

let randomCalls = 0;
const fixed = session({ random: () => { randomCalls++; return 0.5; } });
fixed.start();
const callsAfterStart = randomCalls;
for (let index = 0; index < 10; index++) {
  const question = fixed.snapshot().question;
  fixed.submitAnswer((question.correctIndex + 1) % 4);
  fixed.next();
}
fixed.review(0);
fixed.snapshot();
fixed.returnToResults();
assert.equal(randomCalls, callsAfterStart, 'Rendering/reviewing an existing game must never reshuffle choices.');
assert.throws(() => session({ continent: 'Invalid' }));
assert.throws(() => session({ continent: 'South America', count: 25 }));
assert.equal(countries.map(country => country.id).join(','), original);

console.log('PASS: 193 UN member states; three languages/types and six continent pools.');
console.log('PASS: unbiased Fisher-Yates; 3,000 unique decks; 19,300 option sets plus regional choices.');
console.log('PASS: DOM-free sessions grade, lock answers, score, restart and restore immutable mistake choices.');
