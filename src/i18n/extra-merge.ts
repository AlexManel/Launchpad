import type { Locale } from "./locales";
import { extra as base } from "./extra";
import { portalKeysEn, portalKeysEl } from "./portal-extra-keys";
import {
  resourceKeysEn,
  resourceKeysEl,
  resourceKeysDe,
  resourceKeysRu,
  resourceKeysTr,
  resourceKeysFr,
} from "./resource-keys";

type Dict = Record<string, string>;

/** Portal + resource chrome + base extra. Every locale has full resource list strings. */
export const extra: Record<Locale, Dict> = {
  en: { ...portalKeysEn, ...resourceKeysEn, ...base.en },
  el: { ...portalKeysEn, ...resourceKeysEn, ...portalKeysEl, ...resourceKeysEl, ...base.el },
  de: { ...portalKeysEn, ...resourceKeysEn, ...resourceKeysDe, ...base.de },
  ru: { ...portalKeysEn, ...resourceKeysEn, ...resourceKeysRu, ...base.ru },
  tr: { ...portalKeysEn, ...resourceKeysEn, ...resourceKeysTr, ...base.tr },
  fr: { ...portalKeysEn, ...resourceKeysEn, ...resourceKeysFr, ...base.fr },
};
