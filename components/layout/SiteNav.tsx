"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Writings", href: "/blog" },
  { label: "Hikes", href: "/hiking" },
];

export default function SiteNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/blog") return pathname === "/blog" || pathname.startsWith("/blog/");
    return pathname.startsWith(href);
  };

  return (
    <nav aria-label="Primary" className="flex items-center gap-5">
      {navItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "py-2 px-1 text-sm capitalize transition-all duration-300",
              active
                ? "text-[color:var(--text-main)] underline decoration-[color:var(--accent)] underline-offset-8"
                : "text-[color:var(--text-muted)] hover:text-[color:var(--text-sub)]",
            ].join(" ")}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
