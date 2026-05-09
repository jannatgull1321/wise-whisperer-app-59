import { BottomNav } from "@/components/BottomNav";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Star,
  ThumbsUp,
  ThumbsDown,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/feedback")({
  component: FeedbackScreen,
  head: () => ({
    meta: [
      { title: "Rate This Recommendation" },
      {
        name: "description",
        content:
          "Share feedback on a recommendation to improve future suggestions.",
      },
    ],
  }),
});

const OPTIONS = [
  { id: "relevant", label: "This was relevant to my work", default: true },
  { id: "useful", label: "I found this information useful", default: true },
  { id: "more", label: "Show me more like this", default: false },
  { id: "less", label: "Don't show this type", default: false },
];

function FeedbackScreen() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [reaction, setReaction] = useState<"up" | "down" | null>(null);
  const [note, setNote] = useState("");
  const [opts, setOpts] = useState<Record<string, boolean>>(
    Object.fromEntries(OPTIONS.map((o) => [o.id, o.default])),
  );

  const toggle = (id: string) =>
    setOpts((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-md flex-col">
        {/* Header */}
        <header className="flex items-center gap-2 border-b border-hairline bg-background px-4 py-4">
          <button
            aria-label="Back"
            onClick={() => router.history.back()}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="flex-1 text-center pr-10 text-base font-semibold">
            Rate This Recommendation
          </h1>
        </header>

        <main className="flex-1 px-4 pb-32 pt-4">
          {/* Document preview */}
          <article className="rounded-2xl border border-hairline bg-card p-4 shadow-[var(--shadow-card)]">
            <h2 className="text-sm font-semibold leading-snug">
              AI Ethics in Practice
            </h2>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["AI", "Ethics"].map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-tag px-2 py-0.5 text-[11px] font-medium text-tag-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-foreground/65">
              A practical look at fairness, accountability and transparency
              when shipping AI features.
            </p>
          </article>

          {/* Star rating */}
          <Section title="How helpful was this?">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((n) => {
                const active = n <= rating;
                return (
                  <button
                    key={n}
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    onClick={() => setRating(n)}
                    className="p-1"
                  >
                    <Star
                      className={
                        "h-7 w-7 " +
                        (active
                          ? "fill-brand text-brand"
                          : "text-foreground/30")
                      }
                    />
                  </button>
                );
              })}
            </div>
          </Section>

          {/* Quick reaction */}
          <Section title="Quick Reaction">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setReaction("up")}
                className={
                  "flex h-12 items-center justify-center gap-2 rounded-xl border text-sm font-medium transition-colors " +
                  (reaction === "up"
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-brand bg-background text-brand")
                }
              >
                <ThumbsUp className="h-4 w-4" /> Helpful
              </button>
              <button
                onClick={() => setReaction("down")}
                className={
                  "flex h-12 items-center justify-center gap-2 rounded-xl border text-sm font-medium transition-colors " +
                  (reaction === "down"
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-brand bg-background text-brand")
                }
              >
                <ThumbsDown className="h-4 w-4" /> Not Helpful
              </button>
            </div>
          </Section>

          {/* Note */}
          <Section title="Tell us more (optional)">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder="Share your feedback..."
              className="w-full resize-none rounded-xl border border-hairline bg-background px-3 py-2.5 text-sm placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </Section>

          {/* Options */}
          <ul className="mt-5 flex flex-col gap-2">
            {OPTIONS.map((o) => {
              const checked = !!opts[o.id];
              return (
                <li key={o.id}>
                  <button
                    onClick={() => toggle(o.id)}
                    className="flex w-full items-center gap-3 rounded-lg py-1.5 text-left"
                  >
                    <span
                      aria-hidden
                      className={
                        "flex h-5 w-5 items-center justify-center rounded border " +
                        (checked
                          ? "border-brand bg-brand text-brand-foreground"
                          : "border-hairline bg-background")
                      }
                    >
                      {checked && <Check className="h-3.5 w-3.5" />}
                    </span>
                    <span className="text-sm text-foreground">{o.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="mt-7 flex flex-col items-center gap-3">
            <button
              onClick={() => router.history.back()}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-brand text-sm font-semibold text-brand-foreground"
            >
              Submit Feedback
            </button>
            <Link
              to="/"
              className="text-xs font-medium text-foreground/55"
            >
              Skip
            </Link>
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6">
      <h3 className="mb-3 text-sm font-semibold">{title}</h3>
      {children}
    </section>
  );
}

