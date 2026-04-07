import { Badge } from "@/components/ui/badge";
import { ExternalLink, Beaker, Clock, CheckCircle2 } from "lucide-react";

interface LabsCardProps {
  name: string;
  fullName: string;
  url: string | null;
  tagline: string;
  description: string;
  tag: string;
  status: string;
  gradient: string;
}

const statusIcons: Record<string, React.ReactNode> = {
  "Active": <CheckCircle2 className="w-3 h-3" />,
  "In Production": <CheckCircle2 className="w-3 h-3" />,
  "Coming 2026": <Clock className="w-3 h-3" />,
  "Early R&D": <Beaker className="w-3 h-3" />,
};

const statusColors: Record<string, string> = {
  "Active": "text-green-400 bg-green-500/10",
  "In Production": "text-green-400 bg-green-500/10",
  "Coming 2026": "text-amber-400 bg-amber-500/10",
  "Early R&D": "text-violet-400 bg-violet-500/10",
};

export function LabsCard({
  name,
  fullName,
  url,
  tagline,
  description,
  tag,
  status,
  gradient,
}: LabsCardProps) {
  const CardContent = (
    <div className="h-full flex flex-col rounded-xl bg-background border border-border hover:border-primary/50 transition-all card-hover overflow-hidden">
      {/* Gradient Header */}
      <div className={`h-24 bg-gradient-to-br ${gradient} relative`}>
        <div className="absolute top-3 left-4">
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-[10px]">
            {tag}
          </Badge>
        </div>
        <div className="absolute bottom-3 right-4">
          <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full ${statusColors[status] || 'text-muted-foreground bg-muted'}`}>
            {statusIcons[status]}
            {status}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-2">
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-xs text-muted-foreground">{fullName}</p>
        </div>
        <p className="text-sm text-primary italic mb-3">"{tagline}"</p>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {description}
        </p>
        {url && (
          <div className="mt-4 pt-4 border-t border-border">
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
              {url.replace("https://", "")}
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="group block h-full">
        {CardContent}
      </a>
    );
  }

  return <div className="group h-full">{CardContent}</div>;
}
