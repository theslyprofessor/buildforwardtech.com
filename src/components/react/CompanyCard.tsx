import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, TrendingUp } from "lucide-react";

interface CompanyCardProps {
  name: string;
  description: string;
  hq: string;
  founded: number;
  ticker?: string;
  fundingStage?: string;
  keyMilestone: string;
}

export function CompanyCard({
  name,
  description,
  hq,
  founded,
  ticker,
  fundingStage,
  keyMilestone,
}: CompanyCardProps) {
  return (
    <Card className="card-hover h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg">{name}</CardTitle>
          <div className="flex gap-2 shrink-0">
            {ticker && (
              <Badge variant="accent" className="text-[10px]">
                {ticker}
              </Badge>
            )}
          </div>
        </div>
        {fundingStage && (
          <p className="text-xs text-primary font-medium">{fundingStage}</p>
        )}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>

        {/* Key Milestone */}
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp className="h-3 w-3 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
              Key Milestone
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {keyMilestone}
          </p>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 mt-auto pt-3 border-t border-border text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {hq}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Est. {founded}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
