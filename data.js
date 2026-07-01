// Stock Picker — curated analysis data
// NOTE: Figures are approximate, based on publicly available data as of early 2026.
// This is research/educational content, NOT financial advice. Verify all numbers before investing.

const STOCK_DATA = {
  asOf: "Q1 2026",
  pricesAsOf: "1 July 2026",
  markets: [
    {
      id: "US",
      name: "United States",
      flag: "🇺🇸",
      exchange: "NYSE / NASDAQ",
      currency: "USD",
      industries: [
    {
      id: "semiconductors",
      name: "Semiconductors",
      emoji: "💾",
      outlook:
        "The AI buildout remains the dominant force in semiconductors. Hyperscaler capex on data centers continues to grow double digits, sovereign AI programs are adding a new demand layer, and edge-AI silicon is emerging in PCs, phones and autos. Key risks for the group: cyclicality, export controls on China, and the possibility that AI infrastructure spending digests after several years of extreme growth.",
      stocks: [
        {
          rank: 1,
          ticker: "NVDA",
          name: "NVIDIA Corporation",
          confidence: 88,
          risk: "Medium",
          thesis:
            "NVIDIA is the undisputed leader in AI accelerators with an estimated 80–90% share of the data-center GPU market. Its moat is not just silicon — the CUDA software ecosystem, networking (NVLink/InfiniBand via Mellanox), and full-rack systems (GB-class platforms) create deep switching costs. Revenue and earnings have compounded at extraordinary rates while net margins sit above 50%, a level almost unheard of for a hardware company.",
          metrics: {
            revenueGrowth: "~55–65% YoY",
            earningsGrowth: "~60%+ YoY",
            netMargin: "~52–56%",
            roe: "~90%+",
            balanceSheet: "Net cash; massive free cash flow",
            valuation: "Fwd P/E ~28–32, PEG ~0.7–0.9",
          },
          moat: "CUDA software lock-in, full-stack systems, fastest product cadence in the industry (1-year rhythm), ecosystem of millions of developers.",
          catalysts: [
            "Next-gen platform ramps (Rubin generation) with higher ASPs",
            "Sovereign AI deals (governments building national AI infrastructure)",
            "Inference demand inflecting as AI agents go into production",
            "Networking and software (NIM/enterprise AI) becoming larger revenue lines",
          ],
          risks: [
            "Customer concentration — a handful of hyperscalers drive most revenue",
            "Custom silicon (Google TPU, Amazon Trainium, AMD) eroding share over time",
            "US–China export restrictions limiting addressable market",
            "Any pause in AI capex would hit hard given elevated expectations",
          ],
          whyAbove:
            "Ranks #1 because no other company combines hyper-growth, >50% net margins, a software moat, and a reasonable PEG. TSM and AVGO benefit from the same wave but with less pricing power over the end customer.",
        },
        {
          rank: 2,
          ticker: "TSM",
          name: "Taiwan Semiconductor Manufacturing",
          confidence: 84,
          risk: "Medium",
          thesis:
            "TSMC manufactures the chips for essentially every AI leader — NVIDIA, AMD, Apple, Broadcom and the hyperscalers' custom silicon all depend on it. It controls ~90% of leading-edge (3nm/2nm) capacity, making it the single most important chokepoint in global technology. It wins regardless of which chip designer wins, with structurally rising margins as advanced nodes and advanced packaging (CoWoS) carry premium pricing.",
          metrics: {
            revenueGrowth: "~25–35% YoY",
            earningsGrowth: "~30–40% YoY",
            netMargin: "~40%+",
            roe: "~28–32%",
            balanceSheet: "Net cash, funds enormous capex from operating cash flow",
            valuation: "Fwd P/E ~22–26 — a discount to US peers",
          },
          moat: "Process-technology leadership measured in years, unmatched yield/scale economics, ecosystem lock-in via design rules and packaging.",
          catalysts: [
            "2nm (N2) ramp in 2026 with strong pricing",
            "CoWoS/advanced packaging capacity expansion — currently the AI bottleneck",
            "US (Arizona) and Japan fabs reducing geographic risk perception",
            "Structural price increases on leading-edge wafers",
          ],
          risks: [
            "Taiwan geopolitical risk is the core reason for its valuation discount",
            "Capex intensity (~$40B+/yr) can pressure FCF in down-cycles",
            "Intel Foundry or Samsung closing the gap (low probability, high impact)",
          ],
          whyAbove:
            "Ranks above Broadcom because it is the monopoly supplier to the entire AI ecosystem and trades at a lower multiple. It ranks below NVIDIA mainly due to geopolitical tail risk and less direct pricing power over end demand.",
        },
        {
          rank: 3,
          ticker: "AVGO",
          name: "Broadcom Inc.",
          confidence: 80,
          risk: "Medium",
          thesis:
            "Broadcom is the leading way to own the custom AI accelerator (XPU) trend — it co-designs chips for Google, Meta and other hyperscalers, a business growing 50%+ as customers diversify away from sole-sourcing GPUs. Add the leading AI networking franchise (Tomahawk/Jericho switching) and a highly profitable infrastructure-software arm (VMware) generating sticky recurring revenue, and you get a rare mix of AI growth plus cash-cow stability.",
          metrics: {
            revenueGrowth: "~20–25% YoY (AI semis ~50%+)",
            earningsGrowth: "~25–35% YoY (adj.)",
            netMargin: "~40%+ (adjusted)",
            roe: "High; inflated by acquisition accounting",
            balanceSheet: "Meaningful debt from VMware deal, but rapid deleveraging from huge FCF",
            valuation: "Fwd P/E ~30–35, premium reflects AI backlog visibility",
          },
          moat: "Multi-year co-design relationships with hyperscalers, networking silicon leadership, VMware's entrenched enterprise footprint.",
          catalysts: [
            "New custom-silicon customers ramping (reported multi-$10B backlog)",
            "Ethernet displacing InfiniBand in AI clusters — Broadcom is the prime beneficiary",
            "VMware margin expansion as subscription transition completes",
            "Consistent dividend growth and buybacks",
          ],
          risks: [
            "Customer concentration in a few hyperscaler programs; design losses would be lumpy",
            "Higher leverage than peers",
            "Valuation now embeds flawless execution on the XPU roadmap",
          ],
          whyAbove:
            "Beats out AMD, ASML and Micron for the #3 slot: AMD faces NVIDIA head-on with weaker software, ASML's growth is slower this cycle, and Micron is far more cyclical. Broadcom's custom-silicon backlog gives multi-year revenue visibility neither offers.",
        },
      ],
    },
    {
      id: "cybersecurity",
      name: "Cybersecurity",
      emoji: "🔐",
      outlook:
        "Cybersecurity is one of the most durable spending categories in enterprise IT — breaches are existential, regulation keeps tightening, and AI is expanding the attack surface (and the defense toolkit). The industry is consolidating around platform vendors as CISOs cut tool sprawl. AI-driven SOC automation is the next major product cycle. Main group risk: elevated valuations and competition from Microsoft's bundled security offering.",
      stocks: [
        {
          rank: 1,
          ticker: "CRWD",
          name: "CrowdStrike Holdings",
          confidence: 82,
          risk: "Medium",
          thesis:
            "CrowdStrike is the best-in-class security platform. Its single lightweight agent and cloud-native Falcon platform let customers consolidate endpoint, identity, cloud security and SIEM into one vendor — and module adoption keeps climbing (a large share of customers use 6+ modules). It fully recovered from the 2024 outage, validating the stickiness of the platform, and is the leader in applying AI agents (Charlotte AI) to security operations.",
          metrics: {
            revenueGrowth: "~25–30% YoY",
            earningsGrowth: "FCF margin ~30%+; GAAP profitable",
            netMargin: "~Rule of 60+ (growth + FCF margin)",
            roe: "Improving; asset-light model",
            balanceSheet: "Net cash, strong FCF",
            valuation: "EV/Sales ~18–22 — expensive, justified only by durability of growth",
          },
          moat: "Single-agent architecture, network effects from Threat Graph data (trillions of events/week), high switching costs once multiple modules are deployed.",
          catalysts: [
            "Next-Gen SIEM taking share from legacy Splunk deployments",
            "Falcon Flex licensing accelerating module adoption",
            "AI-powered SOC (Charlotte AI) creating a new pricing layer",
            "Federal/enterprise consolidation onto platforms",
          ],
          risks: [
            "Premium valuation leaves no room for growth deceleration",
            "Microsoft Defender bundling pressures the mid-market",
            "Reputational tail risk from any repeat reliability incident",
          ],
          whyAbove:
            "Ranks #1 on growth + platform breadth: it grows meaningfully faster than Palo Alto with comparable FCF economics, and its endpoint-centric data moat is harder to replicate than Zscaler's network position.",
        },
        {
          rank: 2,
          ticker: "PANW",
          name: "Palo Alto Networks",
          confidence: 80,
          risk: "Medium",
          thesis:
            "Palo Alto is the largest pure-play security vendor and the prime consolidator of the industry. Its 'platformization' strategy — giving customers incentives to standardize on its three platforms (network, cloud, SOC) — is converting a fragmented market into multi-year, multi-product contracts. The CyberArk acquisition added the leading identity-security franchise, the fastest-growing segment in security. Next-gen ARR now drives the story.",
          metrics: {
            revenueGrowth: "~13–16% YoY (NGS ARR ~30%+)",
            earningsGrowth: "~15%+ adj. EPS growth",
            netMargin: "GAAP profitable; adj. FCF margin ~37%+",
            roe: "Solid and improving",
            balanceSheet: "Strong; manageable debt post-CyberArk",
            valuation: "Fwd P/E ~45–50; ~13–15x EV/Sales on NGS — cheaper than CRWD per unit of growth",
          },
          moat: "Broadest portfolio in security, entrenched firewall installed base to upsell, scale R&D budget no pure-play rival can match.",
          catalysts: [
            "CyberArk integration — cross-selling identity security into the base",
            "Platformization deals compounding (target of large multi-platform customers)",
            "XSIAM (AI-driven SOC) is one of the fastest-growing products in security history",
            "Hardware refresh cycle in firewalls",
          ],
          risks: [
            "Total revenue growth is slower than top peers; story depends on NGS mix shift",
            "Acquisition integration risk (CyberArk is its largest deal ever)",
            "Free-money platformization incentives can mask underlying demand",
          ],
          whyAbove:
            "Ranks above Zscaler on breadth and consolidation power — it can bundle across network, cloud, identity and SOC, while Zscaler remains a (excellent) point-platform. Ranks below CrowdStrike on organic growth rate.",
        },
        {
          rank: 3,
          ticker: "ZS",
          name: "Zscaler, Inc.",
          confidence: 68,
          risk: "High",
          thesis:
            "Zscaler is the leader in zero-trust network security — its cloud proxies ~500B+ transactions a day, replacing legacy VPNs and firewalls with identity-based access. Zero trust is now the default architecture for new deployments, and Zscaler's scale (data from the world's largest security cloud) feeds an expanding data/AI security portfolio. ⚠️ UPDATE (June 2026): the stock crashed >30% in a single day — its worst ever — after fiscal Q3 results disappointed, and is down ~43% YTD. The long-term zero-trust thesis is intact, but growth durability needs re-verification before buying the dip; this is now a show-me story.",
          metrics: {
            revenueGrowth: "~20%+ YoY — decelerating; verify post-FQ3 guidance",
            earningsGrowth: "FCF margin ~25–28%",
            netMargin: "Approaching GAAP breakeven/profitable",
            roe: "N/M (asset-light, reinvesting)",
            balanceSheet: "Net cash",
            valuation: "EV/Sales roughly halved after the June 2026 crash — cheap vs history IF growth holds",
          },
          moat: "Largest inline security cloud (150+ PoPs), high switching costs once traffic is routed through it, architecture advantage over appliance vendors.",
          catalysts: [
            "VPN replacement cycle still in early innings (most enterprises still run VPNs)",
            "Zero Trust Everywhere + AI security (protecting LLM usage) as new SKUs",
            "Federal expansion (FedRAMP High footprint)",
            "De-risked valuation: consensus target (~$194) now sits ~55% above the post-crash price",
          ],
          risks: [
            "June 2026: >30% one-day crash on FQ3 results — guidance/billings concerns; down ~43% YTD",
            "Competes with both Palo Alto (SASE bundle) and Netskope/Cloudflare",
            "Sales-execution transitions have caused volatility before",
            "Smaller platform — risk of being consolidated against rather than consolidating",
          ],
          whyAbove:
            "Takes #3 over Fortinet (slower-growth, appliance-centric) and Cloudflare (security is only part of its story, richer valuation). Zscaler is the purest play on the zero-trust architecture shift with proven FCF economics.",
        },
      ],
    },
    {
      id: "healthcare",
      name: "Healthcare & Pharma",
      emoji: "🧬",
      outlook:
        "Healthcare offers defensiveness plus genuine secular growth pockets: GLP-1 metabolic drugs (the largest drug class in history, heading toward $150B+/yr), robotic surgery penetration, and an aging global population. Headwinds: US drug-pricing policy (IRA negotiations, tariff noise), patent cliffs late in the decade, and political uncertainty around healthcare payers.",
      stocks: [
        {
          rank: 1,
          ticker: "LLY",
          name: "Eli Lilly and Company",
          confidence: 85,
          risk: "Medium",
          thesis:
            "Lilly owns the most valuable franchise in pharma: GLP-1 metabolic medicine, via Mounjaro/Zepbound (tirzepatide), which is clinically best-in-class among approved injectables. The oral GLP-1 (orforglipron) — a pill that needs no cold chain and scales globally — is the single biggest pipeline catalyst in the industry. Beyond obesity: Alzheimer's (donanemab), oncology and immunology give it the deepest growth pipeline among large-cap pharma.",
          metrics: {
            revenueGrowth: "~30–40% YoY",
            earningsGrowth: "~40%+ YoY",
            netMargin: "~28–33% and expanding",
            roe: "~60%+",
            balanceSheet: "Investment grade; heavy but well-funded capex on manufacturing",
            valuation: "Fwd P/E ~30–35 — premium, but PEG <1 on consensus growth",
          },
          moat: "Best-in-class clinical data, years of manufacturing scale-up (a real barrier — supply is the constraint), patents into the late 2030s on key molecules.",
          catalysts: [
            "Orforglipron (oral GLP-1) launch — potential biggest drug launch ever",
            "Expanding indications: sleep apnea, heart failure, kidney disease, fatty liver",
            "Manufacturing capacity coming online easing supply constraints",
            "Next-gen candidates (retatrutide) extending leadership",
          ],
          risks: [
            "US drug-pricing policy and IRA negotiation exposure",
            "Pipeline binary events — any orforglipron safety surprise would hit hard",
            "Compounder/generic pressure and eventual competition from oral rivals",
          ],
          whyAbove:
            "Ranks #1 in all of healthcare: it pairs mega-cap safety with biotech-level growth. It leads Novo Nordisk on clinical data, US commercial execution, and pipeline depth.",
        },
        {
          rank: 2,
          ticker: "ISRG",
          name: "Intuitive Surgical",
          confidence: 81,
          risk: "Medium",
          thesis:
            "Intuitive dominates robotic surgery with ~8,000+ da Vinci systems installed and a razor-and-blade model: ~80%+ of revenue is recurring (instruments, accessories, services) tied to procedure volume, which compounds ~15%+ a year. The new da Vinci 5 platform drives an upgrade cycle, and only a low-single-digit share of eligible surgeries worldwide are done robotically — a decades-long runway.",
          metrics: {
            revenueGrowth: "~15–18% YoY",
            earningsGrowth: "~18–22% YoY",
            netMargin: "~28–30%",
            roe: "~18–20% (huge net cash drags ROE down)",
            balanceSheet: "Zero debt, $8B+ net cash",
            valuation: "De-rated hard in 2026 (stock ~-26% YTD to ~$412); multiple now well below its 5-yr average",
          },
          moat: "20+ year installed-base lock-in, surgeon training network effects (most surgeons train on da Vinci), regulatory barriers, procedure data advantage.",
          catalysts: [
            "da Vinci 5 upgrade cycle with force-feedback and AI features",
            "International expansion (Japan, India, Europe reimbursement wins)",
            "New procedure approvals expanding the addressable surgery pool",
            "Ion (lung biopsy) platform scaling",
          ],
          risks: [
            "2026 pressure points: Chinese surgical-robot rivals gaining ground, an FDA early alert on certain SureForm stapler reloads (March 2026), and a Deutsche Bank downgrade to Sell",
            "Valuation: any procedure-growth slowdown compresses the multiple fast",
            "Emerging competition (Medtronic Hugo, J&J Ottava) after 20 years alone",
            "GLP-1 drugs reducing bariatric procedure volumes at the margin",
          ],
          whyAbove:
            "Ranks above AbbVie because its recurring-revenue model and monopoly position offer more predictable compounding, with no patent-cliff dynamics. Below Lilly only because growth is roughly half as fast.",
        },
        {
          rank: 3,
          ticker: "ABBV",
          name: "AbbVie Inc.",
          confidence: 77,
          risk: "Low-Medium",
          thesis:
            "AbbVie has executed the best patent-cliff escape in pharma history: Skyrizi and Rinvoq have already replaced Humira's lost revenue and are still growing 30%+ combined, on their way past $30B+/yr with patents into the 2030s. Add a top aesthetics franchise (Botox), neuroscience growth, and a ~3.5% growing dividend (a Dividend King via Abbott lineage), and you get a defensive compounder at a reasonable price.",
          metrics: {
            revenueGrowth: "~7–10% YoY (ex-Humira erosion much higher)",
            earningsGrowth: "~10–14% adj. EPS growth resuming",
            netMargin: "~30%+ adjusted",
            roe: "Very high (leveraged balance sheet)",
            balanceSheet: "Elevated debt from Allergan deal, deleveraging steadily",
            valuation: "Fwd P/E ~15–17 with ~3.5% dividend yield",
          },
          moat: "Immunology commercial infrastructure, irreplaceable Botox brand, scale in payer contracting.",
          catalysts: [
            "Skyrizi/Rinvoq guidance raises (management has raised repeatedly)",
            "Pipeline in oncology (ADCs) and neuroscience (emraclidine follow-ons)",
            "Dividend growth + multiple re-rating as Humira fades from the narrative",
          ],
          risks: [
            "IRA price negotiation touches key drugs late this decade",
            "High leverage limits large BD until deleveraged",
            "Aesthetics is consumer-cyclical and exposed to China softness",
          ],
          whyAbove:
            "Edges out UnitedHealth (policy/regulatory overhang, execution issues) and Novo Nordisk (losing the GLP-1 share battle to Lilly) for #3. AbbVie offers the best risk-adjusted income + growth mix in the sector.",
        },
      ],
    },
    {
      id: "payments",
      name: "Payments & Fintech",
      emoji: "💳",
      outlook:
        "Digital payments keep taking share from cash globally (~$10T+ of cash/check spend remains), while value-added services (fraud, data, risk APIs) and new flows (B2B, cross-border, real-time) expand the TAM beyond consumer cards. Stablecoins are a watch-item but networks are positioning as rails for them rather than victims. Group risks: regulation (interchange caps, DOJ/credit-card competition bills) and consumer-spending cyclicality.",
      stocks: [
        {
          rank: 1,
          ticker: "V",
          name: "Visa Inc.",
          confidence: 86,
          risk: "Low",
          thesis:
            "Visa operates arguably the best business model on the planet: a two-sided network connecting 4B+ cards to 130M+ merchants, with >50% net margins, minimal capital needs, and pricing power. Growth is structural (cash digitization, cross-border travel, e-commerce) and increasingly comes from new flows (Visa Direct real-time payments) and value-added services growing ~20%. It compounds EPS low-teens with metronomic consistency and returns nearly all FCF to shareholders.",
          metrics: {
            revenueGrowth: "~10–11% YoY",
            earningsGrowth: "~12–14% EPS growth",
            netMargin: "~53–55%",
            roe: "~50%+",
            balanceSheet: "Fortress; modest debt, enormous FCF conversion",
            valuation: "Fwd P/E ~25–27 — below its 5-yr average",
          },
          moat: "Classic two-sided network effects, universal acceptance brand, regulatory licensing barriers — effectively a duopoly with Mastercard.",
          catalysts: [
            "Cross-border travel volumes still normalizing upward",
            "Visa Direct (P2P, payouts, B2B) growing 20%+ on transactions",
            "Value-added services (risk, advisory, tokenization) at ~25% of revenue and rising",
            "Stablecoin settlement pilots positioning Visa as crypto rails",
          ],
          risks: [
            "US regulation: interchange litigation, Credit Card Competition Act risk",
            "Consumer recession would slow volumes (though Visa clips fees either way)",
            "Long-tail disintermediation: account-to-account, stablecoins, FedNow",
          ],
          whyAbove:
            "Ranks #1 over Mastercard on slightly cheaper valuation for nearly identical quality, and over everything else in fintech on sheer predictability — the highest-margin, widest-moat franchise in financial services.",
        },
        {
          rank: 2,
          ticker: "MA",
          name: "Mastercard Incorporated",
          confidence: 84,
          risk: "Low",
          thesis:
            "Mastercard is Visa's duopoly twin with a slightly different mix: more Europe/emerging-markets exposure and a faster-growing services segment (~40% of revenue), spanning cybersecurity, data analytics and open banking. It has historically grown revenue 1–3 points faster than Visa, justifying its small premium. Same network effects, same capital-light economics, same relentless buyback.",
          metrics: {
            revenueGrowth: "~12–14% YoY",
            earningsGrowth: "~14–17% EPS growth",
            netMargin: "~45–47%",
            roe: "Extremely high (small equity base from buybacks)",
            balanceSheet: "Fortress",
            valuation: "Pulled back ~14% in 2026 to ~$489 on Middle-East travel fears despite earnings beats — multiple now unusually close to Visa's",
          },
          moat: "Two-sided network effects, brand, deep issuer/merchant integrations, services data flywheel.",
          catalysts: [
            "Services & solutions growing high-teens — now the differentiator",
            "Emerging-market cash digitization (faster card growth than US)",
            "Cross-border momentum; crypto/stablecoin partnerships",
            "Contactless/transit wins converting low-value cash payments",
          ],
          risks: [
            "Same regulatory overhangs as Visa (interchange, routing mandates)",
            "Europe interchange caps limit unit economics there",
            "Higher multiple means slightly less room for error than Visa",
          ],
          whyAbove:
            "Ranks above American Express because the pure network model (no credit risk) deserves a quality edge, and above PayPal/Block on consistency. Sits below Visa only on valuation — operationally they're near-equals.",
        },
        {
          rank: 3,
          ticker: "AXP",
          name: "American Express",
          confidence: 78,
          risk: "Medium",
          thesis:
            "Amex is a premium-consumer flywheel: a closed-loop network plus card issuer whose customers skew affluent (resilient in downturns) and increasingly young — Millennials/Gen-Z are the fastest-growing cohorts, locking in decades of fee growth. Revenue grows ~9–10% on swipe fees AND ~20%+ growth in card fees (Platinum refresh pricing power), at a bank-like valuation far below the pure networks.",
          metrics: {
            revenueGrowth: "~8–10% YoY",
            earningsGrowth: "~12–15% EPS growth",
            netMargin: "~17–19%",
            roe: "~30–35% — elite for a lender",
            balanceSheet: "Well-capitalized; credit metrics best-in-class (premium book)",
            valuation: "Fwd P/E ~17–19 — big discount to V/MA",
          },
          moat: "Brand + closed-loop data, merchant-funded rewards flywheel, premium customer lock-in via lifestyle benefits.",
          catalysts: [
            "US Platinum/Gold card refreshes driving record card-fee growth",
            "Gen-Z/Millennial acquisition compounding lifetime value",
            "International merchant acceptance expansion",
            "Buybacks + dividend growth ~15%+",
          ],
          risks: [
            "Carries actual credit risk — recession means provisions, unlike V/MA",
            "Spending growth tied to travel/entertainment cycles",
            "Premium-card competition from JPMorgan Sapphire/Citi escalating reward costs",
          ],
          whyAbove:
            "Takes #3 over PayPal (turnaround still unproven), Fiserv (slower growth), and Block (volatile execution). Amex offers proven double-digit EPS compounding at nearly half the multiple of the networks — the value pick of the trio.",
        },
      ],
    },
    {
      id: "energy",
      name: "Energy",
      emoji: "⚡",
      outlook:
        "Energy is back on offense: AI data centers have turned electricity demand positive in the US for the first time in 20 years, natural gas is the bridge fuel winning that buildout, and LNG export capacity is doubling by 2030. Oil majors trade at single-digit-to-low-teens P/Es with disciplined capital returns. Group risks: oil-price cyclicality, OPEC+ supply decisions, and long-term energy-transition policy.",
      stocks: [
        {
          rank: 1,
          ticker: "XOM",
          name: "Exxon Mobil Corporation",
          confidence: 80,
          risk: "Medium",
          thesis:
            "Exxon is the highest-quality oil major: the Pioneer acquisition made it the dominant Permian producer with decades of low-cost inventory, while Guyana is the best offshore development in a generation (sub-$35/bbl breakevens). Management targets $20B+ of additional earnings growth by 2030 even at flat oil prices via cost cuts and high-return projects. Net debt is among the lowest in the industry, funding a 40+ year dividend-growth streak plus large buybacks.",
          metrics: {
            revenueGrowth: "Commodity-linked; volumes growing ~4–5%/yr",
            earningsGrowth: "Structural cost savings + volume growth; ~$20B uplift plan to 2030",
            netMargin: "~10–11% (cycle-dependent)",
            roe: "~14–17%",
            balanceSheet: "Net debt/cap ~12–15% — best among supermajors",
            valuation: "Fwd P/E ~13–15, ~3.5% dividend yield",
          },
          moat: "Lowest-cost barrel inventory (Permian + Guyana), integration across upstream/refining/chemicals, scale project execution no independent can match.",
          catalysts: [
            "Guyana production ramping toward 1.3M+ bbl/day",
            "Permian synergies from Pioneer exceeding targets",
            "Low-carbon ventures (hydrogen, lithium, CCS) optionality",
            "Buybacks of ~$20B/yr shrinking the share count",
          ],
          risks: [
            "Oil price downside (sub-$60 Brent squeezes FCF and buybacks)",
            "Energy-transition policy risk to long-term demand",
            "Project execution/capex inflation",
          ],
          whyAbove:
            "Ranks #1 on asset quality: no peer matches its combination of Permian scale, Guyana growth, balance-sheet strength and a credible plan to grow earnings at flat commodity prices.",
        },
        {
          rank: 2,
          ticker: "CEG",
          name: "Constellation Energy",
          confidence: 78,
          risk: "Medium",
          thesis:
            "Constellation is the largest US nuclear fleet owner — the only scalable source of 24/7 carbon-free power — exactly what AI data centers need. Its landmark deals (Microsoft's Three Mile Island/Crane restart PPA among them) proved hyperscalers will pay premium long-term prices for firm clean energy, structurally re-rating the whole fleet. The Calpine acquisition adds the top gas/geothermal fleet, making it the largest clean-ish IPP in America as power demand inflects.",
          metrics: {
            revenueGrowth: "Power-price and contract-driven; double-digit EPS growth guided",
            earningsGrowth: "~13%+ EPS CAGR targeted through decade",
            netMargin: "~12–15%",
            roe: "~15–20%",
            balanceSheet: "Investment grade; Calpine adds leverage being digested",
            valuation: "P/E ~22 after a ~40% drawdown from the $412 high to ~$244 (mid-2026) — sentiment washed out, analysts' consensus target ~$367",
          },
          moat: "Irreplaceable nuclear assets (impossible to permit/build new at scale), federal production tax credit floor under revenues, sited capacity near demand centers.",
          catalysts: [
            "More hyperscaler PPAs at premium pricing",
            "Crane Clean Energy Center (TMI) restart on/ahead of schedule",
            "Nuclear uprates adding capacity at minimal cost",
            "Federal support for nuclear (PTC floor, ADVANCE Act tailwinds)",
          ],
          risks: [
            "Power prices falling if data-center demand disappoints",
            "Regulatory pushback on co-located data-center deals (FERC)",
            "Calpine integration and added commodity exposure",
            "Premium valuation vs. regulated utilities",
          ],
          whyAbove:
            "Ranks above Chevron because it's the purest large-cap play on the electricity-demand supercycle — the strongest secular story in energy — with contracted, inflation-protected cash flows rather than pure commodity exposure.",
        },
        {
          rank: 3,
          ticker: "CVX",
          name: "Chevron Corporation",
          confidence: 76,
          risk: "Medium",
          thesis:
            "Chevron is the shareholder-return machine of big oil: with the Hess acquisition closed, it owns 30% of the same world-class Guyana block as Exxon, plus the Permian, Kazakhstan (TCO now ramped), and a Gulf Coast portfolio at peak free cash flow. It yields ~4% with 38 consecutive years of dividend increases and buys back $10–15B of stock annually. Lower multiple than Exxon with a comparable FCF yield makes it the income pick of the majors.",
          metrics: {
            revenueGrowth: "Commodity-linked; production growing ~3%/yr",
            earningsGrowth: "FCF inflection as TCO/Hess capex rolls off",
            netMargin: "~9–10%",
            roe: "~12–14%",
            balanceSheet: "Net debt/cap ~12–18%; very strong",
            valuation: "Fwd P/E ~12–14, ~4% dividend yield",
          },
          moat: "Advantaged asset positions (Guyana stake, Permian royalty-advantaged acreage, TCO), disciplined capital allocation culture.",
          catalysts: [
            "Hess/Guyana barrels layering into FCF",
            "$10B+/yr capex discipline = FCF/share growth even at flat oil",
            "New Gulf of Mexico projects (Anchor, Ballymore) ramping",
            "Potential data-center power ventures (announced gas-to-power projects)",
          ],
          risks: [
            "Oil price sensitivity — dividend is safe, but buyback flexes down",
            "California refining regulatory friction",
            "Slower production growth profile than Exxon post-2027",
          ],
          whyAbove:
            "Beats ConocoPhillips (pure upstream = more commodity beta) and EOG for the value/income slot: integrated model smooths cycles, and the Hess resolution removed the big overhang. Ranks below XOM on growth and below CEG on secular story.",
        },
      ],
    },
      ],
    },
    {
      id: "SG",
      name: "Singapore",
      flag: "🇸🇬",
      exchange: "SGX",
      currency: "SGD",
      industries: [
        {
          id: "sg-banks",
          name: "Banking & Finance",
          emoji: "🏦",
          outlook:
            "Singapore's three local banks dominate one of Asia's strongest financial hubs and are riding the structural shift of global wealth into Singapore. Even as rate cuts compress net interest margins from their peak, fee income (wealth management, cards, treasury) is re-accelerating, capital positions are over-stuffed (CET1 ~15%+), and all three are returning surplus capital via higher dividends and buybacks. Key group risks: a sharper-than-expected NIM squeeze, China/HK credit exposure, and slowing regional growth.",
          stocks: [
            {
              rank: 1,
              ticker: "DBS",
              name: "DBS Group Holdings · SGX: D05",
              confidence: 85,
              risk: "Low-Medium",
              thesis:
                "DBS is Southeast Asia's largest and best-run bank, repeatedly named the world's best bank for digital execution. It earns the highest ROE of the trio (~17–18%) thanks to a low-cost deposit franchise and a wealth management arm that keeps pulling in net new money as global wealth migrates to Singapore. Management has committed to returning surplus capital via a step-up dividend plus a capital-return dividend, giving shareholders ~6% all-in yield with growth on top.",
              metrics: {
                revenueGrowth: "~5–8% YoY (fee income double-digit)",
                earningsGrowth: "Mid-single-digit; high base after record years",
                netMargin: "Cost/income ~40%; NIM ~2.0–2.1%",
                roe: "~17–18% — best in ASEAN",
                balanceSheet: "CET1 ~15%+; NPL ~1.1%",
                valuation: "Strongly re-rated through 2025–26 (~S$62 by mid-2026); P/B now ~2+, yield compressed toward ~4.5–5% — premium fully priced",
              },
              moat: "Dominant SGD deposit share (lowest funding cost), top-3 Asian private bank by AUM, digital platform advantage that keeps cost/income best-in-class.",
              catalysts: [
                "Capital-return dividends committed through 2027 (managing down surplus CET1)",
                "Wealth management AUM inflows compounding as Asia's rich consolidate in SG",
                "Fee income re-acceleration offsetting NIM normalization",
                "Potential bolt-on acquisitions in ASEAN wealth/transaction banking",
              ],
              risks: [
                "Fastest NIM compression of the trio if Fed cuts deepen (most rate-sensitive book)",
                "Greater China exposure (~15% of loans) in a weak property cycle",
                "Premium P/B leaves less margin of safety than OCBC/UOB",
              ],
              whyAbove:
                "Ranks #1 on quality: structurally higher ROE, the strongest wealth franchise, and the clearest capital-return roadmap. You pay a premium book multiple, but you get the best compounder in ASEAN banking.",
            },
            {
              rank: 2,
              ticker: "OCBC",
              name: "Oversea-Chinese Banking Corp · SGX: O39",
              confidence: 80,
              risk: "Low-Medium",
              thesis:
                "OCBC is the value-and-diversification pick of the trio: a strong Singapore/Malaysia/Indonesia banking core, the Bank of Singapore private bank, and majority ownership of Great Eastern, one of ASEAN's largest insurers. The insurance arm gives earnings a non-rate engine the others lack. Trading around ~1.2–1.3x book with a ~5.5% yield and a S$2.5B capital-return program, it offers most of DBS's franchise quality at a meaningful discount.",
              metrics: {
                revenueGrowth: "~4–6% YoY",
                earningsGrowth: "Low-to-mid single digit",
                netMargin: "NIM ~2.0%; cost/income ~40%",
                roe: "~13–14%",
                balanceSheet: "CET1 ~15–17% — most capital-rich of the three",
                valuation: "P/E ~10–11, P/B ~1.2–1.3, yield ~5.5%",
              },
              moat: "Integrated banking + insurance + private banking model, deep Greater Bay Area and ASEAN connectivity franchise, conservative underwriting culture.",
              catalysts: [
                "Capital return program (special dividends + buybacks) running through 2026",
                "Resolution of the Great Eastern minority situation simplifying the group",
                "ASEAN-Greater China trade and wealth corridors driving fee growth",
              ],
              risks: [
                "Lower ROE than DBS with less wealth-fee torque",
                "Great Eastern accounting complexity obscures group value",
                "HK/China commercial real estate exposure",
              ],
              whyAbove:
                "Edges out UOB on capital strength (highest CET1), the insurance earnings buffer, and a cleaner credit book. Ranks below DBS because ROE and fee momentum are structurally lower.",
            },
            {
              rank: 3,
              ticker: "UOB",
              name: "United Overseas Bank · SGX: U11",
              confidence: 77,
              risk: "Medium",
              thesis:
                "UOB is the purest ASEAN-growth play among the Singapore banks: the Citigroup consumer-banking acquisition added ~5,000 employees and millions of customers across Thailand, Malaysia, Indonesia and Vietnam, doubling its regional retail franchise just as supply chains shift into ASEAN. Integration costs are now behind it, so the earnings uplift and cross-sell are flowing through. At ~1.0–1.1x book with a ~6% yield (including specials) it is the cheapest of the trio.",
              metrics: {
                revenueGrowth: "~4–6% YoY; ASEAN-4 retail faster",
                earningsGrowth: "Mid-single-digit as Citi integration synergies land",
                netMargin: "NIM ~2.0%; cost/income ~42%",
                roe: "~12–13%",
                balanceSheet: "CET1 ~15%; S$3B capital return package",
                valuation: "P/E ~10, P/B ~1.0–1.1, yield ~5.5–6%",
              },
              moat: "Largest ASEAN-4 retail footprint of any Singapore bank, generational family-anchored management with conservative credit culture.",
              catalysts: [
                "Citi portfolio synergies and cross-sell maturing (cards, wealth, deposits)",
                "ASEAN supply-chain relocation driving SME and transaction banking growth",
                "S$3B buyback/special-dividend program",
              ],
              risks: [
                "Thailand/Indonesia consumer credit quality is softer than Singapore",
                "Lowest ROE of the trio; integration upside must deliver",
                "More exposed to EM-ASEAN currency weakness",
              ],
              whyAbove:
                "Completes the trio ahead of any non-bank financial (SGX, Great Eastern) because the banks' scale, yield and capital returns are unmatched in the local market. Cheapest valuation, but ranked #3 on lower ROE and EM credit risk.",
            },
          ],
        },
        {
          id: "sg-reits",
          name: "REITs",
          emoji: "🏢",
          outlook:
            "S-REITs are one of the world's premier listed real-estate markets, and the sector is exiting a brutal rate cycle: as global rates step down, financing costs fall and distribution-per-unit (DPU) growth resumes. The quality names kept occupancy high and gearing prudent throughout. Structural winners are data centres (AI demand), suburban retail (resilient spending) and logistics. Group risks: rates staying higher for longer, and overseas assets (US/China) dragging on portfolios.",
          stocks: [
            {
              rank: 1,
              ticker: "CICT",
              name: "CapitaLand Integrated Commercial Trust · SGX: C38U",
              confidence: 80,
              risk: "Low-Medium",
              thesis:
                "CICT is Singapore's flagship REIT — the largest by market cap, owning irreplaceable downtown assets (Raffles City, ION Orchard stake, Plus, Capital Tower) plus dominant suburban malls. Committed occupancy sits ~96–97% with positive rental reversions in both retail and office, a rarity globally. With ~76%+ of debt hedged and gearing ~38–39%, every rate cut now flows almost directly into DPU growth. It is the lowest-risk way to own prime Singapore real estate.",
              metrics: {
                revenueGrowth: "~3–5% YoY; positive rent reversions both segments",
                earningsGrowth: "DPU growth resuming low-to-mid single digit",
                netMargin: "NPI margin ~72–74%",
                roe: "Distribution yield ~5%",
                balanceSheet: "Gearing ~38–39%; cost of debt ~3.5% and falling",
                valuation: "~1.0x book, ~5% yield — fair for the best portfolio in SG",
              },
              moat: "Irreplaceable CBD and suburban locations, sponsor pipeline from CapitaLand, scale that lowers funding cost versus smaller REITs.",
              catalysts: [
                "Rate cuts lowering financing costs straight into DPU",
                "ION Orchard and Raffles City performance riding tourism recovery",
                "Accretive recycling: divesting mature assets into higher-yield redevelopment",
              ],
              risks: [
                "Office demand softening if global hiring slows",
                "Rates staying elevated would stall the DPU recovery",
                "Large size limits acquisition-driven growth",
              ],
              whyAbove:
                "Ranks #1 as the sector's blue chip: best portfolio quality, strongest balance sheet among diversified names, and the most predictable DPU trajectory. The others offer more growth but with more concentration risk.",
            },
            {
              rank: 2,
              ticker: "KDCREIT",
              name: "Keppel DC REIT · SGX: AJBU",
              confidence: 77,
              risk: "Medium",
              thesis:
                "Keppel DC REIT is Asia's first and purest listed data-centre landlord — ~25 assets across Singapore, Japan, Korea, Europe and Australia — directly exposed to the AI-driven scarcity of data-centre capacity. Singapore, its core market, has a moratorium-constrained supply pipeline, giving exceptional pricing power: recent contract renewals have seen rental reversions of +30–40%. DPU is growing again after it digested a China tenant default, and the sponsor (Keppel) has a multi-billion-dollar pipeline to inject.",
              metrics: {
                revenueGrowth: "~10%+ YoY with double-digit positive reversions",
                earningsGrowth: "DPU growth mid-to-high single digit",
                netMargin: "NPI margin ~85%+ (triple-net heavy)",
                roe: "Distribution yield ~4–4.5%",
                balanceSheet: "Gearing ~30–33% — lowest among large S-REITs",
                valuation: "~1.3–1.5x book — premium, justified by AI scarcity",
              },
              moat: "Singapore data-centre supply moratorium makes its local assets near-impossible to replicate; sponsor pipeline; specialist operating expertise.",
              catalysts: [
                "AI/cloud demand outstripping supply — record rental reversions on renewals",
                "Acquisitions from Keppel's private data-centre funds",
                "Singapore releasing limited new capacity only to efficient operators — incumbents win",
              ],
              risks: [
                "Tenant concentration (hyperscalers and a few colocation operators)",
                "Premium valuation vulnerable if rates back up",
                "Past China tenant default shows operator credit risk is real",
              ],
              whyAbove:
                "Ranks above CLAR because it owns the single best secular theme in Asian real estate (AI data centres) with the lowest gearing in the sector. Below CICT only because tenant concentration and a premium price make it less defensive.",
            },
            {
              rank: 3,
              ticker: "CLAR",
              name: "CapitaLand Ascendas REIT · SGX: A17U",
              confidence: 76,
              risk: "Low-Medium",
              thesis:
                "CLAR is Singapore's largest industrial REIT — 220+ properties spanning business parks, logistics, industrial and a growing data-centre sleeve across Singapore, the US, Australia and Europe. It is the diversified way to own the 'new economy' real estate stack: tenants skew to tech, biomedical and logistics. Occupancy ~92–94% with consistently positive rental reversions, a ~5.5% yield, and a long record of accretive acquisitions and redevelopments funded at sensible gearing (~37–38%).",
              metrics: {
                revenueGrowth: "~3–5% YoY",
                earningsGrowth: "DPU stable-to-growing as funding costs ease",
                netMargin: "NPI margin ~70%",
                roe: "Distribution yield ~5.5%",
                balanceSheet: "Gearing ~37–38%; ~80% debt hedged",
                valuation: "~1.0–1.1x book, ~5.5% yield",
              },
              moat: "Scale and sector diversification no SG industrial peer matches, sponsor (CapitaLand) development pipeline, redevelopment expertise that manufactures yield.",
              catalysts: [
                "Data-centre redevelopments (converting industrial assets to DCs at high yields-on-cost)",
                "Logistics demand from supply-chain diversification into SE Asia",
                "Rate cuts reducing its relatively high floating exposure",
              ],
              risks: [
                "US business-park assets face structural office-adjacent softness",
                "Slower growth profile than a pure data-centre play",
                "Currency drag from overseas income",
              ],
              whyAbove:
                "Takes #3 ahead of Mapletree Logistics (China drag) and Frasers Centrepoint (pure retail, slower growth): CLAR pairs a defensive diversified core with genuine data-centre/logistics upside at an undemanding valuation.",
            },
          ],
        },
        {
          id: "sg-industrials",
          name: "Industrials & Defence",
          emoji: "🛠️",
          outlook:
            "Singapore's industrial champions are riding three global cycles at once: rearmament (defence budgets rising across Asia and Europe), the aviation supercycle (record aircraft backlogs and MRO demand), and a shipbuilding upcycle (fleet renewal plus green propulsion). Order books across the sector are at records, giving multi-year revenue visibility unusual for industrials. Risks: these are cyclical businesses, and trade-war escalation cuts both ways.",
          stocks: [
            {
              rank: 1,
              ticker: "STENG",
              name: "ST Engineering · SGX: S63",
              confidence: 84,
              risk: "Low-Medium",
              thesis:
                "ST Engineering is Singapore's defence-and-aerospace crown jewel: the world's largest independent airframe MRO provider plus a defence business supplying the SAF and a growing export book (ammunition, armoured vehicles, naval). Its order book sits at a record ~S$28–29B — roughly 2.5 years of revenue — as global defence budgets rise and airlines scramble for maintenance slots. Management targets high-single-digit revenue growth with margin expansion and a progressive dividend, an uncommon mix of visibility and growth.",
              metrics: {
                revenueGrowth: "~8–12% YoY",
                earningsGrowth: "~12–15% YoY with margin expansion",
                netMargin: "~6–7% and rising",
                roe: "~25%+",
                balanceSheet: "Investment grade; leverage from Transcore deal being paid down",
                valuation: "P/E ~22–25, yield ~3–4% with committed step-ups",
              },
              moat: "Sovereign-backed defence franchise (Temasek-linked), certified MRO capacity that takes years to replicate, decades-long government contracts.",
              catalysts: [
                "Asian and European defence spending — ammunition and vehicle export wins",
                "Aviation MRO supercycle: engine shop visits booked years out",
                "Smart-city/Transcore winning US tolling and congestion-pricing contracts",
                "Dividend step-up policy tied to earnings growth",
              ],
              risks: [
                "Defence programs are lumpy; export licences can slip",
                "Aerospace margins exposed to labour and parts inflation",
                "Higher leverage than historical norms",
              ],
              whyAbove:
                "Ranks #1 for the rare combination of record order-book visibility, defensive government revenue, and exposure to two simultaneous supercycles (defence + aviation). The clearest multi-year compounding story on the SGX outside the banks.",
            },
            {
              rank: 2,
              ticker: "YZJ",
              name: "Yangzijiang Shipbuilding · SGX: BS6",
              confidence: 74,
              risk: "Medium-High",
              thesis:
                "Yangzijiang is China's largest private shipbuilder (listed in Singapore) with an order book of ~US$23–24B stretching into 2028–2029 — containerships, LNG/LPG carriers and tankers, won at strong prices during the post-2021 ordering boom. Margins have surged past 25% as low-cost steel and favourable contract pricing flow through, and the balance sheet is heavily net cash. It is the cheapest large-cap exposure to the global fleet-renewal and green-fuel transition cycle.",
              metrics: {
                revenueGrowth: "~15–25% YoY as backlog converts",
                earningsGrowth: "~20%+ YoY at peak margins",
                netMargin: "~25%+ — historic highs",
                roe: "~25–28%",
                balanceSheet: "Substantial net cash",
                valuation: "P/E ~7–9, yield ~4–5% — deep cyclical discount",
              },
              moat: "Scale and cost advantage among private Chinese yards, proven execution/delivery record, early position in dual-fuel (methanol/LNG) vessel construction.",
              catalysts: [
                "Backlog conversion at locked-in high margins through 2028",
                "Green-fleet replacement cycle (IMO decarbonisation rules) sustaining orders",
                "New yard capacity (Hongqiao) lifting delivery capability",
                "Generous dividends from net-cash position",
              ],
              risks: [
                "US tariffs/port fees targeting Chinese-built ships could chill new orders",
                "Shipbuilding is brutally cyclical — margins mean-revert when steel rises or pricing softens",
                "Geopolitical discount on a China operating base will likely persist",
              ],
              whyAbove:
                "Ranks above SATS on sheer earnings power and balance-sheet strength — record margins, net cash, single-digit P/E. Ranked below ST Engineering because shipbuilding cyclicality and US-China policy risk cap the confidence level.",
            },
            {
              rank: 3,
              ticker: "SATS",
              name: "SATS Ltd · SGX: S58",
              confidence: 72,
              risk: "Medium",
              thesis:
                "SATS became the world's largest air-cargo ground handler by acquiring Worldwide Flight Services (WFS), bolting a global network (North America, Europe) onto its Asian gateway-services and aviation-catering core. The deal looked expensive at peak rates, but earnings have inflected positive as cargo volumes recover, synergies land and debt gets refinanced cheaper. As e-commerce airfreight (intra-Asia, cross-border) compounds, SATS owns the choke-point infrastructure at 200+ stations worldwide.",
              metrics: {
                revenueGrowth: "~8–12% YoY",
                earningsGrowth: "Earnings inflection — strong percentage growth off a low base",
                netMargin: "~5–6% and recovering toward pre-COVID levels",
                roe: "High single digit, improving",
                balanceSheet: "Elevated debt from WFS deal; deleveraging on track",
                valuation: "P/E ~15–18 on recovering earnings, below historical average",
              },
              moat: "Licensed gateway positions at Changi and 200+ airports (licences are scarce), scale density in cargo handling, long-term airline relationships.",
              catalysts: [
                "Global air-cargo upcycle driven by e-commerce out of Asia",
                "WFS synergies and refinancing reducing interest drag",
                "Dividend restoration as FCF recovers",
                "Changi Terminal 5 buildout expanding the home hub",
              ],
              risks: [
                "Trade-war escalation directly hits airfreight volumes",
                "Leverage leaves little buffer in a cargo downturn",
                "Labour-cost inflation in a people-heavy business",
              ],
              whyAbove:
                "Takes #3 over Seatrium (execution/legacy legal issues) and SIA (airline economics are structurally tougher than infrastructure). SATS offers a clean operational-recovery story with a global moat, albeit with more debt than the names above it.",
            },
          ],
        },
        {
          id: "sg-telecom-tech",
          name: "Telecom & Tech",
          emoji: "📡",
          outlook:
            "Singapore's telecom-and-tech complex is smaller than its banks but offers genuine growth stories: Singtel's regional associates ride ASEAN/India data growth while it recycles capital into data centres; the wealth-platform and fintech names scale across Asia; and the contract manufacturers feed global electronics supply chains shifting into SE Asia. Risks: these are competitive, execution-dependent businesses with more earnings variance than the index heavyweights.",
          stocks: [
            {
              rank: 1,
              ticker: "SINGTEL",
              name: "Singapore Telecommunications · SGX: Z74",
              confidence: 80,
              risk: "Low-Medium",
              thesis:
                "Singtel is mid-way through a successful value-unlocking program: lifting core ROIC, recycling S$9B+ of capital (towers, stakes), growing NCS (IT services) and building Nxera, its regional data-centre arm, just as AI demand hits Southeast Asia. Its associates — Bharti Airtel (India), Telkomsel (Indonesia), AIS, Globe — give it exposure to hundreds of millions of mobile users, with Airtel alone worth a large slice of Singtel's market cap. Dividends are rising via a value-realisation component on top of the core payout.",
              metrics: {
                revenueGrowth: "Low single digit core; associates growing faster",
                earningsGrowth: "~10%+ underlying as Optus recovers and associates compound",
                netMargin: "Underlying ROIC lifting toward low-double-digit target",
                roe: "~9–10% and rising",
                balanceSheet: "Investment grade; asset-recycling pipeline funds growth",
                valuation: "Sum-of-parts discount; P/E ~14–16, yield ~5%+",
              },
              moat: "Irreplaceable associate stakes (Airtel, Telkomsel), Singapore mobile/enterprise incumbency, regional data-centre land and power positions secured early.",
              catalysts: [
                "Nxera data centres (Singapore, Johor, Batam, Thailand) commissioning into AI demand",
                "Further Airtel stake monetisation crystallising the SOTP discount",
                "Optus turnaround under new leadership lifting group earnings",
                "Value-realisation dividends on top of core payout",
              ],
              risks: [
                "Optus (Australia) brand damage from past outages/breaches",
                "Associate earnings exposed to INR/IDR currency swings",
                "Telecom core remains a low-growth, competitive business",
              ],
              whyAbove:
                "Ranks #1 on risk-adjusted value: a ~5%+ growing yield, a credible catalyst path (asset recycling, data centres, Airtel) and far lower earnings variance than the tech names below it.",
            },
            {
              rank: 2,
              ticker: "IFAST",
              name: "iFAST Corporation · SGX: AIY",
              confidence: 74,
              risk: "Medium-High",
              thesis:
                "iFAST is Asia's leading independent wealth-management platform — a 'Charles Schwab of Southeast Asia' in the making. Assets under administration have compounded to record highs (S$25B+), and the Hong Kong ePension contract (digitising MPF pension administration) is a multi-year, government-backed earnings engine now ramping hard, driving 30%+ profit growth. A UK digital bank licence adds deposit-funding optionality. It is a rare listed compounder in Asian fintech with actual profits.",
              metrics: {
                revenueGrowth: "~20–25% YoY",
                earningsGrowth: "~30%+ YoY driven by ePension ramp",
                netMargin: "~18–22% and scaling",
                roe: "~20%+",
                balanceSheet: "Net cash (ex-bank deposits)",
                valuation: "P/E ~25–30 — growth-stock pricing",
              },
              moat: "Platform network effects (more AUA → better fund access/pricing → more advisers), sticky recurring platform fees, hard-to-win licences across five markets.",
              catalysts: [
                "Hong Kong ePension revenue stepping up through 2026–2027",
                "AUA growth as ASEAN mass-affluent wealth digitises",
                "iFAST Global Bank (UK) reaching profitability",
              ],
              risks: [
                "Ambitious targets — any ePension delay or margin miss gets punished",
                "Market-sensitive AUA: a bear market slows flows and fees",
                "Small-cap liquidity and key-man (founder-CEO) risk",
              ],
              whyAbove:
                "Ranks above Venture on growth: iFAST is compounding earnings 30%+ with recurring revenue, while Venture awaits a cyclical recovery. Ranked below Singtel because execution risk and valuation make it a higher-beta holding.",
            },
            {
              rank: 3,
              ticker: "VENTURE",
              name: "Venture Corporation · SGX: V03",
              confidence: 70,
              risk: "Medium",
              thesis:
                "Venture is Singapore's blue-chip electronics manufacturer — not a volume assembler but a high-mix, high-margin design-and-manufacturing partner for life sciences instruments, test & measurement, and networking gear. The electronics downcycle hit revenue, but Venture protected ~9% net margins (elite for the industry), holds ~S$1B+ net cash, and pays a ~6% dividend while waiting for the recovery. China+1 supply-chain shifts into Malaysia/Singapore play directly to its footprint.",
              metrics: {
                revenueGrowth: "Recovering from cyclical trough; low single digit",
                earningsGrowth: "Flat-to-recovering; leverage to volume returns",
                netMargin: "~9% — top-tier among global EMS",
                roe: "~10–11%",
                balanceSheet: "~S$1B+ net cash, zero debt",
                valuation: "Sharply re-rated to ~S$18 (mid-2026) on the electronics recovery; yield now ~4% — the deep-value entry has passed",
              },
              moat: "Deep co-design relationships in regulated niches (life sciences, medtech) with multi-year qualification cycles; net-cash resilience through downturns.",
              catalysts: [
                "Electronics/semi-equipment capex recovery lifting orders",
                "China+1: customers shifting production to its Penang/Singapore plants",
                "New wins in AI data-centre networking and liquid-cooling hardware",
              ],
              risks: [
                "Customer concentration in a handful of US OEMs",
                "Structural growth has been elusive — revenue below 2018 peak",
                "Tariff/trade-policy disruption to electronics supply chains",
              ],
              whyAbove:
                "Takes #3 over Sea Ltd (NYSE-listed, so excluded from SGX picks) and NetLink Trust (bond-like, minimal growth): Venture pairs a 6% covered dividend with cyclical upside and a fortress balance sheet — the defensive tech pick.",
            },
          ],
        },
        {
          id: "sg-consumer",
          name: "Consumer & Healthcare",
          emoji: "🛒",
          outlook:
            "Singapore's consumer and healthcare names are defensive compounders: supermarkets and value retail benefit from sticky local demand and cost-of-living trade-down, while private healthcare rides medical tourism and an ageing, wealthy population. Growth is steadier but slower than the banks or industrials — these are portfolio ballast with mid-single-digit growth and reliable dividends. Risks: labour-cost inflation, China consumer softness for the regional players.",
          stocks: [
            {
              rank: 1,
              ticker: "SHENG",
              name: "Sheng Siong Group · SGX: OV8",
              confidence: 80,
              risk: "Low",
              thesis:
                "Sheng Siong is Singapore's best-run supermarket chain — ~75+ stores focused on heartland HDB estates, winning the value-conscious shopper with fresh-food expertise and everyday low prices. It earns ~25%+ ROE with zero debt, converts profits to cash almost perfectly, and keeps adding 4–6 stores a year as new HDB estates open. In a downturn it benefits from trade-down; in normal times it compounds quietly. One of the highest-quality defensive businesses on the SGX.",
              metrics: {
                revenueGrowth: "~4–6% YoY (new stores + same-store growth)",
                earningsGrowth: "~5–8% YoY",
                netMargin: "~9–10% — exceptional for grocery",
                roe: "~25%+",
                balanceSheet: "Net cash, zero borrowings",
                valuation: "P/E ~17–19, yield ~4%",
              },
              moat: "Heartland store network with locations near transport nodes, fresh-food sourcing scale, lowest-cost operating culture in SG grocery.",
              catalysts: [
                "HDB ramping new estate completions — each brings store openings",
                "Higher-margin fresh and house-brand mix expansion",
                "China (Kunming) stores turning from experiment to contributor",
              ],
              risks: [
                "Singapore market is finite; long-term growth needs China to work",
                "Labour and rental cost inflation",
                "Online grocery competition (though SG adoption remains modest)",
              ],
              whyAbove:
                "Ranks #1 on sheer quality-per-unit-of-risk: net cash, 25%+ ROE, defensive demand and a 4% yield. Nothing else in SG consumer compounds as reliably.",
            },
            {
              rank: 2,
              ticker: "RAFFLES",
              name: "Raffles Medical Group · SGX: BSL",
              confidence: 73,
              risk: "Medium",
              thesis:
                "Raffles Medical is Singapore's leading private integrated healthcare group — flagship hospital, 100+ clinics, and an insurance arm — with a trusted brand among locals, expats and medical tourists. The long-criticised China expansion (hospitals in Chongqing, Shanghai, Beijing) is past peak losses and narrowing toward breakeven, removing the main earnings drag. Meanwhile the Singapore core rides structurally rising healthcare demand: ageing population, medical tourism recovery, and insurance-funded private care.",
              metrics: {
                revenueGrowth: "~4–7% YoY",
                earningsGrowth: "Improving as China losses narrow",
                netMargin: "~12–14%",
                roe: "~9–11%",
                balanceSheet: "Net cash; consistent buybacks",
                valuation: "P/E ~22–25 — below historical average",
              },
              moat: "Brand trust built over 45 years, integrated model (clinics feed hospital feed insurance), scarce private hospital licences in land-constrained Singapore.",
              catalysts: [
                "China hospitals reaching breakeven — swing factor for group earnings",
                "Medical tourism recovery from Indonesia/Indochina patients",
                "Ageing-population demand and new specialist services mix",
              ],
              risks: [
                "China healthcare consumption stays weak, prolonging losses",
                "Doctor and nurse wage inflation",
                "Public-sector capacity expansion competing for local patients",
              ],
              whyAbove:
                "Ranks above DFI because its core franchise never broke — the thesis is an earnings-drag removal, not a turnaround. Below Sheng Siong on near-term earnings certainty.",
            },
            {
              rank: 3,
              ticker: "DFI",
              name: "DFI Retail Group · SGX: D01",
              confidence: 70,
              risk: "Medium",
              thesis:
                "DFI Retail (Jardine-backed) runs pan-Asian convenience and health-&-beauty retail: 7-Eleven (HK/SG/South China), Mannings/Guardian, Wellcome/Cold Storage and a stake in Maxim's. A decisive new-management reset — divesting the loss-making Yonghui stake and underperforming units, returning special dividends, and refocusing on the high-margin convenience and H&B formats — has turned a sprawling conglomerate into a focused cash generator. Earnings are recovering strongly off a depressed base and the balance sheet is now net cash.",
              metrics: {
                revenueGrowth: "Low single digit (portfolio reshaped smaller)",
                earningsGrowth: "Double-digit recovery off depressed base",
                netMargin: "~3–4% and expanding with mix shift",
                roe: "Improving into the teens",
                balanceSheet: "Net cash after divestments; special dividends paid",
                valuation: "P/E ~14–16 with re-rating potential",
              },
              moat: "Dense store networks in HK/SG prime catchments, exclusive franchise rights (7-Eleven, IKEA in some markets), Jardine ecosystem backing.",
              catalysts: [
                "Continued portfolio simplification and capital returns",
                "Health & beauty (Mannings/Guardian) margin momentum",
                "Mainland-visitor recovery lifting Hong Kong formats",
              ],
              risks: [
                "Hong Kong retail structurally pressured by cross-border shopping",
                "Turnarounds can stall; execution history is mixed",
                "Minority-stake accounting (Maxim's) adds opacity",
              ],
              whyAbove:
                "Edges out Thai Beverage (heavy debt, governance complexity) and Genting Singapore (regulatory/competitive overhangs) for #3: DFI's self-help story comes with a net-cash balance sheet and visible capital returns.",
            },
          ],
        },
      ],
    },
    {
      id: "MY",
      name: "Malaysia",
      flag: "🇲🇾",
      exchange: "Bursa Malaysia",
      currency: "MYR",
      industries: [
        {
          id: "my-banks",
          name: "Banking",
          emoji: "🏦",
          outlook:
            "Malaysian banks are steady dividend compounders levered to a domestic economy enjoying its best investment cycle in a decade — data centres, semiconductor plants and infrastructure under the various national master plans are driving loan growth of ~5–6%. Asset quality is benign, capital is ample, and payout ratios are high. Risks: net-interest margins are structurally thin, and any ringgit/EM volatility or political noise can compress valuations.",
          stocks: [
            {
              rank: 1,
              ticker: "PBBANK",
              name: "Public Bank Berhad · KLSE: 1295",
              confidence: 83,
              risk: "Low",
              thesis:
                "Public Bank is Malaysia's quality benchmark: five decades of conservative, founder-instilled credit culture have produced the lowest impaired-loan ratio of any major Malaysian bank (~0.6%) and the most efficient cost base (cost/income ~35%). It dominates residential mortgages, auto loans and SME lending. The LPI Capital acquisition adds general insurance income. It will never be the fastest grower, but compounded over decades it has crushed every flashier peer — the definition of sleep-at-night banking.",
              metrics: {
                revenueGrowth: "~4–6% YoY",
                earningsGrowth: "~5–7% YoY",
                netMargin: "Cost/income ~35% — best in Malaysia",
                roe: "~12–13%",
                balanceSheet: "GIL ratio ~0.6%; CET1 ~14%+",
                valuation: "P/E ~11–12, P/B ~1.4, yield ~4.5–5%",
              },
              moat: "Unmatched credit-underwriting culture, dense branch/agent network in retail and SME niches, lowest cost-to-income ratio enabling price competitiveness.",
              catalysts: [
                "Payout ratio drifting higher (capital comfortably above requirements)",
                "LPI insurance cross-sell into the customer base",
                "Loan growth from Malaysia's investment upcycle (data centres, JS-SEZ)",
              ],
              risks: [
                "Thin NIMs (~2.2%) leave little room if rate cuts come",
                "Succession/strategy evolution post-founder era",
                "Slower growth than regional expansion-led peers",
              ],
              whyAbove:
                "Ranks #1 on quality and downside protection: the best asset quality, efficiency and ROE consistency in Malaysian banking. In a sector where blow-ups destroy decades of returns, Public Bank has never had one.",
            },
            {
              rank: 2,
              ticker: "MAYBANK",
              name: "Malayan Banking Berhad · KLSE: 1155",
              confidence: 79,
              risk: "Low-Medium",
              thesis:
                "Maybank is Malaysia's largest bank and a top-5 ASEAN franchise spanning Malaysia, Singapore and Indonesia, with the country's biggest Islamic-banking and asset-management arms. Its M25+ strategy is lifting fee income (wealth, bancassurance, global markets) and digital capability. The stock is fundamentally an income instrument: ~6% dividend yield on a ~75%+ payout, backed by a systemically dominant deposit franchise — with modest growth from the regional network on top.",
              metrics: {
                revenueGrowth: "~4–6% YoY",
                earningsGrowth: "~5–6% YoY",
                netMargin: "NIM ~2.0%; cost/income ~46%",
                roe: "~10–11%",
                balanceSheet: "CET1 ~14–15%; strong liquidity",
                valuation: "P/E ~11–12, P/B ~1.2, yield ~6%",
              },
              moat: "Largest deposit base in Malaysia (cheap funding), national-champion status, leading Islamic finance franchise globally.",
              catalysts: [
                "Dividend reliability attracting yield flows into a strengthening ringgit",
                "Indonesia (Maybank Indonesia) profitability repair",
                "Wealth management growth across the ASEAN footprint",
              ],
              risks: [
                "ROE structurally below Public Bank's; cost base heavier",
                "Regional ops add Indonesia credit and currency risk",
                "High payout limits capital for inorganic growth",
              ],
              whyAbove:
                "Ranks above CIMB on franchise dominance and dividend certainty — the systemic bank of Malaysia with the sector's most dependable ~6% yield. Below Public Bank on efficiency and asset quality.",
            },
            {
              rank: 3,
              ticker: "CIMB",
              name: "CIMB Group Holdings · KLSE: 1023",
              confidence: 75,
              risk: "Medium",
              thesis:
                "CIMB is the self-improvement story of Malaysian banking: the Forward23+ program lifted ROE from ~8% to ~11–12% via cost discipline, portfolio reshaping (exiting bad Thai/Indonesian books) and CASA growth. It owns the most genuinely ASEAN platform of the trio — Niaga in Indonesia is a top-tier franchise in a structurally higher-growth, higher-margin market. At ~1.0x book with a ~5.5–6% yield (including specials), you pay the least per unit of franchise among the big three.",
              metrics: {
                revenueGrowth: "~5–7% YoY",
                earningsGrowth: "~6–8% YoY",
                netMargin: "NIM ~2.2% (Indonesia mix helps); cost/income ~45%",
                roe: "~11–12%, targeting higher",
                balanceSheet: "CET1 ~14.5%+; special dividends being paid",
                valuation: "P/E ~9–10, P/B ~1.0, yield ~5.5–6%",
              },
              moat: "Only Malaysian bank with a top-5 Indonesian franchise (Niaga), strong ASEAN wholesale/markets platform, scale in Islamic banking.",
              catalysts: [
                "New strategic plan targets further ROE expansion",
                "Indonesia's higher-NIM growth compounding via Niaga",
                "Capital returns: special dividends as CET1 builds",
              ],
              risks: [
                "Indonesia credit cycles have burnt CIMB before",
                "ROE gains must be sustained, not just restructuring one-offs",
                "More volatile earnings mix (markets/wholesale) than peers",
              ],
              whyAbove:
                "Takes #3 over Hong Leong Bank (excellent but tightly held, less liquid) and RHB (weaker franchise): CIMB pairs the cheapest valuation of the big three with a credible, already-demonstrated ROE improvement path.",
            },
          ],
        },
        {
          id: "my-utilities",
          name: "Utilities & Power",
          emoji: "⚡",
          outlook:
            "Malaysia has become Southeast Asia's data-centre boomtown: cheap land, available power and proximity to Singapore have drawn tens of billions in hyperscaler commitments to Johor and the Klang Valley. Electricity demand is inflecting upward for the first time in years, regulated grid capex is stepping up sharply, and energy-transition spending (solar, grid upgrades) adds a second leg. Risks: regulatory reset of returns, data-centre commitments slipping, and fuel-cost pass-through politics.",
          stocks: [
            {
              rank: 1,
              ticker: "TENAGA",
              name: "Tenaga Nasional Berhad · KLSE: 5347",
              confidence: 80,
              risk: "Low-Medium",
              thesis:
                "Tenaga is Malaysia's national utility and the irreplaceable backbone of the data-centre boom — every hyperscaler campus in Johor or Cyberjaya connects through its grid. The new regulatory period (RP4) approved a record ~RM43B capex program at maintained returns, structurally growing the regulated asset base ~7–8% a year. Electricity demand growth has accelerated to ~3–5% with data centres layering on multi-hundred-MW connection agreements. A regulated-returns model plus a demand supercycle is a rare combination.",
              metrics: {
                revenueGrowth: "~4–6% YoY; demand growth accelerating",
                earningsGrowth: "~6–10% YoY as RAB expands",
                netMargin: "~6–8% (regulated)",
                roe: "~9–10%",
                balanceSheet: "Investment grade; large but regulator-sanctioned capex",
                valuation: "P/E ~16–18, yield ~3.5–4%",
              },
              moat: "Natural monopoly on transmission/distribution in Peninsular Malaysia, regulated return framework, sole counterparty for data-centre grid connections.",
              catalysts: [
                "Data-centre electricity-supply agreements ramping (multi-GW pipeline)",
                "RP4 capex growing the regulated asset base through 2027",
                "Energy-transition projects (grid of the future, RE corridors) extending growth",
              ],
              risks: [
                "Regulatory reset risk at each review period",
                "Fuel-cost under-recovery if pass-through mechanisms lag",
                "Data-centre demand pipeline could be deferred if AI capex cools",
              ],
              whyAbove:
                "Ranks #1 as the lowest-risk way to own Malaysia's electricity supercycle: regulated returns floor the downside while demand growth lifts the ceiling. The purest infrastructure expression of the data-centre theme.",
            },
            {
              rank: 2,
              ticker: "YTLPOWR",
              name: "YTL Power International · KLSE: 6742",
              confidence: 74,
              risk: "Medium-High",
              thesis:
                "YTL Power is Malaysia's boldest AI-infrastructure bet: on top of stable cash engines (Wessex Water in the UK, PowerSeraya in Singapore), it is building a 500MW+ green data-centre campus in Kulai, Johor — anchored by co-location deals and an NVIDIA-partnered GPU cloud (YTL AI Cloud). Power-plus-data-centre integration (it owns generation, land and solar) gives it cost advantages pure DC developers lack. Earnings already stepped up structurally from PowerSeraya's strong Singapore margins; the AI campus is the optionality on top.",
              metrics: {
                revenueGrowth: "Step-change from utilities; DC revenue ramping from 2025–2026",
                earningsGrowth: "Lumpy; PowerSeraya normalising while DC earnings build",
                netMargin: "~12–15% blended",
                roe: "~12–15%",
                balanceSheet: "High project-level debt, typical of infrastructure developers",
                valuation: "P/E ~12–15 — modest for the growth optionality",
              },
              moat: "Integrated power + land + fibre + water at a single Johor campus, NVIDIA partnership status, regulated UK water base providing currency-diversified cash flow.",
              catalysts: [
                "Data-centre phases energising with hyperscaler/AI tenants",
                "GPU-cloud contracts converting the NVIDIA partnership to revenue",
                "Wessex Water regulatory reset (AMP8) lifting allowed returns",
              ],
              risks: [
                "Execution: AI campuses are capital-hungry and tenant timing is uncertain",
                "PowerSeraya margins normalising faster than DC earnings ramp",
                "GPU-cloud competition from global players could strand capacity",
              ],
              whyAbove:
                "Ranks above Petronas Gas on growth: it is the highest-torque listed play on Johor's AI buildout, balanced by regulated UK water cash flows. Below Tenaga because project execution risk is meaningfully higher than a regulated grid.",
            },
            {
              rank: 3,
              ticker: "PETGAS",
              name: "Petronas Gas Berhad · KLSE: 6033",
              confidence: 74,
              risk: "Low",
              thesis:
                "Petronas Gas owns Malaysia's gas backbone — the Peninsular Gas Utilisation pipeline network, gas processing plants, LNG regasification terminals and utilities — operating largely under regulated or long-term contracted returns with Petronas as anchor customer. It is the bond-proxy of Malaysian energy: ~99% earnings visibility, ~4.5% dividend yield, minimal commodity exposure. As gas-fired power becomes the bridge fuel for data-centre demand, throughput and new infrastructure opportunities quietly accrue to it.",
              metrics: {
                revenueGrowth: "~2–4% YoY",
                earningsGrowth: "~3–5% YoY",
                netMargin: "~28–30%",
                roe: "~13–14%",
                balanceSheet: "Minimal leverage; strong FCF",
                valuation: "P/E ~16–17, yield ~4.5%",
              },
              moat: "Monopoly gas transmission and regas infrastructure, regulated tariff framework, Petronas parentage guaranteeing utilisation.",
              catalysts: [
                "New gas-fired power plants (for data-centre load) lifting throughput",
                "Tariff reviews under incentive-based regulation",
                "Potential new regas/pipeline projects as gas demand grows",
              ],
              risks: [
                "Regulated returns cap the upside — this is an income stock",
                "Long-term energy transition away from gas",
                "Related-party dependence on Petronas terms",
              ],
              whyAbove:
                "Completes the trio over IPPs like Malakoff (weaker assets) and solar EPCs (competitive, low-moat): Petronas Gas offers the sector's most certain cash flows and acts as the defensive anchor to Tenaga's growth and YTL Power's optionality.",
            },
          ],
        },
        {
          id: "my-tech",
          name: "Technology & Semiconductors",
          emoji: "🔬",
          outlook:
            "Malaysia is the quiet giant of the global chip supply chain — ~13% of world back-end assembly/test capacity sits there, and the China+1 wave (Intel, Infineon, Texas Instruments expansions, plus Penang's OSAT cluster) is bringing record foreign investment. The National Semiconductor Strategy aims to move the country up the value chain into IC design and front-end. Group risks: this is a high-beta, cyclical sector exposed to US-China tech policy and the smartphone cycle.",
          stocks: [
            {
              rank: 1,
              ticker: "FRONTKN",
              name: "Frontken Corporation · KLSE: 0128",
              confidence: 75,
              risk: "Medium",
              thesis:
                "Frontken provides precision cleaning and surface treatment for semiconductor fab chamber parts — an unglamorous but mission-critical service where it is the qualified vendor for the world's most advanced foundry customers (its Taiwan unit serves leading-edge fabs, widely understood to include TSMC). As chips move to 3nm/2nm, parts require more frequent, more sophisticated cleaning — revenue per wafer rises with node complexity. Net cash, ~30% net margins, ROE ~25%+: structurally the highest-quality business in Malaysian tech.",
              metrics: {
                revenueGrowth: "~10–15% YoY",
                earningsGrowth: "~12–18% YoY",
                netMargin: "~28–30%",
                roe: "~24–27%",
                balanceSheet: "Substantial net cash, zero debt",
                valuation: "P/E ~28–32 — quality premium",
              },
              moat: "Multi-year qualification cycles at leading-edge fabs (switching a cleaning vendor risks a fab line), proprietary processes, co-located facilities beside key customers.",
              catalysts: [
                "2nm node ramp increasing cleaning intensity per wafer",
                "New Taiwan plant capacity coming online for advanced-node demand",
                "Customer fab expansion in Singapore/Malaysia adding service volume",
              ],
              risks: [
                "Customer concentration around one dominant foundry group",
                "Valuation embeds continued advanced-node capex",
                "Oil & gas legacy segment adds minor earnings noise",
              ],
              whyAbove:
                "Ranks #1 because it monetises the leading-edge AI-chip ramp with recurring service revenue rather than cyclical equipment orders — the best margin/ROE/balance-sheet combination in the sector.",
            },
            {
              rank: 2,
              ticker: "VITROX",
              name: "ViTrox Corporation · KLSE: 0097",
              confidence: 72,
              risk: "Medium-High",
              thesis:
                "ViTrox is Malaysia's homegrown machine-vision champion — automated optical and X-ray inspection systems used by OSATs and EMS lines worldwide to catch chip and board defects. Inspection intensity rises with every step in packaging complexity (advanced packaging, chiplets, AI server boards), making it a picks-and-shovels play on electronics getting harder to build. Founder-led, net cash, gross margins ~45%+, with a purpose-built campus in Penang to triple capacity for the upcycle.",
              metrics: {
                revenueGrowth: "Recovering: ~15–25% YoY off the 2023–24 trough",
                earningsGrowth: "~20%+ YoY in recovery phase",
                netMargin: "~18–22% (mid-cycle)",
                roe: "~14–18%",
                balanceSheet: "Net cash",
                valuation: "At all-time highs (~RM6.85, mid-2026) after a huge run; consensus target (~RM5) sits BELOW the market price — do not chase",
              },
              moat: "Proprietary vision algorithms refined over 20 years, sticky installed base (lines are qualified around its machines), local engineering cost advantage vs Western rivals.",
              catalysts: [
                "Advanced-packaging inspection demand (AI chips need more test/inspection steps)",
                "China OSAT customers buying non-US inspection tools — ViTrox is neutral ground",
                "Campus 2.0 capacity enabling the next revenue leg",
              ],
              risks: [
                "Valuation leaves zero room for an orders air-pocket",
                "Semiconductor equipment is the most cyclical part of the chain",
                "US-China export-control spillover could disrupt China revenue (~30%+)",
              ],
              whyAbove:
                "Ranks above Inari on business quality: it owns its IP and brand rather than depending on one customer's product cycle. Ranked below Frontken because equipment sales are lumpier than recurring services.",
            },
            {
              rank: 3,
              ticker: "INARI",
              name: "Inari Amertron Berhad · KLSE: 0166",
              confidence: 70,
              risk: "Medium-High",
              thesis:
                "Inari is Malaysia's largest OSAT (outsourced assembly and test), best known for packaging radio-frequency chips that sit inside premium smartphones via its anchor customer relationship (widely understood to be Broadcom, feeding Apple). Every step-up in 5G/WiFi-7 RF content per phone flows through its Penang lines. It is diversifying into power modules, optical transceivers (AI data-centre demand) and memory via its China JV. Net cash with a generous payout, but the smartphone cycle still calls the tune.",
              metrics: {
                revenueGrowth: "Cycle-dependent: ~5–15% in up years",
                earningsGrowth: "High operating leverage both directions",
                netMargin: "~20–22% at healthy utilisation",
                roe: "~13–16%",
                balanceSheet: "Net cash ~RM2B; payout ~90%",
                valuation: "P/E ~25–30, yield ~3%",
              },
              moat: "Qualified high-volume RF packaging lines (years to replicate), deep anchor-customer integration, Penang ecosystem talent access.",
              catalysts: [
                "RF content growth in next-gen phones (WiFi-7, satellite connectivity)",
                "Optical transceiver packaging for AI data centres scaling up",
                "China memory JV (Yiwu) reaching volume production",
              ],
              risks: [
                "Mid-2026: consensus target (~RM1.86) sits below the market price (~RM2.36) — analysts see the rally as ahead of earnings",
                "Heavy single-customer concentration — any insourcing decision is existential",
                "Smartphone unit cycles drive utilisation swings",
                "Margin pressure as new ventures ramp",
              ],
              whyAbove:
                "Takes #3 over Malaysian Pacific Industries (similar but more auto-exposed) and Greatech (customer-concentration in solar capex): Inari's net cash, dividend and AI-optical optionality balance its customer-concentration risk.",
            },
          ],
        },
        {
          id: "my-consumer",
          name: "Consumer & Retail",
          emoji: "🛍️",
          outlook:
            "Malaysian consumer staples and value retail are compounding on resilient domestic spending: wage growth, civil-servant pay rises and EPF flexibility support the mass market, while the value formats (mini-markets, home improvement) keep taking share from traditional trade. The listed leaders own dense store networks with proven unit economics still rolling out hundreds of stores a year. Risks: subsidy rationalisation squeezing disposable income, cost inflation, and rich valuations on the best names.",
          stocks: [
            {
              rank: 1,
              ticker: "99SMART",
              name: "99 Speed Mart Retail · KLSE: 5326",
              confidence: 78,
              risk: "Low-Medium",
              thesis:
                "99 Speed Mart is Malaysia's dominant mini-market chain — ~2,800+ small-format stores selling daily essentials at hypermarket prices in every neighbourhood, a model that has gutted traditional sundry shops. It opens ~250 stores a year with payback periods under two years, funded entirely by internal cash flow, and its distribution-centre density creates a cost moat smaller rivals cannot match. Founder-led, net cash, ~25%+ ROE — the best pure compounding story in Malaysian retail.",
              metrics: {
                revenueGrowth: "~10–12% YoY (new stores + low-single-digit SSSG)",
                earningsGrowth: "~12–15% YoY",
                netMargin: "~5–6% — strong for hard-discount retail",
                roe: "~25%+",
                balanceSheet: "Net cash; self-funded expansion",
                valuation: "P/E ~20–24",
              },
              moat: "Unmatched store and DC density (lowest cost-to-serve per neighbourhood), supplier scale rebates, locations rivals cannot economically contest.",
              catalysts: [
                "Store rollout toward a 4,000+ long-term target including East Malaysia",
                "Bulk-sales B2B channel growth (supplying small businesses)",
                "Margin lift from DC automation and direct sourcing",
              ],
              risks: [
                "Mini-market competition intensifying (Bison/MyNews, KK Mart)",
                "Subsidy rationalisation could pinch its mass-market customer",
                "Founder concentration and related-party store leases",
              ],
              whyAbove:
                "Ranks #1 on the strongest unit economics and longest reinvestment runway in Malaysian consumer — a proven format with years of high-return store rollout left.",
            },
            {
              rank: 2,
              ticker: "MRDIY",
              name: "Mr D.I.Y. Group · KLSE: 5296",
              confidence: 74,
              risk: "Medium",
              thesis:
                "Mr D.I.Y. is Malaysia's largest home-improvement and household-goods retailer with 1,400+ stores, plus growing Brunei operations and listed sister ventures abroad. Its formula — cheap, wide assortment, small-box stores in every mall and town — generates ~30% ROE and gross margins above 45% thanks to direct China sourcing at scale. Growth now comes from three engines: continued Malaysian rollout (including the smaller-format expansion), the KKV lifestyle-store franchise it is rolling out, and operating-margin recovery as costs normalise.",
              metrics: {
                revenueGrowth: "~8–12% YoY",
                earningsGrowth: "~10–14% YoY",
                netMargin: "~12–13%",
                roe: "~28–32%",
                balanceSheet: "Modest debt; strong FCF; ~50%+ payout",
                valuation: "P/E ~20–23, yield ~2.5–3%",
              },
              moat: "Sourcing scale (direct-from-factory volumes no local rival approaches), brand synonymous with value, prime small-box locations locked up nationwide.",
              catalysts: [
                "KKV and new format rollouts adding a second growth curve",
                "Same-store-sales recovery with consumer sentiment",
                "Store count still growing ~100+/year with quick paybacks",
              ],
              risks: [
                "SSSG has been soft — rollout masks mature-store fatigue",
                "Ringgit weakness raises imported COGS",
                "Family-holding overhang and periodic share placements",
              ],
              whyAbove:
                "Ranks above QL on valuation-adjusted growth: similar earnings growth at a lower multiple with higher ROE. Below 99 Speed Mart because same-store momentum is less consistent.",
            },
            {
              rank: 3,
              ticker: "QL",
              name: "QL Resources Berhad · KLSE: 7084",
              confidence: 74,
              risk: "Low-Medium",
              thesis:
                "QL Resources is Malaysia's quietest long-term compounder — two decades of ~15% earnings CAGR from unfashionable businesses: eggs and poultry (regional leader), marine products (surimi, fishmeal), palm oil, and the FamilyMart Malaysia franchise, now 400+ stores and the country's favourite convenience brand. Management allocates capital with unusual discipline, layering new engines (convenience retail, renewable energy services) onto cash-generative agri-food cores. Defensive demand, founder-family stewardship, consistently ~13–15% ROE.",
              metrics: {
                revenueGrowth: "~8–10% YoY",
                earningsGrowth: "~10–12% YoY",
                netMargin: "~5–6%",
                roe: "~13–15%",
                balanceSheet: "Conservative gearing; strong operating cash flow",
                valuation: "P/E ~28–32 — perpetual quality premium",
              },
              moat: "Vertically integrated protein supply chains (feed-to-farm-to-retail), FamilyMart exclusive franchise, scale leadership in surimi across ASEAN.",
              catalysts: [
                "FamilyMart expansion (500+ store target) with food-service margins",
                "Egg-price liberalisation improving poultry economics",
                "Regional protein demand growth (Indonesia, Vietnam operations)",
              ],
              risks: [
                "Commodity inputs (feed, fuel) squeeze margins in spikes",
                "Valuation has always been rich — multiple compression risk",
                "Avian-flu or disease events in poultry operations",
              ],
              whyAbove:
                "Completes the trio over Nestlé Malaysia (great brand, but negative growth and a demanding multiple) and Padini (fashion cyclicality): QL's diversified defensive engines and execution record justify its premium.",
            },
          ],
        },
        {
          id: "my-healthcare",
          name: "Healthcare",
          emoji: "🏥",
          outlook:
            "Malaysian healthcare rides three durable currents: an ageing, increasingly insured population; world-class private-hospital medical tourism (costs a fraction of Singapore's at comparable quality); and government policy pushing capacity expansion. The hospital operators have pricing power and decade-long expansion pipelines. The glove sector — once the sector's star — remains in oversupply recovery. Risks: nurse shortages, insurance-premium pushback on private-hospital billing, and regulatory price scrutiny.",
          stocks: [
            {
              rank: 1,
              ticker: "IHH",
              name: "IHH Healthcare Berhad · KLSE: 5225",
              confidence: 80,
              risk: "Medium",
              thesis:
                "IHH is Asia's largest private-hospital group — Gleneagles and Mount Elizabeth (Singapore), Pantai (Malaysia), Acibadem (Turkey/Europe) and Fortis (India) — ~80 hospitals across ten markets. It owns the premium end of Asian healthcare where demand is supply-constrained: bed occupancy runs high, revenue-per-patient rises with case complexity, and it is adding ~4,000 beds over five years, mostly in India and Malaysia where returns are highest. Healthcare demand of this kind is about as durable as secular growth gets.",
              metrics: {
                revenueGrowth: "~12–15% YoY",
                earningsGrowth: "~15%+ YoY (ex-forex noise)",
                netMargin: "~10–12%; EBITDA margin ~22–24%",
                roe: "~9–11% and improving with asset-light shifts",
                balanceSheet: "Manageable leverage; Turkey/forex exposure being reduced",
                valuation: "P/E ~25–30, EV/EBITDA ~13–15",
              },
              moat: "Irreplaceable premium hospital brands and licences in land-scarce cities, specialist-doctor networks loyal to flagship platforms, regional referral flywheel.",
              catalysts: [
                "~4,000-bed expansion pipeline (India, Malaysia, Vietnam) through 2028",
                "Fortis value-unlocking and India healthcare re-rating",
                "Medical tourism growth into Malaysia and Singapore flagships",
              ],
              risks: [
                "Turkey (Acibadem) currency translation volatility",
                "Insurance payors pushing back on private billing inflation across markets",
                "Nurse/specialist wage inflation",
              ],
              whyAbove:
                "Ranks #1 as the sector's only truly regional platform — diversified across the best healthcare demographics in the world with brands money can't quickly buy.",
            },
            {
              rank: 2,
              ticker: "KPJ",
              name: "KPJ Healthcare Berhad · KLSE: 5878",
              confidence: 76,
              risk: "Medium",
              thesis:
                "KPJ is Malaysia's largest domestic hospital network — 29 hospitals under a trusted local brand, with deep penetration in secondary cities where it is often the only quality private option. The investment story is operating leverage: newer hospitals built over the past decade are maturing past breakeven, lifting group margins every quarter, while health-tourism initiatives (notably Indonesian patients) add high-yield volume. A focused, single-country version of the IHH thesis at a lower multiple.",
              metrics: {
                revenueGrowth: "~12–14% YoY",
                earningsGrowth: "~18–25% YoY as new hospitals mature",
                netMargin: "~8–9% and expanding",
                roe: "~13–15%",
                balanceSheet: "Moderate leverage, improving with cash flow",
                valuation: "P/E ~22–26",
              },
              moat: "Largest domestic private-hospital brand and bed base, Johor-corridor positioning for Indonesian/Singaporean patients, integrated specialist training pipeline (KPJ University).",
              catalysts: [
                "Hospital maturation curve — multiple sites crossing into profitability",
                "Bed capacity additions (~400+/yr) and daycare/ambulatory expansion",
                "Health tourism from Indonesia scaling via JB-area hospitals",
              ],
              risks: [
                "Margin expansion stalls if new builds outpace patient demand",
                "Government scrutiny of private-hospital charge inflation",
                "Clinical staff shortages raising costs",
              ],
              whyAbove:
                "Ranks above the glove makers on earnings certainty: structural domestic demand versus commodity-cycle recovery. Below IHH on diversification and brand premium.",
            },
            {
              rank: 3,
              ticker: "HARTA",
              name: "Hartalega Holdings · KLSE: 5168",
              confidence: 66,
              risk: "High",
              thesis:
                "Hartalega is the quality operator in nitrile gloves — historically the industry's best margins, automation and cost per glove. The post-COVID oversupply crushed the sector, but the cycle is slowly clearing: capacity has been decommissioned industry-wide, US tariffs on Chinese gloves are redirecting orders to Malaysia, and ASPs have stabilised. Hartalega enters the recovery with a net-cash balance sheet and the sector's most efficient plants (NGC 1.5 expansion ready when demand returns). This is a cyclical-recovery position, not a steady compounder — sized and ranked accordingly.",
              metrics: {
                revenueGrowth: "Recovering; volume-led ~10–20% YoY off trough",
                earningsGrowth: "High percentage growth off a depressed base",
                netMargin: "~5–8% recovering toward low-teens mid-cycle",
                roe: "Mid-single-digit, normalising upward",
                balanceSheet: "Net cash — the key survival differentiator",
                valuation: "P/B ~2; earnings multiples not meaningful at trough",
              },
              moat: "Lowest-cost automated production lines, regulatory/quality track record with US medical buyers, balance sheet to outlast weaker rivals.",
              catalysts: [
                "US tariffs on China-made gloves shifting orders to Malaysian producers",
                "Industry capacity rationalisation restoring pricing power",
                "Restocking cycle by US/EU medical distributors",
              ],
              risks: [
                "Chinese producers building plants in third countries to dodge tariffs",
                "Recovery has repeatedly disappointed on timing — could again",
                "Nitrile input costs and ringgit strength squeezing margins",
              ],
              whyAbove:
                "Takes #3 over Top Glove (weaker balance sheet, governance history) and Kossan (solid but less efficient): if you want the glove-recovery option, Hartalega is the highest-quality way to hold it — but the High risk rating and lowest confidence score in this app reflect genuine cycle uncertainty.",
            },
          ],
        },
      ],
    },
  ],
};

// Trade levels: numeric so the app can compute risk:reward.
// price/target gathered via web research; targets are analyst consensus averages.
const TRADE_LEVELS = {
  US: {
    NVDA: { cur: "$", price: 199.68, date: "30 Jun 2026", buyLo: 186, buyHi: 200, stop: 154, riskPct: 20, target: 299 },
    TSM: { cur: "$", price: 455.1, date: "30 Jun 2026", buyLo: 425, buyHi: 455, stop: 365, riskPct: 17, target: 470 },
    AVGO: { cur: "$", price: 377.75, date: "30 Jun 2026", buyLo: 350, buyHi: 380, stop: 292, riskPct: 20, target: 500 },
    CRWD: { cur: "$", price: 185.73, date: "30 Jun 2026", buyLo: 173, buyHi: 186, stop: 147, riskPct: 18, target: 190, note: "4-for-1 stock split effective 2 Jul 2026 — levels shown split-adjusted to match the live quote" },
    PANW: { cur: "$", price: 340.17, date: "30 Jun 2026", buyLo: 315, buyHi: 340, stop: 272, riskPct: 17, target: 305 },
    ZS: { cur: "$", price: 141.09, date: "30 Jun 2026", buyLo: 131, buyHi: 141, stop: 109, riskPct: 20, target: 194 },
    LLY: { cur: "$", price: 1199.43, date: "30 Jun 2026", buyLo: 1115, buyHi: 1200, stop: 950, riskPct: 18, target: 1215 },
    ISRG: { cur: "$", price: 400.71, date: "30 Jun 2026", buyLo: 375, buyHi: 400, stop: 320, riskPct: 17, target: 570 },
    ABBV: { cur: "$", price: 251.64, date: "30 Jun 2026", buyLo: 234, buyHi: 252, stop: 207, riskPct: 15, target: 254 },
    V: { cur: "$", price: 343.09, date: "30 Jun 2026", buyLo: 320, buyHi: 345, stop: 289, riskPct: 13, target: 400 },
    MA: { cur: "$", price: 513.6, date: "30 Jun 2026", buyLo: 480, buyHi: 515, stop: 435, riskPct: 13, target: 655 },
    AXP: { cur: "$", price: 338.25, date: "30 Jun 2026", buyLo: 315, buyHi: 340, stop: 272, riskPct: 17, target: 355 },
    XOM: { cur: "$", price: 136.72, date: "30 Jun 2026", buyLo: 127, buyHi: 137, stop: 112, riskPct: 15, target: 165 },
    CEG: { cur: "$", price: 248.37, date: "30 Jun 2026", buyLo: 231, buyHi: 248, stop: 199, riskPct: 17, target: 365 },
    CVX: { cur: "$", price: 165.76, date: "30 Jun 2026", buyLo: 154, buyHi: 166, stop: 138, riskPct: 14, target: 217 },
  },
  SG: {
    DBS: { cur: "S$", price: 66.03, date: "30 Jun 2026", buyLo: 61.4, buyHi: 66, stop: 55.4, riskPct: 13, target: 64.2 },
    OCBC: { cur: "S$", price: 24.76, date: "30 Jun 2026", buyLo: 23, buyHi: 24.8, stop: 20.8, riskPct: 13, target: 23.9 },
    UOB: { cur: "S$", price: 39.78, date: "30 Jun 2026", buyLo: 37, buyHi: 39.8, stop: 33.4, riskPct: 13, target: 38.2 },
    CICT: { cur: "S$", price: 2.4, date: "30 Jun 2026", buyLo: 2.23, buyHi: 2.4, stop: 2.01, riskPct: 13, target: 2.7 },
    KDCREIT: { cur: "S$", price: 2.24, date: "30 Jun 2026", buyLo: 2.08, buyHi: 2.24, stop: 1.84, riskPct: 15, target: 2.54 },
    CLAR: { cur: "S$", price: 2.51, date: "30 Jun 2026", buyLo: 2.33, buyHi: 2.51, stop: 2.08, riskPct: 14, target: 3.19 },
    STENG: { cur: "S$", price: 10.39, date: "30 Jun 2026", buyLo: 9.66, buyHi: 10.39, stop: 8.32, riskPct: 17, target: 12.18 },
    YZJ: { cur: "S$", price: 3.41, date: "30 Jun 2026", buyLo: 3.17, buyHi: 3.41, stop: 2.73, riskPct: 17, target: 4.65 },
    SATS: { cur: "S$", price: 4.49, date: "30 Jun 2026", buyLo: 4.18, buyHi: 4.49, stop: 3.6, riskPct: 17, target: 4.44 },
    SINGTEL: { cur: "S$", price: 4.42, date: "30 Jun 2026", buyLo: 4.11, buyHi: 4.42, stop: 3.67, riskPct: 14, target: 5.18 },
    IFAST: { cur: "S$", price: 8.96, date: "30 Jun 2026", buyLo: 8.33, buyHi: 8.96, stop: 7.18, riskPct: 17, target: 11.97 },
    VENTURE: { cur: "S$", price: 17.1, date: "30 Jun 2026", buyLo: 15.9, buyHi: 17.1, stop: 14.03, riskPct: 15, target: 21.8 },
    SHENG: { cur: "S$", price: 3.23, date: "30 Jun 2026", buyLo: 3, buyHi: 3.23, stop: 2.71, riskPct: 13, target: 3.26 },
    RAFFLES: { cur: "S$", price: 1.02, date: "30 Jun 2026", buyLo: 0.95, buyHi: 1.02, stop: 0.84, riskPct: 15, target: 1.18 },
    DFI: { cur: "US$", price: 4.28, date: "30 Jun 2026", buyLo: 3.98, buyHi: 4.28, stop: 3.39, riskPct: 18, target: 4.58, note: "DFI trades in USD on SGX" },
  },
  MY: {
    PBBANK: { cur: "RM", price: 4.9, date: "30 Jun 2026", buyLo: 4.56, buyHi: 4.9, stop: 4.21, riskPct: 11, target: 5.11 },
    MAYBANK: { cur: "RM", price: 10.8, date: "30 Jun 2026", buyLo: 10.04, buyHi: 10.8, stop: 9.27, riskPct: 11, target: 12.2 },
    CIMB: { cur: "RM", price: 7.41, date: "30 Jun 2026", buyLo: 6.89, buyHi: 7.41, stop: 6.15, riskPct: 14, target: 9.05 },
    TENAGA: { cur: "RM", price: 14.34, date: "30 Jun 2026", buyLo: 13.34, buyHi: 14.34, stop: 12.04, riskPct: 13, target: 15.98 },
    YTLPOWR: { cur: "RM", price: 4.23, date: "30 Jun 2026", buyLo: 3.93, buyHi: 4.23, stop: 3.3, riskPct: 19, target: 4.53, note: "Quote from late June 2026 — verify current price" },
    PETGAS: { cur: "RM", price: 17.48, date: "30 Jun 2026", buyLo: 16.26, buyHi: 17.48, stop: 14.85, riskPct: 12, target: 18.75 },
    FRONTKN: { cur: "RM", price: 4.75, date: "30 Jun 2026", buyLo: 4.42, buyHi: 4.75, stop: 3.81, riskPct: 17, target: 4.86 },
    VITROX: { cur: "RM", price: 7.26, date: "30 Jun 2026", buyLo: 6.75, buyHi: 7.26, stop: 5.74, riskPct: 18, target: 5.08 },
    INARI: { cur: "RM", price: 2.32, date: "30 Jun 2026", buyLo: 2.16, buyHi: 2.32, stop: 1.81, riskPct: 19, target: 1.86 },
    "99SMART": { cur: "RM", price: 3.4, date: "30 Jun 2026", buyLo: 3.16, buyHi: 3.4, stop: 2.82, riskPct: 14, target: 3.97 },
    MRDIY: { cur: "RM", price: 1.7, date: "30 Jun 2026", buyLo: 1.58, buyHi: 1.7, stop: 1.38, riskPct: 16, target: 2.2 },
    QL: { cur: "RM", price: 3.78, date: "30 Jun 2026", buyLo: 3.52, buyHi: 3.78, stop: 3.18, riskPct: 13, target: 4.21 },
    IHH: { cur: "RM", price: 8.9, date: "30 Jun 2026", buyLo: 8.28, buyHi: 8.9, stop: 7.47, riskPct: 13, target: 9.86, note: "Most recent reliable quote is spring 2026 — verify current price" },
    KPJ: { cur: "RM", price: 3.39, date: "30 Jun 2026", buyLo: 3.15, buyHi: 3.39, stop: 2.75, riskPct: 16, target: 3.17 },
    HARTA: { cur: "RM", price: 1.11, date: "30 Jun 2026", buyLo: 1.03, buyHi: 1.11, stop: 0.86, riskPct: 20, target: 1.63, note: "High-risk cyclical — respect the stop strictly" },
  },
};

// TradingView symbol mapping for live-quote widgets (exchange:ticker)
const TV_SYMBOLS = {
  US: {
    NVDA: "NASDAQ:NVDA", TSM: "NYSE:TSM", AVGO: "NASDAQ:AVGO",
    CRWD: "NASDAQ:CRWD", PANW: "NASDAQ:PANW", ZS: "NASDAQ:ZS",
    LLY: "NYSE:LLY", ISRG: "NASDAQ:ISRG", ABBV: "NYSE:ABBV",
    V: "NYSE:V", MA: "NYSE:MA", AXP: "NYSE:AXP",
    XOM: "NYSE:XOM", CEG: "NASDAQ:CEG", CVX: "NYSE:CVX",
  },
  SG: {
    DBS: "SGX:D05", OCBC: "SGX:O39", UOB: "SGX:U11",
    CICT: "SGX:C38U", KDCREIT: "SGX:AJBU", CLAR: "SGX:A17U",
    STENG: "SGX:S63", YZJ: "SGX:BS6", SATS: "SGX:S58",
    SINGTEL: "SGX:Z74", IFAST: "SGX:AIY", VENTURE: "SGX:V03",
    SHENG: "SGX:OV8", RAFFLES: "SGX:BSL", DFI: "SGX:D01",
  },
  MY: {
    PBBANK: "MYX:PBBANK", MAYBANK: "MYX:MAYBANK", CIMB: "MYX:CIMB",
    TENAGA: "MYX:TENAGA", YTLPOWR: "MYX:YTLPOWR", PETGAS: "MYX:PETGAS",
    FRONTKN: "MYX:FRONTKN", VITROX: "MYX:VITROX", INARI: "MYX:INARI",
    "99SMART": "MYX:99SMART", MRDIY: "MYX:MRDIY", QL: "MYX:QL",
    IHH: "MYX:IHH", KPJ: "MYX:KPJ", HARTA: "MYX:HARTA",
  },
};

// Yahoo Finance symbols for SG/MY live quotes — TradingView's embed widgets
// don't have redistribution rights for SGX/Bursa, so those are fetched
// client-side from Yahoo's chart API instead.
const YH_SYMBOLS = {
  SG: {
    DBS: "D05.SI", OCBC: "O39.SI", UOB: "U11.SI",
    CICT: "C38U.SI", KDCREIT: "AJBU.SI", CLAR: "A17U.SI",
    STENG: "S63.SI", YZJ: "BS6.SI", SATS: "S58.SI",
    SINGTEL: "Z74.SI", IFAST: "AIY.SI", VENTURE: "V03.SI",
    SHENG: "OV8.SI", RAFFLES: "BSL.SI", DFI: "D01.SI",
  },
  MY: {
    PBBANK: "1295.KL", MAYBANK: "1155.KL", CIMB: "1023.KL",
    TENAGA: "5347.KL", YTLPOWR: "6742.KL", PETGAS: "6033.KL",
    FRONTKN: "0128.KL", VITROX: "0097.KL", INARI: "0166.KL",
    "99SMART": "5326.KL", MRDIY: "5296.KL", QL: "7084.KL",
    IHH: "5225.KL", KPJ: "5878.KL", HARTA: "5168.KL",
  },
};
