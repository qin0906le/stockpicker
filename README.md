# 📈 StockPicker

A zero-dependency web app that presents **top-3 long-term stock picks across 5 industries**,
analyzed like an equity research note: fundamentals, valuation, moat, catalysts, risks,
confidence score, and risk level for every pick.

## Industries & Picks

| Industry | #1 🥇 | #2 🥈 | #3 🥉 |
|---|---|---|---|
| 💾 Semiconductors | NVDA | TSM | AVGO |
| 🔐 Cybersecurity | CRWD | PANW | ZS |
| 🧬 Healthcare & Pharma | LLY | ISRG | ABBV |
| 💳 Payments & Fintech | V | MA | AXP |
| ⚡ Energy | XOM | CEG | CVX |

Each stock card includes:

- **Investment thesis** — the long-term case in plain language
- **Key metrics** — revenue growth, earnings growth, net margin, ROE, financial strength, valuation
- **Competitive moat** — why the advantage is durable
- **Catalysts & risks** — what could move the stock, both ways
- **Confidence score (0–100)** and **risk level** (Low / Medium / High)
- **Why it ranks here** — explicit comparison against the alternatives

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
data.js      — curated analysis data (edit this to update picks)
app.js       — rendering & interaction logic
```

To update or add picks, edit `data.js` — the UI renders whatever is in
`STOCK_DATA.industries`, so new industries/stocks appear automatically.

## Disclaimer

Figures are approximate as of early 2026 and presented for **educational purposes only**.
This is not financial advice. Do your own due diligence and consult a licensed advisor
before making investment decisions.
