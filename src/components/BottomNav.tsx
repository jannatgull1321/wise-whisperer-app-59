import { Link, useLocation } from "@tanstack/react-router";
import { Home, BookOpen, Sparkles, Lightbulb } from "lucide-react";

const ITEMS = [
  { to: "/home", label: "Home", icon: Home, match: ["/home"] },
  { to: "/history", label: "Library", icon: BookOpen, match: ["/history"] },
  { to: "/related", label: "AI Query", icon: Sparkles, match: ["/related", "/resources"] },
  { to: "/", label: "Recommend", icon: Lightbulb, match: ["/"] },
] as const;

export function BottomNav({ active }: { active?: string }) {
  const { pathname } = useLocation();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-hairline bg-background">
      <div className="mx-auto grid max-w-md grid-cols-4">
        {ITEMS.map((item, i) => {
          const Icon = item.icon;
          const isActive = active
            ? active === item.label
            : (item.match as readonly string[]).includes(pathname);
          return (
            <Link
              key={`${item.label}-${i}`}
              to={item.to}
              className={
                "flex flex-col items-center gap-1 py-3 text-[10px] font-medium transition-colors " +
                (isActive ? "text-brand" : "text-[#888888]")
              }
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
