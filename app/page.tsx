import Link from "next/link";

export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className="space-y-5">
      <p className="text-base leading-relaxed text-[color:var(--text-sub)]">
        I work in security operations, but I&rsquo;ve always been drawn to the systems underneath the alert: the network path, the exposed service, the misconfiguration, the forgotten assumption. I like figuring out how things break and how to make them harder to break next time.
      </p>

      <p className="text-base leading-relaxed text-[color:var(--text-sub)]">
        I&rsquo;m a Security Analyst at{" "}
        <Link
          href="https://tecnet.ca/"
          className="underline underline-offset-2 transition-colors text-[color:var(--text-main)] decoration-[color:var(--accent)]/60 hover:text-white hover:decoration-[color:var(--accent)]"
          target="_blank"
          rel="noreferrer"
        >
          Tecnet
        </Link>{" "}
        and currently studying{" "}
        <Link
          href="https://www.bcit.ca/programs/forensics-and-cybersecurity-diploma-full-time-10207dipma/"
          className="underline underline-offset-2 transition-colors text-[color:var(--text-main)] decoration-[color:var(--accent)]/60 hover:text-white hover:decoration-[color:var(--accent)]"
          target="_blank"
          rel="noreferrer"
        >
          Digital Forensics and Cybersecurity
        </Link>{" "}
        at{" "}
        <Link
          href="https://www.bcit.ca/"
          className="underline underline-offset-2 transition-colors text-[color:var(--text-main)] decoration-[color:var(--accent)]/60 hover:text-white hover:decoration-[color:var(--accent)]"
          target="_blank"
          rel="noreferrer"
        >
          BCIT
        </Link>
        . My interests are mostly around infrastructure security, red teaming, secure system design, and using AI as a practical sidekick for security work.
      </p>

      <p className="text-base leading-relaxed text-[color:var(--text-sub)]">
        Outside of tech, you&rsquo;ll probably{" "}
        <Link
          href="/hiking"
          className="underline underline-offset-2 transition-colors text-[color:var(--text-main)] decoration-[color:var(--accent)]/60 hover:text-white hover:decoration-[color:var(--accent)]"
        >
          find me on a trail
        </Link>
        .
      </p>

      <blockquote className="mt-10 border-l-2 border-[color:var(--border)] pl-4 text-base leading-relaxed italic text-[color:var(--text-muted)]">
        Break things carefully. Fix them properly.
      </blockquote>
    </div>
  );
}
