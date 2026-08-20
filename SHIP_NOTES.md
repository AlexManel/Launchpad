# Webrya Ship Pack (safe upgrades)

This archive is based on your Launchpad source with **minimal, non-breaking** production polish.

## What changed

1. **`src/lib/ai/provider.server.ts`**
   - Removed duplicate/broken second `getAIModel` (missing import, dead AI SDK path).
   - Single stub remains; real generation stays in `engine.server.ts`.

2. **`src/routes/products.$slug.tsx`**
   - Removed fake “Checkout opened (demo)” success.
   - Honest “Coming soon” messaging for payments.

3. **`src/routes/ai-tools.$slug.tsx`**
   - **Try sample** loads the tool placeholder (faster first success).
   - **Was this useful?** Yes / Needs work after a result (for early feedback).
   - Softened “sign in to save” copy (save not fully built).

4. **Removed** `index-backup.tsx` (unused backup).

5. **`package.json`** name set to `webrya`.

## What was intentionally NOT changed

- Auth / login / signup
- `portal.tsx` properties CRUD & account profile
- Supabase client
- Gemini `engine.server.ts` + prompts
- Vite / `@lovable.dev/vite-tanstack-config` (required for Cloudflare)
- Database schema

## Deploy checklist

```bash
# env (local / Cloudflare)
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
GEMINI_API_KEY=...

bun install   # or npm install
bun run build
# deploy as you already do (nitro / wrangler)
```

## Startup focus

- Drive hosts to **Try sample → Generate → feedback**
- Collect real quotes before heavy Stripe / portal depth

## Brand (included in this pack)

6. **`src/components/site/Logo.tsx`**
   - Professional monogram mark in rounded square
   - Uses primary color on default tone

7. **`src/styles.css`**
   - Primary/accent/ring shifted to deep forest-teal
   - Backgrounds and surfaces unchanged
