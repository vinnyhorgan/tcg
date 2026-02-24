import Link from "next/link";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/collection", label: "Collection" },
] as const;

export function Nav(): React.ReactElement {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="group flex items-center gap-2 font-bold text-lg tracking-tight text-white"
        >
          <span
            className={cn(
              "inline-block rounded-lg bg-gradient-to-br from-amber-400 to-orange-600",
              "px-2 py-0.5 font-black text-xs text-zinc-950 uppercase tracking-widest",
              "transition-transform group-hover:scale-105",
            )}
          >
            A
          </span>
          <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Arcana
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3.5 py-1.5 text-sm font-medium text-zinc-400",
                "transition-colors hover:bg-white/5 hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
