import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { siteConfig } from "./config/site";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://um.ashwn.ca",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://pb.bepo.ca https://cdn.bepo.ca",
      "connect-src 'self' https://pb.bepo.ca https://um.ashwn.ca",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/ssh.keys",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Content-Disposition", value: "inline" },
        ],
      },
      {
        source: "/ssh",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Content-Disposition", value: "inline" },
        ],
      },
      {
        source: "/pgp",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Content-Disposition", value: "inline" },
        ],
      },
      {
        source: "/pgp.asc",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Content-Disposition", value: "inline" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/b/:path*",
        destination: "/blog/:path*",
        permanent: false,
      },
      {
        source: "/s/github",
        destination: siteConfig.internal.github,
        permanent: true,
      },
      {
        source: "/s/linkedin",
        destination: siteConfig.internal.linkedin,
        permanent: true,
      },
      {
        source: "/gh",
        destination: siteConfig.external.github,
        permanent: true,
      },
      {
        source: "/gh/:path*",
        destination: `${siteConfig.external.github}/:path*`,
        permanent: true,
      },
      {
        source: "/in",
        destination: siteConfig.external.linkedin,
        permanent: true,
      },
      {
        source: "/signal",
        destination: siteConfig.external.signal,
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/pgp",
        destination: "/pgp.asc",
      },
      {
        source: "/ssh",
        destination: "/ssh.keys",
      },
    ];
  },
};



const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      [
        "rehype-pretty-code",
        {
          theme: "one-dark-pro",
          keepBackground: false,
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
