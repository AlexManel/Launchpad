# Webrya update pack (Aug 2026)

## Included fixes

1. **Public AI tools feedback** → saves to Supabase `ai_feedback` (Yes / Needs work).
2. **Guest Reply prompts** → must use host policy when relevant; property context when provided.
3. **Sample** for guest-reply aligned to parking Q&A.
4. **Faster AI**: `gemini-2.5-flash`, lower max tokens, `thinkingBudget: 0`.
5. **Portal → AI Tools (login only)**  
   - Select a saved property  
   - Generate with property context (parking, check-in, access, notes…)  
   - Wi-Fi **password is never** sent to the model  
   - Public `/ai-tools/*` remain without property data

## Deploy

```bash
bun install
bun run build
git add -A
git commit -m "Workspace AI with property context; feedback save; faster Gemini"
git push
```

Env unchanged: VITE_SUPABASE_*, GEMINI_API_KEY.

If gemini-2.5-flash fails on your key, set AI_MODEL in src/lib/ai/config.ts to gemini-2.0-flash.

## Free tool limit (public /ai-tools only)

- Max **3** successful generations per browser without login (`localStorage`).
- After the 3rd (or on further clicks), a dialog asks to **Sign in / Create account**.
- Logged-in users: unlimited on public free tools.
- Portal workspace tools: not affected by this counter (already requires login).

## Listing Optimizer + URLs

- `src/lib/ai/fetch-listing.server.ts` fetches public listing HTML server-side when input is a URL.
- If the site blocks bots (common on Booking/Airbnb), the UI result starts with a warning and asks for pasted text.
- Model restored to `gemini-3.6-flash` with higher maxOutputTokens and `thinkingLevel: "low"`.
