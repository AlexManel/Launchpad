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
import { resourceKeysNew } from "./resource-keys-new";
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
  en: {
    ...portalKeysEn,
    ...resourceKeysEn,
    ...resourceKeysNew.en,
    ...catalogKeys.en,
    ...leftoverEn,
    ...base.en,
  },
  el: {
    ...portalKeysEn,
    ...resourceKeysEn,
    ...catalogKeys.en,
    ...leftoverEn,
    ...portalKeysEl,
    ...resourceKeysEl,
    ...resourceKeysNew.el,
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
    ...resourceKeysNew.de,
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
    ...resourceKeysNew.ru,
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
    ...resourceKeysNew.tr,
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
    ...resourceKeysNew.fr,
    ...catalogKeys.fr,
    ...leftoverFr,
    ...base.fr,
  },
};
