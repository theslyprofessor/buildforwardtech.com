import crypto from "node:crypto";
import path from "node:path";
import fs from "node:fs";

const PORT = Number(process.env.PORT || 80);
const DIST_DIR = path.resolve(import.meta.dir, "dist");
const ORDERS_DIR = "/tmp/storefront-orders";

const ED25519_PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEAlKfWuwe6m2o92MiIRoKZOf3u41hxthu9mO7m7oRa8vY=
-----END PUBLIC KEY-----`;

const publicKeyObj = crypto.createPublicKey(ED25519_PUBLIC_KEY_PEM);

export interface LicensePayload {
  v: number;
  p: string;
  e: string;
  t: string;
  s: number;
  iat: number;
}

export type ProductId = "screenstage" | "quietplease" | "trackcascade" | "barstage";

interface ProductCatalogItem {
  id: ProductId;
  name: string;
  route: string;
  personalCents: number;
  personalDisplay: string;
  personalSeats: number;
  personalTitle: string;
  teamCents: number;
  teamDisplay: string;
  teamSeats: number;
  teamTitle: string;
  description: string;
  platforms: Record<string, { relPath: string; filename: string; mime: string }>;
}

const PRODUCT_CATALOG: Record<ProductId, ProductCatalogItem> = {
  barstage: {
    id: "barstage",
    name: "BarStage v1.0",
    route: "/barstage",
    personalCents: 900,
    personalDisplay: "$9.00",
    personalSeats: 3,
    personalTitle: "BarStage v1.0 - Ad-Free Personal License (3 Macs)",
    teamCents: 8900,
    teamDisplay: "$89.00",
    teamSeats: 25,
    teamTitle: "BarStage v1.0 - Ad-Free Studio & Team Pack (25 Macs)",
    description:
      "Removes sponsor ads permanently in BarStage.app on up to 3 Macs (or 25 Studio Macs) with an offline Ed25519 MM1-... license key.",
    platforms: {
      "barstage-zip": {
        relPath: "releases/BarStage-macOS-v1.0.0.zip",
        filename: "BarStage-macOS-v1.0.0.zip",
        mime: "application/zip",
      },
    },
  },
  screenstage: {
    id: "screenstage",
    name: "ScreenStage v1.1",
    route: "/screenstage",
    personalCents: 1900,
    personalDisplay: "$19.00",
    personalSeats: 3,
    personalTitle: "ScreenStage v1.1 - Ad-Free Personal License (3 Computers)",
    teamCents: 19900,
    teamDisplay: "$199.00",
    teamSeats: 25,
    teamTitle: "ScreenStage v1.1 - Ad-Free Studio & Team Pack (25 Computers)",
    description:
      "Removes sponsor ads permanently across macOS (.app), Windows 10/11 (.exe), and Linux (x86_64 & ARM64) with an offline Ed25519 license key.",
    platforms: {
      macos: {
        relPath: "releases/ScreenStage-macOS-v1.0.0.zip",
        filename: "ScreenStage-macOS-v1.1.0.zip",
        mime: "application/zip",
      },
      windows: {
        relPath: "releases/ScreenStage-Windows-v1.0.0.zip",
        filename: "ScreenStage-Windows-v1.1.0.zip",
        mime: "application/zip",
      },
      "linux-x64": {
        relPath: "releases/ScreenStage-Linux-x86_64-v1.1.0.tar.gz",
        filename: "ScreenStage-Linux-x86_64-v1.1.0.tar.gz",
        mime: "application/gzip",
      },
      "linux-arm64": {
        relPath: "releases/ScreenStage-Linux-arm64-v1.1.0.tar.gz",
        filename: "ScreenStage-Linux-arm64-v1.1.0.tar.gz",
        mime: "application/gzip",
      },
    },
  },
  quietplease: {
    id: "quietplease",
    name: "QuietPlease v0.3",
    route: "/quietplease",
    personalCents: 1500,
    personalDisplay: "$15.00",
    personalSeats: 3,
    personalTitle: "QuietPlease v0.3 - Ad-Free Educator & Personal License (3 Macs)",
    teamCents: 14900,
    teamDisplay: "$149.00",
    teamSeats: 25,
    teamTitle: "QuietPlease v0.3 - Ad-Free Classroom & Studio Pack (25 Macs)",
    description:
      "Removes sponsor ads permanently in QuietPlease.app (macOS 14+) with an offline Ed25519 license key.",
    platforms: {
      "quietplease-dmg": {
        relPath: "releases/QuietPlease-macOS-v0.3.0.dmg",
        filename: "QuietPlease-macOS-v0.3.0.dmg",
        mime: "application/x-apple-diskimage",
      },
      "quietplease-zip": {
        relPath: "releases/QuietPlease-macOS-v0.3.0.zip",
        filename: "QuietPlease-macOS-v0.3.0.zip",
        mime: "application/zip",
      },
    },
  },
  trackcascade: {
    id: "trackcascade",
    name: "TrackCascade v1.0",
    route: "/trackcascade",
    personalCents: 2900,
    personalDisplay: "$29.00",
    personalSeats: 3,
    personalTitle: "TrackCascade v1.0 (abletools) - Ad-Free Producer License (3 Computers)",
    teamCents: 24900,
    teamDisplay: "$249.00",
    teamSeats: 25,
    teamTitle: "TrackCascade v1.0 (abletools) - Ad-Free Studio & Lab Pack (25 Computers)",
    description:
      "Removes sponsor ads permanently across the Ableton Live .ablx New Tracks extension, Max for Live cascade-router device, and CLI preset bundle with an offline Ed25519 license key.",
    platforms: {
      "trackcascade-bundle": {
        relPath: "releases/TrackCascade-Complete-Bundle-v1.0.0.zip",
        filename: "TrackCascade-Complete-Bundle-v1.0.0.zip",
        mime: "application/zip",
      },
      "trackcascade-ablx": {
        relPath: "releases/TrackCascade-New-Tracks-v1.0.0.ablx",
        filename: "TrackCascade-New-Tracks-v1.0.0.ablx",
        mime: "application/octet-stream",
      },
    },
  },
};

function normalizeProductId(raw?: string | null): ProductId {
  const clean = (raw || "").trim().toLowerCase();
  if (clean === "barstage") return "barstage";
  if (clean === "quietplease") return "quietplease";
  if (clean === "trackcascade" || clean === "abletools") return "trackcascade";
  return "screenstage";
}

function verifyEd25519LicenseKey(rawKey: string | null | undefined): LicensePayload | null {
  if (!rawKey || typeof rawKey !== "string") return null;
  const trimmed = rawKey.trim();
  if (!trimmed.startsWith("MM1-")) return null;
  const body = trimmed.slice(4);
  const dotIdx = body.indexOf(".");
  if (dotIdx <= 0) return null;

  const payloadB64Url = body.slice(0, dotIdx);
  const sigB64Url = body.slice(dotIdx + 1);
  try {
    const sigBuf = Buffer.from(sigB64Url, "base64url");
    if (sigBuf.length !== 64) return null;
    const isValid = crypto.verify(
      null,
      Buffer.from(payloadB64Url, "utf8"),
      publicKeyObj,
      sigBuf
    );
    if (!isValid) return null;
    const payloadJson = Buffer.from(payloadB64Url, "base64url").toString("utf8");
    const parsed = JSON.parse(payloadJson) as LicensePayload;
    if (!parsed || typeof parsed.e !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}

function signEd25519LicenseKey(
  product: ProductId,
  email: string,
  tier: "personal" | "lab",
  seats: number
): string | null {
  const privPem = process.env.LICENSE_PRIVATE_KEY_PEM;
  if (!privPem) return null;
  try {
    const privKeyObj = crypto.createPrivateKey(privPem.replace(/\\n/g, "\n"));
    const payload: LicensePayload = {
      v: 1,
      p: product,
      e: email.trim().toLowerCase(),
      t: tier,
      s: seats,
      iat: Math.floor(Date.now() / 1000),
    };
    const payloadB64Url = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
    const sigB64Url = crypto
      .sign(null, Buffer.from(payloadB64Url, "utf8"), privKeyObj)
      .toString("base64url");
    return `MM1-${payloadB64Url}.${sigB64Url}`;
  } catch (err) {
    console.error("Failed to sign Ed25519 key:", err);
    return null;
  }
}

const ALL_PLATFORM_FILES: Record<
  string,
  { product: ProductId; relPath: string; filename: string; mime: string }
> = {};
for (const prod of Object.values(PRODUCT_CATALOG)) {
  for (const [k, v] of Object.entries(prod.platforms)) {
    ALL_PLATFORM_FILES[k] = { product: prod.id, ...v };
  }
}

function buildDownloadLinks(validKey?: string) {
  const q = validKey ? `&key=${encodeURIComponent(validKey.trim())}` : "";
  return {
    macos: `/api/download?platform=macos${q}`,
    windows: `/api/download?platform=windows${q}`,
    linuxX64: `/api/download?platform=linux-x64${q}`,
    linuxArm64: `/api/download?platform=linux-arm64${q}`,
    quietpleaseDmg: `/api/download?platform=quietplease-dmg${q}`,
    quietpleaseZip: `/api/download?platform=quietplease-zip${q}`,
    trackcascadeBundle: `/api/download?platform=trackcascade-bundle${q}`,
    trackcascadeAblx: `/api/download?platform=trackcascade-ablx${q}`,
    barstageZip: `/api/download?platform=barstage-zip${q}`,
  };
}

interface StoredOrder {
  orderId: string;
  product: ProductId;
  email: string;
  tier: "personal" | "team" | "lab";
  seats: number;
  amount: string;
  status: "pending" | "paid";
  licenseKey?: string;
  createdAt: string;
  fulfilledAt?: string;
}

function readOrdersMap(): Record<string, StoredOrder> {
  try {
    const p = path.join(ORDERS_DIR, "orders-state.json");
    if (!fs.existsSync(p)) return {};
    return JSON.parse(fs.readFileSync(p, "utf8")) as Record<string, StoredOrder>;
  } catch {
    return {};
  }
}

function saveOrderState(order: StoredOrder) {
  try {
    fs.mkdirSync(ORDERS_DIR, { recursive: true });
    const map = readOrdersMap();
    map[order.orderId] = order;
    fs.writeFileSync(path.join(ORDERS_DIR, "orders-state.json"), JSON.stringify(map, null, 2));
  } catch {}
}

function verifyStripeWebhookSignature(
  rawBody: string,
  sigHeader: string | null,
  webhookSecret: string
): boolean {
  if (!sigHeader || !webhookSecret) return false;
  const parts = Object.fromEntries(
    sigHeader.split(",").map((kv) => {
      const idx = kv.indexOf("=");
      return idx > 0 ? [kv.slice(0, idx).trim(), kv.slice(idx + 1).trim()] : ["", ""];
    })
  );
  const timestamp = parts["t"];
  const v1 = parts["v1"];
  if (!timestamp || !v1) return false;
  const signedPayload = `${timestamp}.${rawBody}`;
  const expected = crypto
    .createHmac("sha256", webhookSecret)
    .update(signedPayload, "utf8")
    .digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(v1, "hex"));
  } catch {
    return false;
  }
}

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    const pathname = decodeURIComponent(url.pathname);

    // 1. POST /api/license/verify -> Cryptographically verify MM1-... Ed25519 key
    if (pathname === "/api/license/verify" && req.method === "POST") {
      try {
        const body = (await req.json()) as { key?: string; product?: string };
        const rawKey = (body?.key || "").trim();
        const verified = verifyEd25519LicenseKey(rawKey);
        if (!verified) {
          return Response.json(
            {
              ok: false,
              error:
                "Invalid license key. Only genuine Ed25519-signed MM1-... license keys issued after purchase can unlock downloads.",
            },
            { status: 403 }
          );
        }
        return Response.json({
          ok: true,
          licenseKey: rawKey,
          payload: verified,
          downloads: buildDownloadLinks(rawKey),
        });
      } catch {
        return Response.json({ ok: false, error: "Malformed request" }, { status: 400 });
      }
    }

    // 2. GET /api/download -> Free-Forever (Ad-Supported) direct binary download (MM1-... key unlocks Ad-Free in-app)
    if (pathname === "/api/download" && req.method === "GET") {
      const platform = url.searchParams.get("platform") || "";
      const target = ALL_PLATFORM_FILES[platform];
      if (!target) {
        return Response.json({ ok: false, error: "Unknown platform" }, { status: 404 });
      }
      const absPath = path.join(DIST_DIR, target.relPath);
      const file = Bun.file(absPath);
      if (!(await file.exists())) {
        return Response.json({ ok: false, error: "Release binary not found" }, { status: 404 });
      }
      return new Response(file, {
        headers: {
          "Content-Type": target.mime,
          "Content-Disposition": `attachment; filename="${target.filename}"`,
          "Cache-Control": "public, max-age=300",
        },
      });
    }

    // 3. POST /api/checkout/create -> Self-Hosted Multi-Product Storefront Checkout
    if (pathname === "/api/checkout/create" && req.method === "POST") {
      try {
        const body = (await req.json()) as {
          product?: string;
          email?: string;
          tier?: "personal" | "team" | "lab";
        };
        const product = normalizeProductId(body?.product);
        const catalog = PRODUCT_CATALOG[product];
        const email = (body?.email || "").trim().toLowerCase();
        if (!email || !email.includes("@") || !email.includes(".")) {
          return Response.json(
            { ok: false, error: "Please enter a valid email address." },
            { status: 400 }
          );
        }
        const isTeam = body?.tier === "team" || body?.tier === "lab";
        const amountCents = isTeam ? catalog.teamCents : catalog.personalCents;
        const amountDisplay = isTeam ? catalog.teamDisplay : catalog.personalDisplay;
        const productName = isTeam ? catalog.teamTitle : catalog.personalTitle;
        const seats = isTeam ? catalog.teamSeats : catalog.personalSeats;
        const orderId = `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${crypto
          .randomBytes(3)
          .toString("hex")
          .toUpperCase()}`;

        const orderRecord: StoredOrder = {
          orderId,
          product,
          email,
          tier: isTeam ? "lab" : "personal",
          seats,
          amount: amountDisplay,
          status: "pending",
          createdAt: new Date().toISOString(),
        };
        saveOrderState(orderRecord);

        const stripeSecret = process.env.STRIPE_SECRET_KEY;
        const origin = `${url.protocol}//${url.host}`;

        if (stripeSecret && stripeSecret.startsWith("sk_")) {
          const params = new URLSearchParams();
          params.set("mode", "payment");
          params.set("customer_email", email);
          params.set(
            "success_url",
            `${origin}${catalog.route}?checkout_session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`
          );
          params.set("cancel_url", `${origin}${catalog.route}`);
          params.set("line_items[0][price_data][currency]", "usd");
          params.set("line_items[0][price_data][unit_amount]", String(amountCents));
          params.set("line_items[0][price_data][product_data][name]", productName);
          params.set("line_items[0][price_data][product_data][description]", catalog.description);
          params.set("line_items[0][quantity]", "1");
          params.set("metadata[product]", product);
          params.set("metadata[email]", email);
          params.set("metadata[tier]", isTeam ? "lab" : "personal");
          params.set("metadata[seats]", String(seats));
          params.set("metadata[orderId]", orderId);

          const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${stripeSecret}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
          });
          const sessionData = (await stripeRes.json()) as {
            url?: string;
            error?: { message?: string };
          };
          if (stripeRes.ok && sessionData.url) {
            return Response.json({
              ok: true,
              mode: "stripe_redirect",
              checkoutUrl: sessionData.url,
              orderId,
              product,
            });
          }
        }

        return Response.json({
          ok: true,
          mode: "direct_invoice",
          orderId,
          product,
          email,
          tier: isTeam ? "team" : "personal",
          productName,
          amount: amountDisplay,
          seats,
          paymentInstructions: {
            zelleOrAppleCash: "vinnie@buildforwardtech.com",
            musicMindEmail: "info@musicmind.biz",
            memo: `${orderId} (${email})`,
          },
        });
      } catch {
        return Response.json({ ok: false, error: "Checkout request failed" }, { status: 400 });
      }
    }

    // 4. GET /api/checkout/session?session_id=cs_... -> Verify completed Stripe payment & issue Ed25519 key
    if (pathname === "/api/checkout/session" && req.method === "GET") {
      const sessionId = url.searchParams.get("session_id") || "";
      const stripeSecret = process.env.STRIPE_SECRET_KEY;
      if (!sessionId || !stripeSecret) {
        return Response.json({ ok: false, error: "Invalid session" }, { status: 400 });
      }
      const stripeRes = await fetch(
        `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
        {
          headers: { Authorization: `Bearer ${stripeSecret}` },
        }
      );
      if (!stripeRes.ok) {
        return Response.json({ ok: false, error: "Could not verify Stripe session" }, { status: 400 });
      }
      const session = (await stripeRes.json()) as {
        payment_status?: string;
        customer_email?: string;
        metadata?: {
          product?: string;
          email?: string;
          tier?: "personal" | "lab";
          seats?: string;
          orderId?: string;
        };
      };
      if (session.payment_status !== "paid") {
        return Response.json(
          { ok: false, error: "Payment has not been completed yet." },
          { status: 402 }
        );
      }
      const product = normalizeProductId(session.metadata?.product);
      const email =
        session.metadata?.email || session.customer_email || "customer@buildforwardtech.com";
      const tier = session.metadata?.tier === "lab" ? "lab" : "personal";
      const seats = Number(session.metadata?.seats || (tier === "lab" ? 25 : 3));
      const signedKey = signEd25519LicenseKey(product, email, tier, seats);
      if (!signedKey) {
        return Response.json(
          { ok: false, error: "Payment verified; contact support for license key issuance." },
          { status: 500 }
        );
      }
      if (session.metadata?.orderId) {
        saveOrderState({
          orderId: session.metadata.orderId,
          product,
          email,
          tier,
          seats,
          amount: tier === "lab" ? PRODUCT_CATALOG[product].teamDisplay : PRODUCT_CATALOG[product].personalDisplay,
          status: "paid",
          licenseKey: signedKey,
          createdAt: new Date().toISOString(),
          fulfilledAt: new Date().toISOString(),
        });
      }
      return Response.json({
        ok: true,
        product,
        licenseKey: signedKey,
        payload: verifyEd25519LicenseKey(signedKey),
        downloads: buildDownloadLinks(signedKey),
      });
    }

    // 5. POST /api/webhooks/stripe -> Stripe checkout.session.completed Webhook
    if (pathname === "/api/webhooks/stripe" && req.method === "POST") {
      try {
        const rawBody = await req.text();
        const sigHeader = req.headers.get("stripe-signature");
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
        if (webhookSecret && !verifyStripeWebhookSignature(rawBody, sigHeader, webhookSecret)) {
          return Response.json({ ok: false, error: "Invalid Stripe signature" }, { status: 400 });
        }
        const event = JSON.parse(rawBody) as {
          type?: string;
          data?: {
            object?: {
              payment_status?: string;
              customer_email?: string;
              metadata?: {
                orderId?: string;
                product?: string;
                email?: string;
                tier?: "personal" | "lab";
                seats?: string;
              };
            };
          };
        };
        if (event.type === "checkout.session.completed") {
          const obj = event.data?.object;
          if (obj && obj.payment_status === "paid") {
            const product = normalizeProductId(obj.metadata?.product);
            const email = obj.metadata?.email || obj.customer_email || "customer@buildforwardtech.com";
            const tier = obj.metadata?.tier === "lab" ? "lab" : "personal";
            const seats = Number(obj.metadata?.seats || (tier === "lab" ? 25 : 3));
            const signedKey = signEd25519LicenseKey(product, email, tier, seats);
            if (signedKey && obj.metadata?.orderId) {
              saveOrderState({
                orderId: obj.metadata.orderId,
                product,
                email,
                tier,
                seats,
                amount:
                  tier === "lab"
                    ? PRODUCT_CATALOG[product].teamDisplay
                    : PRODUCT_CATALOG[product].personalDisplay,
                status: "paid",
                licenseKey: signedKey,
                createdAt: new Date().toISOString(),
                fulfilledAt: new Date().toISOString(),
              });
            }
          }
        }
        return Response.json({ received: true });
      } catch {
        return Response.json({ ok: false, error: "Webhook error" }, { status: 400 });
      }
    }

    // 6. GET /api/orders/status?orderId=ORD-... -> Check if a direct order has been fulfilled
    if (pathname === "/api/orders/status" && req.method === "GET") {
      const orderId = (url.searchParams.get("orderId") || "").trim();
      const orders = readOrdersMap();
      const found = orders[orderId];
      if (!found) {
        return Response.json({ ok: false, error: "Order not found" }, { status: 404 });
      }
      if (found.status !== "paid" || !found.licenseKey) {
        return Response.json({
          ok: true,
          orderId: found.orderId,
          product: found.product,
          status: "pending",
        });
      }
      return Response.json({
        ok: true,
        orderId: found.orderId,
        product: found.product,
        status: "paid",
        licenseKey: found.licenseKey,
        payload: verifyEd25519LicenseKey(found.licenseKey),
        downloads: buildDownloadLinks(found.licenseKey),
      });
    }

    // 7. POST /api/orders/fulfill -> Cryptographically authenticated order fulfillment (via Ed25519 MM1-... key)
    if (pathname === "/api/orders/fulfill" && req.method === "POST") {
      try {
        const body = (await req.json()) as {
          orderId?: string;
          licenseKey?: string;
        };
        const orderId = (body?.orderId || "").trim();
        const licenseKey = (body?.licenseKey || "").trim();
        const verified = verifyEd25519LicenseKey(licenseKey);
        if (!orderId || !verified) {
          return Response.json(
            { ok: false, error: "Valid orderId and Ed25519-signed MM1-... licenseKey required" },
            { status: 403 }
          );
        }
        const orders = readOrdersMap();
        const existing = orders[orderId];
        const product = normalizeProductId(verified.p);
        const updated: StoredOrder = existing
          ? {
              ...existing,
              status: "paid",
              licenseKey,
              fulfilledAt: new Date().toISOString(),
            }
          : {
              orderId,
              product,
              email: verified.e,
              tier: verified.t === "lab" ? "lab" : "personal",
              seats: verified.s,
              amount:
                verified.t === "lab"
                  ? PRODUCT_CATALOG[product].teamDisplay
                  : PRODUCT_CATALOG[product].personalDisplay,
              status: "paid",
              licenseKey,
              createdAt: new Date().toISOString(),
              fulfilledAt: new Date().toISOString(),
            };
        saveOrderState(updated);
        return Response.json({
          ok: true,
          order: updated,
          downloads: buildDownloadLinks(licenseKey),
        });
      } catch {
        return Response.json({ ok: false, error: "Invalid fulfill request" }, { status: 400 });
      }
    }

    // 8. Allow direct Free-Forever (Ad-Supported) downloads from /releases/* (MM1-... key unlocks Ad-Free in-app)

    // 9. Serve static files from DIST_DIR with Range support for MP4 videos
    let filePath = path.join(DIST_DIR, pathname);
    if (!filePath.startsWith(DIST_DIR)) {
      return new Response("Forbidden", { status: 403 });
    }

    let file = Bun.file(filePath);
    if (!(await file.exists()) || pathname.endsWith("/")) {
      const indexCandidate = path.join(filePath, "index.html");
      const indexFile = Bun.file(indexCandidate);
      if (await indexFile.exists()) {
        filePath = indexCandidate;
        file = indexFile;
      } else {
        const htmlCandidate = `${filePath}.html`;
        const htmlFile = Bun.file(htmlCandidate);
        if (await htmlFile.exists()) {
          filePath = htmlCandidate;
          file = htmlFile;
        } else {
          filePath = path.join(DIST_DIR, "index.html");
          file = Bun.file(filePath);
        }
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    const totalSize = file.size;

    const rangeHeader = req.headers.get("range");
    if (rangeHeader && ext === ".mp4" && totalSize > 0) {
      const match = /bytes=(\d*)-(\d*)/.exec(rangeHeader);
      if (match) {
        const start = match[1] ? parseInt(match[1], 10) : 0;
        const end = match[2] ? parseInt(match[2], 10) : totalSize - 1;
        if (start >= 0 && start <= end && end < totalSize) {
          const sliced = file.slice(start, end + 1);
          return new Response(sliced, {
            status: 206,
            headers: {
              "Content-Type": contentType,
              "Content-Range": `bytes ${start}-${end}/${totalSize}`,
              "Accept-Ranges": "bytes",
              "Content-Length": String(end - start + 1),
            },
          });
        }
      }
    }

    const isImmutable = [
      ".js",
      ".css",
      ".png",
      ".jpg",
      ".jpeg",
      ".gif",
      ".ico",
      ".svg",
      ".woff",
      ".woff2",
    ].includes(ext);
    return new Response(file, {
      headers: {
        "Content-Type": contentType,
        "Accept-Ranges": "bytes",
        ...(isImmutable ? { "Cache-Control": "public, max-age=31536000, immutable" } : {}),
      },
    });
  },
});

console.log(`Build Forward Tech + Multi-Product Storefront listening on :${PORT}`);
