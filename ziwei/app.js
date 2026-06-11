/* 紫微斗数排盘分析 · 主逻辑 */
'use strict';

const { astro } = iztro;

/* ---------- 时辰换算 ---------- */
const SHICHEN_NAMES = ['早子时 (00:00-00:59)', '丑时 (01:00-02:59)', '寅时 (03:00-04:59)', '卯时 (05:00-06:59)', '辰时 (07:00-08:59)', '巳时 (09:00-10:59)', '午时 (11:00-12:59)', '未时 (13:00-14:59)', '申时 (15:00-16:59)', '酉时 (17:00-18:59)', '戌时 (19:00-20:59)', '亥时 (21:00-22:59)', '晚子时 (23:00-23:59)'];

function timeToIndex(timeStr) {
  const h = parseInt(timeStr.split(':')[0], 10);
  return h === 23 ? 12 : Math.floor((h + 1) / 2);
}

/* ---------- 盘面网格位置（地支固定） ---------- */
const BRANCH_GRID = {
  '巳': [1, 1], '午': [1, 2], '未': [1, 3], '申': [1, 4],
  '辰': [2, 1], '酉': [2, 4],
  '卯': [3, 1], '戌': [3, 4],
  '寅': [4, 1], '丑': [4, 2], '子': [4, 3], '亥': [4, 4],
};

const OPPOSITE_BRANCH = {
  '子': '午', '午': '子', '丑': '未', '未': '丑', '寅': '申', '申': '寅',
  '卯': '酉', '酉': '卯', '辰': '戌', '戌': '辰', '巳': '亥', '亥': '巳',
};

/* ---------- 工具 ---------- */
function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

function getPalace(astrolabe, name) {
  return astrolabe.palaces.find(p => p.name === name);
}

function getPalaceByBranch(astrolabe, branch) {
  return astrolabe.palaces.find(p => p.earthlyBranch === branch);
}

/* 取得宫内主星；空宫则借对宫，返回 {stars, borrowed} */
function effectiveMajorStars(astrolabe, palace) {
  if (palace.majorStars.length > 0) return { stars: palace.majorStars, borrowed: false };
  const opp = getPalaceByBranch(astrolabe, OPPOSITE_BRANCH[palace.earthlyBranch]);
  return { stars: opp ? opp.majorStars : [], borrowed: true };
}

function mutagenClass(m) {
  return { '禄': 'tag-lu', '权': 'tag-quan', '科': 'tag-ke', '忌': 'tag-ji' }[m] || '';
}

function starHtml(s, extraCls) {
  let html = `<span class="star ${extraCls || ''}">${s.name}`;
  if (s.brightness) html += `<sup class="brightness">${s.brightness}</sup>`;
  html += '</span>';
  if (s.mutagen) html += `<span class="tag ${mutagenClass(s.mutagen)}">化${s.mutagen}</span>`;
  return html;
}

/* ---------- 表单 ---------- */
const form = document.getElementById('birth-form');
const timeInput = document.getElementById('birth-time');
const shichenHint = document.getElementById('shichen-hint');

timeInput.addEventListener('input', () => {
  shichenHint.textContent = timeInput.value ? `对应时辰：${SHICHEN_NAMES[timeToIndex(timeInput.value)]}` : '';
});

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const input = {
    name: document.getElementById('name').value.trim(),
    gender: document.getElementById('gender').value,
    date: document.getElementById('birth-date').value,
    time: document.getElementById('birth-time').value,
    place: document.getElementById('birth-place').value.trim(),
    occupation: document.getElementById('occupation').value.trim(),
    marriage: document.getElementById('marriage').value,
    residence: document.getElementById('residence').value.trim(),
  };
  try {
    run(input);
  } catch (e) {
    alert('排盘失败：' + e.message);
    console.error(e);
  }
});

/* ---------- 主流程 ---------- */
function run(input) {
  const timeIndex = timeToIndex(input.time);
  const [y, m, d] = input.date.split('-').map(Number);
  const astrolabe = astro.bySolar(`${y}-${m}-${d}`, timeIndex, input.gender, true, 'zh-CN');
  const horo = astrolabe.horoscope(new Date());

  renderBasicInfo(astrolabe, horo, input, timeIndex);
  renderChart(astrolabe, horo);
  renderAnalysis(astrolabe, input);
  renderHoroscope(astrolabe, horo);
  renderSituation(astrolabe, horo, input);

  const result = document.getElementById('result');
  result.classList.remove('hidden');
  if (result.scrollIntoView) result.scrollIntoView({ behavior: 'smooth' });
}

/* ---------- 基本信息 ---------- */
function renderBasicInfo(a, horo, input, timeIndex) {
  const box = document.getElementById('basic-info');
  const items = [
    ['姓名', input.name || '—'],
    ['性别', input.gender === 'male' ? '男' : '女'],
    ['公历生日', `${input.date} ${input.time}`],
    ['农历生日', a.lunarDate],
    ['出生时辰', SHICHEN_NAMES[timeIndex]],
    ['出生地点', input.place || '—'],
    ['四柱（年月日时）', a.chineseDate],
    ['生肖 / 星座', `${a.zodiac} / ${a.sign}`],
    ['五行局', a.fiveElementsClass],
    ['命主 / 身主', `${a.soul} / ${a.body}`],
    ['命宫', (() => { const p = getPalace(a, '命宫'); return p.heavenlyStem + p.earthlyBranch; })()],
    ['身宫', (() => { const p = a.palaces.find(pp => pp.isBodyPalace); return `${p.heavenlyStem}${p.earthlyBranch}（${p.name}宫）`; })()],
    ['当前虚岁', `${horo.age.nominalAge} 岁`],
  ];
  box.innerHTML = items.map(([k, v]) => `<div class="info-item"><span class="info-key">${k}</span><span class="info-val">${v}</span></div>`).join('');
}

/* ---------- 十二宫盘面 ---------- */
function renderChart(a, horo) {
  const chart = document.getElementById('chart');
  chart.innerHTML = '';

  a.palaces.forEach((p, i) => {
    const [row, col] = BRANCH_GRID[p.earthlyBranch];
    const cell = el('div', 'palace-cell');
    cell.style.gridRow = row;
    cell.style.gridColumn = col;
    if (i === horo.decadal.index) cell.classList.add('current-decadal');
    if (i === horo.yearly.index) cell.classList.add('current-yearly');

    const { stars, borrowed } = effectiveMajorStars(a, p);
    let majorHtml = '';
    if (p.majorStars.length > 0) {
      majorHtml = p.majorStars.map(s => starHtml(s, 'star-major')).join(' ');
    } else if (stars.length > 0) {
      majorHtml = stars.map(s => `<span class="star star-borrow">${s.name}</span>`).join(' ') + '<span class="tag tag-borrow">借</span>';
    } else {
      majorHtml = '<span class="star-empty">空宫</span>';
    }

    const luckyHtml = p.minorStars.filter(s => ZW.MINOR_STARS[s.name] && ZW.MINOR_STARS[s.name].type === 'lucky')
      .map(s => `<span class="star star-lucky">${s.name}</span>`).join(' ');
    const unluckyHtml = p.minorStars.filter(s => ZW.MINOR_STARS[s.name] && ZW.MINOR_STARS[s.name].type === 'unlucky')
      .map(s => `<span class="star star-unlucky">${s.name}</span>`).join(' ');
    const adjHtml = p.adjectiveStars.slice(0, 4).map(s => `<span class="star star-adj">${s.name}</span>`).join(' ');

    const badges = [];
    if (p.isBodyPalace) badges.push('<span class="badge badge-body">身</span>');
    if (i === horo.decadal.index) badges.push('<span class="badge badge-decadal">大限</span>');
    if (i === horo.yearly.index) badges.push('<span class="badge badge-yearly">流年</span>');

    cell.innerHTML = `
      <div class="palace-header">
        <span class="palace-name">${p.name}</span>
        ${badges.join('')}
        <span class="palace-stem">${p.heavenlyStem}${p.earthlyBranch}</span>
      </div>
      <div class="palace-stars">${majorHtml}</div>
      <div class="palace-minor">${luckyHtml} ${unluckyHtml}</div>
      <div class="palace-adj">${adjHtml}</div>
      <div class="palace-footer">
        <span class="changsheng">${p.changsheng12}</span>
        <span class="decadal-range">${p.decadal.range[0]}-${p.decadal.range[1]}</span>
      </div>`;
    chart.appendChild(cell);
  });

  /* 中宫 */
  const center = el('div', 'palace-center');
  center.innerHTML = `
    <div class="center-title">紫微斗数</div>
    <div class="center-line">${a.fiveElementsClass}</div>
    <div class="center-line">${a.chineseDate}</div>
    <div class="center-line">命主：${a.soul} · 身主：${a.body}</div>
    <div class="center-note">外圈数字为大限虚岁</div>`;
  chart.appendChild(center);
}

/* ---------- 命盘解读 ---------- */
const KEY_PALACES = ['财帛', '官禄', '夫妻', '迁移', '福德'];

function describePalaceStars(a, palaceName) {
  const p = getPalace(a, palaceName);
  const { stars, borrowed } = effectiveMajorStars(a, p);
  const parts = [];

  if (stars.length === 0) {
    parts.push(`<p>${palaceName}宫为空宫且对宫亦无主星，此领域弹性大、受环境影响深，吉凶须看会照星曜。</p>`);
    return parts.join('');
  }

  const starNames = stars.map(s => s.name).join('、');
  let intro = `<p><strong>${palaceName}宫`;
  intro += borrowed ? `为空宫，借对宫 ${starNames} 论之。</strong>` : `坐 ${starNames}。</strong>`;
  intro += '</p>';
  parts.push(intro);

  stars.forEach(s => {
    const info = ZW.STARS[s.name];
    if (!info) return;
    let txt = info.palace[palaceName] || '';
    if (!borrowed && s.brightness && ZW.BRIGHTNESS[s.brightness]) {
      txt += `（${s.name}${ZW.BRIGHTNESS[s.brightness].mod}。）`;
    }
    if (s.mutagen) {
      txt += ` 本盘 ${s.name}化${s.mutagen}：${ZW.MUTAGENS[s.mutagen].desc}。`;
    }
    parts.push(`<p class="star-reading"><span class="star-label">${s.name}</span>${txt}</p>`);
  });

  /* 吉煞星提示 */
  const lucky = p.minorStars.filter(s => ZW.MINOR_STARS[s.name] && ZW.MINOR_STARS[s.name].type === 'lucky');
  const unlucky = p.minorStars.filter(s => ZW.MINOR_STARS[s.name] && ZW.MINOR_STARS[s.name].type === 'unlucky');
  if (lucky.length) parts.push(`<p class="minor-note lucky-note">✦ 会 ${lucky.map(s => s.name).join('、')}：${lucky.map(s => ZW.MINOR_STARS[s.name].desc).join('；')}。</p>`);
  if (unlucky.length) parts.push(`<p class="minor-note unlucky-note">✦ 会 ${unlucky.map(s => s.name).join('、')}：${unlucky.map(s => ZW.MINOR_STARS[s.name].desc).join('；')}，宜稳健应对。</p>`);

  return parts.join('');
}

function renderAnalysis(a, input) {
  const box = document.getElementById('analysis');
  const sections = [];
  const soulPalace = getPalace(a, '命宫');
  const { stars: soulStars, borrowed: soulBorrowed } = effectiveMajorStars(a, soulPalace);

  /* —— 总论：命宫 —— */
  let soulHtml = '<h3>① 命宫总论 — 你的本命格局</h3>';
  if (soulStars.length === 0) {
    soulHtml += '<p>命宫为空宫且对宫无主星，性格弹性极大，深受成长环境塑造。</p>';
  } else {
    const names = soulStars.map(s => s.name).join('、');
    soulHtml += `<p><strong>命宫位于${soulPalace.heavenlyStem}${soulPalace.earthlyBranch}，${soulBorrowed ? `空宫借对宫 ${names} 守命` : `${names} 守命`}。</strong></p>`;
    soulStars.forEach(s => {
      const info = ZW.STARS[s.name];
      if (!info) return;
      soulHtml += `<div class="soul-star">
        <h4>${s.name} <span class="star-kw">${info.keywords}</span></h4>
        <p>${info.soul}</p>`;
      if (!soulBorrowed && s.brightness && ZW.BRIGHTNESS[s.brightness]) {
        soulHtml += `<p class="brightness-note">此盘中${s.name}${ZW.BRIGHTNESS[s.brightness].mod}。</p>`;
      }
      if (s.mutagen) {
        soulHtml += `<p class="brightness-note">${s.name}化${s.mutagen}坐命：${ZW.MUTAGENS[s.mutagen].desc}，此特质将贯穿一生。</p>`;
      }
      soulHtml += '</div>';
    });
    if (soulStars.length === 2 && !soulBorrowed) {
      soulHtml += `<p class="combo-note">命宫双星同守，两星特质交织互补：既有${ZW.STARS[soulStars[0].name].keywords.split(' · ')[1] || ''}的一面，又有${ZW.STARS[soulStars[1].name].keywords.split(' · ')[1] || ''}的一面，性格层次丰富。</p>`;
    }
  }
  /* 命宫吉煞 */
  const sLucky = soulPalace.minorStars.filter(s => ZW.MINOR_STARS[s.name] && ZW.MINOR_STARS[s.name].type === 'lucky');
  const sUnlucky = soulPalace.minorStars.filter(s => ZW.MINOR_STARS[s.name] && ZW.MINOR_STARS[s.name].type === 'unlucky');
  if (sLucky.length) soulHtml += `<p class="minor-note lucky-note">✦ 命宫会 ${sLucky.map(s => s.name).join('、')}：${sLucky.map(s => ZW.MINOR_STARS[s.name].desc).join('；')}。</p>`;
  if (sUnlucky.length) soulHtml += `<p class="minor-note unlucky-note">✦ 命宫会 ${sUnlucky.map(s => s.name).join('、')}：${sUnlucky.map(s => ZW.MINOR_STARS[s.name].desc).join('；')}。</p>`;
  sections.push(soulHtml);

  /* —— 五行局 / 命主身主 / 身宫 —— */
  const bodyPalace = a.palaces.find(p => p.isBodyPalace);
  let metaHtml = '<h3>② 格局基底</h3>';
  metaHtml += `<p><strong>五行局 · ${a.fiveElementsClass}：</strong>${ZW.FIVE_ELEMENTS[a.fiveElementsClass] || ''}</p>`;
  metaHtml += `<p><strong>命主 ${a.soul} · 身主 ${a.body}：</strong>${ZW.SOUL_BODY_NOTE}</p>`;
  metaHtml += `<p><strong>身宫落于${bodyPalace.name}宫：</strong>身宫代表后天着力点与中年后的人生重心——你的后天发展与「${ZW.PALACE_MEANINGS[bodyPalace.name]}」息息相关，经营好这个领域，人生下半场便有了着力之处。</p>`;
  sections.push(metaHtml);

  /* —— 重点宫位 —— */
  let keyHtml = '<h3>③ 重点宫位解读</h3>';
  KEY_PALACES.forEach(name => {
    keyHtml += `<div class="palace-section"><h4>${name}宫 <span class="palace-sub">${ZW.PALACE_MEANINGS[name]}</span></h4>${describePalaceStars(a, name)}</div>`;
  });
  sections.push(keyHtml);

  /* —— 其余宫位一句话 —— */
  const restNames = ['兄弟', '子女', '疾厄', '仆役', '田宅', '父母'];
  let restHtml = '<h3>④ 其余宫位速览</h3><ul class="rest-list">';
  restNames.forEach(name => {
    const p = getPalace(a, name);
    const { stars, borrowed } = effectiveMajorStars(a, p);
    const starStr = stars.length ? stars.map(s => s.name + (s.mutagen ? `(化${s.mutagen})` : '')).join('、') + (borrowed ? '（借对宫）' : '') : '空宫';
    const kw = stars.length && ZW.STARS[stars[0].name] ? ZW.STARS[stars[0].name].keywords : '';
    restHtml += `<li><strong>${name}宫</strong>（${ZW.PALACE_MEANINGS[name]}）：${starStr}${kw ? ` — ${kw}` : ''}</li>`;
  });
  restHtml += '</ul>';
  sections.push(restHtml);

  /* —— 生年四化总览 —— */
  let sihuaHtml = '<h3>⑤ 生年四化 — 一生的能量分布</h3><p>生年四化由出生年天干引动，是命盘中最核心的能量标记：</p>';
  a.palaces.forEach(p => {
    p.majorStars.concat(p.minorStars).forEach(s => {
      if (s.mutagen) {
        sihuaHtml += `<p class="sihua-item"><span class="tag ${mutagenClass(s.mutagen)}">化${s.mutagen}</span> <strong>${s.name}</strong>（${p.name}宫）— ${ZW.MUTAGENS[s.mutagen].inPalace(p.name)}</p>`;
      }
    });
  });
  sections.push(sihuaHtml);

  box.innerHTML = sections.join('');
}

/* ---------- 大限流年 ---------- */
function renderHoroscope(a, horo) {
  const box = document.getElementById('horoscope');
  const dp = a.palaces[horo.decadal.index];
  const yp = a.palaces[horo.yearly.index];
  const { stars: dStars, borrowed: dBorrowed } = effectiveMajorStars(a, dp);
  const now = new Date();

  let html = `<h3>① 当前大限（${dp.decadal.range[0]} - ${dp.decadal.range[1]} 虚岁）</h3>`;
  html += `<p>你当前虚岁 <strong>${horo.age.nominalAge}</strong> 岁，正行 <strong>${dp.decadal.heavenlyStem}${dp.decadal.earthlyBranch}大限</strong>，大限命宫落在本命 <strong>${dp.name}宫</strong>（${dp.earthlyBranch}位）。这十年的人生主旋律与「${ZW.PALACE_MEANINGS[dp.name]}」密切相关。</p>`;

  if (dStars.length) {
    const names = dStars.map(s => s.name).join('、');
    html += `<p>大限命宫${dBorrowed ? '借对宫' : '坐'} ${names}：`;
    html += dStars.map(s => ZW.STARS[s.name] ? `${s.name}主${ZW.STARS[s.name].keywords.replace(/ · /g, '、')}` : '').filter(Boolean).join('；');
    html += '。这十年的气质与际遇带有上述星曜的色彩。</p>';
  } else {
    html += '<p>大限命宫为空宫，这十年环境变数较大，宜以不变应万变、稳扎稳打。</p>';
  }

  const dm = horo.decadal.mutagen;
  html += `<p><strong>大限四化：</strong>${dm[0]}化禄、${dm[1]}化权、${dm[2]}化科、${dm[3]}化忌。`;
  const jiStarPalace = a.palaces.find(p => p.majorStars.concat(p.minorStars).some(s => s.name === dm[3]));
  const luStarPalace = a.palaces.find(p => p.majorStars.concat(p.minorStars).some(s => s.name === dm[0]));
  if (luStarPalace) html += `${dm[0]}化禄入本命${luStarPalace.name}宫，十年好运聚焦于「${ZW.PALACE_MEANINGS[luStarPalace.name]}」；`;
  if (jiStarPalace) html += `${dm[3]}化忌入本命${jiStarPalace.name}宫，「${ZW.PALACE_MEANINGS[jiStarPalace.name]}」是这十年须用心经营的课题。`;
  html += '</p>';

  html += `<h3>② ${now.getFullYear()} 流年</h3>`;
  html += `<p>今年为 <strong>${horo.yearly.heavenlyStem}${horo.yearly.earthlyBranch}年</strong>，流年命宫落在本命 <strong>${yp.name}宫</strong>（${yp.earthlyBranch}位）。年度焦点与「${ZW.PALACE_MEANINGS[yp.name]}」相关。</p>`;
  const ym = horo.yearly.mutagen;
  html += `<p><strong>流年四化：</strong>${ym[0]}化禄、${ym[1]}化权、${ym[2]}化科、${ym[3]}化忌。`;
  const yJiPalace = a.palaces.find(p => p.majorStars.concat(p.minorStars).some(s => s.name === ym[3]));
  const yLuPalace = a.palaces.find(p => p.majorStars.concat(p.minorStars).some(s => s.name === ym[0]));
  if (yLuPalace) html += `今年 ${ym[0]}化禄入本命${yLuPalace.name}宫，年度机缘在「${ZW.PALACE_MEANINGS[yLuPalace.name]}」；`;
  if (yJiPalace) html += `${ym[3]}化忌入本命${yJiPalace.name}宫，「${ZW.PALACE_MEANINGS[yJiPalace.name]}」方面今年宜谨慎保守。`;
  html += '</p>';

  box.innerHTML = html;
}

/* ---------- 结合现状 ---------- */
function renderSituation(a, horo, input) {
  const card = document.getElementById('situation-card');
  const box = document.getElementById('situation');
  const parts = [];

  if (input.occupation) {
    const p = getPalace(a, '官禄');
    const { stars } = effectiveMajorStars(a, p);
    const dp = a.palaces[horo.decadal.index];
    let html = `<div class="palace-section"><h4>关于职业：「${input.occupation}」</h4>`;
    html += describePalaceStars(a, '官禄');
    html += `<p>当前大限走本命<strong>${dp.name}宫</strong>（${dp.decadal.range[0]}-${dp.decadal.range[1]} 虚岁），`;
    if (['官禄', '财帛', '迁移'].includes(dp.name)) {
      html += '正是事业财运变化的关键十年，职业上的转折往往伴随新机会，宜主动布局。';
    } else {
      html += `人生重心偏向「${ZW.PALACE_MEANINGS[dp.name]}」。职业变动期不妨借此沉淀，从大限主题中寻找新方向。`;
    }
    if (stars.length) {
      const suited = stars.map(s => ZW.STARS[s.name] ? ZW.STARS[s.name].palace['官禄'] : '').filter(Boolean);
      if (suited.length) html += `</p><p><strong>转职方向参考：</strong>${suited.join(' ')}`;
    }
    html += '</p></div>';
    parts.push(html);
  }

  if (input.marriage) {
    const labels = { single: '未婚', married: '已婚', divorced: '离异', widowed: '丧偶' };
    let html = `<div class="palace-section"><h4>关于婚姻：${labels[input.marriage] || input.marriage}</h4>`;
    html += describePalaceStars(a, '夫妻');
    if (input.marriage === 'married') {
      html += '<p>已婚者看夫妻宫重在「经营之道」——上述星性提示了相处中最该用心的方向。</p>';
    } else if (input.marriage === 'single') {
      html += '<p>未婚者看夫妻宫可参考未来对象的特质倾向与合适的相处模式。</p>';
    }
    html += '</div>';
    parts.push(html);
  }

  if (input.residence) {
    let html = `<div class="palace-section"><h4>关于居住地：${input.residence}</h4>`;
    if (input.place && !input.residence.includes(input.place.slice(0, 2))) {
      html += '<p>你目前居住地与出生地不同，属「离乡发展」之局，迁移宫的影响因此放大：</p>';
    }
    html += describePalaceStars(a, '迁移');
    html += '</div>';
    parts.push(html);
  }

  if (parts.length) {
    box.innerHTML = parts.join('');
    card.classList.remove('hidden');
  } else {
    card.classList.add('hidden');
  }
}
