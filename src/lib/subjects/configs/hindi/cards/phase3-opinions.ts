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
        "Respectful agreement. Great with in-laws. 'Rahe' for male, 'rahi' for female being addressed.",
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
];
