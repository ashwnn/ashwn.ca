export type UmamiConfig = {
  enabled: boolean;
  scriptUrl: string;
  recorderUrl: string;
  websiteId: string;
  domains: string[];
  eventPrefix: string;
};

export type InternalPaths = {
  github: string;   // internal short path e.g. "/gh"
  linkedin: string;  // internal short path e.g. "/in"
  pgp: string;      // internal short path e.g. "/pgp"
  signal: string;  // internal short path e.g. "/signal"
};

export type ExternalDestinations = {
  github: string;   // https://github.com/ashwnn
  linkedin: string;
  pgp: string;      // keyserver URL - no longer used for redirect
  signal: string;
  licenseUrl: string;
};

export type SiteConfig = {
  name: string;
  titleShort: string;
  url: string;
  description: string;
  internal: InternalPaths;
  external: ExternalDestinations;
  umami: UmamiConfig;
};

export const siteConfig: SiteConfig = {
  name: "Ashwin Charathsandran",
  titleShort: "Ashwin C.",
  url: "https://ashwn.ca",
  description:
    "Infrastructure and Security Operations with a software engineering background and a focus on security and systems reliability.",
  internal: {
    github: "/gh",
    linkedin: "/in",
    pgp: "/pgp",
    signal: "/signal",
  },
  external: {
    github: "https://github.com/ashwnn",
    linkedin: "https://linkedin.com/in/ax2",
    pgp: "https://keys.openpgp.org/search?q=ashwincharath%40gmail.com",
    signal: "https://signal.me/#eu/Q3RPuNH-LFhJjNF8wqfIh4opnlSimz_KbvNpjk3Mt6humpwcOzFIxJm-tk3GVuIU",
    licenseUrl: "https://opensource.org/licenses/MIT",
  },
  umami: {
    enabled: true,
    scriptUrl: "https://umm.ashwn.ca/script.js",
    recorderUrl: "https://umm.ashwn.ca/recorder.js",
    websiteId: "daa123c8-b692-41e3-b4a0-ab4076f841f0",
    domains: ["ashwn.ca"],
    eventPrefix: "workflow",
  },
};
