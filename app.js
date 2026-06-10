(function () {
  const tabsEl = document.getElementById("tabs");
  const outlookEl = document.getElementById("outlook");
  const cardsEl = document.getElementById("cards");
  document.getElementById("asof").textContent =
    "Analysis as of " + STOCK_DATA.asOf + " · figures approximate · not financial advice";

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

  function renderIndustry(industry) {
    outlookEl.innerHTML = `
      <h2>${industry.emoji} ${industry.name} — Industry Outlook</h2>
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

  STOCK_DATA.industries.forEach((industry, i) => {
    const btn = document.createElement("button");
    btn.className = "tab" + (i === 0 ? " active" : "");
    btn.textContent = `${industry.emoji} ${industry.name}`;
    btn.addEventListener("click", () => {
      tabsEl.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
      btn.classList.add("active");
      renderIndustry(industry);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    tabsEl.appendChild(btn);
  });

  renderIndustry(STOCK_DATA.industries[0]);
})();
