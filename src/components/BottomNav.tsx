import { Link } from "@tanstack/react-router";
import { Home, BookOpen, Sparkles, Lightbulb } from "lucide-react";

const ITEMS = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/history", label: "Library", icon: BookOpen },
  { to: "/related", label: "AI Query", icon: Sparkles },
  { to: "/", label: "Recommend", icon: Lightbulb },
] as const;

export function BottomNav({ active }: { active?: string }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-hairline bg-background">
      <div className="mx-auto grid max-w-md grid-cols-4">
        {ITEMS.map((item, i) => {
          const Icon = item.icon;
          const isActive = active === item.label;
          return (
            <Link
              key={`${item.label}-${i}`}
              to={item.to}
              className={
                "flex flex-col items-center gap-1 py-3 text-[10px] font-medium transition-colors " +
                (isActive ? "text-brand" : "text-foreground/50")
              }
            >
              <Icon
                className="h-5 w-5"
                strokeWidth={isActive ? 2.5 : 2}
              />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
