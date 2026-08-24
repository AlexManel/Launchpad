import type { Locale } from "./locales";
import { extra as base } from "./extra";
import { portalKeysEn, portalKeysEl } from "./portal-extra-keys";

type Dict = Record<string, string>;

/** Portal chrome + base extra, with Greek portal keys and EN fallback for other locales. */
export const extra: Record<Locale, Dict> = {
  en: { ...portalKeysEn, ...base.en },
  el: { ...portalKeysEn, ...portalKeysEl, ...base.el },
  de: { ...portalKeysEn, ...base.de },
  ru: { ...portalKeysEn, ...base.ru },
  tr: { ...portalKeysEn, ...base.tr },
  fr: { ...portalKeysEn, ...base.fr },
};
