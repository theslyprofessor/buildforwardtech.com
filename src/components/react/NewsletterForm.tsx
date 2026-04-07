import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sectors, setSectors] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const sectorOptions = [
    { id: "fusion-energy", label: "Fusion Energy" },
    { id: "robotics", label: "Robotics & Automation" },
    { id: "water-infrastructure", label: "Water Infrastructure" },
    { id: "solid-state-batteries", label: "Solid-State Batteries" },
    { id: "autonomous-vehicles", label: "Autonomous Vehicles" },
    { id: "humanitarian-tech", label: "Hygiene & Humanitarian Tech" },
    { id: "innovative-construction", label: "Innovative Construction" },
    { id: "ai-ml", label: "AI & Machine Learning" },
    { id: "circular-economy", label: "Recycling & Circular Economy" },
    { id: "drone-networks", label: "Drone Networks & Delivery" },
  ];

  const toggleSector = (id: string) => {
    setSectors((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      // Call the Convex HTTP endpoint if available, otherwise use local storage
      const convexUrl = (window as any).__CONVEX_URL;
      if (convexUrl) {
        // When Convex is configured, call the subscribe mutation via HTTP
        // (full Convex React integration added after `bunx convex dev`)
        await fetch(`${convexUrl}/api/mutation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: "subscribers:subscribe",
            args: { email, name: name || undefined, sectorInterests: sectors, source: "website" },
          }),
        });
      } else {
        // Pre-Convex: store locally so we don't lose signups
        const existing = JSON.parse(localStorage.getItem("bft_subscribers") || "[]");
        existing.push({ email, name, sectors, date: new Date().toISOString() });
        localStorage.setItem("bft_subscribers", JSON.stringify(existing));
      }
      setStatus("success");
      setEmail("");
      setName("");
      setSectors([]);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center p-8 rounded-xl bg-primary/10 border border-primary/20">
        <div className="text-4xl mb-4">&#9889;</div>
        <h3 className="text-xl font-bold mb-2">You're In!</h3>
        <p className="text-muted-foreground">
          Welcome to Build Forward Tech. You'll get our next newsletter with the
          latest breakthroughs across the sectors shaping tomorrow.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-primary hover:underline text-sm"
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full px-4 py-3 rounded-md bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-md bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          required
        />
      </div>

      {/* Sector Interests */}
      <div>
        <label className="block text-sm font-medium mb-3">
          Sectors you're interested in{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {sectorOptions.map((sector) => (
            <button
              key={sector.id}
              type="button"
              onClick={() => toggleSector(sector.id)}
              className={`px-3 py-2 rounded-md text-xs font-medium transition-colors text-left ${
                sectors.includes(sector.id)
                  ? "bg-primary/20 text-primary border border-primary/40"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/30"
              }`}
            >
              {sector.label}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {status === "submitting" ? "Subscribing..." : "Subscribe to Build Forward Tech"}
      </button>

      <p className="text-xs text-muted-foreground text-center">
        Free weekly newsletter. Unsubscribe anytime. No spam, ever.
      </p>
    </form>
  );
}
