(function () {
  const marketsEl = document.getElementById("markets");
  const tabsEl = document.getElementById("tabs");
  const outlookEl = document.getElementById("outlook");
  const cardsEl = document.getElementById("cards");
  document.getElementById("asof").textContent =
    "Analysis as of " + STOCK_DATA.asOf + " · figures approximate · not financial advice";

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
      const tradeHtml = trade
        ? `
          <div class="section">
            <h3>Trade Plan — Reference Levels (early 2026)</h3>
            <div class="trade-grid">
              <div class="trade-box ref">
                <div class="k">Reference Price</div>
                <div class="v">${trade.ref}</div>
              </div>
              <div class="trade-box buy">
                <div class="k">Suggested Buy-In Zone</div>
                <div class="v">${trade.buy}</div>
              </div>
              <div class="trade-box stop">
                <div class="k">Cut-Loss (Hard Exit)</div>
                <div class="v">${trade.stop}</div>
              </div>
            </div>
            <p class="trade-note">${trade.note ? trade.note + " · " : ""}⚠️ Anchored to early-2026 prices — check the live quote first. If the price has run well above the buy zone, wait for a pullback rather than chasing; if it has fallen through the cut-loss, the original thesis needs re-examination, not a cheaper entry.</p>
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
