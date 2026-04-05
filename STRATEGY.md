# Build Forward Tech — Expansion Strategy

## Vision

Build Forward Tech evolves from a technology consulting firm into a **media + intelligence + investment platform** covering the technology sectors reshaping civilization.

**Three Arms:**
1. **Media** — Weekly newsletter + sector dashboards curating world-changing tech
2. **Intelligence** — Data pipeline ingesting TLDR, TLDR AI, and dozens of tech sources into a structured database for AI-powered curation
3. **Investment** — Thematic fund or model portfolio betting on frontier tech companies

## Current State (April 2026)

### Website: buildforwardtech.com
- **Stack:** Astro 5 + React + Tailwind + shadcn/ui
- **Pages:** 12 (home, sectors index, 8 sector pages, dashboard, newsletter)
- **Sectors:** 8 tracked (Fusion, Robotics, Water, Batteries, AV, Humanitarian, Construction, AI)
- **Companies:** 44 profiled with milestones, funding, and headquarters
- **Deploy:** Docker → nginx:alpine → Dokploy VPS

### What's Built
- [x] Sector taxonomy (8 sectors, maturity stages, market sizes)
- [x] Company database (44 companies with detailed profiles)
- [x] Sector overview pages (/sectors, /sectors/[slug])
- [x] Interactive dashboard (/dashboard) with stats + maturity visualization
- [x] Newsletter signup page (/newsletter) with sector interest selection
- [x] Updated homepage with sector preview + newsletter CTA
- [x] Updated footer with sector links

### What's Next
- [ ] **Convex integration** — Move from static data to real-time database
- [ ] **Email service** — Connect newsletter signup to Resend, Buttondown, or ConvertKit
- [ ] **TLDR ingestion pipeline** — Automated parsing of TLDR newsletters into Convex
- [ ] **Investment vehicle research** — Legal, regulatory, and platform options
- [ ] **Outreach + audience building** — Social media, SEO, partnerships

---

## Phase 1: Foundation (Now → May 2026)

### 1.1 Newsletter Launch
**Goal:** First newsletter issue sent to real subscribers.

- Choose email service provider:
  - **Buttondown** — Simple, Markdown-friendly, cheap ($9/mo for 1K subs)
  - **Resend** — Developer-friendly API, React email templates
  - **ConvertKit** — Best for audience building, has free tier up to 1K subs
- Connect signup form to chosen provider API
- Write and send Issue #1 (sector overview + featured company spotlight)
- Target: 100 subscribers in first month (personal network + social)

### 1.2 Convex Integration
**Goal:** Dynamic data layer replacing static constants.

- Create new Convex project for BFT (separate from midimaze)
- Schema:
  - `sectors` — mirrors sectors.ts but editable
  - `companies` — company profiles with update history
  - `subscribers` — newsletter signups with sector preferences
  - `articles` — ingested newsletter items (TLDR, etc.)
  - `newsletters` — published BFT newsletter issues
- Seed from existing sectors.ts data
- Update Astro pages to fetch from Convex (SSG with build-time data fetching)

### 1.3 Content Pipeline
**Goal:** Systematic process for weekly newsletter content.

- Monday: Scan TLDR, TLDR AI, TechCrunch, ArXiv, Hacker News
- Tuesday: Classify articles by BFT sector, extract company mentions
- Wednesday: Write newsletter (sector updates + spotlight + deal flow)
- Thursday: Review and send
- Start manual, automate progressively with AI

---

## Phase 2: Data Engine (June–August 2026)

### 2.1 TLDR Newsletter Ingestion
**Goal:** Automated pipeline storing structured newsletter data in Convex.

**Architecture:**
```
Email → Webhook (Convex HTTP action) → Parse → Classify (Claude API) → Store
```

- Forward TLDR subscriptions to a dedicated email → webhook
- Parse each newsletter into structured records:
  - headline, summary, link, section, date
- Classify with Claude API:
  - Map to BFT sectors
  - Extract company mentions
  - Tag with themes (funding, milestone, regulation, etc.)
- Storage estimate: ~5MB/year for all TLDR variants — trivial for Convex

**TLDR Variants to Ingest:**
- TLDR (main tech) — daily
- TLDR AI — daily
- TLDR Web Dev — 3x/week
- TLDR Founders — daily
- TLDR InfoSec — daily
- TLDR Crypto — daily

### 2.2 AI-Powered Newsletter Generation
**Goal:** AI drafts newsletter from ingested data, human edits and sends.

- Weekly Convex scheduled function:
  1. Query this week's ingested articles tagged to BFT sectors
  2. Rank by relevance/significance using Claude
  3. Generate draft newsletter (sector roundup + spotlight)
  4. Store as draft for human review
- Human reviews, edits, approves → sends via email provider

### 2.3 Dashboard Evolution
**Goal:** Real-time dashboard with live data from Convex.

- Move from static stats to Convex-powered real-time data
- Add: article count per sector (trending topics)
- Add: funding round tracker (from ingested data)
- Add: company milestones timeline
- Add: sector heat map (activity this week vs last)

---

## Phase 3: Investment Arm (September 2026+)

### 3.1 Model Portfolio (Lowest Barrier)
**Goal:** Published investment thesis with tracked performance.

- Create a **model portfolio** on the website:
  - Select publicly traded companies from each BFT sector
  - Weight by sector maturity and conviction
  - Track performance vs S&P 500, NASDAQ, ARK Innovation
- Publish portfolio changes in the newsletter
- This builds a **public track record** — essential for any future fund

### 3.2 Platform-Based Strategy
**Options (in order of feasibility):**

1. **M1 Finance "Pie"** — Create a shareable portfolio "pie" that anyone can copy. Free, no regulatory burden. Great for audience building.

2. **Composer.trade** — Algorithmic strategies as shareable templates. Can implement sector rotation based on BFT thesis. Free tier available.

3. **Wealthfront / Betterment Direct Indexing** — If either offers custom index creation.

### 3.3 Registered Investment Advisor (Medium Barrier)
- Form an RIA (Registered Investment Advisor) with the SEC
- Cost: $5K–$20K in legal setup
- Minimum: no AUM requirement for SEC registration
- Allows managing separate accounts for clients based on BFT thesis
- Vinnie's CIO background gives credibility

### 3.4 ETF / Mutual Fund (Long Horizon)
- **ETF:** Partner with a white-label ETF provider (e.g., Tidal Financial, Exchange Traded Concepts)
  - They handle SEC registration, fund admin, compliance
  - BFT provides the index methodology
  - Minimum viable AUM: ~$5M–$10M
  - Cost: ~$100K–$300K/year in operating costs
  - Need 2+ year track record from model portfolio
- **Mutual Fund:** Higher barrier, less common for new entrants
- **Hedge Fund:** Requires accredited investors only, less regulatory burden than ETF but smaller addressable market

---

## Phase 4: Scale (2027+)

### 4.1 Audience Growth
- Target: 10,000 newsletter subscribers
- SEO: Sector pages rank for "fusion energy companies", "solid-state battery companies", etc.
- Social: LinkedIn thought leadership (Vinnie's Fortune 500 network)
- Partnerships: Guest posts on TechCrunch, MIT Tech Review
- Podcast: "Build Forward" podcast interviewing founders in each sector

### 4.2 Premium Tier
- Free newsletter: weekly sector roundup
- Premium ($10/mo): deep dives, company research reports, model portfolio updates
- Enterprise: custom sector intelligence reports

### 4.3 Capital Formation
- Use newsletter audience as investor pool (many will be accredited)
- Vinnie's enterprise network for institutional interest
- Track record from model portfolio provides proof of thesis

---

## Key Metrics to Track

| Metric | Phase 1 Target | Phase 2 Target | Phase 3 Target |
|--------|---------------|---------------|---------------|
| Newsletter subscribers | 100 | 1,000 | 10,000 |
| Companies profiled | 44 | 100 | 250 |
| Sectors tracked | 8 | 12 | 15 |
| Articles ingested/week | 0 (manual) | 50+ (automated) | 200+ |
| Model portfolio return vs S&P | — | Tracking | Outperforming |
| Revenue | $0 | $0 (building) | Premium subs + fund mgmt |

---

## Comparable Organizations to Study

- **ARK Invest** — Cathie Wood built audience through research → launched ETFs
- **Motley Fool** — Newsletter → stock picks → asset management
- **Morning Brew** — Newsletter-first media company → acquired for $75M
- **TLDR Newsletter** — Bite-sized tech news → 5M+ subscribers
- **Lux Capital** — VC firm with strong media presence (Josh Wolfe's newsletter)
- **Chamath Palihapitiya** — Social following → SPAC empire (cautionary tale too)

---

## Technical Architecture (Target State)

```
buildforwardtech.com (Astro 5)
  ├── Static pages (marketing, about, contact)
  ├── React islands (dashboard, newsletter form, sector explorer)
  └── Convex (real-time data layer)
        ├── sectors
        ├── companies
        ├── articles (TLDR ingestion)
        ├── subscribers
        └── newsletters

Convex Scheduled Functions:
  ├── Weekly: Generate newsletter draft from ingested articles
  ├── Daily: Ingest TLDR newsletters via email webhook
  └── Monthly: Update sector stats + market data

Email Service (Resend/Buttondown):
  ├── Subscriber management
  ├── Newsletter delivery
  └── Analytics (open rates, clicks)
```
