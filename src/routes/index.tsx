import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Section } from "@/components/site/Section";
import { HeroMedia } from "@/components/site/HeroMedia";
import { ContactForm } from "@/components/site/ContactForm";
import { work, type WorkProject } from "@/data/work";
import { messages } from "@/i18n/locales";
import { useI18n } from "@/i18n/I18nProvider";

const homeTitle = messages.en["meta.home.title"];
const homeDescription = messages.en["meta.home.description"];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: homeTitle },
      { name: "description", content: homeDescription },
      { property: "og:title", content: homeTitle },
      { property: "og:description", content: homeDescription },
      { property: "og:url", content: "https://webrya.com/" },
      { property: "og:image", content: "https://webrya.com/villa.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://webrya.com/" }],
  }),
  component: Home,
});

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);
  return reduce;
}

function WorkMedia({ project, reduce }: { project: WorkProject; reduce: boolean }) {
  if (project.video && !reduce) {
    return (
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={project.poster}
        aria-hidden="true"
      >
        <source src={project.video} type="video/mp4" />
      </video>
    );
  }

  if (project.poster) {
    return (
      <img
        src={project.poster}
        alt=""
        className={
          project.logo
            ? "absolute inset-0 h-full w-full object-contain"
            : "studio-still absolute inset-0 h-full w-full object-cover"
        }
      />
    );
  }

  return (
    <div className="absolute inset-0 grid place-items-center px-6">
      <p className="text-center text-sm font-medium tracking-tight text-[#f4f6ff]/80">{project.name}</p>
    </div>
  );
}

function WorkCard({ project, reduce }: { project: WorkProject; reduce: boolean }) {
  const { t } = useI18n();
  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[16px] bg-[#050014] ring-1 ring-white/10">
        <WorkMedia project={project} reduce={reduce} />
      </div>
      <h3 className="mt-4 text-lg tracking-tight text-foreground">{project.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{t(project.typeKey)}</p>
    </>
  );

  if (!project.href) {
    return <article className="flex flex-col">{body}</article>;
  }

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col rounded-lg outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary"
    >
      {body}
    </a>
  );
}

function Home() {
  const { t } = useI18n();
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    document.title = t("meta.home.title");
  }, [t]);

  const offers: Array<{
    id: "websites" | "prep" | "photos" | "listing" | "checkin" | "apps";
    title: string;
    body: string;
  }> = [
    { id: "websites", title: t("offer.web.t"), body: t("offer.web.b") },
    { id: "prep", title: t("offer.prep.t"), body: t("offer.prep.b") },
    { id: "photos", title: t("offer.photos.t"), body: t("offer.photos.b") },
    { id: "listing", title: t("offer.listing.t"), body: t("offer.listing.b") },
    { id: "checkin", title: t("offer.checkin.t"), body: t("offer.checkin.b") },
    { id: "apps", title: t("offer.apps.t"), body: t("offer.apps.b") },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-[#07041c] text-white">
        <div className="pointer-events-none absolute -left-24 top-10 h-[22rem] w-[22rem] rounded-full bg-[#3d7bff]/16 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 top-16 h-[20rem] w-[20rem] rounded-full bg-[#8b5cf6]/18 blur-3xl" />
        <div className="relative mx-auto grid w-full max-w-[1180px] items-center gap-8 px-5 pb-10 pt-24 lg:grid-cols-[1.05fr_0.9fr] lg:gap-12 lg:px-8 lg:pb-12 lg:pt-28">
          <div className="max-w-xl">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#9ec4ff]">
              {t("studio.hero.eyebrow")}
            </p>
            <h1 className="studio-hero-title mt-4 text-white">{t("studio.hero.title")}</h1>
            <p className="mt-5 max-w-md text-base leading-7 text-white/75 sm:text-lg">
              {t("studio.hero.sub")}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#services"
                className="inline-flex h-11 items-center rounded-md bg-[#3d7bff] px-5 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#5b91ff]"
              >
                {t("studio.hero.view")}
              </a>
              <a
                href="#contact"
                className="inline-flex h-11 items-center rounded-md border border-white/25 px-5 text-sm font-medium text-white transition-colors duration-300 hover:border-[#8b5cf6] hover:bg-[#8b5cf6]/15"
              >
                {t("studio.hero.talk")}
              </a>
            </div>
          </div>
          <HeroMedia reduce={reduce} />
        </div>
        <div className="relative border-t border-white/10">
          <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-7 gap-y-2 px-5 py-4 lg:px-8">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/40">
              {t("studio.work.eyebrow")}
            </p>
            {work.map((project) =>
              project.href ? (
                <a
                  key={project.slug}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {project.name}
                </a>
              ) : (
                <span key={project.slug} className="text-sm text-white/70">
                  {project.name}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      <Section id="work" className="scroll-mt-24 py-14 lg:py-20">
        <p className="eyebrow">{t("studio.work.eyebrow")}</p>
        <h2 className="mt-4 max-w-3xl text-3xl tracking-tight sm:text-4xl">{t("studio.work.title")}</h2>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">{t("studio.work.intro")}</p>
        <div className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {work.map((project) => (
            <WorkCard key={project.slug} project={project} reduce={reduce} />
          ))}
        </div>
      </Section>

      <Section id="services" className="scroll-mt-24 border-t border-white/10 py-14 lg:py-20">
        <p className="eyebrow">{t("offer.lead")}</p>
        <h2 className="mt-4 max-w-3xl text-3xl tracking-tight sm:text-4xl">{t("offer.title")}</h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {offers.map((offer, index) => (
            <article
              key={offer.id}
              id={offer.id}
              className="scroll-mt-28 flex h-full flex-col rounded-2xl border border-white/10 bg-[#100a28] p-6"
            >
              <div>
                <span className="text-xs font-semibold tracking-[0.16em] text-[#8eb6ff]">
                  0{index + 1}
                </span>
                <h3 className="mt-4 text-lg tracking-tight">{offer.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{offer.body}</p>
                <p className="mt-4 text-sm text-white">{t(`price.${offer.id}`)}</p>
              </div>
              <a
                href="#contact"
                className="mt-auto inline-flex pt-6 text-sm font-medium text-[#9ec4ff] hover:text-white"
              >
                {t("offer.cta")}
              </a>
            </article>
          ))}
        </div>
      </Section>

      <section id="contact" className="scroll-mt-24 relative overflow-hidden border-t border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(61,123,255,0.22),transparent_62%)]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-28">
          <div>
            <h2 className="max-w-xl text-4xl tracking-tight text-white sm:text-5xl">{t("studio.close")}</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/70">{t("contact.intro")}</p>
            <a className="mt-6 block text-sm font-medium text-[#9ec4ff]" href="mailto:info@webrya.com">
              info@webrya.com
            </a>
            <a className="mt-2 block text-sm font-medium text-white" href="tel:+306946949933">
              +30 694 694 9933
            </a>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
