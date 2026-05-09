import { BottomNav } from "@/components/BottomNav";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  SlidersHorizontal,
  ChevronDown,
  FileText,
  Newspaper,
  PlayCircle,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";

export const Route = createFileRoute("/related")({
  component: RelatedResourcesScreen,
  head: () => ({
    meta: [
      { title: "Related Resources" },
      {
        name: "description",
        content:
          "Resources related to your topic — guides, articles and videos.",
      },
    ],
  }),
});

type Kind = "pdf" | "article" | "video";

type Resource = {
  id: string;
  kind: Kind;
  title: string;
  tag: string;
  desc: string;
};

const RESOURCES: Resource[] = [
  {
    id: "1",
    kind: "pdf",
    title: "Introduction to AI",
    tag: "AI",
    desc: "Beginner guide to artificial intelligence concepts.",
  },
  {
    id: "2",
    kind: "article",
    title: "AI Ethics Guidelines",
    tag: "Ethics",
    desc: "Ethical standards for AI development.",
  },
  {
    id: "3",
    kind: "video",
    title: "Machine Learning Basics",
    tag: "ML",
    desc: "Core concepts of machine learning.",
  },
  {
    id: "4",
    kind: "article",
    title: "Deep Learning Techniques",
    tag: "Deep Learning",
    desc: "Advanced deep learning methods.",
  },
];

const SORTS = ["Relevance", "Newest", "Most Viewed"] as const;

function RelatedResourcesScreen() {
  const router = useRouter();
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Relevance");
  const [open, setOpen] = useState(false);

  const toggleSave = (id: string) =>
    setSaved((s) => ({ ...s, [id]: !s[id] }));

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
          <h1 className="text-base font-semibold">Related Resources</h1>
          <Link
            to="/filter"
            aria-label="Filters"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-brand"
          >
            <SlidersHorizontal className="h-5 w-5" />
          </Link>
        </header>

        <main className="flex-1 px-4 pb-32 pt-4">
          {/* Subtitle */}
          <p className="text-xs text-foreground/55">
            Showing results related to:{" "}
            <span className="font-medium text-foreground/80">
              Artificial Intelligence
            </span>
          </p>

          {/* Sort */}
          <div className="relative mt-3 flex justify-end">
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-1 rounded-lg border border-hairline bg-background px-3 py-1.5 text-xs text-foreground"
            >
              <span className="text-foreground/60">Sort by:</span>
              <span className="font-medium">{sort}</span>
              <ChevronDown className="h-3.5 w-3.5 text-foreground/60" />
            </button>
            {open && (
              <ul className="absolute right-0 top-full z-10 mt-1 w-40 overflow-hidden rounded-lg border border-hairline bg-card shadow-[var(--shadow-card)]">
                {SORTS.map((s) => (
                  <li key={s}>
                    <button
                      onClick={() => {
                        setSort(s);
                        setOpen(false);
                      }}
                      className={
                        "flex w-full px-3 py-2 text-left text-xs " +
                        (sort === s
                          ? "bg-surface font-medium text-brand"
                          : "text-foreground/80")
                      }
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Grid */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            {RESOURCES.map((r) => (
              <ResourceCard
                key={r.id}
                r={r}
                saved={!!saved[r.id]}
                onSave={() => toggleSave(r.id)}
              />
            ))}
          </div>
        </main>

        <BottomNav active="Recommend" />
      </div>
    </div>
  );
}

function ResourceCard({
  r,
  saved,
  onSave,
}: {
  r: Resource;
  saved: boolean;
  onSave: () => void;
}) {
  const Icon =
    r.kind === "pdf" ? FileText : r.kind === "video" ? PlayCircle : Newspaper;

  return (
    <article className="relative flex flex-col rounded-2xl border border-hairline bg-card p-3 shadow-[var(--shadow-card)]">
      <button
        onClick={onSave}
        aria-label={saved ? "Remove bookmark" : "Bookmark"}
        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-foreground/55"
      >
        {saved ? (
          <BookmarkCheck className="h-4 w-4 text-brand" />
        ) : (
          <Bookmark className="h-4 w-4" />
        )}
      </button>

      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 text-brand">
        <Icon className="h-5 w-5" />
      </span>

      <Link to="/feedback" className="mt-3 text-sm font-semibold leading-snug hover:text-brand">
        {r.title}
      </Link>

      <span className="mt-2 inline-flex w-fit rounded-md bg-tag px-2 py-0.5 text-[11px] font-medium text-tag-foreground">
        {r.tag}
      </span>

      <p className="mt-2 text-[11px] leading-relaxed text-foreground/60">
        {r.desc}
      </p>
    </article>
  );
}

