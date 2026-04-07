import { Badge } from "@/components/ui/badge";
import { Radar, Briefcase, TrendingUp, ArrowRight, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Radar,
  Briefcase,
  TrendingUp,
};

interface PillarCardProps {
  title: string;
  description: string;
  icon: string;
  cta: string;
  ctaHref: string;
  badge: string;
  number: string;
}

export function PillarCard({
  title,
  description,
  icon,
  cta,
  ctaHref,
  badge,
  number,
}: PillarCardProps) {
  const Icon = iconMap[icon] || Radar;

  return (
    <div className="relative group">
      {/* Number badge (floating) */}
      <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg z-10">
        {number}
      </div>

      <div className="h-full flex flex-col p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all card-hover">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-xl bg-primary/10 text-primary">
            <Icon className="w-7 h-7" />
          </div>
          <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
            {badge}
          </Badge>
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
          {description}
        </p>

        {/* CTA */}
        <a
          href={ctaHref}
          className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
        >
          {cta}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
