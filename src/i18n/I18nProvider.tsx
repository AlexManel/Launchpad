import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import {
  LOCALES,
  LOCALE_LABELS,
  isLocale,
  messages,
  type Locale,
  type MessageKey,
} from "./locales";
import { extra } from "./extra";

const STORAGE_KEY = "webrya_locale";

type I18nValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const fallback: I18nValue = {
  locale: "en",
  setLocale: () => {},
  t: (key) => extra.en[key] ?? messages.en[key as MessageKey] ?? key,
};

const I18nContext = createContext<I18nValue>(fallback);

export function useI18n() {
  return useContext(I18nContext);
}

function detectLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    /* ignore */
  }
  if (typeof navigator !== "undefined") {
    const nav = navigator.language.slice(0, 2).toLowerCase();
    if (isLocale(nav)) return nav;
  }
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    setLocaleState(detectLocale());
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale]);

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
      t: (key) =>
        extra[locale][key] ??
        messages[locale][key as MessageKey] ??
        extra.en[key] ??
        messages.en[key as MessageKey] ??
        key,
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export { LOCALES, LOCALE_LABELS };
export type { Locale, MessageKey };
