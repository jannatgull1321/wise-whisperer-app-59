import { BottomNav } from "@/components/BottomNav";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/filter")({
  component: FilterScreen,
  head: () => ({
    meta: [
      { title: "Filter · Recommendations" },
      {
        name: "description",
        content:
          "Refine recommendations by role, category, department and relevance.",
      },
    ],
  }),
});

const ROLES = [
  "Admin",
  "Editor",
  "Viewer",
  "HR",
  "IT",
  "Finance",
  "Marketing",
];
const CATEGORIES = [
  "Policies",
  "Training Materials",
  "Reports",
  "Guidelines",
  "FAQs",
];
const DEPARTMENTS = ["HR", "IT", "Finance", "Marketing"];
const SORTS = ["High to Low", "Low to High", "Most Recent"] as const;

const DEFAULTS = {
  roles: ["Editor"] as string[],
  categories: ["Policies"] as string[],
  departments: ["HR"] as string[],
  sort: "High to Low" as (typeof SORTS)[number],
};

function FilterScreen() {
  const router = useRouter();
  const [roles, setRoles] = useState<string[]>(DEFAULTS.roles);
  const [categories, setCategories] = useState<string[]>(DEFAULTS.categories);
  const [departments, setDepartments] = useState<string[]>(DEFAULTS.departments);
  const [sort, setSort] = useState<(typeof SORTS)[number]>(DEFAULTS.sort);

  const toggle =
    (setter: React.Dispatch<React.SetStateAction<string[]>>) =>
    (value: string) =>
      setter((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
      );

  const reset = () => {
    setRoles([]);
    setCategories([]);
    setDepartments([]);
    setSort("High to Low");
  };

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
          <h1 className="text-lg font-semibold">Filter</h1>
          <button
            onClick={reset}
            className="px-2 text-sm font-medium text-foreground/55"
          >
            Reset
          </button>
        </header>

        <main className="flex-1 px-4 pb-32 pt-4">
          {/* Roles */}
          <FilterSection title="Filter by Role">
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {ROLES.map((r) => (
                <Chip
                  key={r}
                  label={r}
                  selected={roles.includes(r)}
                  onClick={() => toggle(setRoles)(r)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Categories */}
          <FilterSection title="Filter by Category">
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {CATEGORIES.map((c) => (
                <Chip
                  key={c}
                  label={c}
                  selected={categories.includes(c)}
                  onClick={() => toggle(setCategories)(c)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Departments */}
          <FilterSection title="Filter by Department">
            <ul className="flex flex-col gap-2">
              {DEPARTMENTS.map((d) => {
                const checked = departments.includes(d);
                return (
                  <li key={d}>
                    <button
                      onClick={() => toggle(setDepartments)(d)}
                      className="flex w-full items-center gap-3 rounded-lg py-2 text-left"
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
                      <span className="text-sm text-foreground">{d}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </FilterSection>

          {/* Sort */}
          <FilterSection title="Sort by Relevance">
            <ul className="flex flex-col gap-2">
              {SORTS.map((s) => {
                const selected = sort === s;
                return (
                  <li key={s}>
                    <button
                      onClick={() => setSort(s)}
                      className="flex w-full items-center gap-3 py-2 text-left"
                    >
                      <span
                        aria-hidden
                        className={
                          "flex h-5 w-5 items-center justify-center rounded-full border " +
                          (selected ? "border-brand" : "border-hairline")
                        }
                      >
                        {selected && (
                          <span className="h-2.5 w-2.5 rounded-full bg-brand" />
                        )}
                      </span>
                      <span className="text-sm text-foreground">{s}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </FilterSection>

          {/* Apply */}
          <div className="mt-8">
            <Link
              to="/"
              className="flex h-12 w-full items-center justify-center rounded-xl bg-brand text-sm font-semibold text-brand-foreground"
            >
              Apply Filters
            </Link>
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-5">
      <h2 className="mb-3 text-sm font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors " +
        (selected
          ? "border-brand bg-brand text-brand-foreground"
          : "border-hairline bg-background text-foreground")
      }
    >
      {label}
    </button>
  );
}

