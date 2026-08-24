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
import {
  leftoverEn,
  leftoverEl,
  leftoverDe,
  leftoverRu,
  leftoverTr,
  leftoverFr,
} from "./leftover-keys";

type Dict = Record<string, string>;

export const extra: Record<Locale, Dict> = {
  en: { ...portalKeysEn, ...resourceKeysEn, ...catalogKeys.en, ...leftoverEn, ...base.en },
  el: {
    ...portalKeysEn,
    ...resourceKeysEn,
    ...catalogKeys.en,
    ...leftoverEn,
    ...portalKeysEl,
    ...resourceKeysEl,
    ...catalogKeys.el,
    ...leftoverEl,
    ...base.el,
  },
  de: {
    ...portalKeysEn,
    ...resourceKeysEn,
    ...catalogKeys.en,
    ...leftoverEn,
    ...resourceKeysDe,
    ...catalogKeys.de,
    ...leftoverDe,
    ...base.de,
  },
  ru: {
    ...portalKeysEn,
    ...resourceKeysEn,
    ...catalogKeys.en,
    ...leftoverEn,
    ...resourceKeysRu,
    ...catalogKeys.ru,
    ...leftoverRu,
    ...base.ru,
  },
  tr: {
    ...portalKeysEn,
    ...resourceKeysEn,
    ...catalogKeys.en,
    ...leftoverEn,
    ...resourceKeysTr,
    ...catalogKeys.tr,
    ...leftoverTr,
    ...base.tr,
  },
  fr: {
    ...portalKeysEn,
    ...resourceKeysEn,
    ...catalogKeys.en,
    ...leftoverEn,
    ...resourceKeysFr,
    ...catalogKeys.fr,
    ...leftoverFr,
    ...base.fr,
  },
};
