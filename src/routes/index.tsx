import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Bookmark,
  BookmarkCheck,
  Star,
  TrendingUp,
  Bell,
  Menu,
  Home,
  Compass,
  Library,
  User,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: RecommendationsScreen,
  head: () => ({
    meta: [
      { title: "Recommendations · Knowledge Hub" },
      {
        name: "description",
        content:
          "Personalized knowledge recommendations: articles, papers and resources tailored to you.",
      },
    ],
  }),
});

type Recommendation = {
  id: string;
  title: string;
  source: string;
  readTime: string;
  match: number;
  category: string;
  tags: string[];
  summary: string;
  trending?: boolean;
};

const FILTERS = ["For You", "Trending", "New", "Saved", "Teams"] as const;

const RECS: Recommendation[] = [
  {
    id: "1",
    title: "Designing Retrieval Systems for Long-Context LLMs",
    source: "Knowledge Lab",
    readTime: "8 min read",
    match: 96,
    category: "AI Research",
    tags: ["RAG", "LLM", "Architecture"],
    summary:
      "A practical breakdown of chunking, reranking and evaluation strategies that hold up beyond a million tokens.",
    trending: true,
  },
  {
    id: "2",
    title: "The Quiet Revolution in Internal Documentation",
    source: "Org Patterns Weekly",
    readTime: "5 min read",
    match: 91,
    category: "Knowledge Ops",
    tags: ["Docs", "Culture"],
    summary:
      "How high-trust teams turn scattered notes into searchable institutional memory — without a heavy CMS.",
  },
  {
    id: "3",
    title: "Graph-Based Recommendations from Sparse Signals",
    source: "ACM Queue",
    readTime: "12 min read",
    match: 88,
    category: "Recsys",
    tags: ["Graphs", "Embeddings"],
    summary:
      "When click data is thin, structure beats scale. A walkthrough of node2vec-style approaches in production.",
  },
  {
    id: "4",
    title: "From Search to Synthesis: The Next UX Layer",
    source: "Interaction Journal",
    readTime: "6 min read",
    match: 84,
    category: "UX",
    tags: ["Search", "Design"],
    summary:
      "Why result lists are giving way to answers, and what that means for trust, citation and discovery.",
  },
];

function RecommendationsScreen() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<(typeof FILTERS)[number]>("For You");
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const toggleSave = (id: string) =>
    setSaved((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-md flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between px-5 pb-3 pt-6">
          <button
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-foreground"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/60">
              Knowledge Hub
            </p>
            <h1 className="text-base font-semibold">Recommendations</h1>
          </div>
          <button
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-surface text-foreground"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-brand" />
          </button>
        </header>

        {/* Greeting */}
        <section className="px-5 pb-4">
          <h2 className="text-2xl font-semibold leading-tight">
            Curated for you,
            <span className="block text-foreground/60">today.</span>
          </h2>
        </section>

        {/* Search */}
        <section className="px-5">
          <div className="flex items-center gap-2">
            <div className="flex h-12 flex-1 items-center gap-2 rounded-2xl border border-hairline bg-surface px-4">
              <Search className="h-4 w-4 text-foreground/50" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search topics, papers, people…"
                className="h-full flex-1 bg-transparent text-sm placeholder:text-foreground/40 focus:outline-none"
              />
            </div>
            <button
              aria-label="Filters"
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-hairline bg-surface"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </button>
            <button className="flex h-12 items-center justify-center rounded-2xl bg-brand px-4 text-sm font-medium text-brand-foreground">
              Search
            </button>
          </div>
        </section>

        {/* Filter chips */}
        <section className="mt-5 px-5">
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {FILTERS.map((f) => {
              const isActive = active === f;
              return (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={
                    "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors " +
                    (isActive
                      ? "border-brand bg-brand text-brand-foreground"
                      : "border-hairline bg-surface text-foreground/70 hover:text-foreground")
                  }
                >
                  {f}
                </button>
              );
            })}
          </div>
        </section>

        {/* Top pick */}
        <section className="mt-5 px-5">
          <div className="rounded-3xl border border-hairline bg-surface p-5 shadow-[var(--shadow-card)]">
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-tag px-2.5 py-1 text-[11px] font-medium text-tag-foreground">
                <Star className="h-3 w-3 fill-current" />
                Top pick
              </span>
              <span className="text-[11px] text-foreground/50">
                96% match · based on your reading
              </span>
            </div>
            <h3 className="text-lg font-semibold leading-snug">
              {RECS[0].title}
            </h3>
            <p className="mt-2 text-sm text-foreground/65">{RECS[0].summary}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-foreground/55">
                {RECS[0].source} · {RECS[0].readTime}
              </span>
              <button className="rounded-full bg-brand px-4 py-2 text-xs font-medium text-brand-foreground">
                Read now
              </button>
            </div>
          </div>
        </section>

        {/* Section header */}
        <section className="mt-7 flex items-center justify-between px-5">
          <h3 className="text-base font-semibold">Recommended for you</h3>
          <button className="text-xs font-medium text-brand">See all</button>
        </section>

        {/* List */}
        <section className="mt-3 flex-1 px-5 pb-28">
          <ul className="flex flex-col gap-3">
            {RECS.slice(1).map((r) => (
              <li
                key={r.id}
                className="rounded-2xl border border-hairline bg-card p-4 shadow-[var(--shadow-card)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-1.5">
                      <span className="rounded-full bg-tag px-2 py-0.5 text-[11px] font-medium text-tag-foreground">
                        {r.category}
                      </span>
                      {r.trending && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-brand">
                          <TrendingUp className="h-3 w-3" />
                          Trending
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold leading-snug">
                      {r.title}
                    </h4>
                    <p className="mt-1.5 line-clamp-2 text-xs text-foreground/60">
                      {r.summary}
                    </p>
                  </div>
                  <button
                    aria-label={saved[r.id] ? "Unsave" : "Save"}
                    onClick={() => toggleSave(r.id)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-foreground/70"
                  >
                    {saved[r.id] ? (
                      <BookmarkCheck className="h-4 w-4 text-brand" />
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-hairline pt-3">
                  <span className="text-[11px] text-foreground/55">
                    {r.source} · {r.readTime}
                  </span>
                  <span className="text-[11px] font-medium text-foreground/70">
                    {r.match}% match
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Bottom nav */}
        <nav className="fixed inset-x-0 bottom-0 z-10">
          <div className="mx-auto max-w-md px-5 pb-5">
            <div className="flex items-center justify-between rounded-full border border-hairline bg-background/95 px-6 py-3 shadow-[var(--shadow-card)] backdrop-blur">
              <NavItem icon={Home} label="Home" />
              <NavItem icon={Compass} label="Discover" active />
              <NavItem icon={Library} label="Library" />
              <NavItem icon={User} label="Profile" />
            </div>
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
        "flex flex-col items-center gap-0.5 text-[10px] font-medium " +
        (active ? "text-brand" : "text-foreground/55")
      }
    >
      <Icon className="h-5 w-5" />
      {label}
    </button>
  );
}
