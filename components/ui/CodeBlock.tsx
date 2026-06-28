import React from "react";

type CodeBlockProps = {
  filename?: string;
  language?: string;
  children: React.ReactNode;
};

function normalizeChildren(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  return React.Children.toArray(children).join("");
}

export const CodeBlock = ({ children }: CodeBlockProps) => {
  const content = normalizeChildren(children);

  return (
    <pre className="my-6 overflow-x-auto border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs leading-relaxed text-zinc-300">
      <code>{content}</code>
    </pre>
  );
};

export const Pre = ({ children }: { children: React.ReactNode }) => {
  return (
    <pre className="my-6 overflow-x-auto border border-zinc-800 bg-zinc-950 px-4 py-3 text-xs leading-relaxed text-zinc-300">
      {children}
    </pre>
  );
};
