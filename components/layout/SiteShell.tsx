import type { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import { siteConfig } from "@/config/site";

type SiteShellProps = {
  children: ReactNode;
};

export default function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="min-h-screen max-w-4xl mx-auto flex flex-col p-6 text-[color:var(--text-sub)] sm:p-12 md:p-16">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:text-xs focus:bg-[color:var(--surface)] focus:text-[color:var(--text-main)] focus:border focus:border-[color:var(--border)]"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1 pb-24">{children}</main>
      <footer className="mt-auto border-t border-[color:var(--border)] pt-8 pb-4 font-mono">
        <div className="flex flex-col gap-3 text-[10px] uppercase tracking-[0.1em] text-[color:var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-4 sm:order-2">
            <a
              href={siteConfig.internal.github}
              target="_blank"
              rel="noreferrer"
              className="py-2.5 transition-colors hover:text-[color:var(--text-main)]"
            >
              GitHub
            </a>
            <a
              href={siteConfig.internal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="py-2.5 transition-colors hover:text-[color:var(--text-main)]"
            >
              LinkedIn
            </a>
            <a
              href={siteConfig.internal.pgp}
              target="_blank"
              rel="noreferrer"
              className="py-2.5 transition-colors hover:text-[color:var(--text-main)]"
            >
              PGP
            </a>
            <a
              href={siteConfig.internal.signal}
              target="_blank"
              rel="noreferrer"
              className="py-2.5 transition-colors hover:text-[color:var(--text-main)]"
            >
              Signal
            </a>
          </div>
          <span className="sm:order-1">
            © {new Date().getFullYear()} {siteConfig.name} -{" "}
            <a
              href={siteConfig.external.licenseUrl}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-[color:var(--text-main)]"
            >
              MIT
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
