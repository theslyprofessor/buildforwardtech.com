import {
  Atom, Bot, Droplets, Battery, Car, Heart, HardHat, Brain,
  Recycle, Plane, Shield,
  type LucideIcon,
  TrendingUp, Building2, Users, Globe
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Atom, Bot, Droplets, Battery, Car, Heart, HardHat, Brain, Recycle, Plane, Shield, Building2,
};

interface SectorStat {
  name: string;
  slug: string;
  icon: string;
  companyCount: number;
  maturity: string;
  marketSize: string;
  publicCompanies: number;
  color: string;
}

interface DashboardStatsProps {
  sectors: SectorStat[];
  totalCompanies: number;
}

const maturityBarWidth: Record<string, string> = {
  Emerging: "w-1/4",
  Growth: "w-2/4",
  Scaling: "w-3/4",
  Established: "w-full",
};
const maturityBarColor: Record<string, string> = {
  Emerging: "bg-amber-500",
  Growth: "bg-blue-500",
  Scaling: "bg-green-500",
  Established: "bg-purple-500",
};

export function DashboardStats({ sectors, totalCompanies }: DashboardStatsProps) {
  const publicCount = sectors.reduce((sum, s) => sum + s.publicCompanies, 0);

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Globe className="h-5 w-5 text-primary" />}
          label="Tech Sectors"
          value={sectors.length.toString()}
        />
        <StatCard
          icon={<Building2 className="h-5 w-5 text-accent" />}
          label="Companies Tracked"
          value={totalCompanies.toString()}
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5 text-green-400" />}
          label="Publicly Traded"
          value={publicCount.toString()}
        />
        <StatCard
          icon={<Users className="h-5 w-5 text-violet-400" />}
          label="Private / Pre-IPO"
          value={(totalCompanies - publicCount).toString()}
        />
      </div>

      {/* Sector Breakdown */}
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="px-6 py-4 bg-card border-b border-border">
          <h3 className="font-semibold">Sector Breakdown</h3>
        </div>
        <div className="divide-y divide-border">
          {sectors.map((sector) => {
            const Icon = iconMap[sector.icon] || Brain;
            return (
              <a
                key={sector.slug}
                href={`/sectors/${sector.slug}`}
                className="flex items-center gap-4 px-6 py-4 hover:bg-card/50 transition-colors group"
              >
                <div className={`p-2 rounded-lg bg-gradient-to-br ${sector.color} shrink-0`}>
                  <Icon className="h-4 w-4 text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm group-hover:text-primary transition-colors">
                      {sector.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {sector.companyCount} companies
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${maturityBarColor[sector.maturity] || "bg-primary"} ${maturityBarWidth[sector.maturity] || "w-1/4"}`}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground w-16 text-right">
                      {sector.maturity}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground shrink-0 hidden sm:block">
                  {sector.marketSize}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-4 rounded-xl bg-card border border-border">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
