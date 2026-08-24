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
import { catalogKeys } from "./catalog-keys";

type Dict = Record<string, string>;

export const extra: Record<Locale, Dict> = {
  en: { ...portalKeysEn, ...resourceKeysEn, ...catalogKeys.en, ...base.en },
  el: {
    ...portalKeysEn,
    ...resourceKeysEn,
    ...catalogKeys.en,
    ...portalKeysEl,
    ...resourceKeysEl,
    ...catalogKeys.el,
    ...base.el,
  },
  de: { ...portalKeysEn, ...resourceKeysEn, ...catalogKeys.en, ...resourceKeysDe, ...catalogKeys.de, ...base.de },
  ru: { ...portalKeysEn, ...resourceKeysEn, ...catalogKeys.en, ...resourceKeysRu, ...catalogKeys.ru, ...base.ru },
  tr: { ...portalKeysEn, ...resourceKeysEn, ...catalogKeys.en, ...resourceKeysTr, ...catalogKeys.tr, ...base.tr },
  fr: { ...portalKeysEn, ...resourceKeysEn, ...catalogKeys.en, ...resourceKeysFr, ...catalogKeys.fr, ...base.fr },
};
