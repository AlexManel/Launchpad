import { LOCALES, LOCALE_LABELS, useI18n } from "@/i18n/I18nProvider";

export function LanguageSwitcher({
  tone = "default",
}: {
  tone?: "default" | "hero";
}) {
  const { locale, setLocale } = useI18n();
  const hero = tone === "hero";

  return (
    <label className="inline-flex items-center">
      <span className="sr-only">Language</span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as typeof locale)}
        className={[
          "h-9 rounded-md border bg-transparent px-2 text-xs font-medium outline-none",
          hero
            ? "border-white/25 text-white"
            : "border-border text-foreground",
        ].join(" ")}
        aria-label="Language"
      >
        {LOCALES.map((code) => (
          <option key={code} value={code} className="text-foreground">
            {LOCALE_LABELS[code]}
          </option>
        ))}
      </select>
    </label>
  );
}
