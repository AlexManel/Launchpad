export type ResourceSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: {
    title: string;
    text: string;
  }[];
};

export type ResourceArticle = {
  introduction: string[];
  sections: ResourceSection[];
  tool?: {
    slug:
      | "review-response-generator"
      | "guest-reply-generator"
      | "listing-optimizer"
      | "house-rules-generator"
      | "welcome-message-generator";
    title: string;
    description: string;
    cta: string;
  };
  relatedSlugs: string[];
};

export const resourceArticles: Record<string, ResourceArticle> = {
  "airbnb-hosting-checklist": {
    introduction: [
      "Going live with a short-term rental is not a single task. It is a chain of operational decisions that have to work together before the first guest arrives.",
      "Experienced hosts treat the launch like an operating system: the listing creates the expectation, the booking flow sets the tone, the property delivers the promise, and the turnover process resets everything for the next guest.",
    ],

    sections: [
      {
        heading: "1. Build the listing around the real guest experience",
        paragraphs: [
          "Start with accurate photography, a clear title and a description that makes the property's strongest advantages obvious. Do not write a fantasy version of the property. Write the version a guest will actually experience.",
          "Every important limitation should be understood before booking. Floor access, stairs, street noise, parking limitations, small bathrooms or unusual sleeping arrangements are easier to manage when expectations are set correctly.",
        ],
        bullets: [
          "Use bright, accurate photos of every important room.",
          "Show sleeping arrangements clearly.",
          "State location advantages without exaggerating them.",
          "Explain anything that could materially affect a guest's stay.",
        ],
      },
      {
        heading: "2. Define the operating rules before the first booking",
        paragraphs: [
          "House rules should answer the questions that repeatedly create friction: parties, smoking, pets, quiet hours, additional guests and damage. Keep them firm but readable.",
          "The objective is not to make the property sound restrictive. The objective is to remove ambiguity before a guest commits.",
        ],
      },
      {
        heading: "3. Build a reliable check-in system",
        paragraphs: [
          "A good check-in process does not depend on the host being available at exactly the right moment. Instructions should be understandable by someone arriving tired, carrying luggage and looking at their phone.",
          "Use a sequence: arrival location, entrance, access method, property entrance, Wi-Fi and immediate essentials. Avoid sending one enormous paragraph containing everything.",
        ],
        steps: [
          {
            title: "Arrival",
            text: "Explain exactly where the guest should go and what landmark or entrance identifies the property.",
          },
          {
            title: "Access",
            text: "Give the access instructions in the same order the guest will physically perform them.",
          },
          {
            title: "First five minutes",
            text: "Point out Wi-Fi, climate control, essential house rules and anything the guest needs immediately.",
          },
        ],
      },
      {
        heading: "4. Turnover is part of the product",
        paragraphs: [
          "Cleaning is not simply a back-office task. It is one of the main components of the guest experience. A beautiful listing cannot compensate for inconsistent turnover.",
          "Create a repeatable checklist covering cleaning, linen, consumables, damage inspection, equipment and final presentation.",
        ],
        bullets: [
          "Check high-touch surfaces.",
          "Verify towels and linen.",
          "Restock guest essentials.",
          "Test important appliances.",
          "Look for damage or missing items.",
          "Perform a final visual inspection before marking the property ready.",
        ],
      },
      {
        heading: "5. Prepare your communication templates",
        paragraphs: [
          "Do not improvise every guest message. Create templates for booking confirmation, pre-arrival, check-in, mid-stay, checkout and review follow-up.",
          "Templates should be starting points rather than robotic scripts. Keep the structure consistent while leaving room for property-specific details.",
        ],
      },
      {
        heading: "The final pre-launch test",
        paragraphs: [
          "Before going live, perform the entire guest journey yourself. Read the listing, imagine booking it, follow the check-in instructions and inspect the property as if you had never seen it before.",
          "Anything that requires the host to explain something verbally is a candidate for a better system.",
        ],
      },
    ],

    tool: {
      slug: "house-rules-generator",
      title: "Turn your property rules into guest-ready house rules.",
      description:
        "Create clear, professional rules that protect the property without making the listing feel hostile.",
      cta: "Try House Rules Generator",
    },

    relatedSlugs: [
      "check-in-experience",
      "automate-guest-messaging",
      "scaling-to-five-properties",
    ],
  },

  "pricing-strategy-basics": {
    introduction: [
      "When occupancy drops, the easiest reaction is to lower the price. It is also one of the easiest ways to damage your revenue strategy.",
      "Pricing is a positioning decision. Before discounting, determine whether the problem is actually price, or whether the listing, availability, minimum stay, presentation or market positioning is holding demand back.",
    ],

    sections: [
      {
        heading: "Start with the market, not your costs",
        paragraphs: [
          "Your costs matter for profitability, but guests do not price your property based on your mortgage, utilities or cleaning bill. They compare your offer with competing properties for similar dates.",
          "Build a small competitive set of properties that genuinely compete with yours on location, capacity, quality and amenities.",
        ],
      },
      {
        heading: "Check the five variables before discounting",
        bullets: [
          "Are comparable properties selling at a different price for the same dates?",
          "Is your listing positioned clearly enough for the guest to understand its advantage?",
          "Are you available for the dates guests actually want?",
          "Is your minimum stay creating unnecessary friction?",
          "Are your photos and reviews supporting the price you are asking?",
        ],
      },
      {
        heading: "Use discounts strategically",
        paragraphs: [
          "Discounting should solve a specific problem rather than become your permanent pricing strategy. A targeted gap, last-minute vacancy or longer-stay incentive can make sense. A permanent low price often just teaches the market that your property should be cheap.",
        ],
        steps: [
          {
            title: "Identify the gap",
            text: "Look at exactly which dates are underperforming rather than judging the entire calendar.",
          },
          {
            title: "Identify the cause",
            text: "Compare your offer, availability and price with relevant competing properties.",
          },
          {
            title: "Make one controlled change",
            text: "Adjust price, minimum stay, availability or presentation rather than changing everything simultaneously.",
          },
          {
            title: "Measure the result",
            text: "Give the change enough time to produce a meaningful signal before making another adjustment.",
          },
        ],
      },
      {
        heading: "Protect your average rate",
        paragraphs: [
          "Occupancy without healthy average daily revenue can create a misleading sense of success. The objective is not to have every night booked at any price. The objective is to maximize profitable demand.",
        ],
      },
      {
        heading: "A simple weekly pricing review",
        bullets: [
          "Review the next 30 to 60 days.",
          "Identify weak dates and strong dates.",
          "Check relevant competitors.",
          "Review recent booking pace.",
          "Check whether the listing still communicates its value.",
          "Make targeted changes and record what changed.",
        ],
      },
    ],

    relatedSlugs: [
      "airbnb-hosting-checklist",
      "scaling-to-five-properties",
      "ai-prompts-for-hosts",
    ],
  },

  "ai-prompts-for-hosts": {
    introduction: [
      "AI becomes useful for hosts when it removes repetitive thinking rather than replacing the host's judgment.",
      "The best prompts contain context, constraints and a clear output format. A vague instruction produces generic copy. A structured prompt produces something you can actually use.",
    ],

    sections: [
      {
        heading: "1. Review response prompt",
        paragraphs: [
          "Give the AI the guest review, the context of the stay and your preferred tone. Ask it to acknowledge valid criticism without becoming defensive and to keep the response useful to future guests.",
        ],
      },
      {
        heading: "2. Guest message prompt",
        paragraphs: [
          "Provide the guest's message, your actual policy and the action you are willing to take. This prevents the AI from inventing promises or policies that you do not offer.",
        ],
      },
      {
        heading: "3. Listing optimization prompt",
        paragraphs: [
          "Give AI the current listing, location, standout features, target guest and any important limitations. Ask for alternatives rather than accepting the first generated version.",
        ],
      },
      {
        heading: "4. House rules prompt",
        paragraphs: [
          "List your real property constraints and ask for clear, guest-friendly rules. The output should reduce ambiguity rather than create a legal-sounding wall of text.",
        ],
      },
      {
        heading: "5. Welcome message prompt",
        paragraphs: [
          "Give the property name, guest name, arrival details and the most important information the guest needs immediately. Ask the model to prioritize clarity over enthusiasm.",
        ],
      },
      {
        heading: "6. Complaint analysis prompt",
        paragraphs: [
          "Paste the complaint and ask AI to separate factual claims, emotional language, requests and potential operational issues. This helps the host decide what needs a response first.",
        ],
      },
      {
        heading: "7. SOP creation prompt",
        paragraphs: [
          "Describe a repeated task such as turnover, inspection or check-in. Ask AI to convert it into a numbered SOP with inputs, steps, quality checks and escalation points.",
        ],
      },
      {
        heading: "8. Review trend prompt",
        paragraphs: [
          "Provide several recent reviews and ask AI to identify recurring positive and negative themes. The useful output is not a summary of every review; it is a prioritized list of operational improvements.",
        ],
      },
      {
        heading: "9. Damage documentation prompt",
        paragraphs: [
          "Give AI the factual timeline, evidence available and communication history. Ask it to organize the information chronologically without inventing facts.",
        ],
      },
      {
        heading: "10. Difficult guest prompt",
        paragraphs: [
          "Describe the situation, your policy and the outcome you want. Ask for three versions: warm, firm and final-boundary response.",
        ],
      },
      {
        heading: "11. Guest experience audit prompt",
        paragraphs: [
          "Give AI the full guest journey from booking to checkout. Ask it to identify friction points, missing information and moments where a small improvement could affect the review.",
        ],
      },
      {
        heading: "12. Weekly operations review prompt",
        paragraphs: [
          "Feed AI the week's incidents, reviews, guest questions and maintenance notes. Ask it to produce a short management report with recurring issues, recommended actions and items requiring human attention.",
        ],
      },
      {
        heading: "The rule that matters most",
        paragraphs: [
          "Never let AI invent a property policy, amenity, refund, availability or fact. Your prompt should explicitly tell it to work only with supplied information and flag missing information instead of guessing.",
        ],
      },
    ],

    tool: {
      slug: "guest-reply-generator",
      title: "Use Webrya AI to turn guest messages into professional replies.",
      description:
        "Paste a guest message, add your actual policy or answer, and generate a response that sounds like a real host.",
      cta: "Try Guest Reply Generator",
    },

    relatedSlugs: [
      "automate-guest-messaging",
      "handling-difficult-guests",
      "responding-to-bad-reviews",
    ],
  },

  "automate-guest-messaging": {
    introduction: [
      "Automation should remove repetitive work, not remove the human element from hospitality.",
      "The best hosting communication systems automate predictable information while leaving judgment-heavy conversations in the hands of the host.",
    ],

    sections: [
      {
        heading: "Automate predictable moments",
        bullets: [
          "Booking confirmation.",
          "Pre-arrival information.",
          "Check-in instructions.",
          "Checkout instructions.",
          "Basic Wi-Fi and property information.",
        ],
      },
      {
        heading: "Keep judgment-heavy conversations human",
        bullets: [
          "Complaints involving service quality.",
          "Refund requests.",
          "Damage disputes.",
          "Serious rule violations.",
          "Situations involving safety or escalation.",
        ],
      },
      {
        heading: "Build messages from property facts",
        paragraphs: [
          "Automation becomes dangerous when it relies on generic templates that do not know the actual property. Every automated message should pull from verified information such as check-in time, access method, Wi-Fi details and house rules.",
        ],
      },
      {
        heading: "Use a message sequence",
        steps: [
          {
            title: "After booking",
            text: "Confirm the reservation and set expectations without overwhelming the guest.",
          },
          {
            title: "Before arrival",
            text: "Deliver the practical information needed to arrive successfully.",
          },
          {
            title: "At check-in",
            text: "Provide concise access instructions and the essentials needed immediately.",
          },
          {
            title: "During the stay",
            text: "Use a light-touch check-in when appropriate rather than constantly messaging.",
          },
          {
            title: "Before checkout",
            text: "Give simple checkout instructions with enough time to act on them.",
          },
        ],
      },
      {
        heading: "The test for every automated message",
        paragraphs: [
          "Ask: if I received this message as a guest, would I know exactly what to do next? If the answer is no, the message is not finished.",
        ],
      },
    ],

    tool: {
      slug: "guest-reply-generator",
      title: "Create replies faster without sounding automated.",
      description:
        "Webrya's Guest Reply Generator helps turn real guest messages and your actual policies into clear replies.",
      cta: "Try Guest Reply Generator",
    },

    relatedSlugs: [
      "ai-prompts-for-hosts",
      "check-in-experience",
      "handling-difficult-guests",
    ],
  },

  "handling-difficult-guests": {
    introduction: [
      "Difficult guest conversations are rarely improved by writing more. They improve when the host stays factual, calm and clear about the next step.",
      "Your objective is not to win the argument. Your objective is to protect the guest experience, the property and the evidence trail.",
    ],

    sections: [
      {
        heading: "The four-part de-escalation structure",
        steps: [
          {
            title: "Acknowledge",
            text: "Recognize the issue without automatically accepting blame for something you have not established.",
          },
          {
            title: "Clarify",
            text: "Ask for the missing factual information needed to understand what happened.",
          },
          {
            title: "Act",
            text: "State the concrete action you can take under the property's actual policy.",
          },
          {
            title: "Close",
            text: "End with a clear next step and avoid reopening the argument unnecessarily.",
          },
        ],
      },
      {
        heading: "When a guest complains at midnight",
        paragraphs: [
          "Do not respond emotionally because the message arrived at an inconvenient time. Confirm that you have understood the issue, provide the immediate action available and establish what happens next.",
          "If the issue is urgent or safety-related, prioritize the appropriate emergency or platform process rather than trying to solve everything through chat.",
        ],
      },
      {
        heading: "When a guest demands a refund",
        paragraphs: [
          "Separate the complaint from the compensation request. First establish what happened and what remedy is appropriate. Do not promise a refund simply because a guest asks for one.",
        ],
      },
      {
        heading: "When there are extra guests",
        paragraphs: [
          "Refer to the property's stated occupancy and guest policy. Ask for the facts you need and explain the available options. Keep the communication factual rather than accusatory.",
        ],
      },
      {
        heading: "Never do these five things",
        bullets: [
          "Do not threaten the guest.",
          "Do not insult or label the guest.",
          "Do not make promises you cannot keep.",
          "Do not invent evidence or facts.",
          "Do not delete or hide important communication records.",
        ],
      },
      {
        heading: "Document the situation",
        paragraphs: [
          "For material incidents, maintain a simple timeline: what the guest reported, when they reported it, what you checked, what you offered and what happened next. Good documentation protects you if the conversation escalates.",
        ],
      },
    ],

    tool: {
      slug: "guest-reply-generator",
      title: "Need the right wording before you send the message?",
      description:
        "Use the guest's actual message and your policy to generate a calm, professional response.",
      cta: "Generate a Guest Reply",
    },

    relatedSlugs: [
      "automate-guest-messaging",
      "responding-to-bad-reviews",
      "airbnb-hosting-checklist",
    ],
  },

  "check-in-experience": {
    introduction: [
      "Check-in is one of the first moments when the guest compares the promise of the listing with reality.",
      "The best check-in systems feel almost boring. The guest knows where to go, how to enter and what to do without needing to call the host.",
    ],

    sections: [
      {
        heading: "Design for a tired guest",
        paragraphs: [
          "Guests often arrive after travel, with luggage and limited attention. Write instructions for that situation rather than for someone who already knows the building.",
        ],
        bullets: [
          "Use short steps.",
          "Put the most important action first.",
          "Use recognizable landmarks.",
          "Separate access instructions from general house information.",
          "Avoid unnecessary background information.",
        ],
      },
      {
        heading: "The arrival sequence",
        steps: [
          {
            title: "Find the property",
            text: "Explain the exact location and how the guest will recognize the entrance.",
          },
          {
            title: "Enter the building",
            text: "Explain the door, gate, code or key process in the order it happens.",
          },
          {
            title: "Find the unit",
            text: "Give floor, unit or door information clearly.",
          },
          {
            title: "Enter the property",
            text: "Explain the lock, keybox or smart-lock procedure without ambiguity.",
          },
          {
            title: "Settle in",
            text: "Highlight Wi-Fi and the few things the guest is most likely to need immediately.",
          },
        ],
      },
      {
        heading: "Use the first five minutes to reduce future questions",
        paragraphs: [
          "A small amount of proactive information can eliminate repeated messages. Explain Wi-Fi, climate control, hot water, rubbish, quiet hours and any unusual property feature that could confuse a first-time guest.",
        ],
      },
      {
        heading: "What guests remember",
        paragraphs: [
          "Guests do not necessarily remember every detail. They remember whether arrival felt easy or stressful. Removing friction is often more valuable than adding more amenities.",
        ],
      },
    ],

    tool: {
      slug: "welcome-message-generator",
      title: "Create a clear, personalized welcome message.",
      description:
        "Turn your property details into a guest-friendly welcome message that delivers the right information at the right moment.",
      cta: "Try Welcome Message Generator",
    },

    relatedSlugs: [
      "airbnb-hosting-checklist",
      "automate-guest-messaging",
      "handling-difficult-guests",
    ],
  },

  "removing-unfair-reviews": {
    introduction: [
      "Not every negative review can or should be removed. A poor experience, by itself, does not automatically make a review removable.",
      "The useful approach is to distinguish between a review you dislike and a review that may violate the platform's applicable review policies.",
    ],

    sections: [
      {
        heading: "Start with the policy, not your emotions",
        paragraphs: [
          "Read the relevant review-policy grounds and identify the specific issue. Do not build an appeal around the argument that the review is unfair simply because you disagree with it.",
        ],
      },
      {
        heading: "Build an evidence timeline",
        bullets: [
          "Booking and stay dates.",
          "Relevant guest messages.",
          "What the guest reported.",
          "What you did in response.",
          "Photos, records or other supporting evidence where appropriate.",
          "The exact review statement you believe is problematic.",
        ],
      },
      {
        heading: "Separate factual disputes from policy violations",
        paragraphs: [
          "A factual disagreement and a policy violation are not necessarily the same thing. Your appeal should explain why the review falls under a relevant policy ground and connect that claim to evidence.",
        ],
      },
      {
        heading: "Write a short appeal",
        steps: [
          {
            title: "Identify the review",
            text: "Give the necessary booking or review context without unnecessary narrative.",
          },
          {
            title: "State the policy concern",
            text: "Explain the specific reason you believe the review should be reviewed.",
          },
          {
            title: "Provide evidence",
            text: "Reference the relevant communication or documentation.",
          },
          {
            title: "Request review",
            text: "Ask the platform to assess the review under the applicable policy.",
          },
        ],
      },
      {
        heading: "What not to write",
        bullets: [
          "Do not insult the guest.",
          "Do not make personal accusations.",
          "Do not write a ten-paragraph emotional story.",
          "Do not claim facts you cannot support.",
          "Do not treat the appeal as a public review response.",
        ],
      },
    ],

    tool: {
      slug: "review-response-generator",
      title: "Prepare a professional response while you handle the review issue.",
      description:
        "Generate a public response that protects your reputation while keeping the tone calm and professional.",
      cta: "Try Review Response Generator",
    },

    relatedSlugs: [
      "responding-to-bad-reviews",
      "handling-difficult-guests",
      "ai-prompts-for-hosts",
    ],
  },

  "responding-to-bad-reviews": {
    introduction: [
      "A public response to a bad review is not written for the guest who left it. It is written for the next guest who will read it.",
      "The strongest responses acknowledge what is useful, clarify what future guests need to know and avoid turning the review into a public argument.",
    ],

    sections: [
      {
        heading: "The four-part response",
        steps: [
          {
            title: "Acknowledge",
            text: "Thank the guest or acknowledge the feedback without sounding sarcastic or defensive.",
          },
          {
            title: "Address",
            text: "Respond briefly to the main issue that future guests may care about.",
          },
          {
            title: "Clarify",
            text: "If context matters, provide one factual clarification rather than a long rebuttal.",
          },
          {
            title: "Close",
            text: "Finish professionally and move the conversation forward.",
          },
        ],
      },
      {
        heading: "Do not argue with the reviewer",
        paragraphs: [
          "A technically correct response can still be commercially damaging if it makes the host look angry. Future guests are evaluating your behavior as much as the original complaint.",
        ],
      },
      {
        heading: "Address recurring issues",
        paragraphs: [
          "If several reviews mention the same issue, do not keep defending the same weakness. Fix the operational problem and let future reviews demonstrate the improvement.",
        ],
      },
      {
        heading: "Keep it concise",
        paragraphs: [
          "A public response rarely needs to reproduce the entire history of the stay. State what matters to future guests and stop there.",
        ],
      },
      {
        heading: "Before publishing, ask three questions",
        bullets: [
          "Does this reassure a future guest?",
          "Does this make me look professional?",
          "Have I said anything that is unnecessary, emotional or unverifiable?",
        ],
      },
    ],

    tool: {
      slug: "review-response-generator",
      title: "Turn a difficult review into a professional public response.",
      description:
        "Paste the review and generate a calm response designed for future guests, not an argument with the past guest.",
      cta: "Try Review Response Generator",
    },

    relatedSlugs: [
      "removing-unfair-reviews",
      "handling-difficult-guests",
      "ai-prompts-for-hosts",
    ],
  },

  "scaling-to-five-properties": {
    introduction: [
      "Going from one property to five is not simply doing the same work five times. The operating model has to change.",
      "At one property, the host can often rely on memory. At five, memory becomes a bottleneck and inconsistent execution becomes expensive.",
    ],

    sections: [
      {
        heading: "Standardize the repeatable work",
        bullets: [
          "Turnover and cleaning.",
          "Property inspection.",
          "Check-in and access.",
          "Guest communication.",
          "Maintenance reporting.",
          "Consumable restocking.",
        ],
      },
      {
        heading: "Create SOPs people can actually follow",
        paragraphs: [
          "An SOP should tell another person what to do without requiring a phone call to the owner. Use clear steps, quality checks and escalation rules.",
        ],
      },
      {
        heading: "Separate ownership from execution",
        paragraphs: [
          "Decide which tasks require your judgment and which tasks can be delegated. The goal is not to remove yourself from the operation. It is to reserve your time for decisions that actually require you.",
        ],
      },
      {
        heading: "Use handovers",
        paragraphs: [
          "Every unresolved issue should have an owner, status and next action. A simple handover system prevents problems from disappearing between cleaners, co-hosts and management.",
        ],
        bullets: [
          "Issue.",
          "Property.",
          "Priority.",
          "Assigned person.",
          "Next action.",
          "Deadline.",
        ],
      },
      {
        heading: "Measure operational quality",
        paragraphs: [
          "Track recurring guest complaints, cleaning issues, maintenance incidents and response times. The point is not to create bureaucracy. It is to identify patterns before they become reviews or lost bookings.",
        ],
      },
      {
        heading: "The five-property threshold",
        paragraphs: [
          "At five properties, you should be able to explain how a booking moves from reservation to checkout without relying on one person's memory. If you cannot, the next property will multiply the chaos.",
        ],
      },
    ],

    relatedSlugs: [
      "airbnb-hosting-checklist",
      "automate-guest-messaging",
      "cohost-agreements",
    ],
  },

  "cohost-agreements": {
    introduction: [
      "A co-host arrangement can work extremely well when both sides know exactly what is being managed, what is being paid for and what happens when the relationship ends.",
      "The biggest problems usually come from vague expectations rather than complicated legal language.",
    ],

    sections: [
      {
        heading: "Define the scope",
        bullets: [
          "Guest communication.",
          "Calendar management.",
          "Pricing.",
          "Check-in support.",
          "Cleaning coordination.",
          "Maintenance coordination.",
          "Review management.",
          "Emergency handling.",
        ],
      },
      {
        heading: "Define the fee structure",
        paragraphs: [
          "State whether the fee is a fixed amount, a percentage of revenue, a percentage after platform fees or another agreed basis. Ambiguity around the calculation creates conflict later.",
        ],
      },
      {
        heading: "Define responsibilities",
        paragraphs: [
          "The owner and co-host should know who pays for supplies, repairs, replacements, cleaning and emergency call-outs. Do not assume that responsibility is obvious.",
        ],
      },
      {
        heading: "Set spending authority",
        paragraphs: [
          "Agree on what the co-host can approve without asking the owner and what requires prior approval. A simple spending threshold can prevent delays without giving unlimited authority.",
        ],
      },
      {
        heading: "Set communication expectations",
        paragraphs: [
          "Define normal response expectations and what counts as an emergency. A co-host relationship becomes difficult when one side expects 24/7 availability and the other does not.",
        ],
      },
      {
        heading: "Define termination and handover",
        paragraphs: [
          "State how either side can end the relationship, what notice is required and how reservations, guest communication, keys, access credentials and operational information are handed over.",
        ],
      },
      {
        heading: "Keep the agreement operationally useful",
        paragraphs: [
          "The best agreement is one both sides can use as a reference during a disagreement. It should make responsibilities obvious rather than simply sounding formal.",
        ],
      },
    ],

    relatedSlugs: [
      "scaling-to-five-properties",
      "airbnb-hosting-checklist",
      "handling-difficult-guests",
    ],
  },
};