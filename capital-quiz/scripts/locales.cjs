'use strict';

const { QUIZ_TYPE_IDS, CONTINENT_IDS, CONTINENT_NAMES, CONTINENT_SLUGS } = require('../engine/quiz-types.js');
const QUIZ_TYPE_TEXT = require('../ui/quiz-type-text.js');

const LOCALES = {
  ko: {
    title: 'WORLD CAPITAL QUIZ · 세계 수도 퀴즈',
    description: 'UN 회원국의 수도를 한국어로 맞히는 무료 4지선다 세계 지리 퀴즈입니다.',
    text: {
      'nav-home': '홈', 'header-restart-label': '다시 시작', 'header-score-label': '점수', 'menu-label': '메뉴',
      'intro-eyebrow': '작은 도전, 넓어지는 세계', 'intro-title': '수도를 맞히며, 세계 한 바퀴!', 'intro-copy': '나라 이름을 보고 알맞은 수도를 골라보세요.',
      'instructions-title': '게임 안내', 'instructions-copy': '선택한 문제 수만큼 무작위로 뽑은 나라의 수도를 맞혀보세요. 정답마다 1점을 얻습니다. 선택 후에는 답을 바꿀 수 없어요. 정답이면 자동으로 다음 문제로 넘어가며, 오답이면 해설을 확인한 뒤 다음 문제 버튼을 눌러주세요.', 'instructions-accessibility': '키보드의 Tab과 Enter로도 모든 버튼을 사용할 수 있습니다.',
      'home-mode-label': '나만의 세계 여행', 'setup-round-label': '게임 설정', 'home-title': '어디까지 도전해볼까요?', 'home-description': 'UN 회원국 193개국 중 새로운 나라들을 만나보세요.', 'language-label': '언어', 'quiz-type-legend': '퀴즈 유형', 'scope-legend': '출제 범위', 'scope-all': '전 세계 193개국', 'question-count-legend': '출제 문제 수',
      'type-name-country-to-capital': '국가 → 수도', 'type-tip-country-to-capital': '나라 이름을 보고 수도 맞히기', 'type-name-capital-to-country': '수도 → 국가', 'type-tip-capital-to-country': '수도를 보고 나라 맞히기', 'type-name-flag-to-country': '국기 → 국가', 'type-tip-flag-to-country': '국기를 보고 나라 맞히기',
      'count-unit-10': '문제', 'count-unit-25': '문제', 'count-unit-50': '문제', 'count-tip-10': '가볍게 시작', 'count-tip-25': '조금 더 멀리', 'count-tip-50': '세계 탐험 도전', 'setup-summary': '10개의 나라, 10개의 질문이 기다리고 있어요.', 'home-tip': '시간 제한 없이, 나만의 속도로 즐겨보세요.',
      'game-mode-label': '세계 수도 도전', 'score-label': '점수', 'question-round-label': '세계의 수도', 'question-title': '이 나라의 수도는?', 'question-hint': '아래에서 정답 하나를 선택하세요', 'feedback': '준비되셨나요? 세계 여행을 시작해요!',
      'result-round-label': '퀴즈 완료!', 'result-copy': '세상을 알아가는 여행, 한 번 더 떠나볼까요?', 'mistake-review-title': '오답 복습', 'perfect-review': '모든 문제를 맞혔어요. 복습할 오답이 없습니다!', 'result-restart-label': '다시 시작',
      'game-bottom-copy': '배우는 즐거움, 발견하는 재미 ✦', 'country-count-copy': 'UN 회원국 193개국을 만나는 여행', 'fresh-questions-copy': '매번 새로운 문제', 'no-time-limit-copy': '시간 제한 없이 천천히', 'page-footer': '세계를 탐험하세요. 한 번에 하나의 수도씩.'
    },
    aria: { 'brand-home': 'WORLD CAPITAL QUIZ 홈', 'main-nav': '메인 메뉴', intro: '퀴즈 소개', 'game-screen': '세계 수도 퀴즈', progress: '완료한 문제', answers: '수도 선택지', 'language-links': '언어별 페이지' }
  },
  en: {
    title: 'WORLD CAPITAL QUIZ · Free Geography Game',
    description: 'Test your knowledge of all 193 UN member states in this free four-choice world capitals quiz.',
    text: {
      'nav-home': 'Home', 'header-restart-label': 'Restart', 'header-score-label': 'Score', 'menu-label': 'Menu',
      'intro-eyebrow': 'A small challenge, a wider world', 'intro-title': 'Guess the capitals and travel the world!', 'intro-copy': 'Read the country name and choose its capital.',
      'instructions-title': 'How to play', 'instructions-copy': 'Countries are chosen at random for the number of questions you select. Each correct answer earns one point, and answers cannot be changed after selection. Correct answers advance automatically; after a wrong answer, review the explanation and continue with the Next button.', 'instructions-accessibility': 'All buttons can also be used with Tab and Enter.',
      'home-mode-label': 'Your world journey', 'setup-round-label': 'GAME SETUP', 'home-title': 'How far will you go?', 'home-description': 'Meet new countries among all 193 UN member states.', 'language-label': 'Language', 'quiz-type-legend': 'Quiz type', 'scope-legend': 'Question scope', 'scope-all': 'All 193 countries', 'question-count-legend': 'Number of questions',
      'type-name-country-to-capital': 'Country → Capital', 'type-tip-country-to-capital': 'Choose the capital for each country', 'type-name-capital-to-country': 'Capital → Country', 'type-tip-capital-to-country': 'Choose the country for each capital', 'type-name-flag-to-country': 'Flag → Country', 'type-tip-flag-to-country': 'Choose the country for each flag',
      'count-unit-10': 'questions', 'count-unit-25': 'questions', 'count-unit-50': 'questions', 'count-tip-10': 'Quick start', 'count-tip-25': 'Travel farther', 'count-tip-50': 'World explorer', 'setup-summary': '10 countries and 10 questions are waiting.', 'home-tip': 'No time limit—enjoy the quiz at your own pace.',
      'game-mode-label': 'World capital challenge', 'score-label': 'Score', 'question-round-label': 'CAPITALS OF THE WORLD', 'question-title': "What is this country's capital?", 'question-hint': 'Choose one correct answer below', 'feedback': "Ready? Let's begin our journey around the world!",
      'result-round-label': 'QUIZ COMPLETE!', 'result-copy': 'Ready to take another journey around the world?', 'mistake-review-title': 'Review mistakes', 'perfect-review': 'You got every question right. There are no mistakes to review!', 'result-restart-label': 'Restart',
      'game-bottom-copy': 'The joy of learning and discovery ✦', 'country-count-copy': 'A journey through 193 UN member states', 'fresh-questions-copy': 'New questions every game', 'no-time-limit-copy': 'No time limit', 'page-footer': 'EXPLORE THE WORLD. ONE CAPITAL AT A TIME.'
    },
    aria: { 'brand-home': 'WORLD CAPITAL QUIZ home', 'main-nav': 'Main menu', intro: 'Quiz introduction', 'game-screen': 'World capital quiz', progress: 'Questions completed', answers: 'Capital choices', 'language-links': 'Language pages' }
  },
  ja: {
    title: 'WORLD CAPITAL QUIZ · 世界の首都クイズ',
    description: '国連加盟国193か国の首都を当てる、無料の四択世界地理クイズです。',
    text: {
      'nav-home': 'ホーム', 'header-restart-label': 'もう一度', 'header-score-label': 'スコア', 'menu-label': 'メニュー',
      'intro-eyebrow': '小さな挑戦、広がる世界', 'intro-title': '首都を当てて、世界を一周！', 'intro-copy': '国名を見て、正しい首都を選びましょう。',
      'instructions-title': '遊び方', 'instructions-copy': '選んだ問題数だけ国がランダムに出題されます。正解すると1点です。一度選んだ答えは変更できません。正解時は自動で次へ進み、不正解時は解説を確認してから次の問題へ進みます。', 'instructions-accessibility': 'TabキーとEnterキーでも、すべてのボタンを操作できます。',
      'home-mode-label': '自分だけの世界旅行', 'setup-round-label': 'ゲーム設定', 'home-title': 'どこまで挑戦しますか？', 'home-description': '国連加盟国193か国から、新しい国々に出会いましょう。', 'language-label': '言語', 'quiz-type-legend': 'クイズタイプ', 'scope-legend': '出題範囲', 'scope-all': '世界193か国', 'question-count-legend': '問題数',
      'type-name-country-to-capital': '国 → 首都', 'type-tip-country-to-capital': '国名から首都を当てる', 'type-name-capital-to-country': '首都 → 国', 'type-tip-capital-to-country': '首都から国を当てる', 'type-name-flag-to-country': '国旗 → 国', 'type-tip-flag-to-country': '国旗から国を当てる',
      'count-unit-10': '問', 'count-unit-25': '問', 'count-unit-50': '問', 'count-tip-10': '気軽にスタート', 'count-tip-25': 'もう少し遠くへ', 'count-tip-50': '世界探検に挑戦', 'setup-summary': '10か国、10問が待っています。', 'home-tip': '制限時間はありません。自分のペースで楽しみましょう。',
      'game-mode-label': '世界の首都チャレンジ', 'score-label': 'スコア', 'question-round-label': '世界の首都', 'question-title': 'この国の首都は？', 'question-hint': '正しい答えを1つ選んでください', 'feedback': '準備はできましたか？ 世界旅行を始めましょう！',
      'result-round-label': 'クイズ完了！', 'result-copy': '世界を知る旅に、もう一度出かけませんか？', 'mistake-review-title': '間違いを復習', 'perfect-review': '全問正解です。復習する間違いはありません！', 'result-restart-label': 'もう一度',
      'game-bottom-copy': '学ぶ喜び、発見する楽しさ ✦', 'country-count-copy': '国連加盟国193か国を巡る旅', 'fresh-questions-copy': '毎回新しい問題', 'no-time-limit-copy': '時間制限なし', 'page-footer': '世界を探検しよう。一度に一つの首都から。'
    },
    aria: { 'brand-home': 'WORLD CAPITAL QUIZ ホーム', 'main-nav': 'メインメニュー', intro: 'クイズ紹介', 'game-screen': '世界の首都クイズ', progress: '完了した問題', answers: '首都の選択肢', 'language-links': '言語別ページ' }
  }
};

const CORE_PAGES = {
  hub: Object.freeze({ route: '', kind: 'hub' }),
  'country-to-capital': Object.freeze({
    route: 'quiz/country-to-capital', kind: 'quiz', typeId: 'country-to-capital',
    seo: {
      ko: { title: '세계 수도 퀴즈 · UN 회원국 193개국', description: '나라 이름을 보고 수도를 맞히는 무료 4지선다 세계 지리 퀴즈입니다.', introTitle: '193개국 세계 수도 퀴즈', introCopy: 'UN 회원국의 이름을 보고 알맞은 수도를 골라보세요.', homeTitle: '국가를 보고 수도를 맞혀보세요', homeDescription: '193개국 전체에서 매번 새로운 문제가 균등하게 출제됩니다.' },
      en: { title: 'World Capital Quiz · 193 UN Member States', description: 'Choose the capital for each country in this free four-choice geography quiz covering 193 UN member states.', introTitle: 'World Capital Quiz: 193 Countries', introCopy: 'Read each UN member state and choose its capital.', homeTitle: 'Match each country to its capital', homeDescription: 'Every game draws a fresh, uniform selection from all 193 countries.' },
      ja: { title: '世界の首都クイズ · 国連加盟国193か国', description: '国名から首都を当てる、国連加盟国193か国対象の無料四択地理クイズです。', introTitle: '193か国 世界の首都クイズ', introCopy: '国連加盟国の名前を見て、正しい首都を選びましょう。', homeTitle: '国名から首都を当てよう', homeDescription: '193か国すべてから、毎回均等に新しい問題が出題されます。' }
    }
  }),
  'capital-to-country': Object.freeze({
    route: 'quiz/capital-to-country', kind: 'quiz', typeId: 'capital-to-country',
    seo: {
      ko: { title: '수도로 나라 맞히기 · 193개국 지리 퀴즈', description: '수도 이름을 보고 해당 국가를 맞히는 무료 4지선다 세계 지리 퀴즈입니다.', introTitle: '수도로 나라 맞히기', introCopy: '수도 이름을 보고 어느 나라인지 골라보세요.', homeTitle: '이 수도는 어느 나라에 있을까요?', homeDescription: 'UN 회원국 193개국의 수도 지식을 반대로 확인해보세요.' },
      en: { title: 'Capital to Country Quiz · 193 Countries', description: 'Identify the country from its capital in this free four-choice geography quiz covering 193 UN member states.', introTitle: 'Capital to Country Quiz', introCopy: 'Read the capital and choose the country it belongs to.', homeTitle: 'Which country has this capital?', homeDescription: 'Test your knowledge in reverse across all 193 UN member states.' },
      ja: { title: '首都から国を当てるクイズ · 193か国', description: '首都名から国を当てる、国連加盟国193か国対象の無料四択地理クイズです。', introTitle: '首都から国を当てるクイズ', introCopy: '首都名を見て、その首都がある国を選びましょう。', homeTitle: 'この首都はどの国にある？', homeDescription: '国連加盟国193か国の知識を逆方向から試しましょう。' }
    }
  }),
  'flag-to-country': Object.freeze({
    route: 'quiz/flag-to-country', kind: 'quiz', typeId: 'flag-to-country',
    seo: {
      ko: { title: '세계 국기 퀴즈 · 193개국 나라 맞히기', description: '국기를 보고 국가 이름을 맞히는 UN 회원국 193개국 무료 4지선다 퀴즈입니다.', introTitle: '193개국 세계 국기 퀴즈', introCopy: '화면에 표시된 국기를 보고 알맞은 나라를 골라보세요.', homeTitle: '이 국기는 어느 나라일까요?', homeDescription: 'UN 회원국 193개국의 국기를 무작위로 만나보세요.' },
      en: { title: 'World Flag Quiz · Name 193 Countries', description: 'Identify countries by their flags in this free four-choice quiz covering all 193 UN member states.', introTitle: 'World Flag Quiz: 193 Countries', introCopy: 'Look at each flag and choose the country it represents.', homeTitle: 'Which country does this flag represent?', homeDescription: 'Meet flags from all 193 UN member states in a fresh random order.' },
      ja: { title: '世界の国旗クイズ · 193か国', description: '国旗から国名を当てる、国連加盟国193か国対象の無料四択クイズです。', introTitle: '193か国 世界の国旗クイズ', introCopy: '表示された国旗を見て、正しい国名を選びましょう。', homeTitle: 'この国旗はどの国？', homeDescription: '国連加盟国193か国の国旗が毎回ランダムに出題されます。' }
    }
  })
};

function practiceSeo(typeId, continent) {
  const type = QUIZ_TYPE_TEXT[typeId];
  const koContinent = CONTINENT_NAMES[continent].ko;
  const enContinent = CONTINENT_NAMES[continent].en;
  const jaContinent = CONTINENT_NAMES[continent].ja;
  return {
    ko: {
      title: `${koContinent} ${type.name.ko} 연습 퀴즈`,
      description: `${koContinent} 국가만 출제되는 ${type.description.ko} 무료 4지선다 지리 퀴즈입니다.`,
      introTitle: `${koContinent} ${type.name.ko} 집중 연습`,
      introCopy: `${koContinent}에 속한 국가만 골라 집중적으로 연습해보세요.`,
      homeTitle: `${koContinent} ${type.name.ko} 퀴즈`,
      homeDescription: `문제와 선택지가 모두 ${koContinent} 국가 범위에서 중복 없이 출제됩니다.`
    },
    en: {
      title: `${enContinent} ${type.name.en} Practice Quiz`,
      description: `A free four-choice ${type.name.en.toLowerCase()} quiz limited to countries in ${enContinent}.`,
      introTitle: `${enContinent} ${type.name.en} Practice`,
      introCopy: `Focus your practice on countries in ${enContinent}.`,
      homeTitle: `${enContinent} ${type.name.en} Quiz`,
      homeDescription: `Questions and choices are drawn without duplicates from the ${enContinent} country pool.`
    },
    ja: {
      title: `${jaContinent} ${type.name.ja} 練習クイズ`,
      description: `${jaContinent}の国だけが出題される無料四択${type.name.ja}地理クイズです。`,
      introTitle: `${jaContinent} ${type.name.ja} 集中練習`,
      introCopy: `${jaContinent}に属する国だけを集中的に練習しましょう。`,
      homeTitle: `${jaContinent} ${type.name.ja}クイズ`,
      homeDescription: `問題と選択肢はすべて${jaContinent}の国から重複なしで出題されます。`
    }
  };
}

const practicePages = {};
for (const continent of CONTINENT_IDS) {
  for (const typeId of QUIZ_TYPE_IDS) {
    const slug = CONTINENT_SLUGS[continent];
    practicePages[`practice-${slug}-${typeId}`] = Object.freeze({
      route: `practice/${slug}/${typeId}`,
      kind: 'quiz',
      typeId,
      continent,
      seo: practiceSeo(typeId, continent)
    });
  }
}
const PAGES = Object.freeze({ ...CORE_PAGES, ...practicePages });

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function replaceText(html, id, value) {
  const pattern = new RegExp(`(<([a-z][\\w-]*)\\b(?=[^>]*\\bid="${id}")[^>]*>)[\\s\\S]*?(</\\2>)`);
  if (!pattern.test(html)) throw new Error(`Missing localized element: ${id}`);
  return html.replace(pattern, `$1${escapeHtml(value)}$3`);
}

function replaceAttribute(html, id, attribute, value) {
  const pattern = new RegExp(`(<[a-z][\\w-]*\\b(?=[^>]*\\bid="${id}")[^>]*\\b${attribute}=")[^"]*(")`);
  if (!pattern.test(html)) throw new Error(`Missing ${attribute} on: ${id}`);
  return html.replace(pattern, `$1${value}$2`);
}

function renderPage(template, locale, pageId, siteUrl) {
  const config = LOCALES[locale];
  const page = PAGES[pageId];
  if (!config || !page) throw new Error(`Unsupported localized page: ${locale}/${pageId}`);
  const suffix = page.route ? `${page.route}/` : '';
  const pageUrl = `${siteUrl}/${locale}/${suffix}`;
  const routeDepth = page.route ? page.route.split('/').length : 0;
  const assetPrefix = '../'.repeat(routeDepth + 1);
  const localeHomeHref = routeDepth ? '../'.repeat(routeDepth) : './';
  const pageText = page.seo?.[locale];
  let html = template
    .replace('<html lang="ko">', `<html lang="${locale}">`)
    .replace('<body data-page-kind="hub">', page.kind === 'hub' ? '<body data-page-kind="hub">' : `<body data-page-kind="quiz" data-quiz-type="${page.typeId}"${page.continent ? ` data-continent="${page.continent}"` : ''}>`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(pageText?.title || config.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escapeHtml(pageText?.description || config.description)}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${pageUrl}">`)
    .replace(/<link rel="alternate" hreflang="ko" href="[^"]*">/, `<link rel="alternate" hreflang="ko" href="${siteUrl}/ko/${suffix}">`)
    .replace(/<link rel="alternate" hreflang="en" href="[^"]*">/, `<link rel="alternate" hreflang="en" href="${siteUrl}/en/${suffix}">`)
    .replace(/<link rel="alternate" hreflang="ja" href="[^"]*">/, `<link rel="alternate" hreflang="ja" href="${siteUrl}/ja/${suffix}">`)
    .replace(/<link rel="alternate" hreflang="x-default" href="[^"]*">/, `<link rel="alternate" hreflang="x-default" href="${siteUrl}/ko/${suffix}">`)
    .replace('href="style.css"', `href="${assetPrefix}ui/style.css"`)
    .replace(/(<script\b[^>]*src=")\.\.\/([^"]+)(")/g, (_match, before, file, after) => `${before}${assetPrefix}${file}${after}`);

  for (const [id, value] of Object.entries(config.text)) html = replaceText(html, id, value);
  if (pageText) {
    for (const [id, key] of [['intro-title', 'introTitle'], ['intro-copy', 'introCopy'], ['home-title', 'homeTitle'], ['home-description', 'homeDescription']]) {
      html = replaceText(html, id, pageText[key]);
    }
    html = replaceText(html, 'instructions-copy', QUIZ_TYPE_TEXT[page.typeId].instructions[locale]);
  }
  for (const [id, value] of Object.entries(config.aria)) html = replaceAttribute(html, id, 'aria-label', value);
  html = replaceAttribute(html, 'brand-home', 'href', localeHomeHref);
  html = replaceAttribute(html, 'nav-home', 'href', localeHomeHref);
  for (const code of Object.keys(LOCALES)) {
    const languageHref = `${assetPrefix}${code}/${suffix}`;
    html = replaceAttribute(html, `language-link-${code}`, 'href', languageHref);
  }
  for (const typeId of QUIZ_TYPE_IDS) {
    const typePage = CORE_PAGES[typeId];
    const typeHref = page.kind === 'hub'
      ? `${typePage.route}/`
      : page.continent
        ? `${localeHomeHref}practice/${CONTINENT_SLUGS[page.continent]}/${typeId}/`
        : `${localeHomeHref}${typePage.route}/`;
    html = replaceAttribute(html, `type-${typeId}`, 'href', typeHref);
  }
  const scopeType = page.typeId || 'country-to-capital';
  const allScopeHref = page.kind === 'hub' ? `quiz/${scopeType}/` : `${localeHomeHref}quiz/${scopeType}/`;
  html = replaceAttribute(html, 'scope-all', 'href', allScopeHref);
  for (const continent of CONTINENT_IDS) {
    const slug = CONTINENT_SLUGS[continent];
    const scopeRoute = `practice/${slug}/${scopeType}/`;
    html = replaceAttribute(html, `scope-${slug}`, 'href', page.kind === 'hub' ? scopeRoute : `${localeHomeHref}${scopeRoute}`);
    html = replaceText(html, `scope-${slug}`, CONTINENT_NAMES[continent][locale]);
  }
  html = html.replace(/(<option\b[^>]*?) selected(?=[ >])/g, '$1');
  html = html.replace(`<option value="${locale}">`, `<option value="${locale}" selected>`);
  html = html.replace(/ aria-current="page"/g, '');
  html = html.replace(`id="language-link-${locale}"`, `id="language-link-${locale}" aria-current="page"`);
  if (page.typeId) html = html.replace(`id="type-${page.typeId}"`, `id="type-${page.typeId}" aria-current="page"`);
  if (page.kind === 'quiz') {
    const scopeId = page.continent ? CONTINENT_SLUGS[page.continent] : 'all';
    html = html.replace(`id="scope-${scopeId}"`, `id="scope-${scopeId}" aria-current="page"`);
  }
  return html;
}

function renderLocale(template, locale, siteUrl) {
  return renderPage(template, locale, 'hub', siteUrl);
}

module.exports = { LOCALES, PAGES, renderLocale, renderPage };
