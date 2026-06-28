# ashwn.ca

My personal website - projects, writing, and who I am.

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=flat&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-black?style=flat&logo=bun&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green?style=flat)

## Stack

- **Next.js 16 (App Router)** - server components by default
- **Tailwind CSS v4** - utility-first with CSS custom properties design system
- **MDX** - blog posts as markdown with embedded React components
- **PocketBase** - gallery backend (`pb.bepo.ca`)
- **Bun** - package manager and script runner

## Structure

```
app/          # Next.js App Router pages and layouts
components/   # Reusable UI and layout components
content/      # Blog posts (.mdx) and static data (projects.json)
lib/          # Core utilities - blog data layer, gallery fetching
config/       # Site-wide configuration (site.ts)
public/       # Static assets, PGP key, SSH keys
```

## Development

Requires [Bun](https://bun.sh).

```bash
git clone https://github.com/ashwnn/ashwn.ca.git
cd ashwn.ca
bun install
bun dev
```

Visit [http://localhost:3000](http://localhost:3000).

```bash
bun run build   # production build
bun run start   # start production server
bun run lint    # lint
```

## License

[MIT](LICENSE)
