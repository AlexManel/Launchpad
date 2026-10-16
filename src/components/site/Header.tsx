import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useI18n } from "@/i18n/I18nProvider";

type ServiceItem = {
  label: string;
  to: "/";
  hash: "websites" | "prep" | "photos" | "listing" | "checkin" | "apps";
};

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const servicesRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const pinnedRef = useRef(false);

  const services: ServiceItem[] = [
    { to: "/", hash: "websites", label: t("nav.websites") },
    { to: "/", hash: "prep", label: t("nav.prep") },
    { to: "/", hash: "photos", label: t("nav.photos") },
    { to: "/", hash: "listing", label: t("nav.listing") },
    { to: "/", hash: "checkin", label: t("nav.checkin") },
    { to: "/", hash: "apps", label: t("nav.apps") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    pinnedRef.current = false;
    setServicesOpen(false);
    setPinned(false);
  }, [pathname]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        pinnedRef.current = false;
        setPinned(false);
      }
    };
    const onPointer = (event: MouseEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
        pinnedRef.current = false;
        setPinned(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [servicesOpen]);

  function clearCloseTimer() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }

  function showServices() {
    clearCloseTimer();
    setServicesOpen(true);
  }

  function hideSoon() {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => {
      if (!pinnedRef.current) setServicesOpen(false);
    }, 220);
  }

  const heroTone = isHome && !scrolled && !open;
  const linkTone = heroTone
    ? "text-white/80 hover:text-white"
    : "text-[#b7b3d6] hover:text-white";

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 overflow-visible border-b transition-colors duration-300",
        heroTone ? "border-white/10 bg-[#07041c]/80" : "border-white/10 bg-[#07041c]",
      ].join(" ")}
    >
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between gap-4 px-5 lg:px-8">
        <Logo tone={heroTone ? "hero" : "default"} wordmark={false} />

        <nav className="hidden h-full items-center gap-7 lg:flex">
          <div
            ref={servicesRef}
            className="relative h-full"
            onMouseEnter={showServices}
            onMouseLeave={hideSoon}
          >
            <button
              type="button"
              className={[
                "inline-flex h-full items-center gap-1 px-0.5 text-sm transition-colors duration-200",
                linkTone,
              ].join(" ")}
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
              aria-controls="services-menu"
              onClick={() => {
                clearCloseTimer();
                if (pinned) {
                  pinnedRef.current = false;
                  setPinned(false);
                  setServicesOpen(false);
                } else {
                  pinnedRef.current = true;
                  setPinned(true);
                  setServicesOpen(true);
                }
              }}
            >
              {t("nav.services")}
              <ChevronDown
                className={[
                  "size-3.5 transition-transform duration-200",
                  servicesOpen ? "rotate-180" : "",
                ].join(" ")}
                aria-hidden="true"
              />
            </button>
            <div
              id="services-menu"
              role="menu"
              aria-label={t("nav.services")}
              data-open={servicesOpen ? "true" : "false"}
              className={["services-panel", servicesOpen ? "is-open" : ""].join(" ")}
              onMouseEnter={showServices}
            >
              {services.map((item) =>
                item.hash ? (
                  <Link
                    key={item.hash}
                    to={item.to}
                    hash={item.hash}
                    role="menuitem"
                    className="block rounded-md px-3 py-2.5 text-sm text-[#f4f6ff] outline-none transition-colors duration-200 hover:bg-white/8 focus-visible:bg-white/8"
                    onClick={() => {
                      setOpen(false);
                      pinnedRef.current = false;
                      setPinned(false);
                      setServicesOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    key={item.to}
                    to={item.to}
                    role="menuitem"
                    className="block rounded-md px-3 py-2.5 text-sm text-[#f4f6ff] outline-none transition-colors duration-200 hover:bg-white/8 focus-visible:bg-white/8"
                    onClick={() => {
                      setOpen(false);
                      pinnedRef.current = false;
                      setPinned(false);
                      setServicesOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          </div>

          <Link to="/resources" className={["text-sm transition-colors duration-200", linkTone].join(" ")}>
            {t("nav.resources")}
          </Link>
          <Link to="/contact" className={["text-sm transition-colors duration-200", linkTone].join(" ")}>
            {t("nav.contact")}
          </Link>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher tone={heroTone ? "hero" : "default"} />
          <Button asChild size="sm">
            <Link to="/contact">{t("nav.getStarted")}</Link>
          </Button>
        </div>

        <button
          className={[
            "grid size-11 cursor-pointer place-items-center rounded-md border lg:hidden",
            heroTone ? "border-white/25 text-white" : "border-border text-foreground",
          ].join(" ")}
          aria-label={t("nav.menu")}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-[72px] z-50 overflow-y-auto border-t border-border bg-[#07041c] lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-4">
            <p className="pt-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#b7b3d6]">
              {t("nav.services")}
            </p>
            {services.map((item) =>
              item.hash ? (
                <Link
                  key={`m-${item.hash}`}
                  to={item.to}
                  hash={item.hash}
                  onClick={() => setOpen(false)}
                  className="border-b border-border/60 py-3 pl-3 text-sm text-foreground"
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={`m-${item.to}`}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-border/60 py-3 pl-3 text-sm text-foreground"
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link
              to="/resources"
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-3 text-sm text-foreground"
            >
              {t("nav.resources")}
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-3 text-sm text-foreground"
            >
              {t("nav.contact")}
            </Link>
            <div className="mt-4 flex gap-2 pb-6">
              <LanguageSwitcher />
              <Button asChild size="sm" className="flex-1">
                <Link to="/contact" onClick={() => setOpen(false)}>
                  {t("nav.getStarted")}
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
