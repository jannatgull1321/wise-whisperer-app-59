import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Menu,
  Bell,
  Star,
  Home,
  BookOpen,
  Sparkles,
  Lightbulb,
  SlidersHorizontal,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: RecommendationsScreen,
  head: () => ({
    meta: [
      { title: "Recommendations" },
      {
        name: "description",
        content:
          "Personalized document recommendations based on your activity.",
      },
    ],
  }),
});

const TABS = ["For You", "Trending", "New", "Saved"] as const;

type Doc = { title: string; tags: string[]; desc: string };

const FOR_YOU: Doc[] = [
  {
    title: "Ethical Frameworks for Modern AI Systems",
    tags: ["AI", "Ethics"],
    desc: "A practical guide to applying fairness, accountability and transparency principles in production ML.",
  },
  {
    title: "Knowledge Graphs in the Enterprise",
    tags: ["Graphs", "Data"],
    desc: "How leading teams structure semantic data to power richer search and recommendations.",
  },
];

const PREVIOUS: Doc[] = [
  {
    title: "Retrieval-Augmented Generation Patterns",
    tags: ["RAG", "LLM"],
    desc: "Common architectures, failure modes and evaluation metrics for grounded language models.",
  },
  {
    title: "Designing Effective Internal Documentation",
    tags: ["Docs", "Process"],
    desc: "Templates and review rituals that keep team knowledge findable and trustworthy.",
  },
];

const RECENT: Doc[] = [
  {
    title: "Vector Databases: A Buyer's Guide",
    tags: ["Vectors", "Infra"],
    desc: "A side-by-side look at indexing strategies, recall trade-offs and operational cost.",
  },
  {
    title: "Prompt Evaluation at Scale",
    tags: ["Eval", "AI"],
    desc: "Move beyond vibes-based testing with structured rubrics, golden sets and CI hooks.",
  },
];

function RecommendationsScreen() {
  const [active, setActive] = useState<(typeof TABS)[number]>("For You");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-md flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-hairline bg-background px-4 py-4">
          <button
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold">Recommendations</h1>
          <Link
            to="/history"
            aria-label="Past searches"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-foreground"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand" />
          </Link>
        </header>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 px-4 py-3">
          {TABS.map((t) => {
            const isActive = active === t;
            return (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={
                  "flex-1 rounded-full border px-3 py-2 text-xs font-medium transition-colors " +
                  (isActive
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-hairline bg-background text-foreground/70")
                }
              >
                {t}
              </button>
            );
          })}
          <Link
            to="/filter"
            aria-label="Open filters"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline bg-background text-foreground"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Link>
        </div>

        {/* Content */}
        <main className="flex-1 px-4 pb-28">
          <Section
            icon={<Star className="h-4 w-4 fill-current text-brand" />}
            title="Recommended For You"
            docs={FOR_YOU}
          />
          <Section title="Based on Previous Searches" docs={PREVIOUS} />
          <Section title="Recently Viewed" docs={RECENT} />
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

function Section({
  icon,
  title,
  docs,
}: {
  icon?: React.ReactNode;
  title: string;
  docs: Doc[];
}) {
  return (
    <section className="mt-5">
      <h2 className="mb-3 flex items-center gap-1.5 text-sm font-semibold">
        {icon}
        {title}
      </h2>
      <div className="flex flex-col gap-3">
        {docs.map((d) => (
          <DocCard key={d.title} doc={d} />
        ))}
      </div>
    </section>
  );
}

function DocCard({ doc }: { doc: Doc }) {
  return (
    <article className="rounded-2xl border border-hairline bg-card p-4 shadow-[var(--shadow-card)]">
      <h3 className="text-sm font-semibold leading-snug">{doc.title}</h3>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {doc.tags.map((t) => (
          <span
            key={t}
            className="rounded-md bg-tag px-2 py-0.5 text-[11px] font-medium text-tag-foreground"
          >
            {t}
          </span>
        ))}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-foreground/65">
        {doc.desc}
      </p>
      <div className="mt-3 flex justify-end">
        <button className="rounded-lg bg-brand px-3.5 py-2 text-xs font-medium text-brand-foreground">
          View Details
        </button>
      </div>
    </article>
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
