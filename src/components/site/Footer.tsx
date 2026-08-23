import { Link } from "@tanstack/react-router";

import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useI18n } from "@/i18n/I18nProvider";

export function Footer() {
  const { t } = useI18n();
  const columns = [
    {
      title: t("footer.product"),
      links: [
        { to: "/ai-tools" as const, label: t("nav.aiTools") },
        { to: "/products" as const, label: t("footer.products") },
        { to: "/portal" as const, label: t("nav.workspace") },
        { to: "/pricing" as const, label: t("nav.pricing") },
      ],
    },
    {
      title: t("footer.learn"),
      links: [
        { to: "/resources" as const, label: t("nav.resources") },
        { to: "/resources" as const, label: t("footer.guides") },
        { to: "/resources" as const, label: t("footer.reviews") },
      ],
    },
    {
      title: t("footer.account"),
      links: [
        { to: "/login" as const, label: t("nav.login") },
        { to: "/ai-tools" as const, label: t("footer.start") },
      ],
    },
  ];

  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {t("footer.blurb")}
          </p>
          <div className="mt-5">
            <LanguageSwitcher />
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="eyebrow">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l, i) => (
                <li key={`${l.to}-${i}`}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="hairline">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Webrya. All rights reserved.</p>
          <p>webrya.com · {t("footer.legal")}</p>
        </div>
      </div>
    </footer>
  );
}
