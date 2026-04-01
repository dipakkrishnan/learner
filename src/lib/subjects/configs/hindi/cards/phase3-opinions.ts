import type { CardTemplate } from "@/types/subject";

export const opinionCards: CardTemplate[] = [
  {
    type: "PHRASE",
    front: { text: "I agree" },
    back: {
      text: "मैं सहमत हूँ",
      transliteration: "Main sahmat hoon",
      explanation: "Formal agreement. Casual: 'Haan, bilkul' (Yes, absolutely).",
    },
    tags: ["opinion", "conversation"],
  },
  {
    type: "PHRASE",
    front: { text: "Absolutely! / Definitely!" },
    back: {
      text: "बिल्कुल!",
      transliteration: "Bilkul!",
      explanation: "Strong agreement. Very natural and common.",
    },
    tags: ["reaction", "agreement", "essential"],
  },
  {
    type: "PHRASE",
    front: { text: "Maybe / Perhaps" },
    back: {
      text: "शायद",
      transliteration: "Shaayad",
      explanation: "Useful for being non-committal politely.",
    },
    tags: ["opinion", "hedging"],
  },
  {
    type: "PHRASE",
    front: { text: "I don't know" },
    back: {
      text: "मुझे नहीं पता",
      transliteration: "Mujhe nahin pata",
      explanation: "Honest and simple. No shame in saying this!",
    },
    tags: ["opinion", "essential", "honest"],
  },
  {
    type: "PHRASE",
    front: { text: "You're right" },
    back: {
      text: "आप सही कह रहे हैं",
      transliteration: "Aap sahi keh rahe hain",
      explanation:
        "Respectful agreement. Great with in-laws. Male addressee: 'keh rahe hain'. Female addressee (e.g. Mummy ji): 'Aap sahi keh rahi hain'.",
    },
    tags: ["opinion", "agreement", "respectful", "family"],
  },
  {
    type: "PHRASE",
    front: { text: "It doesn't matter" },
    back: {
      text: "कोई फ़र्क़ नहीं पड़ता",
      transliteration: "Koi farq nahin padta",
      explanation: "Shows flexibility and easy-going attitude.",
    },
    tags: ["opinion", "casual", "flexible"],
  },
  {
    type: "PHRASE",
    front: { text: "That's not right / I disagree" },
    back: {
      text: "ऐसा नहीं है",
      transliteration: "Aisa nahin hai",
      explanation:
        "Polite disagreement — literally 'it's not like that'. Much softer than a blunt 'no'. Safe to use with elders.",
    },
    tags: ["opinion", "disagreement", "respectful"],
  },
  {
    type: "PHRASE",
    front: { text: "Exactly! / That's exactly it!" },
    back: {
      text: "बिल्कुल सही!",
      transliteration: "Bilkul sahi!",
      explanation:
        "Strong agreement with emphasis. 'Bilkul' = absolutely, 'sahi' = right. Shows you're engaged and tracking.",
    },
    tags: ["opinion", "agreement", "reaction"],
  },
  {
    type: "PHRASE",
    front: { text: "I was thinking..." },
    back: {
      text: "मैं सोच रहा था...",
      transliteration: "Main soch raha tha...",
      explanation:
        "Soft way to introduce an idea or suggestion. Less assertive than 'mujhe lagta hai'. Good for floating ideas with family.",
    },
    tags: ["opinion", "conversation", "gentle"],
  },
  {
    type: "PHRASE",
    front: { text: "It depends" },
    back: {
      text: "ये depend करता है",
      transliteration: "Yeh depend karta hai",
      explanation:
        "Hinglish — 'depend' used directly from English. Very common and natural. Longer: 'Situation pe depend karta hai'.",
    },
    tags: ["opinion", "hedging", "casual"],
  },
  {
    type: "PHRASE",
    front: { text: "No way! / Impossible!" },
    back: {
      text: "ये कैसे हो सकता है!",
      transliteration: "Yeh kaise ho sakta hai!",
      explanation:
        "Expressing disbelief or surprise. Casual alternative: 'Kya! Aisa kaise?' (What! How?)",
    },
    tags: ["opinion", "reaction", "surprise"],
  },
];
