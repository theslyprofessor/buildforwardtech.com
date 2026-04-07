/**
 * BuildForwardTech — Sector Taxonomy & Company Database
 *
 * This is the canonical data source for all BFT sectors and the companies
 * operating within them. The sector taxonomy underpins:
 *   - /sectors pages (sector overviews + company profiles)
 *   - /dashboard (sector health metrics)
 *   - /newsletter (category tags)
 *   - Future: Convex DB seeding, fund sector weights
 */

export interface Company {
  name: string;
  slug: string;
  description: string;
  hq: string;
  founded: number;
  ticker?: string; // NYSE/NASDAQ ticker if publicly traded
  fundingStage?: string; // "Series C", "Public", etc.
  website?: string;
  keyMilestone: string; // most notable recent achievement
  employeeEstimate?: string;
}

export interface Sector {
  id: string;
  name: string;
  slug: string;
  icon: string; // Lucide icon name
  tagline: string; // one-liner for cards
  description: string; // 2-3 sentence overview
  whyItMatters: string; // paragraph for the sector detail page
  maturity: "Emerging" | "Growth" | "Scaling" | "Established";
  marketSizeEstimate: string;
  timelineToImpact: string;
  challenges: string[];
  companies: Company[];
  color: string; // tailwind gradient classes
}

export const SECTORS: Sector[] = [
  // ─────────────────────────────────────────────
  // 1. Fusion Energy
  // ─────────────────────────────────────────────
  {
    id: "fusion-energy",
    name: "Fusion Energy",
    slug: "fusion-energy",
    icon: "Atom",
    tagline: "Limitless clean energy from the power of stars",
    description:
      "Nuclear fusion promises virtually unlimited clean energy by replicating the process that powers the sun. After decades of government-led research, a wave of private companies are racing to build commercially viable fusion reactors.",
    whyItMatters:
      "Fusion could fundamentally solve the energy crisis. Unlike fission, fusion produces no long-lived radioactive waste and uses hydrogen isotopes abundantly available in seawater. A single glass of fusion fuel contains as much energy as a million gallons of oil. The recent milestone of achieving ignition at the National Ignition Facility (NIF) in 2022 proved the physics works — now it's an engineering challenge. Private fusion companies have attracted over $6 billion in investment, and the first grid-connected fusion plants are targeted for the early 2030s.",
    maturity: "Emerging",
    marketSizeEstimate: "$40B+ by 2040",
    timelineToImpact: "2030–2035 for first commercial plants",
    challenges: [
      "Sustaining plasma at 100+ million degrees for extended periods",
      "Developing materials that can withstand extreme neutron bombardment",
      "Achieving net energy gain consistently (Q > 10)",
      "Scaling from experimental reactors to grid-scale power plants",
      "Regulatory frameworks for fusion (distinct from fission)",
    ],
    color: "from-orange-500/20 to-amber-500/20",
    companies: [
      {
        name: "Commonwealth Fusion Systems",
        slug: "commonwealth-fusion",
        description:
          "MIT spinoff building the SPARC tokamak, the world's first net-energy fusion device. Their breakthrough high-temperature superconducting (HTS) magnets enable smaller, cheaper reactors. Backed by Bill Gates, Google, and Tiger Global.",
        hq: "Devens, MA",
        founded: 2018,
        fundingStage: "Series B ($2B+ raised)",
        keyMilestone:
          "Demonstrated record-breaking 20-tesla HTS magnet in 2021, a key enabler for compact fusion",
      },
      {
        name: "Helion Energy",
        slug: "helion-energy",
        description:
          "Building a pulsed fusion system that directly converts fusion energy to electricity without steam turbines. Signed the world's first fusion power purchase agreement with Microsoft for 2028 delivery.",
        hq: "Everett, WA",
        founded: 2013,
        fundingStage: "Series E ($500M from Sam Altman)",
        keyMilestone:
          "First private company to reach 100 million °C plasma temperatures; Microsoft PPA signed for 2028",
      },
      {
        name: "TAE Technologies",
        slug: "tae-technologies",
        description:
          "Pursuing hydrogen-boron (p-B11) fusion using field-reversed configuration — a fuel cycle that produces no neutrons and thus no radioactive waste. The 'holy grail' of fusion fuels.",
        hq: "Foothill Ranch, CA",
        founded: 1998,
        fundingStage: "Series G ($1.2B+ raised)",
        keyMilestone:
          "Achieved sustained plasma at 75 million °C in their Copernicus reactor; targeting commercial reactor by early 2030s",
      },
      {
        name: "General Fusion",
        slug: "general-fusion",
        description:
          "Canadian company using magnetized target fusion — compressing plasma with pistons in liquid metal. Building a demonstration plant in the UK with support from Jeff Bezos.",
        hq: "Vancouver, Canada",
        founded: 2002,
        fundingStage: "Series E ($400M+ raised)",
        keyMilestone:
          "Construction of Fusion Demonstration Plant at UKAEA Culham campus underway",
      },
      {
        name: "Zap Energy",
        slug: "zap-energy",
        description:
          "Uses sheared-flow stabilized Z-pinch — a radically simpler approach that doesn't require expensive magnets or lasers. If it works, it could be the cheapest path to fusion.",
        hq: "Everett, WA",
        founded: 2017,
        fundingStage: "Series C ($200M+ raised)",
        keyMilestone:
          "Achieved fusion neutron production in their FuZE-Q device, validating the Z-pinch approach",
      },
      {
        name: "Type One Energy",
        slug: "type-one-energy",
        description:
          "Building stellarator-based fusion reactors — a design that can run in steady-state (unlike pulsed tokamaks). Uses advanced 3D-printing and HTS magnets for the complex stellarator geometry.",
        hq: "Madison, WI",
        founded: 2019,
        fundingStage: "Series B ($100M+)",
        keyMilestone:
          "Secured DOE milestone-based fusion program funding; stellarator design validated computationally",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. Robotics & Automation
  // ─────────────────────────────────────────────
  {
    id: "robotics",
    name: "Robotics & Automation",
    slug: "robotics",
    icon: "Bot",
    tagline: "Intelligent machines augmenting human capability",
    description:
      "The robotics revolution is entering a new phase as AI-powered humanoid robots, quadrupeds, and autonomous systems move from labs into factories, warehouses, and homes. The convergence of large language models, computer vision, and advanced actuators is making general-purpose robots viable.",
    whyItMatters:
      "The global labor shortage is accelerating across manufacturing, logistics, and healthcare. By 2030, the World Economic Forum estimates 85 million jobs will go unfilled due to demographic shifts. Humanoid robots and intelligent automation aren't replacing humans — they're filling gaps that humans can't or won't fill. The real opportunity is in dangerous, dirty, or repetitive tasks: warehouse logistics, construction, elder care, and disaster response. Companies that crack general-purpose robotics will command trillion-dollar markets.",
    maturity: "Growth",
    marketSizeEstimate: "$260B by 2030 (industrial + service robotics)",
    timelineToImpact: "2025–2028 for warehouse/factory deployment at scale",
    challenges: [
      "Achieving human-level dexterity and manipulation",
      "Battery life and power density for mobile robots",
      "Training robots to handle unstructured real-world environments",
      "Cost reduction from $100K+ to consumer-accessible price points",
      "Safety certification and liability frameworks",
    ],
    color: "from-violet-500/20 to-purple-500/20",
    companies: [
      {
        name: "Boston Dynamics",
        slug: "boston-dynamics",
        description:
          "Pioneers of dynamic legged robots. Spot (quadruped) is deployed in industrial inspection, and Atlas (humanoid) is being redesigned as a fully electric commercial platform. Owned by Hyundai.",
        hq: "Waltham, MA",
        founded: 1992,
        fundingStage: "Subsidiary (Hyundai)",
        keyMilestone:
          "Unveiled all-electric Atlas humanoid in 2024; Spot deployed at 500+ enterprise sites globally",
      },
      {
        name: "Figure AI",
        slug: "figure-ai",
        description:
          "Building Figure 02, a general-purpose humanoid robot designed for manufacturing, logistics, and eventually home use. Integrating OpenAI's language models for natural interaction.",
        hq: "Sunnyvale, CA",
        founded: 2022,
        fundingStage: "Series B ($675M at $2.6B valuation)",
        keyMilestone:
          "Figure 02 demonstrated autonomous coffee-making and BMW manufacturing line tasks in 2024",
      },
      {
        name: "Tesla (Optimus)",
        slug: "tesla-optimus",
        description:
          "Tesla's humanoid robot program leverages its AI, manufacturing, and battery expertise. Optimus Gen 2 demonstrated walking, object manipulation, and factory tasks. Tesla aims to sell millions at under $20K.",
        hq: "Austin, TX",
        founded: 2003,
        ticker: "TSLA",
        fundingStage: "Public",
        keyMilestone:
          "Optimus robots performing real factory tasks at Tesla Fremont plant; targeting external sales by 2026",
      },
      {
        name: "Agility Robotics",
        slug: "agility-robotics",
        description:
          "Creator of Digit, a human-centric bipedal robot designed for logistics. Digit can pick up, carry, and place totes in warehouse environments, working alongside humans.",
        hq: "Corvallis, OR",
        founded: 2015,
        fundingStage: "Series B ($150M+)",
        keyMilestone:
          "Opened RoboFab — the world's first humanoid robot factory — producing 10,000 Digits per year",
      },
      {
        name: "1X Technologies",
        slug: "1x-technologies",
        description:
          "Norwegian company building NEO, a humanoid robot for the home. Their EVE robot (wheeled) is already deployed for security and logistics. Backed by OpenAI and Tiger Global.",
        hq: "Moss, Norway",
        founded: 2014,
        fundingStage: "Series B ($100M)",
        keyMilestone:
          "NEO humanoid prototype demonstrated household tasks; EVE deployed commercially in guarding roles",
      },
      {
        name: "Sanctuary AI",
        slug: "sanctuary-ai",
        description:
          "Building Phoenix, a general-purpose humanoid robot with what they call 'Carbon' — an AI control system that aims to replicate human intelligence for physical tasks.",
        hq: "Vancouver, Canada",
        founded: 2018,
        fundingStage: "Series C ($100M+)",
        keyMilestone:
          "Phoenix demonstrated 150+ real-world retail tasks in partnership with Magna International",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. Water Infrastructure
  // ─────────────────────────────────────────────
  {
    id: "water-infrastructure",
    name: "Water Infrastructure",
    slug: "water-infrastructure",
    icon: "Droplets",
    tagline: "Securing humanity's most essential resource",
    description:
      "With 2 billion people lacking safe drinking water and aging infrastructure crumbling, water technology is one of the most critical — and most underinvested — sectors. Companies are innovating in desalination, atmospheric water generation, leak detection, and water recycling.",
    whyItMatters:
      "The UN warns that by 2025, half the world's population will live in water-stressed areas. In the US alone, the American Society of Civil Engineers gives water infrastructure a 'C-' grade, with an estimated $625 billion needed over the next 20 years. Climate change is making droughts more severe and less predictable. The companies solving water access, treatment, and conservation will serve a market as fundamental as energy — and one that will only grow as population and climate pressures intensify.",
    maturity: "Scaling",
    marketSizeEstimate: "$1T+ by 2030 (global water market)",
    timelineToImpact: "Already impacting — scaling through 2030s",
    challenges: [
      "Massive capital requirements for infrastructure replacement",
      "Reducing energy cost of desalination (currently 3-4 kWh per cubic meter)",
      "Political and regulatory fragmentation across jurisdictions",
      "Aging underground pipe networks invisible until they fail",
      "Making clean water affordable for developing nations",
    ],
    color: "from-cyan-500/20 to-blue-500/20",
    companies: [
      {
        name: "Xylem Inc",
        slug: "xylem",
        description:
          "Global water technology leader offering pumps, treatment systems, analytics, and smart infrastructure. Their acquisition of Evoqua strengthened their treatment portfolio significantly.",
        hq: "Washington, DC",
        founded: 2011,
        ticker: "XYL",
        fundingStage: "Public ($30B+ market cap)",
        keyMilestone:
          "Completed $7.5B Evoqua merger in 2023, creating the largest pure-play water technology company",
      },
      {
        name: "Source Global (formerly Zero Mass Water)",
        slug: "source-global",
        description:
          "Makes hydropanels that extract clean drinking water from sunlight and air — no pipes, no electricity grid needed. Each panel produces 4-5 liters per day. Deployed in 52+ countries.",
        hq: "Scottsdale, AZ",
        founded: 2014,
        fundingStage: "Series D ($150M+)",
        keyMilestone:
          "Deployed world's first hydropanel farm in the Arizona desert; commercial installations across Middle East and Pacific Islands",
      },
      {
        name: "Watergen",
        slug: "watergen",
        description:
          "Israeli company producing atmospheric water generators (AWGs) that pull drinking water from humidity in the air. Products range from home units to large-scale systems producing 5,000+ liters per day.",
        hq: "Petah Tikva, Israel",
        founded: 2009,
        fundingStage: "Private",
        keyMilestone:
          "GEN-350 deployed in disaster relief, military, and off-grid communities; partnership with UNHCR for refugee camps",
      },
      {
        name: "Epic Cleantec",
        slug: "epic-cleantec",
        description:
          "Building-scale water recycling systems that reclaim and treat wastewater onsite, reducing a building's water consumption by up to 95%. Installed in San Francisco high-rises.",
        hq: "San Francisco, CA",
        founded: 2015,
        fundingStage: "Series B ($100M+)",
        keyMilestone:
          "System installed in Salesforce Tower — first commercial building in the US to recycle 100% of its blackwater onsite",
      },
      {
        name: "Gradiant",
        slug: "gradiant",
        description:
          "MIT spinoff specializing in industrial water treatment and desalination using proprietary Carrier Gas Extraction and Counter-Flow Reverse Osmosis. Treats some of the world's most challenging wastewater.",
        hq: "Boston, MA",
        founded: 2013,
        fundingStage: "Series D ($225M)",
        keyMilestone:
          "Treating water for semiconductor fabs, lithium mining, and oil & gas; operating 450+ installations globally",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. Solid-State Batteries
  // ─────────────────────────────────────────────
  {
    id: "solid-state-batteries",
    name: "Solid-State Batteries",
    slug: "solid-state-batteries",
    icon: "Battery",
    tagline: "The next leap in energy storage density and safety",
    description:
      "Solid-state batteries replace the liquid electrolyte in lithium-ion cells with a solid material, enabling higher energy density, faster charging, longer life, and elimination of fire risk. They're the holy grail for EVs, consumer electronics, and grid storage.",
    whyItMatters:
      "Current lithium-ion batteries are approaching their theoretical energy density limits (~300 Wh/kg). Solid-state cells promise 400-500+ Wh/kg — meaning EVs with 600+ mile range that charge in 10 minutes and last 15+ years. Equally important: they can't catch fire. The liquid electrolyte in today's batteries is flammable; solid electrolytes are not. Toyota, Samsung, and dozens of startups are racing to commercialize, with first commercial cells expected in 2026-2028. This technology will determine who wins the EV, drone, and grid storage markets.",
    maturity: "Emerging",
    marketSizeEstimate: "$30B by 2030",
    timelineToImpact: "2026–2028 for first EV deployment",
    challenges: [
      "Manufacturing solid electrolytes at scale with consistent quality",
      "Dendrite formation at the lithium-metal anode interface",
      "Cost parity with existing lithium-ion cells ($100/kWh target)",
      "Cycle life degradation at high charge/discharge rates",
      "Scaling from lab cells to automotive-grade packs",
    ],
    color: "from-green-500/20 to-emerald-500/20",
    companies: [
      {
        name: "QuantumScape",
        slug: "quantumscape",
        description:
          "Developing solid-state lithium-metal batteries with a proprietary ceramic separator. Backed by Volkswagen ($300M invested) and Bill Gates. First cells shipping for VW EVs.",
        hq: "San Jose, CA",
        founded: 2010,
        ticker: "QS",
        fundingStage: "Public (NYSE)",
        keyMilestone:
          "Demonstrated 1,000+ cycle endurance in multi-layer cells; Volkswagen partnership for production vehicle integration",
      },
      {
        name: "Solid Power",
        slug: "solid-power",
        description:
          "Using sulfide-based solid electrolytes compatible with existing lithium-ion manufacturing equipment — a key advantage for rapid scaling. Partners with BMW and Ford.",
        hq: "Louisville, CO",
        founded: 2012,
        ticker: "SLDP",
        fundingStage: "Public (NASDAQ)",
        keyMilestone:
          "Delivered full-scale 22-layer EV cells to BMW for automotive validation testing in 2024",
      },
      {
        name: "Samsung SDI",
        slug: "samsung-sdi",
        description:
          "Samsung's battery division is investing billions in solid-state R&D, targeting a cell with 900+ Wh/L energy density that enables 600-mile EV range with 9-minute charging.",
        hq: "Yongin, South Korea",
        founded: 1970,
        fundingStage: "Subsidiary (Samsung)",
        keyMilestone:
          "Announced solid-state battery production line targeting 2027; prototype achieves 500 Wh/kg",
      },
      {
        name: "Factorial Energy",
        slug: "factorial-energy",
        description:
          "Developing FEST (Factorial Electrolyte System Technology) — a solid-state approach that can work in existing cell manufacturing lines. Partners with Mercedes-Benz, Stellantis, and Hyundai.",
        hq: "Woburn, MA",
        founded: 2018,
        fundingStage: "Series D ($200M+)",
        keyMilestone:
          "Delivered 100 Ah automotive-grade cells to Mercedes-Benz; cells passed rigorous nail penetration safety tests",
      },
      {
        name: "SES AI",
        slug: "ses-ai",
        description:
          "Hybrid approach using lithium-metal anode with a semi-solid electrolyte. Their AI-powered battery management system predicts and prevents dendrite growth in real time.",
        hq: "Boston, MA",
        founded: 2012,
        ticker: "SES",
        fundingStage: "Public (NYSE)",
        keyMilestone:
          "Built the largest lithium-metal battery cells (100+ Ah) validated by GM and Hyundai",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. Autonomous Vehicles
  // ─────────────────────────────────────────────
  {
    id: "autonomous-vehicles",
    name: "Autonomous Vehicles",
    slug: "autonomous-vehicles",
    icon: "Car",
    tagline: "Self-driving technology reshaping transportation",
    description:
      "Autonomous vehicles are moving from pilot programs to commercial service. Robotaxis operate in multiple US cities, autonomous trucks haul freight on highways, and delivery robots navigate sidewalks — with safety records increasingly outperforming human drivers.",
    whyItMatters:
      "Road crashes kill 1.35 million people globally every year — 94% caused by human error. Autonomous vehicles have the potential to eliminate the vast majority of these deaths. Beyond safety: self-driving technology promises to make transportation accessible to the elderly and disabled, reduce traffic congestion through coordinated driving, and slash logistics costs. The autonomous trucking market alone could save $300B annually in the US. Waymo is already operating commercially in 4+ US cities, proving the technology works in real-world conditions.",
    maturity: "Growth",
    marketSizeEstimate: "$2T by 2030 (including robotaxi, trucking, delivery)",
    timelineToImpact: "2025–2030 for broad commercial deployment",
    challenges: [
      "Edge cases: handling construction zones, emergency vehicles, unusual road conditions",
      "Regulatory patchwork across states and countries",
      "Public trust and acceptance after high-profile incidents",
      "Cybersecurity — protecting vehicles from remote attacks",
      "Weather limitations (heavy rain, snow, fog)",
    ],
    color: "from-sky-500/20 to-indigo-500/20",
    companies: [
      {
        name: "Waymo",
        slug: "waymo",
        description:
          "Alphabet's autonomous driving unit and the clear market leader. Waymo One robotaxi service operates fully driverless in Phoenix, San Francisco, Los Angeles, and Austin, completing 100,000+ paid rides per week.",
        hq: "Mountain View, CA",
        founded: 2009,
        fundingStage: "Subsidiary (Alphabet) + $5.6B external",
        keyMilestone:
          "Surpassed 100,000 weekly paid rides; expanding to Atlanta and Miami; safety data shows 85% fewer injury-causing crashes than human drivers",
      },
      {
        name: "Aurora Innovation",
        slug: "aurora-innovation",
        description:
          "Focused on autonomous trucking (Aurora Horizon) and ride-hailing (Aurora Connect). Their Aurora Driver platform is designed to work across vehicle types. Commercial trucking on Texas highways.",
        hq: "Pittsburgh, PA",
        founded: 2017,
        ticker: "AUR",
        fundingStage: "Public (NASDAQ)",
        keyMilestone:
          "Launched commercial driverless trucking between Dallas and Houston in 2024; partnerships with FedEx and Werner",
      },
      {
        name: "Mobileye",
        slug: "mobileye",
        description:
          "Intel subsidiary providing the computer vision and mapping technology used in 150+ million vehicles. Their SuperVision ADAS system and Mobileye Drive fully autonomous stack power vehicles from multiple OEMs.",
        hq: "Jerusalem, Israel",
        founded: 1999,
        ticker: "MBLY",
        fundingStage: "Public (NASDAQ)",
        keyMilestone:
          "SuperVision deployed in Zeekr and Polestar vehicles; building autonomous robotaxi fleet with Volkswagen",
      },
      {
        name: "Zoox",
        slug: "zoox",
        description:
          "Amazon subsidiary building a purpose-built autonomous vehicle — not a retrofitted car but a ground-up design with no steering wheel, bidirectional driving, and a carriage-style interior for 4 passengers.",
        hq: "Foster City, CA",
        founded: 2014,
        fundingStage: "Subsidiary (Amazon)",
        keyMilestone:
          "Testing fully driverless in Las Vegas and San Francisco; purpose-built vehicle has 75 mph top speed and 16-hour range",
      },
      {
        name: "Nuro",
        slug: "nuro",
        description:
          "Building small autonomous delivery vehicles — no passengers, just cargo. Designed for local delivery of groceries, food, and packages. Operates commercially in multiple US markets.",
        hq: "Mountain View, CA",
        founded: 2016,
        fundingStage: "Series D ($1.5B+ raised)",
        keyMilestone:
          "First company to receive NHTSA exemption for vehicles without human controls; partnered with Uber Eats, FedEx, Kroger",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. Hygiene & Humanitarian Tech
  // ─────────────────────────────────────────────
  {
    id: "humanitarian-tech",
    name: "Hygiene & Humanitarian Tech",
    slug: "humanitarian-tech",
    icon: "Heart",
    tagline: "Dignity-restoring technology for underserved communities",
    description:
      "Technology solutions addressing basic human needs: clean water access, sanitation, hygiene facilities for homeless populations, waste-to-energy conversion, and disaster relief systems. Often overlooked by venture capital, these companies solve problems affecting billions.",
    whyItMatters:
      "580,000+ Americans experience homelessness on any given night. 3.6 billion people lack safely managed sanitation globally. 2 billion lack access to basic hygiene services. These aren't just humanitarian issues — they're public health crises that cost cities billions in emergency services. Mobile shower units, portable sanitation, and off-grid hygiene solutions represent a growing market as cities seek humane, scalable responses to homelessness and developing nations invest in WASH (Water, Sanitation, and Hygiene) infrastructure. The companies in this space prove that technology can be both profitable and profoundly humanitarian.",
    maturity: "Emerging",
    marketSizeEstimate: "$15B by 2030 (WASH + humanitarian tech)",
    timelineToImpact: "Immediate — solutions deploying now",
    challenges: [
      "Business model sustainability — serving low-income populations",
      "Scaling across diverse regulatory and cultural contexts",
      "Attracting venture capital to humanitarian applications",
      "Durability and maintainability in harsh field conditions",
      "Measuring social impact alongside financial returns",
    ],
    color: "from-rose-500/20 to-pink-500/20",
    companies: [
      {
        name: "Lava Mae",
        slug: "lava-mae",
        description:
          "Pioneer of mobile shower and hygiene services for people experiencing homelessness. Converted decommissioned buses into full-service shower units. Now operates as Lava Mae x (consulting) helping cities worldwide replicate the model.",
        hq: "San Francisco, CA",
        founded: 2013,
        fundingStage: "Non-Profit / Social Enterprise",
        keyMilestone:
          "Served 250,000+ showers; open-sourced their model through 'Lava Mae Replicator' enabling 60+ cities to launch programs",
      },
      {
        name: "WOTA",
        slug: "wota",
        description:
          "Japanese company building autonomous, portable water recycling systems. Their WOSH hand-washing station recycles 98% of water, enabling hygiene anywhere without plumbing. Their WOTA BOX is a portable shower system used in disaster relief.",
        hq: "Tokyo, Japan",
        founded: 2014,
        fundingStage: "Series B ($50M+)",
        keyMilestone:
          "Deployed 1,000+ WOSH units across Japan; WOTA BOX provided emergency showers during 2024 Noto earthquake",
      },
      {
        name: "Sanivation",
        slug: "sanivation",
        description:
          "Converts human waste into clean-burning fuel briquettes and fertilizer in East Africa. Their system solves two problems: sanitation in areas without sewer systems and deforestation from charcoal cooking fuel.",
        hq: "Naivasha, Kenya",
        founded: 2015,
        fundingStage: "Series A (Grant + Impact Investment)",
        keyMilestone:
          "Processing 10+ tons of waste daily in Kenya; fuel briquettes provide 30% more energy than traditional charcoal",
      },
      {
        name: "Loowatt",
        slug: "loowatt",
        description:
          "Waterless toilet systems that convert human waste into biogas (energy) and fertilizer. Deployed in Madagascar and the Philippines, providing dignified sanitation without water or sewer infrastructure.",
        hq: "London, UK",
        founded: 2010,
        fundingStage: "Series A (Impact Investment)",
        keyMilestone:
          "Operating sanitation hubs in Antananarivo, Madagascar — providing 10,000+ residents with daily toilet and biogas services",
      },
      {
        name: "Homeless Shower Project (Various Cities)",
        slug: "shower-projects",
        description:
          "A growing movement of municipal and non-profit mobile shower programs across US cities. Organizations like ShowerUp (Atlanta), LavaMaeˣ affiliates, and mobile units provide hot showers, hygiene kits, and social services.",
        hq: "Various US Cities",
        founded: 2015,
        fundingStage: "Non-Profit / Municipal",
        keyMilestone:
          "Now operating in 60+ US cities; increasingly funded through municipal budgets as cities recognize the public health ROI",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 7. Innovative Construction
  // ─────────────────────────────────────────────
  {
    id: "innovative-construction",
    name: "Innovative Construction",
    slug: "innovative-construction",
    icon: "HardHat",
    tagline: "Reimagining how we build our world",
    description:
      "From tunnel boring and 3D-printed homes to carbon-free steel and self-healing concrete, construction innovation is accelerating. These companies are making buildings cheaper, faster, greener, and more resilient — addressing the global housing crisis and decarbonizing one of the world's dirtiest industries.",
    whyItMatters:
      "Construction accounts for 38% of global CO₂ emissions and has barely improved productivity in 50 years. Meanwhile, the world faces a housing deficit of 440 million homes. Traditional construction is slow, wasteful, and carbon-intensive. Companies like ICON can 3D-print a house in 48 hours for a fraction of the cost. The Boring Company is reimagining underground infrastructure to avoid surface disruption. Boston Metal is producing steel without coal. These innovations are essential for building the infrastructure a growing, urbanizing, climate-stressed world needs.",
    maturity: "Growth",
    marketSizeEstimate: "$15T global construction market (tech slice: $500B+ by 2030)",
    timelineToImpact: "2025–2030 for scaled deployment",
    challenges: [
      "Extremely conservative industry resistant to new methods",
      "Building codes and regulations lag decades behind technology",
      "Scaling 3D printing and modular construction to high-rises",
      "Supply chain integration — new materials must work with existing trades",
      "Workforce retraining for new construction methods",
    ],
    color: "from-amber-500/20 to-yellow-500/20",
    companies: [
      {
        name: "The Boring Company",
        slug: "boring-company",
        description:
          "Elon Musk's tunnel construction company dramatically reducing the cost and time of boring tunnels. Their Prufrock machine targets 1 mile per week (10x current industry speed). Completed the Vegas Loop and pursuing projects in multiple cities.",
        hq: "Bastrop, TX",
        founded: 2016,
        fundingStage: "Private ($5.7B valuation)",
        keyMilestone:
          "Vegas Loop operational with 70+ stations planned; Prufrock-2 boring machine targeting 1/10th the cost of traditional tunneling",
      },
      {
        name: "ICON",
        slug: "icon",
        description:
          "Leading 3D construction printing company. Their Vulcan printer can build a 2,000 sq ft home in under 48 hours. Working with NASA on lunar construction and building affordable housing communities in Texas and Mexico.",
        hq: "Austin, TX",
        founded: 2017,
        fundingStage: "Series B ($451M raised)",
        keyMilestone:
          "Built the world's largest 3D-printed neighborhood (100 homes) in Georgetown, TX; NASA contract for lunar surface construction",
      },
      {
        name: "Boston Metal",
        slug: "boston-metal",
        description:
          "MIT spinoff producing steel using electricity instead of coal through Molten Oxide Electrolysis (MOE). Steel production accounts for 7% of global CO₂ emissions — this technology could eliminate it entirely.",
        hq: "Woburn, MA",
        founded: 2013,
        fundingStage: "Series C ($262M, including from ArcelorMittal and BMW)",
        keyMilestone:
          "Demonstrated commercial-scale MOE cell producing green steel; targeting first commercial plant by 2026",
      },
      {
        name: "CarbonCure Technologies",
        slug: "carboncure",
        description:
          "Injects captured CO₂ into fresh concrete during mixing, where it mineralizes and permanently strengthens the concrete. Reduces carbon footprint while improving performance — a rare win-win.",
        hq: "Halifax, Canada",
        founded: 2012,
        fundingStage: "Series C ($100M+, backed by Breakthrough Energy Ventures)",
        keyMilestone:
          "Technology installed in 700+ concrete plants globally; saved 350,000+ metric tons of CO₂; won XPRIZE Carbon Removal",
      },
      {
        name: "Mighty Buildings",
        slug: "mighty-buildings",
        description:
          "3D-prints modular building panels using a proprietary thermoset composite that cures under UV light. Panels are stronger than concrete, fully insulated, and produce zero waste during manufacturing.",
        hq: "Oakland, CA",
        founded: 2017,
        fundingStage: "Series C ($150M+)",
        keyMilestone:
          "First company to receive ICC building code certification for 3D-printed structures; zero-waste manufacturing process",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 8. AI & Machine Learning
  // ─────────────────────────────────────────────
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    slug: "ai-ml",
    icon: "Brain",
    tagline: "Intelligence amplification across every industry",
    description:
      "Artificial intelligence has shifted from research curiosity to the fastest-adopted technology in history. Foundation models, AI agents, and specialized AI systems are transforming every industry from healthcare to manufacturing, creating both enormous opportunities and unprecedented responsibilities.",
    whyItMatters:
      "AI is the meta-technology — it accelerates every other sector in the BFT taxonomy. Fusion researchers use AI to control plasma. Robotics companies use AI for perception and manipulation. Drug discovery, materials science, climate modeling, and education are all being transformed. McKinsey estimates AI could add $13-22 trillion to the global economy by 2030. The companies building foundation models, AI infrastructure, and vertical applications are creating the substrate on which much of the 21st century economy will run.",
    maturity: "Scaling",
    marketSizeEstimate: "$1.8T by 2030",
    timelineToImpact: "Already here — accelerating through 2030",
    challenges: [
      "Alignment and safety — ensuring AI systems act in human interest",
      "Energy consumption — training large models requires enormous compute",
      "Job displacement and economic transition",
      "Misinformation and deepfakes at scale",
      "Regulatory frameworks lagging behind capabilities",
    ],
    color: "from-fuchsia-500/20 to-pink-500/20",
    companies: [
      {
        name: "Anthropic",
        slug: "anthropic",
        description:
          "AI safety company building Claude, a family of large language models designed to be helpful, harmless, and honest. Pioneered Constitutional AI and interpretability research. Leading in enterprise AI deployment.",
        hq: "San Francisco, CA",
        founded: 2021,
        fundingStage: "Series D ($8B+ raised at $60B valuation)",
        keyMilestone:
          "Claude available in 4+ model tiers; Claude Code launched as autonomous coding agent; leading AI safety research",
      },
      {
        name: "OpenAI",
        slug: "openai",
        description:
          "Creator of GPT-4, ChatGPT, DALL-E, and the most widely used AI models in the world. Transitioned from non-profit to capped-profit structure to fund massive compute requirements.",
        hq: "San Francisco, CA",
        founded: 2015,
        fundingStage: "Private ($300B+ valuation)",
        keyMilestone:
          "ChatGPT reached 200M+ weekly active users; GPT-4o multimodal model; enterprise API powering thousands of applications",
      },
      {
        name: "Google DeepMind",
        slug: "google-deepmind",
        description:
          "Merged DeepMind and Google Brain into the world's largest AI research lab. Breakthroughs include AlphaFold (protein folding), Gemini (multimodal AI), and AlphaGeometry (mathematical reasoning).",
        hq: "London, UK",
        founded: 2010,
        fundingStage: "Subsidiary (Alphabet)",
        keyMilestone:
          "AlphaFold predicted structures of 200M+ proteins; Gemini Ultra competes with GPT-4; AI weather forecasting beating traditional models",
      },
      {
        name: "Mistral AI",
        slug: "mistral-ai",
        description:
          "French AI startup building open-weight foundation models competitive with much larger closed-source systems. Champions of efficient, European-based AI development.",
        hq: "Paris, France",
        founded: 2023,
        fundingStage: "Series B ($600M+ at $6B valuation)",
        keyMilestone:
          "Mistral Large and Mixtral models competitive with GPT-4 at fraction of compute; open-weight approach gaining enterprise traction",
      },
      {
        name: "Hugging Face",
        slug: "hugging-face",
        description:
          "The GitHub of AI — the platform where the open-source AI community shares models, datasets, and applications. Hosts 500,000+ models and 100,000+ datasets. Essential infrastructure for the entire AI ecosystem.",
        hq: "New York, NY",
        founded: 2016,
        fundingStage: "Series D ($235M at $4.5B valuation)",
        keyMilestone:
          "Became the de facto platform for open AI development; hosting models from Meta, Google, Microsoft, and thousands of researchers",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 9. Recycling & Circular Economy Robotics
  // ─────────────────────────────────────────────
  {
    id: "circular-economy",
    name: "Recycling & Circular Economy",
    slug: "circular-economy",
    icon: "Recycle",
    tagline: "WALL-E tech — AI-powered waste sorting and material recovery",
    description:
      "Robotic waste sorting, AI-driven material recovery, chemical recycling, and food waste transformation. Companies in this sector are making recycling dramatically more efficient — turning the garbage dump into a mine, and landfill into energy.",
    whyItMatters:
      "Humanity generates 2 billion tons of municipal solid waste per year, projected to reach 3.4 billion by 2050. Traditional recycling relies on error-prone manual sorting, and roughly 91% of plastics ever produced have never been recycled. A new generation of AI-powered robots can identify and sort hundreds of materials per minute with superhuman accuracy. Combined with breakthroughs in chemical recycling (breaking plastics down to their molecular building blocks) and enzymatic processes, this sector represents the infrastructure for a true circular economy. Think WALL-E — but profitable, at scale, and happening now.",
    maturity: "Growth",
    marketSizeEstimate: "$60B+ global recycling tech market by 2030",
    timelineToImpact: "2024–2028 for broad commercial deployment",
    challenges: [
      "Economics — virgin plastic is often cheaper than recycled material",
      "Contamination in waste streams degrading recovery rates",
      "Scaling chemical recycling from pilot to industrial volume",
      "Sorting complex composite materials (multi-layer packaging)",
      "Regulatory fragmentation across municipalities and countries",
    ],
    color: "from-lime-500/20 to-green-500/20",
    companies: [
      {
        name: "AMP Robotics",
        slug: "amp-robotics",
        description:
          "AI-powered sorting robots deployed at 200+ recycling facilities. Their neural networks recognize 100+ material categories at 80+ picks per minute per arm — dramatically more accurate and faster than human sorters. The AMP Neuron platform is essentially the brain of modern recycling.",
        hq: "Louisville, CO",
        founded: 2014,
        fundingStage: "Series C ($300M+, backed by Blue Earth Capital, Microsoft Climate Innovation Fund)",
        keyMilestone:
          "Deployed AI sorting systems at 200+ facilities across North America; processes over 2 billion items per year",
      },
      {
        name: "Glacier",
        slug: "glacier",
        description:
          "YC-backed startup building lower-cost recycling robots designed for mid-sized materials recovery facilities (MRFs) that can't afford traditional industrial sorters. Their robots install on existing conveyor lines and use computer vision to sort plastics, metals, and paper.",
        hq: "San Francisco, CA",
        founded: 2019,
        fundingStage: "Series A ($16M, backed by NEA, New Enterprise Associates)",
        keyMilestone:
          "Deployed robots at recycling facilities across California and the Midwest; targeting the underserved mid-market MRF segment",
      },
      {
        name: "ZenRobotics",
        slug: "zenrobotics",
        description:
          "Finnish pioneer of heavy-picker recycling robots for construction and demolition waste — handling materials up to 30kg that humans can't safely lift repeatedly. Acquired by Terex (NYSE: TEX) and deployed across Europe and North America.",
        hq: "Helsinki, Finland",
        founded: 2007,
        fundingStage: "Subsidiary (Terex)",
        keyMilestone:
          "First commercial waste-sorting robots; Heavy Picker handles C&D waste at scale across 50+ installations globally",
      },
      {
        name: "Mill",
        slug: "mill-industries",
        description:
          "Founded by Nest co-founder Matt Rogers. Mill's kitchen bin dehydrates and grinds food scraps into nutrient-rich grounds that are mailed back to farms as chicken feed, closing the food waste loop at the household level. Beautiful design, subscription model.",
        hq: "San Bruno, CA",
        founded: 2020,
        fundingStage: "Series B ($100M+, backed by Breakthrough Energy Ventures)",
        keyMilestone:
          "Launched consumer product in 2023; diverting tens of thousands of tons of food waste from landfills annually",
      },
      {
        name: "Carbios",
        slug: "carbios",
        description:
          "French company pioneering enzymatic PET plastic recycling — using engineered enzymes to break plastic bottles back into their raw molecular components, enabling infinite recycling without quality degradation. Partnered with L'Oréal, Nestlé, and PepsiCo.",
        hq: "Clermont-Ferrand, France",
        founded: 2011,
        ticker: "ALCRB.PA",
        fundingStage: "Public (Euronext)",
        keyMilestone:
          "Building world's first industrial-scale enzymatic PET recycling plant in France; commercial production targeted for 2026",
      },
      {
        name: "Novoloop",
        slug: "novoloop",
        description:
          "Upcycles hard-to-recycle polyethylene plastic waste into high-performance thermoplastic polyurethanes (TPUs) used in footwear, automotive, and electronics. Partners with On Running and other premium consumer brands.",
        hq: "Menlo Park, CA",
        founded: 2015,
        fundingStage: "Series A ($21M, backed by Valo Ventures)",
        keyMilestone:
          "First commercial products incorporating upcycled PE-derived TPU launched with On Running; industrial scale-up underway",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 10. Drone Networks & Autonomous Delivery
  // ─────────────────────────────────────────────
  {
    id: "drone-networks",
    name: "Drone Networks & Delivery",
    slug: "drone-networks",
    icon: "Plane",
    tagline: "Fast, autonomous aerial logistics — from medical supplies to pizza",
    description:
      "Autonomous drones are moving from novelty to critical infrastructure. Medical drones deliver blood and vaccines in minutes where roads would take hours. Food and retail drones are operating commercially across multiple countries. Military-grade autonomous drones reshape defense. This is aerial logistics at computational speed.",
    whyItMatters:
      "The drone delivery market grew from pilot programs to commercial operations carrying millions of packages. Zipline alone has completed over 1 million commercial deliveries, primarily medical supplies in Africa and the US. Drones bypass ground traffic entirely and can deliver in under 30 minutes for routes that would take hours by truck. Beyond delivery: drone networking enables real-time aerial monitoring of infrastructure, emergency response, agriculture, and defense. The combination of autonomous flight, 5G/6G networking, and AI-driven traffic management is building the aerial layer of global logistics.",
    maturity: "Growth",
    marketSizeEstimate: "$55B+ drone delivery market by 2030",
    timelineToImpact: "Already operational — rapid scaling through 2028",
    challenges: [
      "FAA Part 108 regulations for Beyond Visual Line of Sight (BVLOS) operations",
      "Air traffic management (UTM) for coordinating thousands of drones simultaneously",
      "Battery energy density limiting range and payload",
      "Weather reliability — wind, rain, and icing constraints",
      "Public acceptance and noise concerns in residential areas",
    ],
    color: "from-indigo-500/20 to-blue-500/20",
    companies: [
      {
        name: "Zipline",
        slug: "zipline",
        description:
          "World's largest autonomous delivery system by distance and volume. Originally launched to deliver blood and medicine in Rwanda, now operating commercially in 7+ countries across medical, retail, and food delivery. Their Platform 2 drone hovers and lowers packages via tether, enabling precise residential delivery.",
        hq: "South San Francisco, CA",
        founded: 2014,
        fundingStage: "Series F ($330M at $4.2B valuation)",
        keyMilestone:
          "Completed 1 million+ commercial deliveries; Platform 2 launched for US residential delivery with Walmart, Sweetgreen, Jet's Pizza",
      },
      {
        name: "Wing",
        slug: "wing-aviation",
        description:
          "Alphabet's drone delivery company, operating commercially in Australia, Finland, and the US. Wing focuses on small-package consumer delivery from retail partners and has completed hundreds of thousands of deliveries. First company with FAA Air Carrier Certificate for drone deliveries in 2019.",
        hq: "Palo Alto, CA",
        founded: 2012,
        fundingStage: "Subsidiary (Alphabet)",
        keyMilestone:
          "First company to receive FAA Air Carrier Certificate; operating commercial delivery in Dallas-Fort Worth, Logan (Australia), and Helsinki",
      },
      {
        name: "Matternet",
        slug: "matternet",
        description:
          "Specializes in on-demand medical delivery networks connecting hospitals, labs, and clinics. Matternet's M2 drone and automated station network moves blood samples, medications, and diagnostic specimens between healthcare facilities in Switzerland, UAE, and the US.",
        hq: "Mountain View, CA",
        founded: 2011,
        fundingStage: "Series B ($100M+, backed by McKesson, Boeing)",
        keyMilestone:
          "Permanent medical delivery network in Zurich; US launch with UPS Flight Forward for hospital system deliveries",
      },
      {
        name: "Skydio",
        slug: "skydio",
        description:
          "Leading US-based autonomous drone manufacturer for commercial, public safety, and defense use. Their drones use AI to fly autonomously through complex environments without GPS. Major defense contracts supporting Ukraine and US military modernization.",
        hq: "San Mateo, CA",
        founded: 2014,
        fundingStage: "Series E ($230M at $2.2B valuation)",
        keyMilestone:
          "Pivoted from consumer to defense/enterprise; Skydio X10 selected for US Army and deployed in Ukraine; leading US-made alternative to DJI",
      },
      {
        name: "Shield AI",
        slug: "shield-ai",
        description:
          "Defense-focused autonomous drone company building Hivemind — an AI pilot that enables drones and aircraft to operate without GPS or communication links. V-BAT tactical UAV deployed with US and allied militaries.",
        hq: "San Diego, CA",
        founded: 2015,
        fundingStage: "Series F ($500M at $5.3B valuation)",
        keyMilestone:
          "Hivemind AI pilot deployed on V-BAT drones; awarded major DoD contracts; leading autonomous aviation for defense applications",
      },
      {
        name: "DroneUp",
        slug: "droneup",
        description:
          "Walmart's primary drone delivery partner, operating suburban last-mile delivery across multiple US states. DroneUp focuses on high-volume, low-cost drone delivery integrated with existing retail operations.",
        hq: "Virginia Beach, VA",
        founded: 2016,
        fundingStage: "Strategic (Walmart investment)",
        keyMilestone:
          "Completed 100,000+ Walmart drone deliveries; operating from 37+ delivery hubs across 7 states",
      },
    ],
  },
];

// ─────────────────────────────────────────────
// Derived utilities
// ─────────────────────────────────────────────

/** Get a sector by slug (used in [slug].astro dynamic routes) */
export function getSectorBySlug(slug: string): Sector | undefined {
  return SECTORS.find((s) => s.slug === slug);
}

/** Get all sector slugs (used for getStaticPaths) */
export function getAllSectorSlugs(): string[] {
  return SECTORS.map((s) => s.slug);
}

/** Total companies across all sectors */
export function getTotalCompanies(): number {
  return SECTORS.reduce((sum, sector) => sum + sector.companies.length, 0);
}

/** Sector summary stats for the dashboard */
export function getSectorStats() {
  return SECTORS.map((s) => ({
    name: s.name,
    slug: s.slug,
    icon: s.icon,
    companyCount: s.companies.length,
    maturity: s.maturity,
    marketSize: s.marketSizeEstimate,
    publicCompanies: s.companies.filter((c) => c.ticker).length,
    color: s.color,
  }));
}
