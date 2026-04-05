import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Atom, Bot, Droplets, Battery, Car, Heart, HardHat, Brain,
  ArrowRight, Building2, type LucideIcon
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Atom, Bot, Droplets, Battery, Car, Heart, HardHat, Brain, Building2,
};

interface SectorCardProps {
  name: string;
  slug: string;
  icon: string;
  tagline: string;
  maturity: string;
  companyCount: number;
  marketSize: string;
  color: string;
}

const maturityColors: Record<string, string> = {
  Emerging: "bg-amber-500/20 text-amber-300",
  Growth: "bg-blue-500/20 text-blue-300",
  Scaling: "bg-green-500/20 text-green-300",
  Established: "bg-purple-500/20 text-purple-300",
};

export function SectorCard({
  name,
  slug,
  icon,
  tagline,
  maturity,
  companyCount,
  marketSize,
  color,
}: SectorCardProps) {
  const IconComponent = iconMap[icon] || Brain;

  return (
    <a href={`/sectors/${slug}`} className="group block">
      <Card className="card-hover h-full flex flex-col border-border hover:border-primary/50 transition-colors">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${color}`}>
              <IconComponent className="h-6 w-6 text-foreground" />
            </div>
            <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${maturityColors[maturity] || ""}`}>
              {maturity}
            </span>
          </div>
          <CardTitle className="text-xl mt-4 group-hover:text-primary transition-colors flex items-center gap-2">
            {name}
            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <CardDescription className="text-base leading-relaxed flex-1">
            {tagline}
          </CardDescription>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
            <span>{companyCount} companies</span>
            <span className="text-border">|</span>
            <span>{marketSize}</span>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
