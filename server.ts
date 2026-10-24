import crypto from "node:crypto";
import path from "node:path";
import fs from "node:fs";

const PORT = Number(process.env.PORT || 80);
const DIST_DIR = path.resolve(import.meta.dir, "dist");

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

function signEd25519LicenseKey(email: string, tier: "personal" | "lab", seats: number): string | null {
  const privPem = process.env.LICENSE_PRIVATE_KEY_PEM;
  if (!privPem) return null;
  try {
    const privKeyObj = crypto.createPrivateKey(privPem.replace(/\\n/g, "\n"));
    const payload: LicensePayload = {
      v: 1,
      p: "screenstage",
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

const PLATFORM_FILES: Record<string, { relPath: string; filename: string; mime: string }> = {
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
};

function buildDownloadLinks(validKey: string) {
  const q = encodeURIComponent(validKey.trim());
  return {
    macos: `/api/download?platform=macos&key=${q}`,
    windows: `/api/download?platform=windows&key=${q}`,
    linuxX64: `/api/download?platform=linux-x64&key=${q}`,
    linuxArm64: `/api/download?platform=linux-arm64&key=${q}`,
  };
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
        const body = (await req.json()) as { key?: string };
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

    // 2. GET /api/download -> Gated binary download requiring valid Ed25519 MM1-... key
    if (pathname === "/api/download" && req.method === "GET") {
      const platform = url.searchParams.get("platform") || "";
      const key = url.searchParams.get("key") || "";
      const verified = verifyEd25519LicenseKey(key);
      if (!verified) {
        return Response.json(
          {
            ok: false,
            error:
              "402 Payment Required: A valid Ed25519-signed MM1-... license key is required to download ScreenStage. Purchase a license at https://buildforwardtech.com/screenstage",
          },
          { status: 402 }
        );
      }
      const target = PLATFORM_FILES[platform];
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
          "Cache-Control": "private, no-store",
        },
      });
    }

    // 3. POST /api/checkout/create -> Self-Hosted Storefront Checkout (Stripe 0% platform fee + Direct 0% fee order)
    if (pathname === "/api/checkout/create" && req.method === "POST") {
      try {
        const body = (await req.json()) as {
          email?: string;
          tier?: "personal" | "team";
        };
        const email = (body?.email || "").trim().toLowerCase();
        if (!email || !email.includes("@") || !email.includes(".")) {
          return Response.json(
            { ok: false, error: "Please enter a valid email address." },
            { status: 400 }
          );
        }
        const isTeam = body?.tier === "team";
        const amountCents = isTeam ? 19900 : 1900;
        const amountDisplay = isTeam ? "$199.00" : "$19.00";
        const productName = isTeam
          ? "ScreenStage v1.1 — Studio & Team Pack (15 Computers)"
          : "ScreenStage v1.1 — Personal License (3 Computers)";
        const seats = isTeam ? 15 : 3;
        const orderId = `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${crypto
          .randomBytes(3)
          .toString("hex")
          .toUpperCase()}`;

        const stripeSecret = process.env.STRIPE_SECRET_KEY;
        const origin = `${url.protocol}//${url.host}`;

        if (stripeSecret && stripeSecret.startsWith("sk_")) {
          const params = new URLSearchParams();
          params.set("mode", "payment");
          params.set("customer_email", email);
          params.set(
            "success_url",
            `${origin}/screenstage?checkout_session_id={CHECKOUT_SESSION_ID}`
          );
          params.set("cancel_url", `${origin}/screenstage`);
          params.set("line_items[0][price_data][currency]", "usd");
          params.set("line_items[0][price_data][unit_amount]", String(amountCents));
          params.set("line_items[0][price_data][product_data][name]", productName);
          params.set(
            "line_items[0][price_data][product_data][description]",
            "Includes macOS (.app), Windows 10/11 (.exe), and Linux (x86_64 & ARM64) + offline Ed25519 license key."
          );
          params.set("line_items[0][quantity]", "1");
          params.set("metadata[product]", "screenstage");
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
          const sessionData = (await stripeRes.json()) as { url?: string; error?: { message?: string } };
          if (stripeRes.ok && sessionData.url) {
            return Response.json({
              ok: true,
              mode: "stripe_redirect",
              checkoutUrl: sessionData.url,
              orderId,
            });
          }
        }

        // Self-Hosted Direct Storefront Order (0% Fee Direct Transfer / Invoice — NEVER unlocks without payment!)
        try {
          fs.mkdirSync("/tmp/screenstage-orders", { recursive: true });
          fs.appendFileSync(
            "/tmp/screenstage-orders/orders.jsonl",
            JSON.stringify({
              orderId,
              email,
              tier: isTeam ? "team" : "personal",
              seats,
              amount: amountDisplay,
              createdAt: new Date().toISOString(),
            }) + "\n"
          );
        } catch {}

        return Response.json({
          ok: true,
          mode: "direct_invoice",
          orderId,
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
        metadata?: { email?: string; tier?: "personal" | "lab"; seats?: string };
      };
      if (session.payment_status !== "paid") {
        return Response.json(
          { ok: false, error: "Payment has not been completed yet." },
          { status: 402 }
        );
      }
      const email = session.metadata?.email || session.customer_email || "customer@buildforwardtech.com";
      const tier = session.metadata?.tier === "lab" ? "lab" : "personal";
      const seats = Number(session.metadata?.seats || (tier === "lab" ? 15 : 3));
      const signedKey = signEd25519LicenseKey(email, tier, seats);
      if (!signedKey) {
        return Response.json(
          { ok: false, error: "Payment verified; contact support for license key issuance." },
          { status: 500 }
        );
      }
      return Response.json({
        ok: true,
        licenseKey: signedKey,
        payload: verifyEd25519LicenseKey(signedKey),
        downloads: buildDownloadLinks(signedKey),
      });
    }

    // 5. Block direct unauthenticated requests to /releases/*.zip or /releases/*.tar.gz
    // (Allow version.json so existing installed apps can check for updates, and allow if valid ?key=MM1-... is passed)
    if (
      pathname.startsWith("/releases/") &&
      (pathname.endsWith(".zip") || pathname.endsWith(".tar.gz"))
    ) {
      const key = url.searchParams.get("key") || "";
      const verified = verifyEd25519LicenseKey(key);
      if (!verified) {
        return Response.json(
          {
            ok: false,
            error:
              "402 Payment Required: Direct binary downloads require a valid Ed25519 MM1-... license key. Purchase ScreenStage at https://buildforwardtech.com/screenstage",
          },
          { status: 402 }
        );
      }
    }

    // 6. Serve static files from DIST_DIR with Range support for MP4 videos
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

    // Range request support for MP4 video streaming
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

    const isImmutable = [".js", ".css", ".png", ".jpg", ".jpeg", ".gif", ".ico", ".svg", ".woff", ".woff2"].includes(ext);
    return new Response(file, {
      headers: {
        "Content-Type": contentType,
        "Accept-Ranges": "bytes",
        ...(isImmutable ? { "Cache-Control": "public, max-age=31536000, immutable" } : {}),
      },
    });
  },
});

console.log(`Build Forward Tech + Self-Hosted ScreenStage Storefront listening on :${PORT}`);
