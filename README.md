# 📈 StockPicker

A zero-dependency web app that presents **top-3 long-term stock picks across 5 industries
in each of 3 markets** — 🇺🇸 US (NYSE/NASDAQ), 🇸🇬 Singapore (SGX) and 🇲🇾 Malaysia (Bursa) —
analyzed like an equity research note: fundamentals, valuation, moat, catalysts, risks,
confidence score, and risk level for every pick. Use the market switcher in the header
to flip between markets.

## Markets, Industries & Picks

### 🇺🇸 United States (NYSE / NASDAQ)

| Industry | #1 🥇 | #2 🥈 | #3 🥉 |
|---|---|---|---|
| 💾 Semiconductors | NVDA | TSM | AVGO |
| 🔐 Cybersecurity | CRWD | PANW | ZS |
| 🧬 Healthcare & Pharma | LLY | ISRG | ABBV |
| 💳 Payments & Fintech | V | MA | AXP |
| ⚡ Energy | XOM | CEG | CVX |

### 🇸🇬 Singapore (SGX)

| Industry | #1 🥇 | #2 🥈 | #3 🥉 |
|---|---|---|---|
| 🏦 Banking & Finance | DBS (D05) | OCBC (O39) | UOB (U11) |
| 🏢 REITs | CICT (C38U) | Keppel DC REIT (AJBU) | CapitaLand Ascendas (A17U) |
| 🛠️ Industrials & Defence | ST Engineering (S63) | Yangzijiang (BS6) | SATS (S58) |
| 📡 Telecom & Tech | Singtel (Z74) | iFAST (AIY) | Venture Corp (V03) |
| 🛒 Consumer & Healthcare | Sheng Siong (OV8) | Raffles Medical (BSL) | DFI Retail (D01) |

### 🇲🇾 Malaysia (Bursa Malaysia)

| Industry | #1 🥇 | #2 🥈 | #3 🥉 |
|---|---|---|---|
| 🏦 Banking | Public Bank (1295) | Maybank (1155) | CIMB (1023) |
| ⚡ Utilities & Power | Tenaga (5347) | YTL Power (6742) | Petronas Gas (6033) |
| 🔬 Technology & Semis | Frontken (0128) | ViTrox (0097) | Inari (0166) |
| 🛍️ Consumer & Retail | 99 Speed Mart (5326) | Mr D.I.Y. (5296) | QL Resources (7084) |
| 🏥 Healthcare | IHH (5225) | KPJ (5878) | Hartalega (5168) |

Each stock card includes:

- **Investment thesis** — the long-term case in plain language
- **Key metrics** — revenue growth, earnings growth, net margin, ROE, financial strength, valuation
- **Competitive moat** — why the advantage is durable
- **Catalysts & risks** — what could move the stock, both ways
- **Confidence score (0–100)** and **risk level** (Low / Medium / High)
- **Trade plan** — last price (with quote date), suggested buy-in zone, hard cut-loss
  (~11–20% below the zone, scaled to the stock's risk rating), analyst **consensus
  target**, and a computed **risk : reward ratio**. Stocks whose consensus target sits
  below the current price get an explicit downside warning instead.
- **Live quote** — real-time/delayed market price via the official TradingView embed
  widget (US, SGX and Bursa symbols), plus a scrolling ticker tape for the active market
- **Why it ranks here** — explicit comparison against the alternatives

> ⚠️ Prices and targets were gathered late May – 11 June 2026 and do **not** update
> live. Always check the current quote: if a stock has run far above its buy zone,
> wait for a pullback or recompute the levels rather than chasing.

## Deployment (GitHub Pages)

A workflow at `.github/workflows/deploy-pages.yml` publishes the app to GitHub Pages
on every push. One-time setup: in the repo go to **Settings → Pages** and set
**Source: GitHub Actions**. The site then lives at
`https://<username>.github.io/stockpicker/` and updates automatically.

## Running the app

No build step, no dependencies. Either open the file directly:

```
open index.html
```

or serve it locally:

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Project structure

```
index.html   — page shell
styles.css   — dark dashboard theme
data.js      — curated analysis data for all markets (edit this to update picks)
app.js       — rendering & interaction logic (market switcher, industry tabs, cards)
```

To update or add picks, edit `data.js` — the UI renders whatever is in
`STOCK_DATA.markets[].industries`, so new markets, industries or stocks
appear automatically.

## Disclaimer

Figures are approximate as of early 2026 and presented for **educational purposes only**.
This is not financial advice. Do your own due diligence and consult a licensed advisor
before making investment decisions.
