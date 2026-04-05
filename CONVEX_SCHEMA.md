# Convex Schema Design — Build Forward Tech

> Blueprint for adding Convex real-time database to the BFT platform.
> When ready: `bunx convex init` → create schema from this spec → seed from sectors.ts

## Tables

### `sectors`
```ts
sectors: defineTable({
  name: v.string(),
  slug: v.string(),
  icon: v.string(),
  tagline: v.string(),
  description: v.string(),
  whyItMatters: v.string(),
  maturity: v.union(
    v.literal("Emerging"),
    v.literal("Growth"),
    v.literal("Scaling"),
    v.literal("Established")
  ),
  marketSizeEstimate: v.string(),
  timelineToImpact: v.string(),
  challenges: v.array(v.string()),
  color: v.string(),
  sortOrder: v.number(),
})
  .index("by_slug", ["slug"])
  .index("by_sortOrder", ["sortOrder"])
```

### `companies`
```ts
companies: defineTable({
  sectorId: v.id("sectors"),
  name: v.string(),
  slug: v.string(),
  description: v.string(),
  hq: v.string(),
  founded: v.number(),
  ticker: v.optional(v.string()),
  fundingStage: v.optional(v.string()),
  website: v.optional(v.string()),
  keyMilestone: v.string(),
  employeeEstimate: v.optional(v.string()),
  logoUrl: v.optional(v.string()),
  updatedAt: v.number(), // Date.now()
})
  .index("by_sector", ["sectorId"])
  .index("by_slug", ["slug"])
  .index("by_ticker", ["ticker"])
```

### `subscribers`
```ts
subscribers: defineTable({
  email: v.string(),
  name: v.optional(v.string()),
  sectorInterests: v.array(v.string()), // sector slugs
  status: v.union(
    v.literal("active"),
    v.literal("unsubscribed"),
    v.literal("bounced")
  ),
  source: v.string(), // "website", "social", "referral"
  subscribedAt: v.number(),
  unsubscribedAt: v.optional(v.number()),
})
  .index("by_email", ["email"])
  .index("by_status", ["status"])
```

### `articles`
```ts
// Ingested from TLDR and other newsletter sources
articles: defineTable({
  source: v.string(), // "tldr-main", "tldr-ai", "tldr-webdev", etc.
  sourceSection: v.optional(v.string()), // "Big Tech & Startups", etc.
  publishDate: v.number(), // Date.now()
  headline: v.string(),
  summary: v.string(),
  sourceUrl: v.string(),
  // AI-classified fields
  sectors: v.array(v.string()), // BFT sector slugs
  companies: v.array(v.string()), // company names mentioned
  tags: v.array(v.string()), // "funding", "milestone", "regulation", etc.
  significance: v.optional(v.number()), // 1-5 AI-rated importance
  // Metadata
  ingestedAt: v.number(),
  usedInNewsletter: v.optional(v.id("newsletters")),
})
  .index("by_source_date", ["source", "publishDate"])
  .index("by_sector", ["sectors"])
  .index("by_publishDate", ["publishDate"])
  .searchIndex("search_headline", { searchField: "headline" })
```

### `newsletters`
```ts
// Published BFT newsletter issues
newsletters: defineTable({
  issueNumber: v.number(),
  title: v.string(),
  publishDate: v.number(),
  status: v.union(
    v.literal("draft"),
    v.literal("review"),
    v.literal("published")
  ),
  // Content sections
  sectorRoundup: v.string(), // markdown
  companySpotlight: v.optional(v.object({
    companyId: v.id("companies"),
    writeup: v.string(),
  })),
  dealFlow: v.optional(v.string()), // markdown
  investmentPerspective: v.optional(v.string()), // markdown
  // Metrics
  recipientCount: v.optional(v.number()),
  openRate: v.optional(v.number()),
  clickRate: v.optional(v.number()),
})
  .index("by_issueNumber", ["issueNumber"])
  .index("by_status", ["status"])
  .index("by_publishDate", ["publishDate"])
```

## Scheduled Functions

```ts
// Daily: Ingest TLDR newsletters
// Triggered by email webhook → HTTP action
export const ingestNewsletter = httpAction(async (ctx, request) => {
  // Parse incoming email
  // Extract articles
  // Classify with Claude API
  // Store in articles table
});

// Weekly (Monday 8 AM): Generate newsletter draft
export const generateDraft = cronJobs.weekly("generate-newsletter-draft",
  { dayOfWeek: "monday", hourUTC: 15, minuteUTC: 0 },
  internal.newsletters.generateWeeklyDraft
);
```

## Migration from Static Data

```ts
// One-time seed script: convex/seed.ts
// Reads from sectors.ts → inserts into Convex tables
// Run once with: npx convex run seed:seedAll
```
