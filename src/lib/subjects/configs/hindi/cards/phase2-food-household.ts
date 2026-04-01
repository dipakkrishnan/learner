import type { CardTemplate } from "@/types/subject";

export const foodHouseholdCards: CardTemplate[] = [
  {
    type: "PHRASE",
    front: { text: "The food is very tasty" },
    back: {
      text: "खाना बहुत अच्छा है",
      transliteration: "Khana bahut accha hai",
      explanation:
        "THE most important phrase for in-law visits! Compliment the cooking always.",
      examples: [
        "खाना बहुत स्वादिष्ट है (Khana bahut swaadisht hai) — The food is very delicious (more formal)",
      ],
    },
    tags: ["food", "essential", "compliment", "family"],
  },
  {
    type: "PHRASE",
    front: { text: "I need water" },
    back: {
      text: "पानी चाहिए",
      transliteration: "Paani chahiye",
      explanation: "'Chahiye' = need/want. Works with any noun: chai chahiye, khana chahiye.",
    },
    tags: ["food", "essential", "request"],
  },
  {
    type: "PHRASE",
    front: { text: "Will you have tea?" },
    back: {
      text: "चाय पिएँगे?",
      transliteration: "Chai piyenge?",
      explanation:
        "Tea is central to Indian hospitality. You'll hear this many times a day. Answer: 'Ji haan', 'Haan zaroor' (yes, of course), or 'Abhi nahin, shukriya' (not now, thanks).",
    },
    tags: ["food", "essential", "hospitality"],
  },
  {
    type: "PHRASE",
    front: { text: "I'm full / enough food" },
    back: {
      text: "बस, बहुत हो गया",
      transliteration: "Bas, bahut ho gaya",
      explanation:
        "'Bas' = enough/stop. Important because hosts keep serving! You may need to say it multiple times.",
    },
    tags: ["food", "essential", "survival"],
  },
  {
    type: "PHRASE",
    front: { text: "A little more / Just a little" },
    back: {
      text: "थोड़ा और",
      transliteration: "Thoda aur",
      explanation: "'Thoda' = a little. 'Aur' = more. Very useful combo.",
    },
    tags: ["food", "essential"],
  },
  {
    type: "VOCABULARY",
    front: { text: "Bread (flatbread)" },
    back: {
      text: "रोटी / चपाती",
      transliteration: "Roti / Chapati",
      explanation: "Staple bread. 'Ek aur roti?' (One more roti?) — you'll hear this a lot.",
    },
    tags: ["food", "vocabulary", "essential"],
  },
  {
    type: "VOCABULARY",
    front: { text: "Lentil curry" },
    back: {
      text: "दाल",
      transliteration: "Daal",
      explanation: "Staple dish served with rice or roti. Many varieties.",
    },
    tags: ["food", "vocabulary", "essential"],
  },
  {
    type: "VOCABULARY",
    front: { text: "Rice" },
    back: {
      text: "चावल",
      transliteration: "Chawal",
      explanation: "Staple grain. 'Daal-chawal' (lentils and rice) is comfort food.",
    },
    tags: ["food", "vocabulary"],
  },
  {
    type: "PHRASE",
    front: { text: "It's a bit spicy" },
    back: {
      text: "थोड़ा तीखा है",
      transliteration: "Thoda teekha hai",
      explanation:
        "Useful if food is too spicy for you. Say it gently — no one wants to hear their food criticized!",
    },
    tags: ["food", "useful", "honest"],
  },
  {
    type: "PHRASE",
    front: { text: "Can I help in the kitchen?" },
    back: {
      text: "क्या मैं किचन में मदद करूँ?",
      transliteration: "Kya main kitchen mein madad karoon?",
      explanation: "Great way to bond with family. They may refuse but will appreciate the offer.",
    },
    tags: ["food", "family", "hospitality"],
  },
];
