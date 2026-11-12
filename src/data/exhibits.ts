export type Exhibit = {
  slug: string;
  number: string;
  kicker: string;
  title: string;
  short: string;
  question: string;
  visual: string;
  kind: string;
  status: "prototype" | "planned";
};

export const exhibits: Exhibit[] = [
  {
    slug: "risks", number: "01", kicker: "THE SIGNAL", title: "What Should I Worry About?",
    short: "From alarming headlines to what the evidence actually shows.",
    question: "Which AI risks are documented, and which remain uncertain?",
    visual: "signal", kind: "Risks and evidence", status: "planned"
  },
  {
    slug: "consciousness", number: "02", kicker: "THE MIND", title: "Is AI Conscious?",
    short: "Intelligence, experience, and the limits of what we can know.",
    question: "Does acting aware tell us anything about inner experience?",
    visual: "mind", kind: "Science and philosophy", status: "planned"
  },
  {
    slug: "environment", number: "03", kicker: "THE CURRENT", title: "AI & the Environment",
    short: "Follow the real flow of energy and water behind AI.",
    question: "What does AI actually consume, and what are we measuring?",
    visual: "water", kind: "Energy and water", status: "prototype"
  },
  {
    slug: "benefits", number: "04", kicker: "THE POSSIBILITY", title: "Where AI Is Helping",
    short: "Look beyond the promises to outcomes we can examine.",
    question: "Where has AI produced a measurable benefit?",
    visual: "benefits", kind: "Evidence of impact", status: "planned"
  },
  {
    slug: "misconceptions", number: "05", kicker: "THE REFRACTION", title: "Things AI Gets Blamed For",
    short: "See how a compelling claim can miss the wider picture.",
    question: "What can we fairly attribute to AI, and what can't we?",
    visual: "prism", kind: "Claims and context", status: "planned"
  },
  {
    slug: "agents-security", number: "06", kicker: "THE BOUNDARY", title: "AI Agents & Security",
    short: "When a system can act, permissions become the story.",
    question: "What changes when AI can use tools and take action?",
    visual: "network", kind: "Autonomy and trust", status: "planned"
  }
];

export const exhibitPath = (slug: string) => "/explore/" + slug;
