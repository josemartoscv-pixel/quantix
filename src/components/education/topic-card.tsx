import Link from "next/link";
import { Clock, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TopicCardProps {
  slug: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  level: "principiante" | "intermedio";
  topic: string;
  isRead: boolean;
}

export function TopicCard({
  slug,
  title,
  description,
  estimatedMinutes,
  level,
  topic,
  isRead,
}: TopicCardProps) {
  return (
    <Link href={`/educacion/${slug}`}>
      <Card className={cn(
        "h-full hover:shadow-md transition-all hover:border-emerald-200 cursor-pointer",
        isRead && "bg-emerald-50/50 border-emerald-200"
      )}>
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex gap-2 flex-wrap">
              <Badge variant={level === "principiante" ? "default" : "info"} className="text-xs">
                {level === "principiante" ? "Principiante" : "Intermedio"}
              </Badge>
              <Badge variant="outline" className="text-xs">{topic}</Badge>
            </div>
            {isRead && (
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            )}
          </div>

          <h3 className="font-semibold text-gray-900 mb-2 leading-snug">{title}</h3>
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">
            {description}
          </p>

          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{estimatedMinutes} min de lectura</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
