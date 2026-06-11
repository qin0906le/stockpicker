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
    ['身宫', (() => { const p = a.palaces.find(pp => pp.isBodyPalace); return `${p.heavenlyStem}${p.earthlyBranch}（${g(p.name)}）`; })()],
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
  metaHtml += `<p><strong>身宫落于${g(bodyPalace.name)}：</strong>身宫代表后天着力点与中年后的人生重心——你的后天发展与「${ZW.PALACE_MEANINGS[bodyPalace.name]}」息息相关，经营好这个领域，人生下半场便有了着力之处。</p>`;
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
        sihuaHtml += `<p class="sihua-item"><span class="tag ${mutagenClass(s.mutagen)}">化${s.mutagen}</span> <strong>${s.name}</strong>（${g(p.name)}）— ${ZW.MUTAGENS[s.mutagen].inPalace(p.name)}</p>`;
      }
    });
  });
  sections.push(sihuaHtml);

  box.innerHTML = sections.join('');
}

/* ============================================================
   大限 · 流年 · 流月 深度分析
   ============================================================ */

/* 找某星所在本命宫 */
function findStarPalace(a, starName) {
  return a.palaces.find(p =>
    p.majorStars.concat(p.minorStars).some(s => s.name === starName)
  );
}

/* 从基准宫起（逆地支序）偏移N步 */
function hPos(baseIdx, offset) {
  return (baseIdx - offset + 12) % 12;
}

/* 收集某宫受到的所有四化 [{tag,star,from}] */
function collectEffects(a, palaceIdx, dm, ym) {
  const pName = a.palaces[palaceIdx].name;
  const out = [];
  const checkSet = (muts, label) =>
    muts.forEach((star, i) => {
      const sp = findStarPalace(a, star);
      if (sp && sp.name === pName)
        out.push({ tag: ['禄','权','科','忌'][i], star, from: label });
    });
  checkSet(dm, '大限');
  checkSet(ym, '流年');
  return out;
}

/* 宫位在某盘（大限/流年）中扮演的角色 */
const PALACE_SEQ = ['命宫','兄弟','夫妻','子女','财帛','疾厄','迁移','仆役','官禄','田宅','福德','父母'];
function palaceRole(baseIdx, targetIdx) {
  return PALACE_SEQ[((baseIdx - targetIdx) + 12) % 12];
}

/* 宫位名称显示辅助：命宫已含「宫」，其余加「宫」 */
function g(name) { return name && name.endsWith('宫') ? name : (name || '') + '宫'; }

/* sihuaBlock 已废弃，保留占位 */
function sihuaBlock() { return ''; }

/* 域运分析卡片 */
function domainCard(icon, title, yearlyRoleName, nativePalaceIdx, a, dm, ym, extraNote) {
  const p = a.palaces[nativePalaceIdx];
  const { stars, borrowed } = effectiveMajorStars(a, p);
  const starStr = stars.length
    ? stars.map(s => s.name + (s.brightness ? `<sup>${s.brightness}</sup>` : '') + (s.mutagen ? `<span class="tag ${mutagenClass(s.mutagen)} tag-xs">化${s.mutagen}</span>` : '')).join('、')
      + (borrowed ? '<span class="tag tag-borrow tag-xs">借</span>' : '')
    : '<span class="star-empty">空宫</span>';

  const effects = collectEffects(a, nativePalaceIdx, dm, ym);
  const hasJi = effects.some(e => e.tag === '忌');
  const hasLu = effects.some(e => e.tag === '禄');
  const hasKe = effects.some(e => e.tag === '科');
  const hasQuan = effects.some(e => e.tag === '权');

  let tone = 'domain-neutral';
  if (hasJi && (hasLu || hasKe)) tone = 'domain-mixed';
  else if (hasJi) tone = 'domain-caution';
  else if (hasLu || hasKe || hasQuan) tone = 'domain-good';

  const toneLabel = { 'domain-good': '利', 'domain-caution': '慎', 'domain-mixed': '混', 'domain-neutral': '平' }[tone];

  const effectTags = effects.map(e =>
    `<span class="tag ${mutagenClass(e.tag)} tag-xs">${e.from}化${e.tag}</span>`
  ).join(' ');

  return `<div class="domain-card ${tone}">
    <div class="domain-head">
      <span class="domain-icon">${icon}</span>
      <span class="domain-title">${title}</span>
      <span class="domain-tone">${toneLabel}</span>
    </div>
    <div class="domain-palace-row">流年${yearlyRoleName}宫 · 本命<strong>${g(p.name)}</strong></div>
    <div class="domain-stars">${starStr}</div>
    ${effects.length ? `<div class="domain-effects">${effectTags}</div>` : ''}
    ${extraNote ? `<div class="domain-note">${extraNote}</div>` : ''}
  </div>`;
}

function renderHoroscope(a, horo) {
  const box = document.getElementById('horoscope');
  const DI  = horo.decadal.index;
  const YI  = horo.yearly.index;
  const dp  = a.palaces[DI];
  const yp  = a.palaces[YI];
  const dm  = horo.decadal.mutagen;
  const ym  = horo.yearly.mutagen;
  const { stars: dStars, borrowed: dBorrowed } = effectiveMajorStars(a, dp);
  const now = new Date();
  const yr  = now.getFullYear();

  /* ---- 大限 ---- */
  let decHtml = '';

  /* 概述 */
  const dStarDesc = dStars.length
    ? `大限命宫${dBorrowed ? '借对宫' : '坐'} <strong>${dStars.map(s=>s.name).join('、')}</strong>，`
      + dStars.map(s => ZW.STARS[s.name] ? `${s.name}主${ZW.STARS[s.name].keywords.replace(/ · /g,', ')}` : '').filter(Boolean).join('；')
      + '，十年气质偏向此星性。'
    : '大限命宫为空宫，借对宫星论，这十年弹性大、受外境影响深。';

  decHtml += `<div class="horo-overview">
    <p>当前虚岁 <strong>${horo.age.nominalAge}</strong> 岁，正走
    <strong>${horo.decadal.heavenlyStem}${horo.decadal.earthlyBranch}大限</strong>
    （${dp.decadal.range[0]} — ${dp.decadal.range[1]} 虚岁），
    大限命宫落在本命 <strong>${g(dp.name)}</strong>（${dp.earthlyBranch}，天干${dp.heavenlyStem}）。
    「${ZW.PALACE_MEANINGS[dp.name]}」是这十年的人生主旋律。</p>
    <p>${dStarDesc}</p>
  </div>`;

  /* 大限三方四正 */
  const decKeyMap = [
    ['官禄', 8, '事业发展方向'],
    ['财帛', 4, '十年财运来源'],
    ['夫妻', 2, '感情婚姻格局'],
    ['疾厄', 5, '健康注意事项'],
  ];
  decHtml += '<table class="horo-table"><thead><tr><th>大限宫位</th><th>对应本命宫</th><th>本命主星</th><th>十年意义</th></tr></thead><tbody>';
  decKeyMap.forEach(([role, offset, meaning]) => {
    const idx = hPos(DI, offset);
    const p   = a.palaces[idx];
    const { stars, borrowed } = effectiveMajorStars(a, p);
    const sts = stars.length ? stars.map(s => s.name + (s.mutagen ? '化'+s.mutagen : '')).join('、') + (borrowed ? '（借对）':  '') : '空宫';
    decHtml += `<tr>
      <td><strong>大限${role}宫</strong></td>
      <td>${g(p.name)}（${p.earthlyBranch}）</td>
      <td>${sts}</td>
      <td class="text-dim">${meaning}</td>
    </tr>`;
  });
  decHtml += '</tbody></table>';

  /* 大限四化 */
  decHtml += '<h4 class="horo-sub">大限四化详解</h4>';
  decHtml += '<div class="sihua-block">';
  const dTags = ['禄','权','科','忌'];
  const dCls  = ['tag-lu','tag-quan','tag-ke','tag-ji'];
  const dDescs = [
    (star, p) => `此宫为大限「财禄吉门」，「${ZW.PALACE_MEANINGS[p.name]}」十年顺遂、机缘丰沛，宜主动出击把握。`,
    (star, p) => `此宫为大限「能力权柄」之处，「${ZW.PALACE_MEANINGS[p.name]}」方面十年能掌握主动权，是发力点。`,
    (star, p) => `此宫为大限「名声贵人」所在，「${ZW.PALACE_MEANINGS[p.name]}」方面易得口碑与提携，遇难逢解。`,
    (star, p) => `此宫为大限「执念课题」，「${ZW.PALACE_MEANINGS[p.name]}」是十年最大考验与修炼，须以平常心面对。`,
  ];
  dm.forEach((star, i) => {
    const sp = findStarPalace(a, star);
    if (!sp) return;
    const spIdx = a.palaces.findIndex(q => q.name === sp.name);
    /* 叠化检测（对比流年） */
    const yrEffectsHere = collectEffects(a, spIdx, [], ym);
    let badge = '';
    const yHere = yrEffectsHere;
    if (dTags[i] === '忌' && yHere.some(e => e.tag === '忌'))
      badge = '<span class="overlap-badge overlap-bad">⚠ 今年叠化双忌</span>';
    else if (dTags[i] === '忌' && yHere.some(e => e.tag === '禄'))
      badge = '<span class="overlap-badge overlap-mixed">今年禄忌交冲</span>';
    else if (dTags[i] === '禄' && yHere.some(e => e.tag === '忌'))
      badge = '<span class="overlap-badge overlap-mixed">今年禄忌交冲</span>';
    else if (dTags[i] === '禄' && yHere.some(e => e.tag === '禄'))
      badge = '<span class="overlap-badge overlap-good">今年双禄叠吉</span>';

    decHtml += `<div class="sihua-row">
      <span class="tag ${dCls[i]}">${star}化${dTags[i]}</span>
      <span class="sihua-arrow">→</span>
      <span class="sihua-dest">本命<strong>${g(sp.name)}</strong>（${sp.earthlyBranch}）</span>
      <span class="sihua-desc">${dDescs[i](star, sp)}</span>
      ${badge}
    </div>`;
  });
  decHtml += '</div>';

  /* 大限总评 */
  const dLuPalace = findStarPalace(a, dm[0]);
  const dJiPalace = findStarPalace(a, dm[3]);
  const dLuRole   = dLuPalace ? palaceRole(DI, a.palaces.findIndex(q => q.name === dLuPalace.name)) : '';
  const dJiRole   = dJiPalace ? palaceRole(DI, a.palaces.findIndex(q => q.name === dJiPalace.name)) : '';

  decHtml += `<div class="horo-summary">
    <p><strong>十年格局总评：</strong>`;
  if (dLuPalace) {
    decHtml += `大限<span class="tag tag-lu">化禄</span>落在本命${g(dLuPalace.name)}`;
    if (dLuRole) decHtml += `（大限${g(dLuRole)}）`;
    decHtml += `，「${ZW.PALACE_MEANINGS[dLuPalace.name]}」是这十年最有财禄与机缘的领域，宜集中精力经营。`;
  }
  if (dJiPalace) {
    decHtml += `大限<span class="tag tag-ji">化忌</span>落在本命${g(dJiPalace.name)}`;
    if (dJiRole) decHtml += `（大限${g(dJiRole)}）`;
    decHtml += `，「${ZW.PALACE_MEANINGS[dJiPalace.name]}」方面十年多波折执念，是修炼重点，不宜回避，宜坦然面对。`;
  }
  decHtml += '</p></div>';

  /* ---- 流年 ---- */
  let yrHtml = '';
  const { stars: yStars, borrowed: yBorrowed } = effectiveMajorStars(a, yp);

  yrHtml += `<div class="horo-overview">
    <p>今年为 <strong>${horo.yearly.heavenlyStem}${horo.yearly.earthlyBranch}年</strong>，
    流年命宫落在本命 <strong>${g(yp.name)}</strong>（${yp.earthlyBranch}，天干${yp.heavenlyStem}）。
    今年人生主旋律聚焦于「${ZW.PALACE_MEANINGS[yp.name]}」，
    ${yStars.length
      ? `流年命宫${yBorrowed ? '借对宫' : '坐'} <strong>${yStars.map(s=>s.name).join('、')}</strong>，今年行事风格带有此星特质。`
      : '流年命宫为空宫，今年处于蓄势积累阶段，宜务实稳健。'
    }</p>
  </div>`;

  /* 六大领域今年运势 */
  yrHtml += '<h4 class="horo-sub">六大领域今年运势</h4>';
  yrHtml += '<div class="domain-grid">';

  /* 官禄：同时检查流年官禄宫 + 本命官禄宫 */
  const yrCareerIdx    = hPos(YI, 8);
  const nativeCareerP  = getPalace(a, '官禄');
  const nativeCareerIdx = a.palaces.findIndex(p => p.name === '官禄');
  const careerEffectsYr = collectEffects(a, yrCareerIdx, dm, ym);
  const careerEffectsNative = nativeCareerIdx !== yrCareerIdx
    ? collectEffects(a, nativeCareerIdx, dm, ym) : [];
  /* 合并去重，native来源标注"直入本命官禄" */
  const allCareerEffects = [
    ...careerEffectsYr,
    ...careerEffectsNative.map(e => ({ ...e, fromNote: '直入本命官禄宫' })),
  ];
  /* 计算事业卡tone（综合两宫） */
  const careerJi  = allCareerEffects.some(e => e.tag === '忌');
  const careerLu  = allCareerEffects.some(e => e.tag === '禄');
  const careerKe  = allCareerEffects.some(e => e.tag === '科');
  const careerQuan = allCareerEffects.some(e => e.tag === '权');
  let careerTone = 'domain-neutral';
  if (careerJi && (careerLu || careerKe)) careerTone = 'domain-mixed';
  else if (careerJi) careerTone = 'domain-caution';
  else if (careerLu || careerKe || careerQuan) careerTone = 'domain-good';
  const careerToneLabel = { 'domain-good':'利','domain-caution':'慎','domain-mixed':'混','domain-neutral':'平' }[careerTone];
  const careerEffectTags = allCareerEffects.map(e =>
    `<span class="tag ${mutagenClass(e.tag)} tag-xs">${e.from}化${e.tag}${e.fromNote ? '<sup>*</sup>' : ''}</span>`
  ).join(' ');
  const careerNote = (() => {
    const parts = [];
    if (careerLu) parts.push(`化禄护航，事业机缘多`);
    if (careerKe) {
      const ke = allCareerEffects.find(e=>e.tag==='科');
      parts.push(`${ke.from}化科${ke.fromNote ? '直入本命官禄宫' : '入流年官禄宫'}，职场名声好、利求职签约文书`);
    }
    if (careerJi) parts.push(`化忌提醒，职场防口舌与人事纠纷`);
    if (!parts.length) return '今年事业宫无四化，靠本命官禄基本盘稳步前行。';
    let note = parts.join('；') + '。';
    if (careerEffectsNative.length) note += ` （注：部分四化直接入本命官禄宫，效力更直接。）`;
    return note;
  })();
  /* 直接构建卡片避免domainCard的tone计算被覆盖 */
  const careerP = a.palaces[yrCareerIdx];
  const { stars: cStars, borrowed: cBorrowed } = effectiveMajorStars(a, careerP);
  const cStarStr = cStars.length
    ? cStars.map(s => s.name + (s.brightness ? `<sup>${s.brightness}</sup>` : '') + (s.mutagen ? `<span class="tag ${mutagenClass(s.mutagen)} tag-xs">化${s.mutagen}</span>` : '')).join('、') + (cBorrowed ? '<span class="tag tag-borrow tag-xs">借</span>' : '')
    : '<span class="star-empty">空宫</span>';
  yrHtml += `<div class="domain-card ${careerTone}">
    <div class="domain-head">
      <span class="domain-icon">💼</span>
      <span class="domain-title">事业求职</span>
      <span class="domain-tone">${careerToneLabel}</span>
    </div>
    <div class="domain-palace-row">流年官禄宫 · 本命<strong>${g(careerP.name)}</strong></div>
    <div class="domain-stars">${cStarStr}</div>
    ${allCareerEffects.length ? `<div class="domain-effects">${careerEffectTags}</div>` : ''}
    <div class="domain-note">${careerNote}</div>
  </div>`;

  /* 财帛 */
  const yrWealthIdx = hPos(YI, 4);
  yrHtml += domainCard('💰','财运','财帛', yrWealthIdx, a, dm, ym,
    (() => {
      const effects = collectEffects(a, yrWealthIdx, dm, ym);
      if (!effects.length) return '流年财帛宫无四化直入，财运平稳，量入为出即可。';
      const lu = effects.find(e=>e.tag==='禄'), ji = effects.find(e=>e.tag==='忌');
      if (lu && ji) return '禄忌同宫，有财有耗，赚与花两头走，宜开源节流并重，防非预期支出。';
      if (lu) return '化禄入财帛，正财偏财皆有动，宜把握机会积极创收。';
      if (ji) return '化忌入财帛，今年财运有波折，宜保守理财，不宜高风险投资或大额借贷。';
      return '流年财帛宫受化科/化权，财运平稳偏正，适合按部就班积累。';
    })()
  );

  /* 感情 */
  const yrLoveIdx = hPos(YI, 2);
  yrHtml += domainCard('💑','感情婚姻','夫妻', yrLoveIdx, a, dm, ym,
    (() => {
      const effects = collectEffects(a, yrLoveIdx, dm, ym);
      if (!effects.length) return '流年夫妻宫无四化直入，感情婚姻格局稳定，维持现状为主。';
      const lu = effects.find(e=>e.tag==='禄'), ji = effects.find(e=>e.tag==='忌'), quan = effects.find(e=>e.tag==='权');
      const parts = [];
      if (lu) parts.push('化禄入夫妻，感情有好缘，已婚者感情升温');
      if (quan) parts.push('化权入夫妻，感情中有一方较主导，宜互相尊重');
      if (ji) parts.push('化忌入夫妻，感情或婚姻有波折考验，宜多沟通、慎防误解');
      return parts.join('；') + '。';
    })()
  );

  /* 健康 */
  const yrHealthIdx = hPos(YI, 5);
  yrHtml += domainCard('🏥','健康','疾厄', yrHealthIdx, a, dm, ym,
    (() => {
      const p = a.palaces[yrHealthIdx];
      const effects = collectEffects(a, yrHealthIdx, dm, ym);
      const { stars } = effectiveMajorStars(a, p);
      const healthStars = {
        '武曲': '金属骨骼、呼吸系统、肺',
        '贪狼': '神经系统、内分泌、口腔',
        '廉贞': '心血管、血液循环、妇科',
        '天机': '神经过敏、关节、肝胆',
        '太阳': '眼睛、心脏、血压',
        '太阴': '肾、泌尿、妇科',
        '天同': '脾胃、消化、泌尿',
        '巨门': '肠胃、咽喉、口腔',
        '七杀': '外伤、骨骼、手术',
        '破军': '泌尿、肾、破耗体能',
      };
      const focus = stars.filter(s => healthStars[s.name]).map(s => healthStars[s.name]).join('、');
      let note = focus ? `注意 ${focus}。` : '';
      const ji = effects.find(e=>e.tag==='忌');
      if (ji) note += `${ji.from}化忌入此宫，今年健康须特别关注，宜定期检查、规律作息。`;
      else if (!effects.length) note += '今年健康宫无四化冲入，宜保持日常养生即可。';
      return note;
    })()
  );

  /* 人际贵人 */
  const yrSocialIdx = hPos(YI, 7);
  yrHtml += domainCard('🤝','人际贵人','仆役', yrSocialIdx, a, dm, ym,
    (() => {
      const effects = collectEffects(a, yrSocialIdx, dm, ym);
      if (!effects.length) return '流年仆役宫无四化，人际关系平稳，人脉可靠。';
      const lu = effects.find(e=>e.tag==='禄'), ji = effects.find(e=>e.tag==='忌');
      if (lu) return '化禄入仆役，今年人脉扩展、贵人多，宜主动社交。';
      if (ji) return '化忌入仆役，今年人际有是非或失去部分助力，慎选合作对象。';
      return '人际宫有化科/化权，今年在圈内建立名声、可发挥领导力。';
    })()
  );

  /* 迁移 */
  const yrMoveIdx = hPos(YI, 6);
  yrHtml += domainCard('✈️','迁移出行','迁移', yrMoveIdx, a, dm, ym,
    (() => {
      const effects = collectEffects(a, yrMoveIdx, dm, ym);
      if (!effects.length) return '流年迁移宫无四化，出行平稳，适合当下居住地稳步发展。';
      const lu = effects.find(e=>e.tag==='禄'), ji = effects.find(e=>e.tag==='忌');
      if (lu && ji) return '禄忌同临迁移，外出机缘不少但也有变数，出行或换环境宜做充分准备。';
      if (lu) return '化禄入迁移，今年在外运势佳、贵人多，有利外派、异地发展、出差。';
      if (ji) return '化忌入迁移，今年出行变数多，跨地区事务宜谨慎规划，防途中意外。';
      return '迁移宫有化科/化权，今年在外能建立名声或掌握主动权。';
    })()
  );

  yrHtml += '</div>';

  /* 流年四化详解 */
  yrHtml += '<h4 class="horo-sub">流年四化详解</h4>';
  yrHtml += '<div class="sihua-block">';
  const yTags = ['禄','权','科','忌'];
  const yCls  = ['tag-lu','tag-quan','tag-ke','tag-ji'];
  const yDescs = [
    (star, p) => `今年「${ZW.PALACE_MEANINGS[p.name]}」方面机缘亨通、财禄流动，宜积极出击，好运不等人。`,
    (star, p) => `今年「${ZW.PALACE_MEANINGS[p.name]}」方面能量旺盛、可掌握主动权，遇到决策机会要敢于主导。`,
    (star, p) => `今年「${ZW.PALACE_MEANINGS[p.name]}」方面名声与口碑有加持，贵人自来，文书、考试、应聘等有利。`,
    (star, p) => `今年「${ZW.PALACE_MEANINGS[p.name]}」方面执念最深、波折最多，切勿强求，以退为进是最佳策略。`,
  ];
  ym.forEach((star, i) => {
    const sp = findStarPalace(a, star);
    if (!sp) return;
    const spIdx = a.palaces.findIndex(q => q.name === sp.name);
    /* 流年宫位角色 */
    const yrRole = palaceRole(YI, spIdx);
    /* 叠化检测（对比大限） */
    const dcEffectsHere = collectEffects(a, spIdx, dm, []).filter(e => e.from === '大限');
    let badge = '';
    if (yTags[i] === '忌' && dcEffectsHere.some(e => e.tag === '忌'))
      badge = '<span class="overlap-badge overlap-bad">⚠ 大限亦化忌（双忌叠冲）</span>';
    else if (yTags[i] === '忌' && dcEffectsHere.some(e => e.tag === '禄'))
      badge = '<span class="overlap-badge overlap-mixed">大限化禄在此（禄忌交冲）</span>';
    else if (yTags[i] === '禄' && dcEffectsHere.some(e => e.tag === '忌'))
      badge = '<span class="overlap-badge overlap-mixed">大限化忌在此（禄随忌走）</span>';
    else if (yTags[i] === '禄' && dcEffectsHere.some(e => e.tag === '禄'))
      badge = '<span class="overlap-badge overlap-good">大限亦化禄（双禄叠吉）</span>';

    yrHtml += `<div class="sihua-row">
      <span class="tag ${yCls[i]}">${star}化${yTags[i]}</span>
      <span class="sihua-arrow">→</span>
      <span class="sihua-dest">本命<strong>${g(sp.name)}</strong>（${sp.earthlyBranch}）
        <span class="sihua-role">流年${g(yrRole)}</span>
      </span>
      <span class="sihua-desc">${yDescs[i](star, sp)}</span>
      ${badge}
    </div>`;
  });
  yrHtml += '</div>';

  /* 大限×流年叠化互动 */
  const overlapPalaces = [];
  a.palaces.forEach((p, idx) => {
    const dcE = collectEffects(a, idx, dm, []).filter(e => e.from === '大限');
    const yrE = collectEffects(a, idx, [], ym).filter(e => e.from === '流年');
    if (dcE.length && yrE.length) {
      overlapPalaces.push({ palace: p, dc: dcE, yr: yrE });
    }
  });

  if (overlapPalaces.length) {
    yrHtml += '<h4 class="horo-sub">大限 × 流年交会分析</h4>';
    yrHtml += '<div class="overlap-section">';
    overlapPalaces.forEach(({ palace, dc, yr }) => {
      const dcJi = dc.some(e => e.tag === '忌'), yrJi = yr.some(e => e.tag === '忌');
      const dcLu = dc.some(e => e.tag === '禄'), yrLu = yr.some(e => e.tag === '禄');
      let severity = '', advice = '';
      if (dcJi && yrJi) {
        severity = '<span class="overlap-badge overlap-bad">⚠ 双忌叠冲</span>';
        advice = `本命<strong>${g(palace.name)}</strong>今年同时受大限与流年化忌冲击，是全年压力最大的领域，「${ZW.PALACE_MEANINGS[palace.name]}」须极度谨慎，凡事不宜强求，以守为攻为上策。`;
      } else if ((dcJi && yrLu) || (dcLu && yrJi)) {
        severity = '<span class="overlap-badge overlap-mixed">禄忌交冲</span>';
        advice = `本命<strong>${g(palace.name)}</strong>同时受到化禄与化忌进驻，「${ZW.PALACE_MEANINGS[palace.name]}」今年机缘与考验并存，有赚有耗、有得有失；可积极把握机会，但须同步做好风险把控，禄来忌走切记不贪。`;
      } else if (dcLu && yrLu) {
        severity = '<span class="overlap-badge overlap-good">双禄叠吉</span>';
        advice = `本命<strong>${g(palace.name)}</strong>今年同时受大限与流年化禄庇护，「${ZW.PALACE_MEANINGS[palace.name]}」是今年最强的好运领域，宜大力经营、全力出击。`;
      } else {
        const allTags = [...dc, ...yr].map(e => `${e.from}化${e.tag}`).join('、');
        advice = `本命<strong>${g(palace.name)}</strong>今年汇聚 ${allTags}，「${ZW.PALACE_MEANINGS[palace.name]}」是年内变动最活跃的领域，变化中蕴含机会，宜审慎把握。`;
        severity = '<span class="overlap-badge overlap-info">多化交会</span>';
      }
      yrHtml += `<div class="overlap-item">${severity} ${advice}</div>`;
    });
    yrHtml += '</div>';
  }

  /* 今年要点提示 */
  const luPalaceName = (findStarPalace(a, ym[0]) || {}).name || '';
  const jiPalaceName = (findStarPalace(a, ym[3]) || {}).name || '';
  yrHtml += `<div class="horo-tips">
    <h4 class="horo-sub">今年行动建议</h4>
    <ul>
      ${luPalaceName ? `<li>✅ <strong>把握机遇</strong>：流年化禄在${luPalaceName}宫，「${ZW.PALACE_MEANINGS[luPalaceName]}」方面今年是最佳出手时机，宜主动布局。</li>` : ''}
      ${jiPalaceName ? `<li>⚠️ <strong>谨慎应对</strong>：流年化忌在${jiPalaceName}宫，「${ZW.PALACE_MEANINGS[jiPalaceName]}」方面今年多事，切勿强求，凡事留余地。</li>` : ''}
      <li>📌 <strong>发力时机</strong>：流年命宫在${g(yp.name)}（${ZW.PALACE_MEANINGS[yp.name]}），今年整体重心在此，凡与此宫主题相关的事项均宜把握时机、积极推进。</li>
    </ul>
  </div>`;

  /* ---- 流月（当月） ---- */
  let moHtml = '';
  if (horo.monthly) {
    const mp = a.palaces[horo.monthly.index];
    const mm = horo.monthly.mutagen;
    const mnow = now.getMonth() + 1;
    moHtml += `<div class="horo-overview">
      <p>当前流月（${yr}年${mnow}月）命宫落在本命 <strong>${g(mp.name)}</strong>
      （${horo.monthly.heavenlyStem}${horo.monthly.earthlyBranch}，天干${horo.monthly.heavenlyStem}），
      月度焦点与「${ZW.PALACE_MEANINGS[mp.name]}」相关。</p>
    </div>`;
    moHtml += '<div class="sihua-block sihua-month">';
    const mCls = ['tag-lu','tag-quan','tag-ke','tag-ji'];
    const mTags = ['禄','权','科','忌'];
    mm.forEach((star, i) => {
      const sp = findStarPalace(a, star);
      if (!sp) return;
      moHtml += `<div class="sihua-row">
        <span class="tag ${mCls[i]} tag-xs">${star}化${mTags[i]}</span>
        <span class="sihua-arrow">→</span>
        <span class="sihua-dest">本命<strong>${g(sp.name)}</strong></span>
        <span class="sihua-desc">本月「${ZW.PALACE_MEANINGS[sp.name]}」${mTags[i] === '忌' ? '须谨慎、防波折' : mTags[i] === '禄' ? '机缘好、宜出手' : mTags[i] === '权' ? '能主导、把握决策' : '得名声、贵人助'}。</span>
      </div>`;
    });
    moHtml += '</div>';
  }

  box.innerHTML = `
    <h3>① 当前大限（${dp.decadal.range[0]} — ${dp.decadal.range[1]} 虚岁）</h3>
    ${decHtml}
    <h3>② ${yr} 年流年全面分析</h3>
    ${yrHtml}
    ${moHtml ? `<h3>③ ${now.getFullYear()} 年 ${now.getMonth()+1} 月流月</h3>${moHtml}` : ''}
  `;
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
    html += `<p>当前大限走本命<strong>${g(dp.name)}</strong>（${dp.decadal.range[0]}-${dp.decadal.range[1]} 虚岁），`;
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
