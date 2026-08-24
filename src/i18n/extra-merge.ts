import type { Locale } from "./locales";
import { extra as base } from "./extra";
import { portalKeysEn, portalKeysEl } from "./portal-extra-keys";
import { resourceKeysEn, resourceKeysEl, resourceKeysDe } from "./resource-keys";

type Dict = Record<string, string>;

/** Portal + resource chrome + base extra. EL/DE have full list strings; others fall back to EN keys then EN text. */
export const extra: Record<Locale, Dict> = {
  en: { ...portalKeysEn, ...resourceKeysEn, ...base.en },
  el: { ...portalKeysEn, ...resourceKeysEn, ...portalKeysEl, ...resourceKeysEl, ...base.el },
  de: { ...portalKeysEn, ...resourceKeysEn, ...resourceKeysDe, ...base.de },
  ru: { ...portalKeysEn, ...resourceKeysEn, ...base.ru },
  tr: { ...portalKeysEn, ...resourceKeysEn, ...base.tr },
  fr: { ...portalKeysEn, ...resourceKeysEn, ...base.fr },
};
