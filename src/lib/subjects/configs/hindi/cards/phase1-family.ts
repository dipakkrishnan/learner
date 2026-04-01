import type { CardTemplate } from "@/types/subject";

export const familyCards: CardTemplate[] = [
  {
    type: "VOCABULARY",
    front: { text: "Mother-in-law (wife's mother)" },
    back: {
      text: "सास",
      transliteration: "Saas",
      explanation:
        "Your wife's mother. In real life you'll often say 'Mummy ji', 'Aunty', or whatever the family already uses.",
    },
    tags: ["family", "essential", "in-laws"],
  },
  {
    type: "VOCABULARY",
    front: { text: "Father-in-law (wife's father)" },
    back: {
      text: "ससुर",
      transliteration: "Sasur",
      explanation:
        "Your wife's father. In conversation you'll often say 'Papa ji', 'Uncle', or the family-specific term instead of 'sasur'.",
    },
    tags: ["family", "essential", "in-laws"],
  },
  {
    type: "VOCABULARY",
    front: { text: "Sister-in-law (wife's sister)" },
    back: {
      text: "ननद",
      transliteration: "Nanad",
      explanation:
        "Your wife's sister. In real families you'll often just use her name or a casual kinship term.",
    },
    tags: ["family", "essential", "in-laws"],
  },
  {
    type: "VOCABULARY",
    front: { text: "Brother-in-law (wife's brother)" },
    back: {
      text: "साला",
      transliteration: "Saala",
      explanation:
        "Technically your wife's brother. In actual family conversation, people often just use his name, 'bhai', or 'bhaiya'.",
    },
    tags: ["family", "essential", "in-laws"],
  },
  {
    type: "VOCABULARY",
    front: { text: "Sister-in-law (brother's wife)" },
    back: {
      text: "भाभी",
      transliteration: "Bhabhi",
      explanation:
        "Brother's wife, or casually any older brother's wife figure in the family. Very common and natural.",
    },
    tags: ["family", "essential", "in-laws"],
  },
  {
    type: "VOCABULARY",
    front: { text: "Brother-in-law (sister's husband)" },
    back: {
      text: "जीजा",
      transliteration: "Jija",
      explanation: "Sister's husband. Also used affectionately.",
    },
    tags: ["family", "essential", "in-laws"],
  },
  {
    type: "VOCABULARY",
    front: { text: "Elder sister" },
    back: {
      text: "दीदी",
      transliteration: "Didi",
      explanation:
        "Used for elder sister or any older woman you're close to. Very respectful.",
    },
    tags: ["family", "essential", "respect"],
  },
  {
    type: "VOCABULARY",
    front: { text: "Elder brother" },
    back: {
      text: "भैया",
      transliteration: "Bhaiya",
      explanation: "Used for elder brother or any older man you're friendly with.",
    },
    tags: ["family", "essential", "respect"],
  },
  {
    type: "VOCABULARY",
    front: { text: "Uncle (father's brother) / Aunt" },
    back: {
      text: "चाचा / चाची",
      transliteration: "Chacha / Chachi",
      explanation:
        "Father's younger brother and his wife. 'Taya/Tayi' for father's older brother.",
    },
    tags: ["family", "extended", "in-laws"],
  },
  {
    type: "VOCABULARY",
    front: { text: "Children / Kids" },
    back: {
      text: "बच्चे",
      transliteration: "Bacche",
      explanation: "Plural of 'baccha' (child). Very common word in family settings.",
    },
    tags: ["family", "essential"],
  },
];
