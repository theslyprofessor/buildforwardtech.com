# TLDR Newsletter Ingestion — Technical Design

## 1. TLDR Newsletter Inventory

| Newsletter | Slug | Frequency | Items/Issue |
|---|---|---|---|
| TLDR (main) | `tldr` | Daily (weekdays) | 11–13 |
| TLDR AI | `tldr-ai` | Daily | 10–12 |
| TLDR Web Dev | `tldr-webdev` | Daily | 10–12 |
| TLDR Crypto | `tldr-crypto` | Daily | 10–12 |
| TLDR Design | `tldr-design` | 3x/week | 8–10 |
| TLDR Marketing | `tldr-marketing` | Daily | 8–10 |
| TLDR InfoSec | `tldr-infosec` | Daily | 10–12 |
| TLDR DevOps | `tldr-devops` | 3x/week | 8–10 |
| TLDR Founders | `tldr-founders` | Daily | 8–10 |
| TLDR Product | `tldr-product` | Daily | 8–10 |

**Annual estimates:** ~25,000–30,000 articles/year across all newsletters

## 2. Newsletter Structure

Each issue follows a consistent template:
- Sections: "Big Tech & Startups", "Science & Futuristic Tech", etc.
- Full items: headline + 2–3 sentence summary + source URL
- Quick Links: headline + URL only
- Sponsored items clearly marked

**Web archives available at:** `https://tldr.tech/{slug}/{YYYY-MM-DD}`
- Deterministic URLs → backfill is straightforward
- **No official RSS feeds**

## 3. Ingestion Architecture

### Primary: Email Forwarding (ongoing)
```
TLDR email → dedicated inbox → webhook → Convex HTTP action → parse → store
```

Webhook options:
- **Cloudflare Email Workers** (free tier, recommended)
- **Postmark Inbound** (clean parsed JSON)
- **SendGrid Inbound Parse**

### Secondary: Archive Scraping (one-time backfill)
```
Local Bun script → fetch archive pages → parse → bulk insert to Convex
```
- ~7,500 pages to fetch for 3 years of history
- ~2 hours at 1 req/sec
- Yields ~75,000–90,000 historical articles

### Deduplication
- Key: `sourceUrl` (same article may appear across newsletters)
- Cross-appearance is a signal of importance — keep both records

## 4. Storage Estimates

| Metric | Estimate |
|---|---|
| Articles/year | ~27,000 |
| Bytes/article | ~750 |
| **Data/year (articles)** | **~20 MB** |
| Raw HTML/year (if stored) | ~250 MB |
| Convex Free tier | 512 MB DB → 2+ years without HTML |
| Convex Pro tier | 2 GB DB → 10+ years |

**Verdict:** Extremely feasible. Article data alone is ~20MB/year. Store raw HTML in Convex file storage (separate quota).

## 5. AI Classification

### Pipeline
```
New articles (unclassified) → Convex cron (every 30 min)
  → Batch 10–20 articles → Claude API (Sonnet/Haiku)
  → Return: sector, companies[], tags[]
  → Update article records
```

### Cost
- ~100 articles/day → ~7 batches → ~$0.07/day → **~$1.50/month → ~$18/year**

### Weekly Digest
- Monday cron: query week's articles → group by sector → Claude generates summary
- Store in `tldrDigests` table
- Feed into BFT newsletter content

## 6. Implementation Roadmap

| Week | Milestone |
|------|-----------|
| 1 | Email ingestion: dedicated inbox + webhook + Convex HTTP action + parser |
| 2 | Archive backfill: local Bun script + bulk insert |
| 3 | AI classification: Claude batch classification + sector mapping |
| 4 | Dashboard + digest: route for browsing articles + weekly cron |

## 7. Convex Schema

See `CONVEX_SCHEMA.md` for the complete table definitions including:
- `articles` table with search indexes
- `tldrIssues` for issue-level tracking
- `tldrDigests` for weekly AI summaries
