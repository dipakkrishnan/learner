import type { CardTemplate } from "@/types/subject";

export const familyCards: CardTemplate[] = [
  {
    type: "VOCABULARY",
    front: { text: "Mother-in-law (husband's mother)" },
    back: {
      text: "सास",
      transliteration: "Saas",
      explanation: "Your husband's mother. Address her as 'Mummy ji' or 'Ma'.",
    },
    tags: ["family", "essential", "in-laws"],
  },
  {
    type: "VOCABULARY",
    front: { text: "Father-in-law (husband's father)" },
    back: {
      text: "ससुर",
      transliteration: "Sasur",
      explanation:
        "Your husband's father. Address him as 'Papa ji' or 'Bauji'.",
    },
    tags: ["family", "essential", "in-laws"],
  },
  {
    type: "VOCABULARY",
    front: { text: "Sister-in-law (husband's sister)" },
    back: {
      text: "ननद",
      transliteration: "Nanad",
      explanation: "Your husband's sister. Often a close bond in families.",
    },
    tags: ["family", "essential", "in-laws"],
  },
  {
    type: "VOCABULARY",
    front: { text: "Brother-in-law (husband's brother)" },
    back: {
      text: "देवर / जेठ",
      transliteration: "Devar / Jeth",
      explanation:
        "Devar = husband's younger brother. Jeth = husband's older brother.",
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
        "Brother's wife. A term of endearment and respect. Very commonly used.",
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
