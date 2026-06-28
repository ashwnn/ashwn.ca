import type { MDXComponents } from "mdx/types";
import React from "react";
import { CodeBlock, Pre } from "@/components/ui/CodeBlock";

type CalloutIntent = "info" | "warning";

type StepItem = {
  title: string;
  description: string;
};

type TableProps = {
  headers: string[];
  rows: Array<Array<string | number>>;
};

const Callout = ({
  intent = "info",
  children,
}: {
  intent?: CalloutIntent;
  children: React.ReactNode;
}) => {
  const borderColor = intent === "warning" ? "border-amber-600" : "border-zinc-500";
  const bg = intent === "warning" ? "bg-amber-950/30" : "bg-zinc-900/60";
  return (
    <aside className={`border-l-2 ${borderColor} ${bg} rounded-r px-4 py-3 text-[0.9375rem] leading-relaxed text-[color:var(--text-sub)] font-mono`}>
      {children}
    </aside>
  );
};

const StepList = ({ items }: { items: StepItem[] }) => (
  <ol className="my-6 space-y-3">
    {items.map((item, index) => (
      <li key={`${item.title}-${index}`} className="grid grid-cols-[28px_1fr] gap-3">
        <span className="pt-0.5 text-xs uppercase tracking-[0.12em] text-zinc-500 font-mono">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h4 className="text-sm tracking-[0.02em] text-zinc-200 font-mono">
            {item.title}
          </h4>
          <p className="mt-1 text-[0.9375rem] leading-relaxed text-zinc-400">
            {item.description}
          </p>
        </div>
      </li>
    ))}
  </ol>
);

const DataTable = ({ headers, rows }: TableProps) => (
  <div className="overflow-x-auto border border-zinc-800">
    <table className="w-full border-collapse text-xs">
      <thead>
        <tr className="border-b-2 border-zinc-700">
          {headers.map((header) => (
              <th
              key={header}
              className="px-3 py-2 text-left text-[10px] uppercase tracking-[0.14em] text-zinc-400 font-semibold font-mono"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr
            key={`row-${rowIndex}`}
            className={rowIndex % 2 === 0 ? "bg-zinc-900/60 border-b border-zinc-800/60" : "bg-zinc-900/20 border-b border-zinc-800/60"}
          >
            {row.map((cell, cellIndex) => (
              <td key={`cell-${rowIndex}-${cellIndex}`} className="px-3 py-2 text-zinc-400 font-mono">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const MdxImage = ({
  alt,
  src,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & { src?: string }) => (
  <figure className="my-6 py-3 px-4 border border-zinc-800 rounded bg-zinc-900/40">
    {src ? (
      <a href={src} target="_blank" rel="noreferrer">
        <img
          {...props}
          src={src}
          alt={alt ?? ""}
          className="w-full border border-zinc-800 object-cover rounded"
        />
      </a>
    ) : (
      <img
        {...props}
        src={src}
        alt={alt ?? ""}
        className="w-full border border-zinc-800 object-cover rounded"
      />
    )}
    {alt ? (
      <figcaption className="mt-3 text-[10px] uppercase tracking-[0.14em] text-zinc-500 font-mono">
        {alt}
      </figcaption>
    ) : null}
  </figure>
);

const InlineCode = ({ children }: { children: React.ReactNode }) => (
  <code className="border border-zinc-800 bg-zinc-900 px-1 py-0.5 text-[11px] text-zinc-300 font-mono">
    {children}
  </code>
);

const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1 className="text-zinc-100 font-mono" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-zinc-100 font-mono" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-zinc-200 font-mono" {...props} />
  ),
  h4: (props) => (
    <h4 className="text-zinc-300 font-mono" {...props} />
  ),
  p: ({ children, ...props }) => {
    // Avoid wrapping block elements (figures, tables) in <p> to prevent
    // invalid HTML hydration errors. Standalone images in MDX compile to
    // paragraph nodes — if our img component returns <figure>, we must
    // not nest it inside <p>.
    const childrenArray = React.Children.toArray(children);
    if (
      childrenArray.length === 1 &&
      React.isValidElement(childrenArray[0]) &&
      (childrenArray[0].type === "figure" ||
        childrenArray[0].type === MdxImage ||
        (childrenArray[0].type as React.ComponentType<unknown>)?.displayName === "MdxImage")
    ) {
      return <>{children}</>;
    }
    return <p className="text-zinc-400" {...props}>{children}</p>;
  },
  a: (props) => (
    <a
      className="text-zinc-200 underline underline-offset-2 transition-colors hover:text-zinc-300"
      {...props}
    />
  ),
  ul: (props) => <ul className="list-disc pl-5 text-zinc-400" {...props} />,
  ol: (props) => <ol className="list-decimal pl-5 text-zinc-400" {...props} />,
  li: (props) => <li className="mb-1" {...props} />,
  blockquote: (props) => (
    <blockquote className="border-l-2 border-zinc-800 pl-4 text-zinc-500 italic" {...props} />
  ),
  pre: ({ children }) => <Pre>{children}</Pre>,
  code: ({ children, className }) => {
    if (className && className.includes("language-")) {
      return <code className={className}>{children}</code>;
    }
    return <InlineCode>{children}</InlineCode>;
  },
  table: (props) => (
    <div className="my-6 overflow-x-auto border border-zinc-800">
      <table className="w-full border-collapse text-xs" {...props} />
    </div>
  ),
  thead: (props) => <thead className="border-b-2 border-zinc-700" {...props} />,
  th: (props) => (
    <th className="px-3 py-2 text-left text-[10px] uppercase tracking-[0.14em] text-zinc-400 font-semibold" {...props} />
  ),
  tr: (props) => <tr className="border-b border-zinc-800 even:bg-zinc-900/60 odd:bg-zinc-900/20" {...props} />,
  td: (props) => <td className="px-3 py-2 text-zinc-400 font-mono" {...props} />,
  img: MdxImage,
  Callout,
  StepList,
  DataTable,
  CodeBlock,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...mdxComponents,
  };
}
