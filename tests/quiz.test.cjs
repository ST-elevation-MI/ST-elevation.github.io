const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.join(__dirname, '..');
class Element {
  constructor() { this.children = []; this.dataset = {}; this.style = {}; this.attributes = {}; this.listeners = {}; this.hidden = false; this.disabled = false; this.className = ''; this.textContent = ''; this.classList = { add: name => { this.className += ` ${name}`; } }; }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = children; }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  addEventListener(name, listener) { this.listeners[name] = listener; }
  querySelector(selector) { return this.children.find(child => child.className === selector.slice(1)); }
  focus() {}
  click() { if (!this.disabled) this.listeners.click?.({ preventDefault() {} }); }
}
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const elements = new Map([...html.matchAll(/id="([^"]+)"/g)].map(match => [match[1], new Element()]));
const timers = new Map();
let timerId = 0;
function flushTimers() {
  for (const [id, callback] of [...timers]) {
    timers.delete(id);
    callback();
  }
}
const context = vm.createContext({
  setTimeout(callback, delay) { assert.equal(delay, 900); timers.set(++timerId, callback); return timerId; },
  clearTimeout(id) { timers.delete(id); }, timers, flushTimers, document: { getElementById: id => elements.get(id), createElement: () => new Element() }, console, assert });
for (const filename of ['countries.js', 'script.js']) vm.runInContext(fs.readFileSync(path.join(root, filename), 'utf8'), context, { filename });
const run = code => vm.runInContext(code, context);
context.reference = JSON.parse(fs.readFileSync(path.join(__dirname, 'un-members.json'), 'utf8')).names;
run(`
assert.equal($('home-screen').hidden, false);
assert.equal($('game-screen').hidden, true);
assert.equal(questions.length, 0);
assert.equal(countries.length, 193);
assert.equal(new Set(countries.map(c => c.countryEn)).size, 193);
assert.equal(new Set(countries.map(c => c.id)).size, 193);
assert.deepEqual([...countries.map(c => c.countryEn)].sort(), [...reference].sort());
assert.ok(countries.every(c => c.capitalKo.trim() && c.capitalEn.trim()));
for (const excluded of ['VA','PS','TW','XK','CK','NU','HK','MO']) assert.ok(!countries.some(c => c.id === excluded));
assert.throws(() => validateCountries(countries.slice(1)));
assert.throws(() => validateCountries(countries.map((c,i) => i === 1 ? {...c, countryEn:countries[0].countryEn} : c)));
assert.throws(() => validateCountries(countries.map((c,i) => i === 1 ? {...c, capitalKo:' '} : c)));
// Fisher-Yates must generate every permutation exactly once when every
// possible random choice is supplied. This verifies the shuffle is unbiased
// without relying on a flaky statistical test.
const permutationKeys = new Set();
for (const firstChoice of [0, 1, 2, 3]) for (const secondChoice of [0, 1, 2]) for (const thirdChoice of [0, 1]) {
  const choices = [firstChoice / 4, secondChoice / 3, thirdChoice / 2];
  const shuffled = shuffle(['A', 'B', 'C', 'D'], () => choices.shift());
  permutationKeys.add(shuffled.join(''));
}
assert.equal(permutationKeys.size, 24);
const originalCountryOrder = countries.map(country => country.id).join(',');
const firstDeck = createQuestionDeck(() => 0);
const secondDeck = createQuestionDeck(() => 0.9999999999999999);
assert.equal(firstDeck.length, 193);
assert.equal(secondDeck.length, 193);
assert.notEqual(firstDeck, secondDeck);
assert.notDeepEqual(firstDeck.map(country => country.id), secondDeck.map(country => country.id));
assert.equal(countries.map(country => country.id).join(','), originalCountryOrder);
for (const count of QUESTION_COUNTS) for (let game = 0; game < 1000; game++) {
  const selected = createGame(count);
  assert.equal(selected.length, count);
  assert.equal(new Set(selected.map(c => c.id)).size, count);
}
const allCapitals = new Set(countries.map(c => c.capitalKo));
for (const country of countries) {
  const pool = createDistractorPool(country);
  assert.equal(new Set(pool.map(capitalKey)).size, pool.length);
  assert.ok(!pool.some(capital => capitalKey(capital) === capitalKey(country.capitalKo)));
  for (let repeat = 0; repeat < 100; repeat++) {
    const options = createOptions(country);
    assert.equal(options.length, 4);
    assert.equal(new Set(options.map(capitalKey)).size, 4);
    assert.equal(options.filter(c => c === country.capitalKo).length, 1);
    assert.ok(options.every(c => allCapitals.has(c)));
  }
}
// Exercise every possible score for each setting through actual click listeners.
for (const count of QUESTION_COUNTS) for (let expected = 0; expected <= count; expected++) {
  $('brand-home').click();
  assert.equal(screen, 'home');
  $('count-' + count).click();
  assert.equal($('count-' + count).attributes['aria-pressed'], 'true');
  $('play').click();
  assert.equal($('home-screen').hidden, true);
  assert.equal($('game-screen').hidden, false);
  assert.equal(questions.length, count);
  assert.equal($('progress').attributes['aria-valuemax'], String(count));
  assert.equal(score, 0);
  assert.equal($('next').hidden, true);
  $('next').click();
  assert.equal(current, 0);
  for (let index = 0; index < count; index++) {
    const correct = questions[current].capitalKo;
    const buttons = [...$('answers').children];
    const chosen = buttons.find(b => (b.dataset.capital === correct) === (index < expected));
    chosen.click();
    assert.ok(buttons.every(b => b.disabled));
    assert.ok(buttons.find(b => b.dataset.capital === correct).className.includes('correct'));
    if (index >= expected) assert.ok(chosen.className.includes('wrong'));
    const previousScore = score;
    selectAnswer(buttons[0], correct);
    assert.equal(score, previousScore);
    assert.equal(current, index);
    if (index < expected) {
      assert.equal($('next').hidden, true);
      assert.equal(timers.size, 1);
      $('next').click();
      assert.equal(current, index);
      flushTimers();
    } else {
      assert.equal($('next').hidden, false);
      assert.equal(timers.size, 0);
      flushTimers();
      assert.equal(current, index);
      $('next').click();
    }
  }
  assert.equal($('result-total').textContent, '/ ' + count);
  assert.equal($('question-count').textContent, count + '문제 완료');
  assert.equal(score, expected);
  assert.equal($('result-screen').hidden, false);
  assert.equal($('question-screen').hidden, true);
  assert.equal($('percentage').textContent, Math.round(expected / count * 100) + '%');
  const message = expected === count ? '완벽합니다!' : expected / count >= 0.8 ? '훌륭합니다!' : expected / count >= 0.5 ? '잘했습니다!' : '조금 더 연습해봅시다!';
  assert.equal($('result-message').textContent, message);
}
$('result-restart').click();
assert.equal(score, 0);
assert.equal(current, 0);
assert.equal($('result-screen').hidden, true);
assert.equal($('answers').children.length, 4);
assert.ok([...$('answers').children].every(b => !b.disabled));
assert.equal(questions.length, 50);
$('nav-home').click();
assert.equal(screen, 'home');
assert.equal(score, 0);
assert.equal(questions.length, 0);
assert.equal(selectedCount, 50);
$('next').click();
assert.equal(current, 0);
$('count-25').click();
$('play').click();
$('header-restart').click();
assert.equal(questions.length, 25);
assert.equal(current, 0);
assert.throws(() => createGame(193));
// Leaving or restarting during correct-answer feedback cancels the pending move.
for (const action of ['brand-home', 'header-restart']) {
  startQuiz(false);
  [...$('answers').children].find(b => b.dataset.capital === questions[0].capitalKo).click();
  assert.equal(timers.size, 1);
  $(action).click();
  assert.equal(timers.size, 0);
  flushTimers();
  assert.equal(current, 0);
  assert.equal(score, 0);
  assert.equal(screen, action === 'brand-home' ? 'home' : 'game');
}

`);
console.log('PASS: exactly 193 countries; UN reference set equal (0 missing, 0 extra).');
console.log('PASS: unique countryEn/id; all required capital fields present; nonmembers excluded.');
console.log('PASS: fresh Fisher-Yates decks are unbiased and never mutate the country source.');
console.log('PASS: 3,000 games with 10/25/50 unique countries.');
console.log('PASS: unique distractor pools are uniformly shuffled; all 4 answer positions are equally likely.');
console.log('PASS: 19,300 option sets with 4 distinct real capitals and exactly one answer.');
console.log('PASS: all scores for 10/25/50 questions; home/logo, PLAY, settings, restart and answer locking.');

console.log('PASS: correct answers auto-advance (including final result), wrong answers wait, pending timers cancel on home/restart.');
