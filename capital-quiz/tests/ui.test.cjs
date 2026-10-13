'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { countries } = require('../data/countries.js');
const { QUIZ_TYPES, QUIZ_TYPE_IDS, QUIZ_LANGUAGES, QUIZ_QUESTION_COUNTS, CONTINENT_NAMES, CONTINENT_SLUGS } = require('../engine/quiz-types.js');
const QuizEngine = require('../engine/quiz-engine.js');
const QuizSession = require('../engine/quiz-session.js');
const QuizController = require('../app.js');
const QuizView = require('../ui/quiz-view.js');
const messages = require('../ui/messages.js');
const typeText = require('../ui/quiz-type-text.js');
const capitalContext = require('../data/capital-context.js');
const { renderPage } = require('../scripts/locales.cjs');
const template = fs.readFileSync(path.join(__dirname, '../ui/index.html'), 'utf8');

class Element {
  constructor() { this.children = []; this.dataset = {}; this.style = {}; this.attributes = {}; this.listeners = {}; this.hidden = false; this.disabled = false; this.className = ''; this.textContent = ''; }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = children; }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  removeAttribute(name) { delete this.attributes[name]; }
  addEventListener(name, listener) { this.listeners[name] = listener; }
  querySelector(selector) { return this.children.find(child => child.className === selector.slice(1)); }
  focus() {}
  click() { if (!this.disabled) this.listeners.click?.({ target: this }); }
}

function harness({ typeId = 'country-to-capital', language = 'ko', continent = null } = {}) {
  const pageId = continent ? `practice-${CONTINENT_SLUGS[continent]}-${typeId}` : typeId;
  const html = renderPage(template, language, pageId, 'https://example.com');
  const elements = new Map([...html.matchAll(/id="([^"]+)"/g)].map(match => [match[1], new Element()]));
  for (const id of ['intro-title', 'home-title', 'home-description', 'intro-copy']) {
    const match = html.match(new RegExp(`id="${id}"[^>]*>([^<]*)`));
    elements.get(id).textContent = match[1];
  }
  for (const code of QUIZ_LANGUAGES) elements.get(`language-link-${code}`).href = `https://example.com/${code}/`;
  const document = {
    body: { dataset: { pageKind: 'quiz', quizType: typeId, continent } },
    documentElement: { lang: language }, title: html.match(/<title>([^<]+)<\/title>/)[1],
    getElementById: id => elements.get(id), createElement: () => new Element()
  };
  const timers = new Map();
  let timerId = 0;
  const session = new QuizSession({ countries, types: QUIZ_TYPES, engine: QuizEngine, typeId, language, continent });
  const view = new QuizView({ document, messages, typeText, continentNames: CONTINENT_NAMES, continentSlugs: CONTINENT_SLUGS, capitalContext, questionCounts: QUIZ_QUESTION_COUNTS });
  const app = new QuizController({ session, view,
    setTimer(callback, delay) { assert.equal(delay, 900); timers.set(++timerId, callback); return timerId; },
    clearTimer(id) { timers.delete(id); }
  });
  return { app, view, document, timers, get: id => elements.get(id), flush() {
    for (const [id, callback] of [...timers]) { timers.delete(id); callback(); }
  } };
}

for (const language of QUIZ_LANGUAGES) for (const typeId of QUIZ_TYPE_IDS) {
  const h = harness({ typeId, language });
  const { get, app } = h;
  const title = h.document.title;
  const heading = get('intro-title').textContent;
  assert.equal(get('home-screen').hidden, false);
  assert.equal(get('game-screen').hidden, true);
  assert.equal(get('language-select').value, language);
  assert.equal(get('type-name-' + typeId).textContent, typeText[typeId].name[language]);
  get('play').click();
  assert.equal(get('game-screen').hidden, false);
  const originalQuestion = app.getState().question;
  assert.equal(get('country').textContent, originalQuestion.subject);
  assert.equal(get('country').className, originalQuestion.subjectKind + '-subject');
  get('next').click();
  assert.equal(app.getState().currentIndex, 0);
  // The model must never grade or save mistakes using mutable DOM text/datasets.
  const wrongIndex = (originalQuestion.correctIndex + 1) % 4;
  get('country').textContent = 'changed presentation';
  get('answers').children[wrongIndex].querySelector('.answer-name').textContent = 'changed choice label';
  get('answers').children[wrongIndex].click();
  assert.equal(app.getState().mistakes[0].question, originalQuestion);
  assert.equal(app.getState().mistakes[0].selectedAnswer, originalQuestion.options[wrongIndex]);
  assert.equal(get('answers').children[wrongIndex].querySelector('.answer-name').textContent, originalQuestion.options[wrongIndex]);
  assert.equal(h.timers.size, 0);
  assert.equal(get('next').hidden, false);
  assert.ok(get('answers').children.every(button => button.disabled));
  get('next').click();
  for (let index = 1; index < 10; index++) {
    const question = app.getState().question;
    get('answers').children[question.correctIndex].click();
    assert.equal(h.timers.size, 1);
    assert.equal(get('next').hidden, true);
    app.answer(question.correctIndex);
    assert.equal(h.timers.size, 1);
    h.flush();
  }
  assert.equal(app.getState().phase, 'result');
  assert.equal(get('result-score').textContent, 9);
  assert.equal(get('percentage').textContent, '90%');
  get('mistake-list').children[0].children[0].click();
  assert.equal(app.getState().phase, 'review');
  assert.equal(get('country').textContent, originalQuestion.subject);
  assert.deepEqual(get('answers').children.map(button => button.querySelector('.answer-name').textContent), [...originalQuestion.options]);
  assert.ok(get('answers').children[originalQuestion.correctIndex].className.includes('correct'));
  assert.ok(get('answers').children[wrongIndex].className.includes('wrong'));
  assert.ok(get('answers').children.every(button => button.disabled));
  get('next').click();
  assert.equal(app.getState().phase, 'result');
  assert.equal(app.getState().score, 9);
  assert.equal(h.document.title, title);
  assert.equal(get('intro-title').textContent, heading);
  get('result-restart').click();
  assert.equal(app.getState().score, 0);
  assert.equal(app.getState().mistakes.length, 0);
  assert.equal(app.getState().currentIndex, 0);
  const correctIndex = app.getState().question.correctIndex;
  get('answers').children[correctIndex].click();
  app.home();
  assert.equal(h.timers.size, 0);
  assert.equal(app.getState().phase, 'home');
}

const regional = harness({ continent: 'South America', typeId: 'flag-to-country', language: 'ja' });
assert.equal(regional.get('count-25').disabled, true);
assert.equal(regional.get('count-50').disabled, true);
regional.get('count-25').click();
assert.equal(regional.app.getState().config.count, 10);
assert.equal(regional.get('scope-south-america').attributes['aria-current'], 'page');
regional.get('play').click();
assert.match(regional.get('game-mode-label').textContent, /南アメリカ/);
regional.get('answers').children[regional.app.getState().question.correctIndex].click();
regional.get('header-restart').click();
assert.equal(regional.timers.size, 0);
assert.equal(regional.app.getState().score, 0);
regional.app.home();
regional.get('language-select').listeners.change({ target: { value: 'en' } });
assert.equal(regional.app.getState().config.language, 'en');
assert.equal(regional.get('question-count-legend').textContent, 'Number of questions');

// A completely different view works through exactly the same controller API.
const replacementView = { bind(actions) { this.actions = actions; }, render(state) { this.state = state; } };
const replacement = new QuizController({ session: new QuizSession({ countries, types: QUIZ_TYPES, engine: QuizEngine }), view: replacementView });
replacementView.actions.start();
replacementView.actions.answer((replacement.getState().question.correctIndex + 1) % 4);
assert.equal(replacementView.state.mistakes.length, 1);
replacementView.actions.next();
assert.equal(replacementView.state.currentIndex, 1);

// Load classic browser scripts in template order (without CommonJS exports).
const browser = harness({ language: 'en', typeId: 'flag-to-country', continent: 'Asia' });
let navigation = null;
const runtime = vm.createContext({ document: browser.document,
  window: { location: { assign(href) { navigation = href; } } },
  setTimeout(callback, delay) { assert.equal(this, undefined); assert.equal(delay, 900); browser.timers.set('browser', callback); return 'browser'; },
  clearTimeout(id) { assert.equal(this, undefined); browser.timers.delete(id); }
});
for (const script of template.matchAll(/<script\b[^>]*src="([^"]+)"/g)) {
  const scriptPath = path.resolve(__dirname, '../ui', script[1]);
  vm.runInContext(fs.readFileSync(scriptPath, 'utf8'), runtime, { filename: scriptPath });
}
assert.equal(browser.get('home-screen').hidden, false);
browser.get('play').click();
assert.equal(browser.get('answers').children.length, 4);
assert.equal(browser.get('country').className, 'flag-subject');
browser.get('answers').children[0].click();
assert.ok(browser.get('answers').children.every(button => button.disabled));
assert.equal(browser.get('progress').attributes['aria-valuenow'], '1');
browser.get('language-select').listeners.change({ target: { value: 'ja' } });
assert.equal(navigation, null, 'Language must stay locked during a game.');

console.log('PASS: separate view preserves language/SEO, answer feedback, timers, results and original mistake choices.');
console.log('PASS: DOM edits do not affect grading; an alternative view uses the same session/controller.');
console.log('PASS: browser script order and bootstrap work without CommonJS; active games lock language.');
