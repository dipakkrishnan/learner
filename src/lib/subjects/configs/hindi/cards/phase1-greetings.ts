import type { CardTemplate } from "@/types/subject";

export const greetingCards: CardTemplate[] = [
  {
    type: "PHRASE",
    front: { text: "Hello / Hi" },
    back: {
      text: "नमस्ते",
      transliteration: "Namaste",
      explanation:
        "Universal greeting. Very safe with family, elders, and first meetings. 'Hello' is also common in Hinglish.",
      examples: ["नमस्ते, आप कैसे हैं? (Namaste, aap kaise hain?)"],
    },
    tags: ["greeting", "essential", "casual"],
  },
  {
    type: "PHRASE",
    front: { text: "How are you?" },
    back: {
      text: "आप कैसे हैं?",
      transliteration: "Aap kaise hain?",
      explanation:
        "Use 'aap' with elders and in-laws. For friends, you'll hear 'Tum kaise ho?' a lot.",
      examples: [
        "तुम कैसे हो? (Tum kaise ho?) — to peers/friends",
      ],
    },
    tags: ["greeting", "essential", "casual"],
  },
  {
    type: "PHRASE",
    front: { text: "I'm fine / I'm good" },
    back: {
      text: "मैं ठीक हूँ",
      transliteration: "Main theek hoon",
      explanation: "Standard reply to 'How are you?'",
      examples: [
        "मैं ठीक हूँ, आप बताइए (Main theek hoon, aap bataiye) — I'm fine, tell me about you",
      ],
    },
    tags: ["greeting", "essential", "response"],
  },
  {
    type: "PHRASE",
    front: { text: "Touch feet / Show respect to elders" },
    back: {
      text: "पैर छूना",
      transliteration: "Pair choona",
      explanation:
        "Touching elders' feet is a sign of deep respect in Indian families. Say 'Namaste' while doing it.",
      examples: [
        "मैं आपके पैर छूता हूँ (Main aapke pair choota hoon)",
      ],
    },
    tags: ["greeting", "cultural", "family"],
  },
  {
    type: "PHRASE",
    front: { text: "Please come in" },
    back: {
      text: "अंदर आइए",
      transliteration: "Andar aaiye",
      explanation: "Welcoming someone into the home — very common phrase.",
      examples: [
        "अंदर आइए, बैठिए (Andar aaiye, baithiye) — Come in, please sit",
      ],
    },
    tags: ["greeting", "hospitality", "essential"],
  },
  {
    type: "PHRASE",
    front: { text: "Goodbye (I'll go now)" },
    back: {
      text: "अच्छा, चलता हूँ",
      transliteration: "Accha, chalta hoon",
      explanation:
        "Casual male goodbye. More natural in family settings than formal 'alvida'.",
      examples: [
        "नमस्ते, अच्छा चलते हैं (Namaste, accha chalte hain) — Bye, we'll take leave",
      ],
    },
    tags: ["greeting", "essential", "departure"],
  },
];
