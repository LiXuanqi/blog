import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  AUDIENCE_LEVEL_LABELS,
  type AudienceLevel,
} from "@/lib/content/audience-level";

export function AudienceBadge({
  level = "everyone",
}: {
  level?: AudienceLevel;
}) {
  return (
    <Badge variant="outline">
      <span className="sr-only">Audience: </span>
      {AUDIENCE_LEVEL_LABELS[level]}
    </Badge>
  );
}
