import { Link } from "@tanstack/react-router";
import { Home, BookOpen, Sparkles, Lightbulb } from "lucide-react";

const ITEMS = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/history", label: "Library", icon: BookOpen, exact: false },
  { to: "/related", label: "AI Query", icon: Sparkles, exact: false },
  { to: "/", label: "Recommend", icon: Lightbulb, exact: true },
] as const;

export function BottomNav({ active }: { active?: string }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-hairline bg-background">
      <div className="mx-auto grid max-w-md grid-cols-4">
        {ITEMS.map((item, i) => {
          const Icon = item.icon;
          // Use index as key since two items can share the same `to`.
          return (
            <Link
              key={`${item.label}-${i}`}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              activeProps={{ "data-active": "true" }}
              className="group flex flex-col items-center gap-1 py-3 text-[10px] font-medium text-foreground/55 data-[active=true]:text-brand"
              {...(active === item.label ? { "data-active": "true" } : {})}
            >
              <Icon className="h-5 w-5 group-data-[active=true]:[stroke-width:2.5]" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
