/**
 * Selected work on the public homepage.
 * Images live in public/work and are local copies. Do not hotlink client sites.
 */
export type WorkProject = {
  slug: string;
  name: string;
  typeKey: string;
  href?: string;
  video?: string;
  poster?: string;
  /** Wordmark or logo plate. Shown whole, without the photo crop. */
  logo?: boolean;
};

export const work: WorkProject[] = [
  {
    slug: "tower-15-suites",
    name: "Tower 15 Suites",
    typeKey: "studio.work.tower15",
    href: "https://tower15suites.gr",
    poster: "/work/tower-15-suites.jpg",
  },
  {
    slug: "ksenonas-eleni",
    name: "Ξενώνας Ελένη",
    typeKey: "studio.work.eleni",
    href: "https://ksenonaseleni.gr",
    poster: "/work/ksenonas-eleni.jpg",
  },
  {
    slug: "revmatrix",
    name: "Revmatrix",
    typeKey: "studio.work.revmatrix",
    href: "https://revmatrix.gr",
    poster: "/work/revmatrix.jpg",
  },
  {
    slug: "giannis-papanikolaou",
    name: "Γιάννης Παπανικολάου",
    typeKey: "studio.work.giannis",
    href: "https://giannispapanikolaou.gr",
    poster: "/work/giannis-papanikolaou.jpg",
  },
  {
    slug: "vallianos-group",
    name: "Vallianos Group",
    typeKey: "studio.work.vallianos",
    href: "https://vallianosgroup.gr",
    poster: "/work/vallianos-group.jpg",
    logo: true,
  },
];
