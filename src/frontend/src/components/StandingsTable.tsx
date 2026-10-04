import type { StandingRow } from "@/backend";
import { cn } from "@/lib/utils";

interface StandingsTableProps {
  rows: StandingRow[];
  className?: string;
}

/** League table with sticky header and right-aligned numeric columns. */
export function StandingsTable({ rows, className }: StandingsTableProps) {
  return (
    <div
      data-ocid="standings.table"
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-subtle",
        className,
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-secondary text-secondary-foreground">
            <tr className="text-[0.65rem] uppercase tracking-wider">
              <th
                scope="col"
                className="w-8 px-2 py-2.5 text-center font-semibold"
              >
                #
              </th>
              <th scope="col" className="px-2 py-2.5 text-left font-semibold">
                Équipe
              </th>
              <th
                scope="col"
                className="w-8 px-1 py-2.5 text-center font-semibold"
              >
                J
              </th>
              <th
                scope="col"
                className="w-8 px-1 py-2.5 text-center font-semibold"
              >
                G
              </th>
              <th
                scope="col"
                className="w-8 px-1 py-2.5 text-center font-semibold"
              >
                N
              </th>
              <th
                scope="col"
                className="w-8 px-1 py-2.5 text-center font-semibold"
              >
                P
              </th>
              <th
                scope="col"
                className="w-10 px-2 py-2.5 text-right font-semibold"
              >
                Pts
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.teamName}
                data-ocid={`standings.row.${i + 1}`}
                className="border-t border-border transition-colors hover:bg-muted/50"
              >
                <td className="px-2 py-2.5 text-center">
                  <span
                    className={cn(
                      "tabular-score inline-flex size-5 items-center justify-center rounded-full font-mono text-xs font-semibold",
                      row.position <= 3n
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    {row.position.toString()}
                  </span>
                </td>
                <td className="max-w-0 px-2 py-2.5">
                  <span className="block truncate font-medium">
                    {row.teamName}
                  </span>
                </td>
                <td className="tabular-score px-1 py-2.5 text-center font-mono text-xs text-muted-foreground">
                  {row.played.toString()}
                </td>
                <td className="tabular-score px-1 py-2.5 text-center font-mono text-xs text-muted-foreground">
                  {row.won.toString()}
                </td>
                <td className="tabular-score px-1 py-2.5 text-center font-mono text-xs text-muted-foreground">
                  {row.drawn.toString()}
                </td>
                <td className="tabular-score px-1 py-2.5 text-center font-mono text-xs text-muted-foreground">
                  {row.lost.toString()}
                </td>
                <td className="tabular-score px-2 py-2.5 text-right font-mono text-sm font-bold">
                  {row.points.toString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
