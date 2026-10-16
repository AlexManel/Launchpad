import type { Locale } from "./locales";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.prep": "Property setup",
  "nav.photos": "Photography",
  "nav.listing": "Listing",
  "nav.checkin": "Digital check-in",
  "nav.apps": "Apps",
  "nav.getStarted": "Start a project",
  "studio.hero.eyebrow": "Thessaloniki",
  "studio.hero.title": "Ready for Airbnb and Booking.",
  "studio.hero.sub":
    "The website, the photos, the listing and a check-in page. Done once. No monthly software.",
  "studio.hero.view": "See the work",
  "studio.hero.talk": "Contact",
  "studio.close": "Tell us the property.",
  "studio.close.cta": "Send a message",
  "offer.lead": "The work",
  "offer.title": "Six jobs. Each one starts and finishes.",
  "offer.web.t": "Websites",
  "offer.web.b":
    "The site for the stay or the business, on your own name. For direct bookings, not only the platform.",
  "offer.prep.t": "Property setup",
  "offer.prep.b":
    "Before it goes on Airbnb or Booking: access, house rules, amenities, cleaning notes, and what the photos must show.",
  "offer.photos.t": "Property photography",
  "offer.photos.b":
    "Photographs of the actual place, for the listing and the website. Not stock.",
  "offer.listing.t": "Platform listing",
  "offer.listing.b":
    "Title, description, amenities and rules. Written and published on Airbnb and Booking.",
  "offer.checkin.t": "Digital check-in",
  "offer.checkin.b":
    "One page, one QR. Wi-Fi, how to get in, house rules, what is nearby. It stops the same five messages.",
  "offer.apps.t": "Small apps and automations",
  "offer.apps.b":
    "One small tool for the work you repeat: guest replies, review answers, a form, a reminder. Built once. No monthly seat.",
  "offer.cta": "Ask about this",
  "contact.intro": "A website, a listing, photos, or a small tool. Say which property.",
  "contact.topic.website": "A website",
  "contact.topic.prep": "Property setup",
  "contact.topic.photos": "Photography",
  "contact.topic.listing": "A listing",
  "contact.topic.checkin": "Digital check-in",
  "contact.topic.apps": "An app or automation",
  "contact.topic.other": "Something else",
  "meta.home.title": "Webrya — Ready for Airbnb and Booking",
  "meta.home.description":
    "Websites, property setup, photography, listings and a digital check-in. Done once. No monthly software.",
};

const el: Dict = {
  "nav.prep": "Προετοιμασία ακινήτου",
  "nav.photos": "Φωτογράφιση",
  "nav.listing": "Αγγελία",
  "nav.checkin": "Ψηφιακό check-in",
  "nav.apps": "Εφαρμογές",
  "nav.getStarted": "Ξεκινήστε",
  "studio.hero.eyebrow": "Θεσσαλονίκη",
  "studio.hero.title": "Έτοιμο για Airbnb και Booking.",
  "studio.hero.sub":
    "Η ιστοσελίδα, οι φωτογραφίες, η αγγελία και ένα check-in. Μία φορά. Χωρίς μηνιαίο λογισμικό.",
  "studio.hero.view": "Δείτε τις δουλειές",
  "studio.hero.talk": "Επικοινωνία",
  "studio.close": "Πείτε μας το ακίνητο.",
  "studio.close.cta": "Στείλτε μήνυμα",
  "offer.lead": "Οι δουλειές",
  "offer.title": "Έξι δουλειές. Καθεμία με αρχή και τέλος.",
  "offer.web.t": "Ιστοσελίδες",
  "offer.web.b":
    "Η σελίδα του καταλύματος ή της επιχείρησης, στο δικό σας όνομα. Για απευθείας κράτηση, όχι μόνο για την πλατφόρμα.",
  "offer.prep.t": "Προετοιμασία ακινήτου",
  "offer.prep.b":
    "Πριν ανέβει σε Airbnb ή Booking: πρόσβαση, κανόνες, παροχές, σημειώσεις καθαρισμού και τι πρέπει να δείχνουν οι φωτογραφίες.",
  "offer.photos.t": "Φωτογράφιση ακινήτου",
  "offer.photos.b":
    "Φωτογραφίες του ίδιου του χώρου, για την αγγελία και την ιστοσελίδα. Όχι στοκ.",
  "offer.listing.t": "Αγγελία στις πλατφόρμες",
  "offer.listing.b":
    "Τίτλος, περιγραφή, παροχές και κανόνες. Τα γράφουμε και τα ανεβάζουμε σε Airbnb και Booking.",
  "offer.checkin.t": "Ψηφιακό check-in",
  "offer.checkin.b":
    "Μία σελίδα, ένα QR. Wi-Fi, πώς μπαίνει ο επισκέπτης, κανόνες, τι υπάρχει τριγύρω. Σταματά τα ίδια πέντε μηνύματα.",
  "offer.apps.t": "Μικρές εφαρμογές και αυτοματισμοί",
  "offer.apps.b":
    "Ένα μικρό εργαλείο για τη δουλειά που επαναλαμβάνεται: απαντήσεις σε επισκέπτες και κριτικές, φόρμα, υπενθύμιση. Μία φορά. Χωρίς μηνιαία θέση.",
  "offer.cta": "Ρωτήστε για αυτό",
  "contact.intro": "Ιστοσελίδα, αγγελία, φωτογραφίες ή ένα μικρό εργαλείο. Πείτε μας ποιο ακίνητο.",
  "contact.topic.website": "Ιστοσελίδα",
  "contact.topic.prep": "Προετοιμασία ακινήτου",
  "contact.topic.photos": "Φωτογράφιση",
  "contact.topic.listing": "Αγγελία",
  "contact.topic.checkin": "Ψηφιακό check-in",
  "contact.topic.apps": "Εφαρμογή ή αυτοματισμός",
  "contact.topic.other": "Κάτι άλλο",
  "meta.home.title": "Webrya — Έτοιμο για Airbnb και Booking",
  "meta.home.description":
    "Ιστοσελίδες, προετοιμασία ακινήτου, φωτογράφιση, αγγελίες και ψηφιακό check-in. Μία φορά. Χωρίς μηνιαίο λογισμικό.",
};

const de: Dict = {
  "nav.prep": "Objektvorbereitung",
  "nav.photos": "Fotografie",
  "nav.listing": "Inserat",
  "nav.checkin": "Digitaler Check-in",
  "nav.apps": "Apps",
  "nav.getStarted": "Projekt starten",
  "studio.hero.eyebrow": "Thessaloniki",
  "studio.hero.title": "Bereit für Airbnb und Booking.",
  "studio.hero.sub":
    "Website, Fotos, Inserat und eine Check-in-Seite. Einmal erledigt. Keine monatliche Software.",
  "studio.hero.view": "Leistungen ansehen",
  "studio.hero.talk": "Kontakt",
  "studio.close": "Nennen Sie uns das Objekt.",
  "studio.close.cta": "Nachricht senden",
  "offer.lead": "Die Arbeit",
  "offer.title": "Sechs Aufträge. Jeder hat Anfang und Ende.",
  "offer.web.t": "Websites",
  "offer.web.b":
    "Die Seite der Unterkunft oder des Betriebs, unter Ihrem Namen. Für Direktbuchungen, nicht nur für die Plattform.",
  "offer.prep.t": "Objektvorbereitung",
  "offer.prep.b":
    "Bevor es auf Airbnb oder Booking geht: Zugang, Hausregeln, Ausstattung, Reinigungsnotizen und was die Fotos zeigen müssen.",
  "offer.photos.t": "Objektfotografie",
  "offer.photos.b": "Fotos des echten Orts, für Inserat und Website. Kein Stock.",
  "offer.listing.t": "Inserat auf den Plattformen",
  "offer.listing.b":
    "Titel, Beschreibung, Ausstattung und Regeln. Geschrieben und auf Airbnb und Booking veröffentlicht.",
  "offer.checkin.t": "Digitaler Check-in",
  "offer.checkin.b":
    "Eine Seite, ein QR. WLAN, Zugang, Hausregeln, die Umgebung. Die gleichen fünf Nachrichten hören auf.",
  "offer.apps.t": "Kleine Apps und Automationen",
  "offer.apps.b":
    "Ein kleines Werkzeug für die Arbeit, die sich wiederholt: Antworten, Bewertungen, ein Formular, eine Erinnerung. Einmal gebaut. Kein monatlicher Platz.",
  "offer.cta": "Dazu anfragen",
  "contact.intro": "Website, Inserat, Fotos oder ein kleines Werkzeug. Welches Objekt?",
  "contact.topic.website": "Eine Website",
  "contact.topic.prep": "Objektvorbereitung",
  "contact.topic.photos": "Fotografie",
  "contact.topic.listing": "Ein Inserat",
  "contact.topic.checkin": "Digitaler Check-in",
  "contact.topic.apps": "App oder Automation",
  "contact.topic.other": "Etwas anderes",
  "meta.home.title": "Webrya — Bereit für Airbnb und Booking",
  "meta.home.description":
    "Websites, Objektvorbereitung, Fotos, Inserate und digitaler Check-in. Einmal erledigt. Keine monatliche Software.",
};

const ru: Dict = {
  "nav.prep": "Подготовка объекта",
  "nav.photos": "Фотосъёмка",
  "nav.listing": "Объявление",
  "nav.checkin": "Цифровой заезд",
  "nav.apps": "Приложения",
  "nav.getStarted": "Начать проект",
  "studio.hero.eyebrow": "Салоники",
  "studio.hero.title": "Готово для Airbnb и Booking.",
  "studio.hero.sub":
    "Сайт, фотографии, объявление и страница заезда. Один раз. Без ежемесячной программы.",
  "studio.hero.view": "Смотреть работы",
  "studio.hero.talk": "Контакт",
  "studio.close": "Напишите, какой объект.",
  "studio.close.cta": "Отправить сообщение",
  "offer.lead": "Работы",
  "offer.title": "Шесть работ. У каждой есть начало и конец.",
  "offer.web.t": "Сайты",
  "offer.web.b":
    "Сайт жилья или бизнеса на ваше имя. Для прямых броней, не только для платформы.",
  "offer.prep.t": "Подготовка объекта",
  "offer.prep.b":
    "До публикации на Airbnb или Booking: доступ, правила, удобства, заметки по уборке и что должны показать фото.",
  "offer.photos.t": "Фотосъёмка объекта",
  "offer.photos.b": "Фотографии самого места для объявления и сайта. Не сток.",
  "offer.listing.t": "Объявление на платформах",
  "offer.listing.b":
    "Заголовок, описание, удобства и правила. Пишем и публикуем на Airbnb и Booking.",
  "offer.checkin.t": "Цифровой заезд",
  "offer.checkin.b":
    "Одна страница, один QR. Wi-Fi, как войти, правила, что рядом. Одни и те же пять сообщений заканчиваются.",
  "offer.apps.t": "Небольшие приложения и автоматизации",
  "offer.apps.b":
    "Один небольшой инструмент для повторяющейся работы: ответы гостям и на отзывы, форма, напоминание. Один раз. Без месячного места.",
  "offer.cta": "Спросить об этом",
  "contact.intro": "Сайт, объявление, фото или небольшой инструмент. Какой объект?",
  "contact.topic.website": "Сайт",
  "contact.topic.prep": "Подготовка объекта",
  "contact.topic.photos": "Фотосъёмка",
  "contact.topic.listing": "Объявление",
  "contact.topic.checkin": "Цифровой заезд",
  "contact.topic.apps": "Приложение или автоматизация",
  "contact.topic.other": "Другое",
  "meta.home.title": "Webrya — Готово для Airbnb и Booking",
  "meta.home.description":
    "Сайты, подготовка объекта, фото, объявления и цифровой заезд. Один раз. Без ежемесячной программы.",
};

const tr: Dict = {
  "nav.prep": "Mülk hazırlığı",
  "nav.photos": "Fotoğraf",
  "nav.listing": "İlan",
  "nav.checkin": "Dijital check-in",
  "nav.apps": "Uygulamalar",
  "nav.getStarted": "Proje başlat",
  "studio.hero.eyebrow": "Selanik",
  "studio.hero.title": "Airbnb ve Booking için hazır.",
  "studio.hero.sub":
    "Site, fotoğraflar, ilan ve bir check-in sayfası. Bir kez. Aylık yazılım yok.",
  "studio.hero.view": "İşleri görün",
  "studio.hero.talk": "İletişim",
  "studio.close": "Mülkü söyleyin.",
  "studio.close.cta": "Mesaj gönderin",
  "offer.lead": "İşler",
  "offer.title": "Altı iş. Her birinin başı ve sonu var.",
  "offer.web.t": "Web siteleri",
  "offer.web.b":
    "Konaklama veya işletmenin sitesi, sizin adınızda. Doğrudan rezervasyon için, yalnız platform için değil.",
  "offer.prep.t": "Mülk hazırlığı",
  "offer.prep.b":
    "Airbnb veya Booking’e çıkmadan önce: giriş, kurallar, olanaklar, temizlik notları ve fotoğrafların ne göstermesi gerektiği.",
  "offer.photos.t": "Mülk fotoğrafı",
  "offer.photos.b": "İlan ve site için yerin kendi fotoğrafları. Stok değil.",
  "offer.listing.t": "Platform ilanı",
  "offer.listing.b":
    "Başlık, açıklama, olanaklar ve kurallar. Yazılır ve Airbnb ile Booking’e konur.",
  "offer.checkin.t": "Dijital check-in",
  "offer.checkin.b":
    "Bir sayfa, bir QR. Wi-Fi, nasıl girilir, kurallar, çevre. Aynı beş mesaj biter.",
  "offer.apps.t": "Küçük uygulamalar ve otomasyonlar",
  "offer.apps.b":
    "Tekrarlanan iş için küçük bir araç: misafir ve yorum yanıtları, form, hatırlatma. Bir kez. Aylık koltuk yok.",
  "offer.cta": "Bunu sorun",
  "contact.intro": "Site, ilan, fotoğraf veya küçük bir araç. Hangi mülk?",
  "contact.topic.website": "Web sitesi",
  "contact.topic.prep": "Mülk hazırlığı",
  "contact.topic.photos": "Fotoğraf",
  "contact.topic.listing": "İlan",
  "contact.topic.checkin": "Dijital check-in",
  "contact.topic.apps": "Uygulama veya otomasyon",
  "contact.topic.other": "Başka bir şey",
  "meta.home.title": "Webrya — Airbnb ve Booking için hazır",
  "meta.home.description":
    "Siteler, mülk hazırlığı, fotoğraf, ilanlar ve dijital check-in. Bir kez. Aylık yazılım yok.",
};

const fr: Dict = {
  "nav.prep": "Préparation du bien",
  "nav.photos": "Photographie",
  "nav.listing": "Annonce",
  "nav.checkin": "Check-in numérique",
  "nav.apps": "Applications",
  "nav.getStarted": "Démarrer un projet",
  "studio.hero.eyebrow": "Thessalonique",
  "studio.hero.title": "Prêt pour Airbnb et Booking.",
  "studio.hero.sub":
    "Le site, les photos, l’annonce et une page de check-in. Une fois. Pas de logiciel mensuel.",
  "studio.hero.view": "Voir les prestations",
  "studio.hero.talk": "Contact",
  "studio.close": "Dites-nous le bien.",
  "studio.close.cta": "Envoyer un message",
  "offer.lead": "Les prestations",
  "offer.title": "Six travaux. Chacun commence et se termine.",
  "offer.web.t": "Sites web",
  "offer.web.b":
    "Le site du logement ou de l’activité, à votre nom. Pour les réservations directes, pas seulement la plateforme.",
  "offer.prep.t": "Préparation du bien",
  "offer.prep.b":
    "Avant Airbnb ou Booking : accès, règles, équipements, notes de ménage, et ce que les photos doivent montrer.",
  "offer.photos.t": "Photographie du bien",
  "offer.photos.b": "Des photos du lieu réel, pour l’annonce et le site. Pas de stock.",
  "offer.listing.t": "Annonce sur les plateformes",
  "offer.listing.b":
    "Titre, description, équipements et règles. Rédigés et publiés sur Airbnb et Booking.",
  "offer.checkin.t": "Check-in numérique",
  "offer.checkin.b":
    "Une page, un QR. Wi-Fi, comment entrer, règles, le quartier. Les cinq mêmes messages s’arrêtent.",
  "offer.apps.t": "Petites applications et automatisations",
  "offer.apps.b":
    "Un petit outil pour le travail qui se répète : réponses, avis, un formulaire, un rappel. Une fois. Pas de place mensuelle.",
  "offer.cta": "En parler",
  "contact.intro": "Un site, une annonce, des photos ou un petit outil. Quel bien ?",
  "contact.topic.website": "Un site web",
  "contact.topic.prep": "Préparation du bien",
  "contact.topic.photos": "Photographie",
  "contact.topic.listing": "Une annonce",
  "contact.topic.checkin": "Check-in numérique",
  "contact.topic.apps": "Une application ou une automatisation",
  "contact.topic.other": "Autre chose",
  "meta.home.title": "Webrya — Prêt pour Airbnb et Booking",
  "meta.home.description":
    "Sites, préparation du bien, photos, annonces et check-in numérique. Une fois. Pas de logiciel mensuel.",
};

export const offerKeys: Record<Locale, Dict> = { en, el, de, ru, tr, fr };
