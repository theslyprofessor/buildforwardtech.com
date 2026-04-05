/**
 * Convex client configuration for the BFT Astro site.
 *
 * Usage in React components:
 *   import { useConvex, useMutation, useQuery } from "convex/react";
 *   import { api } from "../../convex/_generated/api";
 *
 * The ConvexProvider is set up in ConvexClientProvider.tsx
 * and used as an Astro React island wrapper.
 */

// The Convex deployment URL — set via environment variable
// In .env.local: PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
export const CONVEX_URL = import.meta.env.PUBLIC_CONVEX_URL || "";
