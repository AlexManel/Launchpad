# Webrya — Your Smart Host Hub

AI-powered tools, ready-made resources and professional digital solutions
built for Airbnb hosts and short-term rental professionals.

**Live site:** https://webrya.com

## What this is

Webrya combines:

1. Free AI tools (Review Response Generator, Guest Reply Generator, Listing
   Optimizer, House Rules Generator, Welcome Message Generator)
2. One-time digital products
3. Professional Webrya packages
4. The Webrya Workspace

No mandatory subscription — the core products are one-time purchases.

## Tech stack

- React + TypeScript
- TanStack Start (SSR, server functions)
- Vite
- Tailwind CSS
- Google Gemini (`gemini-3.6-flash`) for AI generation
- Deployed on Cloudflare Workers

## Development

```sh
npm install
npm run dev
```

You'll need a `GEMINI_API_KEY` environment variable set locally (see
`src/lib/ai/provider` for where it's read) and, for production, a Google
Cloud billing account attached to that key — the Gemini API's unpaid tier is
not available for requests originating in the EEA/UK/Switzerland.

## Build & deploy

```sh
npm run build
```

This project deploys to Cloudflare Workers via Nitro's `cloudflare-module`
preset. After building, deploy with:

```sh
npx wrangler deploy --config .output/server/wrangler.json
```

See `src/lib/ai/` for the AI tool prompts, model configuration, and
generation engine — prompts, temperature and token limits are centralized
there so tools can be tuned without touching the frontend.
