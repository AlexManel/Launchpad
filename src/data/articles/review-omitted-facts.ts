import type { ResourceArticle } from "../resource-content";

export const omittedFactsEn: ResourceArticle = {
  introduction: [
    "A public Airbnb review is not a private complaint. Future guests read it before they book. If the review leaves out what actually happened — smoking indoors, extra guests, ignored warnings — a vague apology teaches the next reader that the host has no standards.",
    "Webrya is an AI toolkit for Airbnb hosts, not a PMS. The useful move is simple: write the missing facts into host notes, then let the public reply include those facts without turning into a fight.",
    "This guide is written from real hosting work in Thessaloniki. It is the playbook behind Webrya’s Review Response Generator.",
  ],
  sections: [
    {
      heading: "What this page answers",
      bullets: [
        "How to reply to a bad Airbnb review when the guest omitted facts.",
        "What belongs in host notes versus the public response.",
        "A copy-ready structure you can paste into Webrya or write by hand.",
        "When to appeal the review instead of only answering it.",
      ],
    },
    {
      heading: "Public reply vs host notes",
      paragraphs: [
        "The public reply is for the next guest. Keep it short, factual and calm. Name the policy that was broken. Do not stack insults or a courtroom speech.",
        "Host notes are for you: guest name, dates, warnings given, photos, smell, ashtray, extra mattresses, messages in the Airbnb thread. Those notes should travel into the draft so the model cannot invent a softer story.",
      ],
      bullets: [
        "Public: one or two facts a future booker needs.",
        "Notes: the full file you would show Airbnb Support.",
        "Never let the AI invent a fact that is not in the review or the notes.",
      ],
    },
    {
      heading: "The smoking-in-the-room pattern",
      paragraphs: [
        "This is the case most hosts handle badly. The guest writes that they were “charged unfairly” or “asked to leave.” They do not mention cigarettes in the bedroom.",
        "If your public reply only says “we are sorry you were disappointed,” the next guest assumes you punish people at random. Put the omitted fact in the reply.",
      ],
      steps: [
        {
          title: "Collect the notes first",
          text: "Guest name, unit, dates, how many warnings, who gave them, photos of ash or smell, and the message where you said you would involve the authorities if it continued.",
        },
        {
          title: "Write the public reply from those notes",
          text: "Acknowledge the stay. State the omitted fact in one sentence. State the rule. State what you did. Invite future guests to read the house rules.",
        },
        {
          title: "Keep a separate appeal file",
          text: "If the review breaks Airbnb policy (false claim, off-platform pressure, prohibited content), submit evidence. The public reply is not the appeal.",
        },
      ],
    },
    {
      heading: "A reply structure that works",
      paragraphs: ["Use four sentences. Future guests skim. Hosts who write 400 words look defensive."],
      steps: [
        { title: "Acknowledge", text: "Thank them for the stay. Do not accept a charge they did not prove." },
        {
          title: "Restore the missing fact",
          text: "“The extra charge was applied because smoking inside the bedroom was confirmed after three staff warnings — something the review does not mention.”",
        },
        {
          title: "State the rule and the action",
          text: "Quiet hours, occupancy, smoking and access rules exist to protect other guests. You enforced the published house rules.",
        },
        {
          title: "Close for the next booker",
          text: "You welcome guests who follow the listing rules. Point to house rules, not to a threat.",
        },
      ],
    },
    {
      heading: "Example host notes",
      paragraphs: [
        "Paste notes like this into Webrya’s Review Response Generator so the draft cannot skip the fact the guest left out.",
      ],
      bullets: [
        "Guest: Nikos. Unit 12. 12–15 August.",
        "Smoked in the bedroom. Ashtray on the nightstand. Smell in the curtains.",
        "Staff warned three times the same evening. Guest ignored the warnings.",
        "Told him we would call the police if it continued. He left immediately.",
        "Review claims an “unfair charge” and says nothing about smoking.",
      ],
    },
    {
      heading: "What not to publish",
      bullets: [
        "Do not name other guests or staff personally.",
        "Do not guess medical or legal conclusions.",
        "Do not write “you are a liar.” Write the fact.",
        "Do not paste the entire chat log into the public reply.",
      ],
    },
  ],
  tool: {
    slug: "review-response-generator",
    title: "Draft the reply with the facts the guest left out",
    description:
      "Paste the review, add host notes, and generate a public response that stays accurate. Webrya is an AI toolkit — not a PMS.",
    cta: "Open Review Response Generator",
  },
  relatedSlugs: ["responding-to-bad-reviews", "removing-unfair-reviews", "handling-difficult-guests"],
};

export const omittedFactsEl: ResourceArticle = {
  introduction: [
    "Η δημόσια κριτική στο Airbnb δεν είναι ιδιωτικό παράπονο. Την διαβάζει ο επόμενος επισκέπτης πριν κλείσει. Αν η κριτική κρύβει τι έγινε — κάπνισμα στο δωμάτιο, επιπλέον άτομα, παρατηρήσεις που αγνοήθηκαν — μια γενική συγνώμη λέει στον επόμενο ότι δεν υπάρχουν κανόνες.",
    "Η Webrya είναι AI toolkit για Airbnb hosts, όχι PMS. Η σωστή κίνηση: γράφεις τα γεγονότα που έλειψαν στις σημειώσεις host και η δημόσια απάντηση τα περιλαμβάνει, χωρίς καβγά.",
    "Ο οδηγός βασίζεται σε πραγματική φιλοξενία στη Θεσσαλονίκη και στο Review Response Generator της Webrya.",
  ],
  sections: [
    {
      heading: "Τι απαντάει αυτή η σελίδα",
      bullets: [
        "Πώς απαντάς σε κακή κριτική Airbnb όταν ο επισκέπτης παραλείπει γεγονότα.",
        "Τι μπαίνει στις σημειώσεις host και τι στη δημόσια απάντηση.",
        "Έτοιμη δομή για Webrya ή για να τη γράψεις μόνος σου.",
        "Πότε κάνεις έφεση αντί μόνο να απαντήσεις.",
      ],
    },
    {
      heading: "Δημόσια απάντηση και σημειώσεις host",
      paragraphs: [
        "Η δημόσια απάντηση είναι για τον επόμενο επισκέπτη. Σύντομη, ψύχραιμη, με το γεγονός. Όχι δικαστήριο.",
        "Οι σημειώσεις είναι ο φάκελός σου: όνομα, ημερομηνίες, πόσες παρατηρήσεις, φωτογραφίες, μυρωδιά, σταχτοδοχείο, μηνύματα στο thread.",
      ],
      bullets: [
        "Δημόσια: ένα-δύο γεγονότα που χρειάζεται ο επόμενος.",
        "Σημειώσεις: ό,τι θα έδειχνες στην Airbnb Support.",
        "Το AI δεν εφευρίσκει γεγονός που δεν είναι στην κριτική ή στις σημειώσεις.",
      ],
    },
    {
      heading: "Το μοτίβο «κάπνιζε στο δωμάτιο»",
      paragraphs: [
        "Ο επισκέπτης γράφει ότι «χρεώθηκε άδικα» ή «τον έδιωξαν». Δεν γράφει για το τσιγάρο στο υπνοδωμάτιο.",
        "Αν απαντήσεις μόνο «λυπούμαστε για την εμπειρία», ο επόμενος νομίζει ότι τιμωρείς στην τύχη. Βάλε το γεγονός που παραλείφθηκε.",
      ],
      steps: [
        { title: "Πρώτα οι σημειώσεις", text: "Όνομα, δωμάτιο, ημερομηνίες, πόσες παρατηρήσεις, φωτογραφίες, και το μήνυμα ότι θα κληθούν αρχές αν συνεχιστεί." },
        { title: "Η δημόσια απάντηση βγαίνει από τις σημειώσεις", text: "Αναγνώριση διαμονής. Ένα γεγονός που έλειπε. Ο κανόνας. Η ενέργειά σου." },
        { title: "Ξεχωριστό αρχείο έφεσης", text: "Αν η κριτική σπάει πολιτική Airbnb, στέλνεις αποδεικτικά. Η δημόσια απάντηση δεν είναι η έφεση." },
      ],
    },
    {
      heading: "Δομή τεσσάρων προτάσεων",
      paragraphs: ["Ο επόμενος επισκέπτης δεν διαβάζει 400 λέξεις."],
      steps: [
        { title: "Αναγνώριση", text: "Ευχαριστείς για τη διαμονή. Δεν αποδέχεσαι χρέωση που δεν αποδείχθηκε." },
        { title: "Το γεγονός που έλειπε", text: "«Η επιβάρυνση προέκυψε επειδή επιβεβαιώθηκε κάπνισμα στο υπνοδωμάτιο μετά από τρεις παρατηρήσεις του προσωπικού — γεγονός που η κριτική δεν αναφέρει.»" },
        { title: "Κανόνας και ενέργεια", text: "Οι κανόνες καπνίσματος και πληρότητας προστατεύουν τους ύπολοιπους φιλοξενούμενους." },
        { title: "Κλείσιμο για τον επόμενο", text: "Καλωσορίζεις όποιον τηρεί τους κανόνες. Δείχνεις τους κανόνες, όχι απειλή." },
      ],
    },
    {
      heading: "Παράδειγμα σημειώσεων host",
      paragraphs: ["Κάνε επικόλληση τέτοιων σημειώσεων στο Review Response Generator."],
      bullets: [
        "Επισκέπτης: Νίκος. Δωμάτιο 12. 12–15 Αυγούστου.",
        "Κάπνιζε στο υπνοδωμάτιο. Σταχτοδοχείο στο κομοδίνο. Μυρωδιά στις κουρτίνες.",
        "Τρεις παρατηρήσεις το ίδιο βράδυ. Τις αγνόησε.",
        "Ενημερώθηκε ότι θα κληθεί η αστυνομία. Αποχώρησε αμέσως.",
        "Η κριτική μιλά για «άδικη χρέωση» και δεν λέει τίποτα για κάπνισμα.",
      ],
    },
    {
      heading: "Τι δεν δημοσιεύεις",
      bullets: [
        "Όνομα άλλου επισκέπτη ή υπαλλήλου.",
        "Ιατρικά ή νομικά συμπεράσματα που δεν έχεις.",
        "«Είσαι ψεύτης.» Γράφεις το γεγονός.",
        "Ολόκληρο το chat στη δημόσια απάντηση.",
      ],
    },
  ],
  tool: {
    slug: "review-response-generator",
    title: "Γράψε την απάντηση με τα γεγονότα που έλειπαν",
    description: "Επικόλληση κριτικής, σημειώσεις host, δημόσια απάντηση που μένει ακριβής. Η Webrya είναι AI toolkit — όχι PMS.",
    cta: "Άνοιξε το Review Response Generator",
  },
  relatedSlugs: ["responding-to-bad-reviews", "removing-unfair-reviews", "handling-difficult-guests"],
};
