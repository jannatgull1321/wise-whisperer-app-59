import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Trash2,
  Search,
  ChevronRight,
  Home,
  BookOpen,
  Sparkles,
  Lightbulb,
} from "lucide-react";

export const Route = createFileRoute("/history")({
  component: HistoryScreen,
  head: () => ({
    meta: [
      { title: "Past Searches" },
      {
        name: "description",
        content: "Browse and revisit your previous knowledge searches.",
      },
    ],
  }),
});

type Entry = { query: string; when: string };
type Group = { label: string; entries: Entry[] };

const GROUPS: Group[] = [
  {
    label: "Today",
    entries: [
      { query: "What is AI ethics?", when: "2 hours ago" },
      { query: "Cybersecurity best practices", when: "5 hours ago" },
    ],
  },
  {
    label: "Yesterday",
    entries: [
      { query: "Machine learning basics", when: "Yesterday" },
      { query: "Data privacy policies", when: "Yesterday" },
    ],
  },
  {
    label: "This Week",
    entries: [{ query: "Cloud computing fundamentals", when: "Mon" }],
  },
];

const SUGGESTED = [
  {
    title: "Responsible AI: A Practitioner's Checklist",
    tags: ["AI", "Ethics"],
    desc: "Concrete review steps for fairness, privacy and accountability before shipping a model.",
  },
  {
    title: "Zero-Trust Foundations for Small Teams",
    tags: ["Security", "Cloud"],
    desc: "How to roll out identity-aware access without a dedicated security org.",
  },
];

function HistoryScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [groups, setGroups] = useState<Group[]>(GROUPS);

  const clearAll = () => setGroups([]);

  const filtered = groups
    .map((g) => ({
      ...g,
      entries: g.entries.filter((e) =>
        e.query.toLowerCase().includes(query.toLowerCase()),
      ),
    }))
    .filter((g) => g.entries.length > 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-md flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-hairline bg-background px-4 py-4">
          <button
            aria-label="Back"
            onClick={() => router.history.back()}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold">Past Searches</h1>
          <button
            aria-label="Clear all"
            onClick={clearAll}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground/70"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </header>

        <main className="flex-1 px-4 pb-32 pt-4">
          {/* Search */}
          <div className="flex h-11 items-center gap-2 rounded-xl border border-hairline bg-background px-3">
            <Search className="h-4 w-4 text-foreground/45" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search history..."
              className="h-full flex-1 bg-transparent text-sm placeholder:text-foreground/40 focus:outline-none"
            />
          </div>

          {/* Grouped history */}
          {filtered.length === 0 ? (
            <p className="mt-10 text-center text-sm text-foreground/50">
              No searches found.
            </p>
          ) : (
            filtered.map((g) => (
              <section key={g.label} className="mt-5">
                <h2 className="mb-1 text-xs font-medium text-foreground/55">
                  {g.label}
                </h2>
                <ul className="overflow-hidden rounded-xl border border-hairline bg-card">
                  {g.entries.map((e, i) => (
                    <li
                      key={e.query}
                      className={
                        "flex items-center gap-3 px-3 py-3 " +
                        (i < g.entries.length - 1
                          ? "border-b border-hairline"
                          : "")
                      }
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface text-foreground/60">
                        <Search className="h-4 w-4" />
                      </span>
                      <button className="flex min-w-0 flex-1 items-center justify-between gap-3 text-left">
                        <span className="min-w-0 truncate text-sm text-foreground">
                          {e.query}
                        </span>
                        <span className="shrink-0 text-[11px] text-foreground/50">
                          {e.when}
                        </span>
                      </button>
                      <ChevronRight className="h-4 w-4 text-foreground/40" />
                    </li>
                  ))}
                </ul>
              </section>
            ))
          )}

          {/* Suggested */}
          <section className="mt-7">
            <h2 className="mb-3 text-sm font-semibold">
              Suggested Based on History
            </h2>
            <div className="flex flex-col gap-3">
              {SUGGESTED.map((d) => (
                <article
                  key={d.title}
                  className="rounded-2xl border border-hairline bg-card p-4 shadow-[var(--shadow-card)]"
                >
                  <h3 className="text-sm font-semibold leading-snug">
                    {d.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {d.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-tag px-2 py-0.5 text-[11px] font-medium text-tag-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/65">
                    {d.desc}
                  </p>
                  <div className="mt-3 flex justify-end">
                    <button className="rounded-lg bg-brand px-3.5 py-2 text-xs font-medium text-brand-foreground">
                      View Details
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>

        {/* Bottom nav */}
        <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-hairline bg-background">
          <div className="mx-auto grid max-w-md grid-cols-4">
            <NavItem icon={Home} label="Home" />
            <NavItem icon={BookOpen} label="Library" />
            <NavItem icon={Sparkles} label="AI Query" />
            <NavItem icon={Lightbulb} label="Recommend" active />
          </div>
        </nav>
      </div>
    </div>
  );
}

function NavItem({
  icon: Icon,
  label,
  active,
}: {
  icon: typeof Home;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={
        "flex flex-col items-center gap-1 py-3 text-[10px] font-medium " +
        (active ? "text-brand" : "text-foreground/55")
      }
    >
      <Icon className={"h-5 w-5 " + (active ? "stroke-[2.5]" : "")} />
      {label}
    </button>
  );
}
