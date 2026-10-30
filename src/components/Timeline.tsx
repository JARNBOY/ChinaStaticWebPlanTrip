import type { TimelineEntry } from "../types/itinerary";
import { TimelineStop } from "./TimelineStop";
import { TimelineRoute } from "./TimelineRoute";

interface TimelineProps {
  entries: TimelineEntry[];
  completedIds: Set<string>;
  nextStopId?: string | null;
  onToggle: (id: string) => void;
  onOpenPhoto?: (id: string) => void;
  onShowToast: (message: string) => void;
}

export const Timeline: React.FC<TimelineProps> = ({
  entries,
  completedIds,
  nextStopId,
  onToggle,
  onOpenPhoto,
  onShowToast,
}) => {
  return (
    <section className="timeline-container" aria-label="Day Itinerary Timeline">
      <ol className="timeline-list">
        {entries.map((entry, index) => {
          const isLast = index === entries.length - 1;

          if (entry.kind === "stop") {
            const isCompleted = completedIds.has(entry.id);
            const isNext = entry.id === nextStopId;

            return (
              <TimelineStop
                key={entry.id}
                entry={entry}
                isCompleted={isCompleted}
                isNext={isNext}
                onToggle={onToggle}
                onOpenPhoto={onOpenPhoto}
                onShowToast={onShowToast}
                isLast={isLast}
              />
            );
          }

          return (
            <TimelineRoute
              key={entry.id}
              entry={entry}
              isLast={isLast}
            />
          );
        })}
      </ol>
    </section>
  );
};
