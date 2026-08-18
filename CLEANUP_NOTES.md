# Files to delete (pure Lovable traces, safe to remove)

- src/lib/lovable-error-reporting.ts   → DELETE this whole file
- AGENTS.md                             → DELETE this whole file (root of repo)

# Files to replace (copy these over the existing ones)

- src/routes/__root.tsx        → replaced, Lovable error-reporting import/usage removed
- README.md                    → replaced, clean project README instead of raw prompt-dump
- src/lib/ai/config.ts         → replaced, fixes temperature + adds proper max-tokens config
- src/lib/ai/engine.server.ts  → replaced, now actually uses config.ts (was hardcoded before)
- src/lib/ai/prompts.ts        → replaced, stronger human-warmth guidance across all 5 tools

# NOT touched (do not remove — functionally required)

- @lovable.dev/vite-tanstack-config in package.json / vite.config.ts
  This is the actual build tool that generates the correct Cloudflare Worker
  config (the wrangler.json + nodejs_compat setup that took us so long to get
  right). Removing it will break the Cloudflare deploy. The "lovable" in its
  name is just the npm package name — it's your build tool now, not a "trace"
  of the old editor.
