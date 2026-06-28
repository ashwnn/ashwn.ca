"use client";

import Link from "next/link";
import SiteNav from "./SiteNav";
import { siteConfig } from "@/config/site";

export default function SiteHeader() {
  return (
    <header className="mb-10 flex flex-col justify-between gap-6 border-b border-[color:var(--border)] pb-6 font-mono md:flex-row md:items-end">
      <div className="flex items-center">
        <div className="flex flex-col items-start">
          <Link
            href="/"
            className="cursor-pointer text-2xl font-bold leading-none tracking-tight text-[color:var(--text-main)] transition-colors hover:text-white"
          >
            {siteConfig.name}
          </Link>
          <p className="mt-1 text-xs leading-none text-[color:var(--text-muted)]">
            Security &amp; Infrastructure
          </p>
        </div>
      </div>

      {/* Right: navigation */}
      <SiteNav />
    </header>
  );
}
