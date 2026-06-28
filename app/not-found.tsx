import Link from "next/link";

export default function NotFound() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Writings" },
    { href: "/hiking", label: "Hikes" },
  ];

  return (
    <section className="space-y-8 font-mono">
      <div className="border-b border-zinc-900 pb-6">
        <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-600">
          Error 404
        </p>
        <h1 className="mt-3 text-3xl tracking-tight text-zinc-100 sm:text-4xl">
          Page not found.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-base">
          Requested path does not exist anymore, or never did. Web full of bad
          links. Tragic.
        </p>
      </div>

      <div className="grid gap-6 border border-zinc-900 bg-zinc-950/40 p-5 sm:grid-cols-[minmax(0,1fr)_220px] sm:p-6">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-600">
            Suggested routes
          </p>
          <div className="space-y-3 text-sm text-zinc-400">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between border-b border-zinc-900 pb-3 transition-colors hover:text-zinc-200"
              >
                <span>{link.label}</span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                  {link.href}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-4 text-xs leading-6 text-zinc-600 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
          <p className="uppercase tracking-[0.16em]">Status</p>
          <p className="mt-3">route.lookup = null</p>
          <p>action = return_safe_path</p>
          <p>shell = operational</p>
        </div>
      </div>
    </section>
  );
}
