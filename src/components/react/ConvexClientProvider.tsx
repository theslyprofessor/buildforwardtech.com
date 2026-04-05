import { ConvexProvider, ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";
import { CONVEX_URL } from "@/lib/convex";

// Only create the client if we have a URL (graceful fallback during dev)
const convex = CONVEX_URL ? new ConvexReactClient(CONVEX_URL) : null;

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (!convex) {
    // No Convex URL configured — render children without provider
    // This allows the site to work in static mode before Convex is set up
    return <>{children}</>;
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
