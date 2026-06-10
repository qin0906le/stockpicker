// Stock Picker — curated analysis data
// NOTE: Figures are approximate, based on publicly available data as of early 2026.
// This is research/educational content, NOT financial advice. Verify all numbers before investing.

const STOCK_DATA = {
  asOf: "Q1 2026",
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
          confidence: 76,
          risk: "Medium-High",
          thesis:
            "Zscaler is the leader in zero-trust network security — its cloud proxies ~500B+ transactions a day, replacing legacy VPNs and firewalls with identity-based access. Zero trust is now the default architecture for new deployments, and Zscaler's scale (data from the world's largest security cloud) feeds an expanding data/AI security portfolio. It combines ~20%+ growth with strong FCF margins and a large unpenetrated TAM.",
          metrics: {
            revenueGrowth: "~22–26% YoY",
            earningsGrowth: "FCF margin ~25–28%",
            netMargin: "Approaching GAAP breakeven/profitable",
            roe: "N/M (asset-light, reinvesting)",
            balanceSheet: "Net cash",
            valuation: "EV/Sales ~12–14 — discount to CRWD",
          },
          moat: "Largest inline security cloud (150+ PoPs), high switching costs once traffic is routed through it, architecture advantage over appliance vendors.",
          catalysts: [
            "VPN replacement cycle still in early innings (most enterprises still run VPNs)",
            "Zero Trust Everywhere + AI security (protecting LLM usage) as new SKUs",
            "Federal expansion (FedRAMP High footprint)",
          ],
          risks: [
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
            valuation: "Fwd P/E ~50–55 — perennially expensive; quality premium",
          },
          moat: "20+ year installed-base lock-in, surgeon training network effects (most surgeons train on da Vinci), regulatory barriers, procedure data advantage.",
          catalysts: [
            "da Vinci 5 upgrade cycle with force-feedback and AI features",
            "International expansion (Japan, India, Europe reimbursement wins)",
            "New procedure approvals expanding the addressable surgery pool",
            "Ion (lung biopsy) platform scaling",
          ],
          risks: [
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
            valuation: "Fwd P/E ~28–31 — modest premium to Visa",
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
            valuation: "Fwd P/E ~22–26 — premium to utilities, justified by growth",
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
};
