const pack = {
  en: {
    "r.review-facts-the-guest-left-out.title":
      "How to reply when an Airbnb review leaves out the facts",
    "r.review-facts-the-guest-left-out.excerpt":
      "Put the omitted facts into host notes and into the public reply without turning it into a fight.",
    "r.apantisi-kakis-kritikis.title":
      "How to reply when a review leaves out the facts",
    "r.apantisi-kakis-kritikis.excerpt":
      "Host notes and a public reply when the guest omits smoking, extra guests or warnings.",
  },
  el: {
    "r.review-facts-the-guest-left-out.title":
      "Πώς απαντάς όταν η κριτική Airbnb κρύβει τα γεγονότα",
    "r.review-facts-the-guest-left-out.excerpt":
      "Βάζεις τα γεγονότα που παραλείφθηκαν στις σημειώσεις host και στη δημόσια απάντηση, χωρίς καβγά.",
    "r.apantisi-kakis-kritikis.title":
      "Πώς απαντάς σε κακή κριτική όταν λείπουν τα γεγονότα",
    "r.apantisi-kakis-kritikis.excerpt":
      "Σημειώσεις host και δημόσια απάντηση όταν ο επισκέπτης παραλείπει κάπνισμα, επιπλέον άτομα ή παρατηρήσεις.",
  },
} as const;

export const resourceKeysNew = {
  en: pack.en as Record<string, string>,
  el: pack.el as Record<string, string>,
  de: pack.en as Record<string, string>,
  ru: pack.en as Record<string, string>,
  tr: pack.en as Record<string, string>,
  fr: pack.en as Record<string, string>,
};
