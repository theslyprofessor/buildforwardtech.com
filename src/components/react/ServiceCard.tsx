import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, Shield, TrendingUp, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Code,
  Shield,
  TrendingUp,
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  price: string | null;
}

export function ServiceCard({ title, description, icon, price }: ServiceCardProps) {
  const IconComponent = iconMap[icon] || Brain;

  return (
    <Card className="card-hover h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <IconComponent className="h-6 w-6" />
          </div>
          {price && (
            <Badge variant="accent" className="shrink-0">
              {price}
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl mt-4">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <CardDescription className="text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
