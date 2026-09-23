# Boots and Barns Animal Farm

A single-page site for Boots and Barns Animal Farm in Ikot-Ekpene, Nigeria. Built with Next.js, TypeScript, and Tailwind CSS.

## Local development

This project uses pnpm.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm lint
pnpm build
pnpm start
```

## Deploy on Vercel

Import the repository in Vercel and use the default Next.js settings. The production build command is `pnpm build`. No environment variables are required.

The intended domain is `bootsandbarns.com`. Connect that domain in the Vercel project when you have access to it. This repository does not assume the domain is already attached.

## Media

Animal photos in `public/img/animals` were resized to a 2400-pixel long edge and saved as JPEG quality 80 so the gallery stays sharp without shipping the original 4–7 MB files. Full-resolution copies, if preserved on this machine, live in `media/originals` and are not part of the site.

The five farm videos keep their original picture. The WhatsApp filenames, which contained spaces, were renamed to safe paths under `public/videos`, and poster frames are in `public/videos/posters`. Videos use `preload="none"` so they download only when someone presses play.
