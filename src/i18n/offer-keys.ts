import type { Locale } from "./locales";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.cohost": "Co-hosting",
  "nav.landings": "Landing pages",
  "nav.getStarted": "Start a project",
  "studio.hero.eyebrow": "Thessaloniki",
  "studio.hero.title": "Websites, co-hosting and landing pages.",
  "studio.hero.sub":
    "Sites you own, and the day-to-day of a short-term rental: guest messages, turnovers, and a page that brings the booking.",
  "studio.hero.view": "See services",
  "studio.hero.talk": "Contact",
  "studio.close": "Tell us what you need.",
  "studio.close.cta": "Send a message",
  "offer.lead": "Services",
  "offer.title": "Three services. A clear scope.",
  "offer.web.t": "Websites",
  "offer.web.b":
    "A site for a stay, a shop or a company. Built once. You own it. The same kind of work as Tower 15 Suites, Ξενώνας Ελένη and Vallianos Group.",
  "offer.cohost.t": "Co-hosting",
  "offer.cohost.b":
    "Guest messages, review replies, cleaning coordination and listing care. Done by people who have run short-term rentals. Not a monthly software seat.",
  "offer.land.t": "Landing pages",
  "offer.land.b":
    "One page, one offer. For a new listing, a launch or a campaign. Faster than a full website.",
  "offer.tools.t": "Tools and setup",
  "offer.tools.b":
    "Generators for guest replies and reviews, plus a one-time setup of the pages and messages you repeat. No subscription.",
  "offer.cta": "Ask about this",
  "contact.intro": "A website, co-hosting, or a landing page. Say what you need.",
  "contact.topic.website": "A website",
  "contact.topic.cohost": "Co-hosting",
  "contact.topic.landing": "A landing page",
  "contact.topic.tools": "Tools and setup",
  "contact.topic.other": "Something else",
};

const el: Dict = {
  "nav.cohost": "Co-hosting",
  "nav.landings": "Landing pages",
  "nav.getStarted": "Ξεκινήστε",
  "studio.hero.eyebrow": "Θεσσαλονίκη",
  "studio.hero.title": "Ιστοσελίδες, co-hosting και landing pages.",
  "studio.hero.sub":
    "Σελίδες που σου ανήκουν, και η καθημερινότητα ενός καταλύματος: μηνύματα, καθαρισμοί, και μια σελίδα που φέρνει την κράτηση.",
  "studio.hero.view": "Δείτε τις υπηρεσίες",
  "studio.hero.talk": "Επικοινωνία",
  "studio.close": "Πείτε μας τι χρειάζεστε.",
  "studio.close.cta": "Στείλτε μήνυμα",
  "offer.lead": "Υπηρεσίες",
  "offer.title": "Τρεις υπηρεσίες. Ξεκάθαρο αντικείμενο.",
  "offer.web.t": "Ιστοσελίδες",
  "offer.web.b":
    "Ιστοσελίδα για κατάλυμα, κατάστημα ή εταιρεία. Μία φορά. Δική σου. Ίδια λογική με Tower 15 Suites, Ξενώνας Ελένη και Vallianos Group.",
  "offer.cohost.t": "Co-hosting",
  "offer.cohost.b":
    "Μηνύματα επισκεπτών, απαντήσεις σε κριτικές, συνεννόηση καθαρισμών και φροντίδα της αγγελίας. Από ανθρώπους που το έχουν τρέξει. Όχι μηνιαία θέση σε λογισμικό.",
  "offer.land.t": "Landing pages",
  "offer.land.b":
    "Μία σελίδα, μία προσφορά. Για νέα αγγελία, λανσάρισμα ή καμπάνια. Πιο γρήγορα από ένα πλήρες site.",
  "offer.tools.t": "Εργαλεία και στήσιμο",
  "offer.tools.b":
    "Γεννήτριες για απαντήσεις σε μηνύματα και κριτικές, και στήσιμο των σελίδων και των μηνυμάτων που επαναλαμβάνεις. Χωρίς συνδρομή.",
  "offer.cta": "Ρωτήστε για αυτό",
  "contact.intro": "Ιστοσελίδα, co-hosting ή landing page. Πείτε μας τι χρειάζεστε.",
  "contact.topic.website": "Ιστοσελίδα",
  "contact.topic.cohost": "Co-hosting",
  "contact.topic.landing": "Landing page",
  "contact.topic.tools": "Εργαλεία και στήσιμο",
  "contact.topic.other": "Κάτι άλλο",
};

const de: Dict = {
  "nav.cohost": "Co-Hosting",
  "nav.landings": "Landingpages",
  "nav.getStarted": "Projekt starten",
  "studio.hero.eyebrow": "Thessaloniki",
  "studio.hero.title": "Websites, Co-Hosting und Landingpages.",
  "studio.hero.sub":
    "Seiten, die Ihnen gehören — und der Alltag einer Ferienunterkunft: Gästenachrichten, Wechsel und eine Seite, die Buchungen bringt.",
  "studio.hero.view": "Leistungen ansehen",
  "studio.hero.talk": "Kontakt",
  "studio.close": "Sagen Sie uns, was Sie brauchen.",
  "studio.close.cta": "Nachricht senden",
  "offer.lead": "Leistungen",
  "offer.title": "Drei Leistungen. Klarer Umfang.",
  "offer.web.t": "Websites",
  "offer.web.b":
    "Eine Website für eine Unterkunft, ein Geschäft oder ein Unternehmen. Einmal gebaut. Sie gehört Ihnen.",
  "offer.cohost.t": "Co-Hosting",
  "offer.cohost.b":
    "Gästenachrichten, Antworten auf Bewertungen, Abstimmung der Reinigung und Pflege des Inserats. Von Leuten, die das selbst gemacht haben. Kein monatlicher Softwareplatz.",
  "offer.land.t": "Landingpages",
  "offer.land.b":
    "Eine Seite, ein Angebot. Für ein neues Inserat, einen Start oder eine Kampagne. Schneller als eine ganze Website.",
  "offer.tools.t": "Werkzeuge und Einrichtung",
  "offer.tools.b":
    "Generatoren für Antworten an Gäste und auf Bewertungen, plus eine einmalige Einrichtung. Kein Abo.",
  "offer.cta": "Dazu anfragen",
  "contact.intro": "Website, Co-Hosting oder Landingpage. Schreiben Sie, was Sie brauchen.",
  "contact.topic.website": "Eine Website",
  "contact.topic.cohost": "Co-Hosting",
  "contact.topic.landing": "Eine Landingpage",
  "contact.topic.tools": "Werkzeuge und Einrichtung",
  "contact.topic.other": "Etwas anderes",
};

const ru: Dict = {
  "nav.cohost": "Сохостинг",
  "nav.landings": "Лендинги",
  "nav.getStarted": "Начать проект",
  "studio.hero.eyebrow": "Салоники",
  "studio.hero.title": "Сайты, сохостинг и лендинги.",
  "studio.hero.sub":
    "Сайты, которые остаются вашими, и ежедневная работа аренды: сообщения гостям, уборки и страница, которая приводит брони.",
  "studio.hero.view": "Смотреть услуги",
  "studio.hero.talk": "Контакт",
  "studio.close": "Расскажите, что нужно.",
  "studio.close.cta": "Отправить сообщение",
  "offer.lead": "Услуги",
  "offer.title": "Три услуги. Понятный объём.",
  "offer.web.t": "Сайты",
  "offer.web.b": "Сайт для жилья, магазина или компании. Один раз. Он ваш.",
  "offer.cohost.t": "Сохостинг",
  "offer.cohost.b":
    "Сообщения гостям, ответы на отзывы, координация уборки и уход за объявлением. Делают люди, которые сами этим занимались. Не месячная подписка.",
  "offer.land.t": "Лендинги",
  "offer.land.b":
    "Одна страница, одно предложение. Для нового объявления, запуска или кампании. Быстрее, чем полный сайт.",
  "offer.tools.t": "Инструменты и настройка",
  "offer.tools.b": "Генераторы ответов гостям и на отзывы, плюс разовая настройка. Без подписки.",
  "offer.cta": "Спросить об этом",
  "contact.intro": "Сайт, сохостинг или лендинг. Напишите, что нужно.",
  "contact.topic.website": "Сайт",
  "contact.topic.cohost": "Сохостинг",
  "contact.topic.landing": "Лендинг",
  "contact.topic.tools": "Инструменты и настройка",
  "contact.topic.other": "Другое",
};

const tr: Dict = {
  "nav.cohost": "Co-hosting",
  "nav.landings": "Landing sayfalar",
  "nav.getStarted": "Proje başlat",
  "studio.hero.eyebrow": "Selanik",
  "studio.hero.title": "Web siteleri, co-hosting ve landing sayfalar.",
  "studio.hero.sub":
    "Size ait siteler ve kısa dönem kiralamanın günlük işi: misafir mesajları, temizlik ve rezervasyon getiren bir sayfa.",
  "studio.hero.view": "Hizmetleri görün",
  "studio.hero.talk": "İletişim",
  "studio.close": "Ne gerektiğini söyleyin.",
  "studio.close.cta": "Mesaj gönderin",
  "offer.lead": "Hizmetler",
  "offer.title": "Üç hizmet. Net kapsam.",
  "offer.web.t": "Web siteleri",
  "offer.web.b": "Konaklama, dükkân veya şirket için site. Bir kez. Size aittir.",
  "offer.cohost.t": "Co-hosting",
  "offer.cohost.b":
    "Misafir mesajları, yorum yanıtları, temizlik koordinasyonu ve ilan bakımı. Bunu kendisi yapmış kişilerden. Aylık yazılım koltuğu değil.",
  "offer.land.t": "Landing sayfalar",
  "offer.land.b":
    "Bir sayfa, bir teklif. Yeni ilan, lansman veya kampanya için. Tam siteden daha hızlı.",
  "offer.tools.t": "Araçlar ve kurulum",
  "offer.tools.b": "Misafir ve yorum yanıtları için üreticiler, bir kerelik kurulum. Abonelik yok.",
  "offer.cta": "Bunu sorun",
  "contact.intro": "Web sitesi, co-hosting veya landing sayfa. Ne gerektiğini yazın.",
  "contact.topic.website": "Web sitesi",
  "contact.topic.cohost": "Co-hosting",
  "contact.topic.landing": "Landing sayfa",
  "contact.topic.tools": "Araçlar ve kurulum",
  "contact.topic.other": "Başka bir şey",
};

const fr: Dict = {
  "nav.cohost": "Co-hosting",
  "nav.landings": "Landing pages",
  "nav.getStarted": "Démarrer un projet",
  "studio.hero.eyebrow": "Thessalonique",
  "studio.hero.title": "Sites, co-hosting et landing pages.",
  "studio.hero.sub":
    "Des sites qui vous appartiennent, et le quotidien d’une location courte durée : messages, ménages, et une page qui amène la réservation.",
  "studio.hero.view": "Voir les services",
  "studio.hero.talk": "Contact",
  "studio.close": "Dites-nous ce qu’il vous faut.",
  "studio.close.cta": "Envoyer un message",
  "offer.lead": "Services",
  "offer.title": "Trois services. Un périmètre clair.",
  "offer.web.t": "Sites web",
  "offer.web.b":
    "Un site pour un logement, un commerce ou une entreprise. Une fois. Il est à vous.",
  "offer.cohost.t": "Co-hosting",
  "offer.cohost.b":
    "Messages voyageurs, réponses aux avis, coordination du ménage et suivi de l’annonce. Par des gens qui l’ont fait. Pas un siège logiciel mensuel.",
  "offer.land.t": "Landing pages",
  "offer.land.b":
    "Une page, une offre. Pour une nouvelle annonce, un lancement ou une campagne. Plus rapide qu’un site complet.",
  "offer.tools.t": "Outils et mise en place",
  "offer.tools.b":
    "Générateurs de réponses aux voyageurs et aux avis, plus une mise en place unique. Sans abonnement.",
  "offer.cta": "En parler",
  "contact.intro": "Un site, du co-hosting ou une landing page. Dites ce qu’il vous faut.",
  "contact.topic.website": "Un site web",
  "contact.topic.cohost": "Co-hosting",
  "contact.topic.landing": "Une landing page",
  "contact.topic.tools": "Outils et mise en place",
  "contact.topic.other": "Autre chose",
};

export const offerKeys: Record<Locale, Dict> = { en, el, de, ru, tr, fr };
