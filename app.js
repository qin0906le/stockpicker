(function () {
  const marketsEl = document.getElementById("markets");
  const tabsEl = document.getElementById("tabs");
  const outlookEl = document.getElementById("outlook");
  const cardsEl = document.getElementById("cards");
  document.getElementById("asof").textContent =
    "Analysis as of " + STOCK_DATA.asOf +
    (STOCK_DATA.pricesAsOf ? " · prices as of " + STOCK_DATA.pricesAsOf : "") +
    " · figures approximate · not financial advice";

  // Data-freshness banner: prices are live, but the analysis/levels are dated.
  const freshEl = document.getElementById("freshness");
  if (freshEl) {
    const opened = new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    freshEl.innerHTML =
      `<span class="fresh-dot"></span> Quotes are <strong>live</strong>. ` +
      `Analysis &amp; trade levels are a dated snapshot (analysis ${STOCK_DATA.asOf}, ` +
      `levels ${STOCK_DATA.pricesAsOf || "early 2026"}) — treat as a research framework, ` +
      `not live advice. Opened ${opened}.`;
  }

  // Inline SVG flags — Windows doesn't render flag emojis, so emojis can't be used here
  const FLAG_SVGS = {
    US: `<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="16" fill="#fff"/>
      <g fill="#B22234">
        <rect y="0" width="24" height="1.23"/><rect y="2.46" width="24" height="1.23"/>
        <rect y="4.92" width="24" height="1.23"/><rect y="7.38" width="24" height="1.23"/>
        <rect y="9.85" width="24" height="1.23"/><rect y="12.31" width="24" height="1.23"/>
        <rect y="14.77" width="24" height="1.23"/>
      </g>
      <rect width="10.5" height="8.6" fill="#3C3B6E"/>
      <g fill="#fff">
        <circle cx="2" cy="1.8" r="0.55"/><circle cx="5.2" cy="1.8" r="0.55"/><circle cx="8.4" cy="1.8" r="0.55"/>
        <circle cx="3.6" cy="4.3" r="0.55"/><circle cx="6.8" cy="4.3" r="0.55"/>
        <circle cx="2" cy="6.8" r="0.55"/><circle cx="5.2" cy="6.8" r="0.55"/><circle cx="8.4" cy="6.8" r="0.55"/>
      </g>
    </svg>`,
    SG: `<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="8" fill="#EE2536"/>
      <rect y="8" width="24" height="8" fill="#fff"/>
      <circle cx="5.2" cy="4" r="2.7" fill="#fff"/>
      <circle cx="6.3" cy="4" r="2.4" fill="#EE2536"/>
      <g fill="#fff">
        <circle cx="7.4" cy="2.2" r="0.45"/><circle cx="6" cy="3.2" r="0.45"/><circle cx="8.8" cy="3.2" r="0.45"/>
        <circle cx="6.5" cy="4.9" r="0.45"/><circle cx="8.3" cy="4.9" r="0.45"/>
      </g>
    </svg>`,
    MY: `<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="16" fill="#fff"/>
      <g fill="#CC0001">
        <rect y="0" width="24" height="1.14"/><rect y="2.29" width="24" height="1.14"/>
        <rect y="4.57" width="24" height="1.14"/><rect y="6.86" width="24" height="1.14"/>
        <rect y="9.14" width="24" height="1.14"/><rect y="11.43" width="24" height="1.14"/>
        <rect y="13.71" width="24" height="1.15"/>
      </g>
      <rect width="12" height="8" fill="#010066"/>
      <circle cx="4.4" cy="4" r="2.5" fill="#FFCC00"/>
      <circle cx="5.4" cy="4" r="2.15" fill="#010066"/>
      <path fill="#FFCC00" d="M8.2 1.9 L8.7 3.2 L10 2.7 L9.2 3.8 L10.4 4.4 L9.1 4.6 L9.5 5.9 L8.5 5 L7.8 6.1 L7.7 4.8 L6.4 5 L7.4 4.1 L6.5 3.1 L7.8 3.4 Z"/>
    </svg>`,
  };

  function flagFor(market) {
    return FLAG_SVGS[market.id] || `<span>${market.flag}</span>`;
  }

  const METRIC_LABELS = {
    revenueGrowth: "Revenue Growth",
    earningsGrowth: "Earnings Growth",
    netMargin: "Net Margin",
    roe: "ROE",
    balanceSheet: "Financial Strength",
    valuation: "Valuation",
  };

  // TradingView embed widgets (official, free). Scripts must be created via
  // createElement — <script> tags inside innerHTML never execute.
  function tvEmbed(widgetFile, config) {
    const container = document.createElement("div");
    container.className = "tradingview-widget-container";
    const inner = document.createElement("div");
    inner.className = "tradingview-widget-container__widget";
    container.appendChild(inner);
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/" + widgetFile;
    script.async = true;
    script.textContent = JSON.stringify(config);
    container.appendChild(script);
    return container;
  }

  function tvSingleQuote(symbol) {
    return tvEmbed("embed-widget-single-quote.js", {
      symbol: symbol,
      width: "100%",
      isTransparent: true,
      colorTheme: "dark",
      locale: "en",
    });
  }

  function tvPageUrl(tvSymbol) {
    return "https://www.tradingview.com/symbols/" + tvSymbol.replace(":", "-") + "/";
  }

  // Yahoo Finance quote fetcher for SGX/Bursa (not licensed in TV widgets).
  // Direct fetch fails CORS in browsers, so fall through public CORS proxies.
  const PROXY_WRAPPERS = [
    (u) => u,
    (u) => "https://corsproxy.io/?url=" + encodeURIComponent(u),
    (u) => "https://api.allorigins.win/raw?url=" + encodeURIComponent(u),
  ];
  const quoteCache = {};

  async function fetchYahooQuote(ySym) {
    const cached = quoteCache[ySym];
    if (cached && Date.now() - cached.at < 5 * 60 * 1000) return cached.q;
    const url = "https://query1.finance.yahoo.com/v8/finance/chart/" + ySym + "?range=1d&interval=1d";
    for (const wrap of PROXY_WRAPPERS) {
      try {
        const r = await fetch(wrap(url));
        if (!r.ok) continue;
        const j = await r.json();
        const meta = j && j.chart && j.chart.result && j.chart.result[0] && j.chart.result[0].meta;
        if (!meta || meta.regularMarketPrice == null) continue;
        const prev = meta.chartPreviousClose != null ? meta.chartPreviousClose : meta.previousClose;
        const q = {
          price: meta.regularMarketPrice,
          prev: prev,
          currency: meta.currency || "",
          time: meta.regularMarketTime ? new Date(meta.regularMarketTime * 1000) : null,
        };
        quoteCache[ySym] = { q, at: Date.now() };
        return q;
      } catch (e) {
        // try next proxy
      }
    }
    return null;
  }

  function changeHtml(q) {
    if (q.prev == null || !q.prev) return "";
    const chg = q.price - q.prev;
    const pct = (chg / q.prev) * 100;
    const cls = chg >= 0 ? "up" : "down";
    const sign = chg >= 0 ? "+" : "";
    const arrow = chg >= 0 ? "▲" : "▼";
    return `<span class="${cls}">${arrow} ${sign}${chg.toFixed(2)} (${sign}${pct.toFixed(2)}%)</span>`;
  }

  function fillQuoteBox(slot, ySym, tvSymbol) {
    slot.innerHTML = `<div class="yq"><span class="yq-loading">Loading live quote…</span></div>`;
    fetchYahooQuote(ySym).then((q) => {
      if (q) {
        const when = q.time
          ? q.time.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
          : "";
        slot.innerHTML = `
          <div class="yq">
            <span class="yq-price">${q.price.toFixed(q.price >= 100 ? 2 : 3)} <span class="yq-cur">${q.currency}</span></span>
            ${changeHtml(q)}
            <span class="yq-meta">${when} · Yahoo Finance · <a href="${tvPageUrl(tvSymbol)}" target="_blank" rel="noopener">TradingView ↗</a></span>
          </div>`;
      } else {
        slot.innerHTML = `
          <div class="yq">
            <span class="yq-meta">Live quote unavailable right now —
            <a href="${tvPageUrl(tvSymbol)}" target="_blank" rel="noopener">view live chart on TradingView ↗</a></span>
          </div>`;
      }
    });
  }

  // Scrolling marquee tape for SG/MY, mimicking TradingView's ticker tape.
  // The chip row is duplicated so a translateX(-50%) loop is seamless.
  let tapeTimer = null;

  function renderQuoteChips(market) {
    const tape = document.getElementById("tape");
    if (tapeTimer) {
      clearInterval(tapeTimer);
      tapeTimer = null;
    }
    tape.innerHTML = `<div class="tape-scroll"><div class="tape-track"></div></div>`;
    const track = tape.querySelector(".tape-track");
    const yh = YH_SYMBOLS[market.id];
    const tv = typeof TV_SYMBOLS !== "undefined" ? TV_SYMBOLS[market.id] : {};

    const entries = [];
    market.industries.forEach((ind) =>
      ind.stocks.forEach((s) => {
        if (yh[s.ticker]) entries.push({ ticker: s.ticker, ySym: yh[s.ticker], tvSym: tv && tv[s.ticker] });
      })
    );

    const copies = [[], []];
    for (let pass = 0; pass < 2; pass++) {
      for (const e of entries) {
        const chip = document.createElement("a");
        chip.className = "chip";
        chip.href = e.tvSym ? tvPageUrl(e.tvSym) : "#";
        chip.target = "_blank";
        chip.rel = "noopener";
        if (pass === 1) chip.setAttribute("aria-hidden", "true");
        chip.innerHTML = `<strong>${e.ticker}</strong> <span class="chip-q">…</span>`;
        copies[pass].push(chip);
        track.appendChild(chip);
      }
    }

    const update = () => {
      entries.forEach((e, i) => {
        fetchYahooQuote(e.ySym).then((q) => {
          let html;
          if (!q) {
            html = "–";
          } else {
            const pct = q.prev ? ((q.price - q.prev) / q.prev) * 100 : null;
            const cls = pct != null && pct < 0 ? "down" : "up";
            const arrow = pct != null && pct < 0 ? "▼" : "▲";
            html =
              q.price.toFixed(q.price >= 100 ? 2 : 3) +
              (pct != null
                ? ` <span class="${cls}">${arrow} ${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%</span>`
                : "");
          }
          copies[0][i].querySelector(".chip-q").innerHTML = html;
          copies[1][i].querySelector(".chip-q").innerHTML = html;
        });
      });
    };
    update();
    tapeTimer = setInterval(update, 5.5 * 60 * 1000);
  }

  function renderTickerTape(market) {
    // SGX/Bursa aren't licensed in TradingView's embed datafeed — use the
    // Yahoo-backed scrolling tape for those markets instead.
    if (typeof YH_SYMBOLS !== "undefined" && YH_SYMBOLS[market.id]) {
      renderQuoteChips(market);
      return;
    }
    if (tapeTimer) {
      clearInterval(tapeTimer);
      tapeTimer = null;
    }
    const tape = document.getElementById("tape");
    tape.innerHTML = "";
    const tv = typeof TV_SYMBOLS !== "undefined" ? TV_SYMBOLS[market.id] : null;
    if (!tv) return;
    const symbols = market.industries.flatMap((ind) =>
      ind.stocks
        .filter((s) => tv[s.ticker])
        .map((s) => ({ proName: tv[s.ticker], title: s.ticker }))
    );
    tape.appendChild(
      tvEmbed("embed-widget-ticker-tape.js", {
        symbols: symbols,
        showSymbolLogo: true,
        isTransparent: true,
        colorTheme: "dark",
        displayMode: "adaptive",
        locale: "en",
      })
    );
  }

  function fmtMoney(v, cur) {
    if (v >= 100) return cur + Math.round(v).toLocaleString("en-US");
    if (v >= 20) return cur + v.toFixed(1);
    return cur + v.toFixed(2);
  }

  // Yahoo symbol for any market: SG/MY come from YH_SYMBOLS, US tickers are
  // valid Yahoo symbols as-is. Used to drive the live-vs-plan status line.
  function yahooSymbolFor(marketId, ticker) {
    if (typeof YH_SYMBOLS !== "undefined" && YH_SYMBOLS[marketId] && YH_SYMBOLS[marketId][ticker])
      return YH_SYMBOLS[marketId][ticker];
    if (marketId === "US") return ticker;
    return null;
  }

  // Compare the LIVE price against the (dated) trade plan so the plan stays
  // actionable between manual refreshes. Also fills a compact header badge so
  // the collapsed card is scannable.
  function fillLiveStatus(el, trade, ySym, badgeEl) {
    fetchYahooQuote(ySym).then((q) => {
      if (!q || q.price == null) {
        if (el) el.innerHTML = "";
        if (badgeEl) badgeEl.innerHTML = "";
        return;
      }
      const p = q.price;
      const cur = trade.cur;

      let zone, dotCls, badgeLabel;
      if (p < trade.buyLo) {
        const pct = ((trade.buyLo - p) / trade.buyLo) * 100;
        zone = `<strong>${pct.toFixed(1)}% below</strong> the buy zone`;
        dotCls = "ls-blue";
        badgeLabel = `${pct.toFixed(0)}% below zone`;
      } else if (p <= trade.buyHi) {
        zone = `<strong>inside</strong> the buy zone`;
        dotCls = "ls-green";
        badgeLabel = "In buy zone";
      } else {
        const pct = ((p - trade.buyHi) / trade.buyHi) * 100;
        zone = `<strong>${pct.toFixed(1)}% above</strong> the buy zone — wait for a pullback`;
        dotCls = "ls-amber";
        badgeLabel = `${pct.toFixed(0)}% above zone`;
      }

      let rr;
      if (p <= trade.stop) {
        rr = `<span class="down">⚠️ at/below the cut-loss — thesis needs review</span>`;
        dotCls = "ls-red";
        badgeLabel = "Below cut-loss";
      } else if (trade.target <= p) {
        rr = `<span class="warn">at/above consensus target — limited upside</span>`;
      } else {
        const ratio = (trade.target - p) / (p - trade.stop);
        const up = (trade.target / p - 1) * 100;
        const dn = (1 - trade.stop / p) * 100;
        rr = `live R:R ≈ <strong>1 : ${ratio.toFixed(1)}</strong> (${up.toFixed(0)}% up / ${dn.toFixed(0)}% down)`;
      }

      if (el)
        el.innerHTML = `<span class="ls-dot ${dotCls}"></span><span class="ls-now">Now ${fmtMoney(p, cur)}</span> — ${zone} · ${rr}`;
      if (badgeEl)
        badgeEl.innerHTML = `<span class="ls-dot ${dotCls}"></span>${badgeLabel}`;
    });
  }

  function tradePlanHtml(trade, pricesAsOf) {
    const entry = (trade.buyLo + trade.buyHi) / 2;
    const riskAmt = entry - trade.stop;
    const rewardAmt = trade.target - entry;
    const upsidePct = Math.round((trade.target / entry - 1) * 100);
    let rrLine;
    if (rewardAmt <= 0) {
      rrLine = `<p class="rr-line rr-bad">⚠️ Consensus target ${fmtMoney(trade.target, trade.cur)} sits BELOW the current entry zone (${upsidePct}%) — analysts see downside from here. Wait for a much lower entry or skip.</p>`;
    } else {
      const rr = rewardAmt / riskAmt;
      rrLine = `<p class="rr-line">Risk : Reward ≈ <strong>1 : ${rr.toFixed(1)}</strong> — risking ~${trade.riskPct}% to the cut-loss against ~${upsidePct}% upside to the consensus target.</p>`;
    }
    return `
      <div class="section">
        <h3>Trade Plan — Reference Levels (prices: ${pricesAsOf})</h3>
        <div class="trade-grid">
          <div class="trade-box ref">
            <div class="k">Last Price (${trade.date})</div>
            <div class="v">${fmtMoney(trade.price, trade.cur)}</div>
          </div>
          <div class="trade-box buy">
            <div class="k">Suggested Buy-In Zone</div>
            <div class="v">${fmtMoney(trade.buyLo, trade.cur)} – ${fmtMoney(trade.buyHi, trade.cur)}</div>
          </div>
          <div class="trade-box stop">
            <div class="k">Cut-Loss (Hard Exit)</div>
            <div class="v">${fmtMoney(trade.stop, trade.cur)} <span class="pct">(≈ -${trade.riskPct}%)</span></div>
          </div>
          <div class="trade-box target">
            <div class="k">Consensus Target</div>
            <div class="v">${fmtMoney(trade.target, trade.cur)}</div>
          </div>
        </div>
        ${rrLine}
        <div class="live-status"><span class="ls-loading">Checking live price vs. plan…</span></div>
        <p class="trade-note">${trade.note ? trade.note + " · " : ""}⚠️ Reference levels anchored to ${pricesAsOf} prices; the "Now" line above is live — check the live quote first. If the price has run well above the buy zone, wait for a pullback rather than chasing; if it has fallen through the cut-loss, the original thesis needs re-examination, not a cheaper entry. Consensus targets are analyst averages, not guarantees.</p>
      </div>`;
  }

  function riskClass(risk) {
    const r = risk.toLowerCase();
    if (r.includes("high")) return "risk-high";
    if (r.includes("low") && !r.includes("medium")) return "risk-low";
    return "risk-medium";
  }

  function confColor(score) {
    if (score >= 85) return "var(--green)";
    if (score >= 75) return "var(--amber)";
    return "var(--red)";
  }

  function renderIndustry(market, industry) {
    outlookEl.innerHTML = `
      <h2>${industry.emoji} ${industry.name} — Industry Outlook</h2>
      <p class="market-context"><span class="flag flag-inline">${flagFor(market)}</span> ${market.name} · ${market.exchange} · ${market.currency}</p>
      <p>${industry.outlook}</p>`;

    cardsEl.innerHTML = "";
    industry.stocks.forEach((s, i) => {
      const card = document.createElement("article");
      card.className = "card" + (i === 0 ? " open" : "");

      const metricsHtml = Object.entries(s.metrics)
        .map(
          ([k, v]) => `
          <div class="metric">
            <div class="k">${METRIC_LABELS[k] || k}</div>
            <div class="v">${v}</div>
          </div>`
        )
        .join("");

      const trade = (typeof TRADE_LEVELS !== "undefined" && TRADE_LEVELS[market.id] && TRADE_LEVELS[market.id][s.ticker]) || null;
      const tradeHtml = trade ? tradePlanHtml(trade, STOCK_DATA.pricesAsOf || "early 2026") : "";
      const tvSymbol = (typeof TV_SYMBOLS !== "undefined" && TV_SYMBOLS[market.id] && TV_SYMBOLS[market.id][s.ticker]) || null;
      const ySymbol = (typeof YH_SYMBOLS !== "undefined" && YH_SYMBOLS[market.id] && YH_SYMBOLS[market.id][s.ticker]) || null;
      const liveSource = ySymbol ? "Yahoo Finance (SGX/Bursa delayed ~15–20 min)" : "TradingView";
      const liveHtml = tvSymbol || ySymbol
        ? `
          <div class="section">
            <h3>Live Quote</h3>
            <div class="tv-slot"></div>
            <p class="tv-note">Live market data via ${liveSource}. Compare against the dated reference levels below.</p>
          </div>`
        : "";

      card.innerHTML = `
        <div class="card-head" role="button" tabindex="0" aria-expanded="${i === 0}">
          <div class="rank-badge rank-${s.rank}">#${s.rank}</div>
          <div class="card-title">
            <div class="ticker">${s.ticker}</div>
            <div class="name">${s.name}</div>
          </div>
          <div class="card-meta">
            <span class="zone-badge" title="Live price vs. buy zone"></span>
            <div class="confidence">
              <div class="label">Confidence</div>
              <div class="value" style="color:${confColor(s.confidence)}">${s.confidence}/100</div>
              <div class="conf-bar"><div class="conf-fill" style="width:${s.confidence}%;background:${confColor(s.confidence)}"></div></div>
            </div>
            <span class="risk-pill ${riskClass(s.risk)}">${s.risk} Risk</span>
            <span class="chevron">▼</span>
          </div>
        </div>
        <div class="card-body">
          <div class="section">
            <h3>Investment Thesis</h3>
            <p>${s.thesis}</p>
          </div>
          <div class="section">
            <h3>Key Metrics</h3>
            <div class="metrics-grid">${metricsHtml}</div>
          </div>
          ${liveHtml}
          ${tradeHtml}
          <div class="section">
            <h3>Competitive Moat</h3>
            <p>${s.moat}</p>
          </div>
          <div class="section two-col">
            <div>
              <h3>Key Catalysts</h3>
              <ul class="list catalysts">${s.catalysts.map((c) => `<li>${c}</li>`).join("")}</ul>
            </div>
            <div>
              <h3>Key Risks</h3>
              <ul class="list risks">${s.risks.map((r) => `<li>${r}</li>`).join("")}</ul>
            </div>
          </div>
          <div class="section">
            <h3>Why It Ranks Here</h3>
            <div class="why-above">${s.whyAbove}</div>
          </div>
        </div>`;

      const slot = card.querySelector(".tv-slot");
      if (slot) {
        if (ySymbol) fillQuoteBox(slot, ySymbol, tvSymbol || "");
        else if (tvSymbol) slot.appendChild(tvSingleQuote(tvSymbol));
      }

      const lsEl = card.querySelector(".live-status");
      const badgeEl = card.querySelector(".zone-badge");
      const ySymForStatus = yahooSymbolFor(market.id, s.ticker);
      if (trade && ySymForStatus) fillLiveStatus(lsEl, trade, ySymForStatus, badgeEl);

      const head = card.querySelector(".card-head");
      const toggle = () => {
        card.classList.toggle("open");
        head.setAttribute("aria-expanded", card.classList.contains("open"));
      };
      head.addEventListener("click", toggle);
      head.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      });

      cardsEl.appendChild(card);
    });
  }

  function renderIndustryTabs(market) {
    renderTickerTape(market);
    tabsEl.innerHTML = "";
    market.industries.forEach((industry, i) => {
      const btn = document.createElement("button");
      btn.className = "tab" + (i === 0 ? " active" : "");
      btn.textContent = `${industry.emoji} ${industry.name}`;
      btn.addEventListener("click", () => {
        tabsEl.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        btn.classList.add("active");
        renderIndustry(market, industry);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      tabsEl.appendChild(btn);
    });
    renderIndustry(market, market.industries[0]);
  }

  STOCK_DATA.markets.forEach((market, i) => {
    const btn = document.createElement("button");
    btn.className = "market-btn" + (i === 0 ? " active" : "");
    btn.innerHTML = `<span class="flag">${flagFor(market)}</span> ${market.id} <span class="exchange">${market.exchange}</span>`;
    btn.addEventListener("click", () => {
      marketsEl.querySelectorAll(".market-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderIndustryTabs(market);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    marketsEl.appendChild(btn);
  });

  renderIndustryTabs(STOCK_DATA.markets[0]);
})();
