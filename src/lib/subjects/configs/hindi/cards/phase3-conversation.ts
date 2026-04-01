import type { CardTemplate } from "@/types/subject";

export const conversationCards: CardTemplate[] = [
  {
    type: "PHRASE",
    front: { text: "I think... / I feel..." },
    back: {
      text: "मुझे लगता है...",
      transliteration: "Mujhe lagta hai...",
      explanation:
        "Very natural way to start an opinion. This is the male speaker form.",
    },
    tags: ["opinion", "conversation", "essential"],
  },
  {
    type: "PHRASE",
    front: { text: "That's great! / Very good!" },
    back: {
      text: "बहुत अच्छा!",
      transliteration: "Bahut accha!",
      explanation: "Universal expression of approval and enthusiasm.",
    },
    tags: ["reaction", "essential", "positive"],
  },
  {
    type: "PHRASE",
    front: { text: "It's okay / fine" },
    back: {
      text: "ठीक है",
      transliteration: "Theek hai",
      explanation:
        "Most versatile Hindi phrase. Means 'okay', 'fine', 'alright', 'sure'. Used constantly.",
    },
    tags: ["reaction", "essential", "casual"],
  },
  {
    type: "PHRASE",
    front: { text: "Where are you going?" },
    back: {
      text: "कहाँ जा रहे हैं?",
      transliteration: "Kahaan ja rahe hain?",
      explanation:
        "Common question in families — not nosy, it's caring! 'Hain' makes it respectful.",
    },
    tags: ["question", "conversation", "family"],
  },
  {
    type: "PHRASE",
    front: { text: "When will you come?" },
    back: {
      text: "कब आओगे?",
      transliteration: "Kab aaoge?",
      explanation:
        "Casual way to ask a male friend or younger relative. Respectful version: 'Kab aayenge?'",
    },
    tags: ["question", "conversation", "planning"],
  },
  {
    type: "PHRASE",
    front: { text: "I like this a lot" },
    back: {
      text: "मुझे यह बहुत पसंद है",
      transliteration: "Mujhe yeh bahut pasand hai",
      explanation:
        "'Pasand' = liking. Works for food, places, things, people.",
    },
    tags: ["opinion", "positive", "essential"],
  },
  {
    type: "PHRASE",
    front: { text: "Tell me / Go on" },
    back: {
      text: "बताइए / बताओ",
      transliteration: "Bataiye / Batao",
      explanation:
        "'Bataiye' = respectful (elders). 'Batao' = casual (friends). Shows you're listening.",
    },
    tags: ["conversation", "engagement", "essential"],
  },
  {
    type: "PHRASE",
    front: { text: "Really? / Is that so?" },
    back: {
      text: "अच्छा? / सच में?",
      transliteration: "Accha? / Sach mein?",
      explanation:
        "'Accha?' with rising intonation = 'really?'. Great conversation filler to show interest.",
    },
    tags: ["reaction", "conversation", "filler"],
  },
  {
    type: "PHRASE",
    front: { text: "I have to go now" },
    back: {
      text: "अब मुझे जाना है",
      transliteration: "Ab mujhe jaana hai",
      explanation: "Polite way to say you need to leave.",
    },
    tags: ["conversation", "departure", "essential"],
  },
  {
    type: "PHRASE",
    front: { text: "What happened?" },
    back: {
      text: "क्या हुआ?",
      transliteration: "Kya hua?",
      explanation:
        "Used when something seems wrong, or just to ask 'what's going on?'",
    },
    tags: ["question", "conversation", "essential"],
  },
];
