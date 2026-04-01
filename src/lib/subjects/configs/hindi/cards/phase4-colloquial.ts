import type { CardTemplate } from "@/types/subject";

export const colloquialCards: CardTemplate[] = [
  {
    type: "PHRASE",
    front: { text: "Wow! / Amazing!" },
    back: {
      text: "अरे वाह!",
      transliteration: "Are waah!",
      explanation: "Expression of delight and amazement. Very colloquial and fun.",
    },
    tags: ["colloquial", "reaction", "positive"],
  },
  {
    type: "PHRASE",
    front: { text: "Stop it / That's enough" },
    back: {
      text: "बस करो",
      transliteration: "Bas karo",
      explanation: "Casual 'stop'. Can be playful or serious depending on tone.",
    },
    tags: ["colloquial", "casual"],
  },
  {
    type: "PHRASE",
    front: { text: "Come on / Let's go (urging)" },
    back: {
      text: "चलो ना",
      transliteration: "Chalo na",
      explanation:
        "The 'na' at the end adds a pleading/urging tone. Very natural in casual speech.",
    },
    tags: ["colloquial", "casual", "essential"],
  },
  {
    type: "PHRASE",
    front: { text: "What nonsense! / Rubbish!" },
    back: {
      text: "क्या बकवास है!",
      transliteration: "Kya bakwaas hai!",
      explanation:
        "Playful dismissal. Use with friends/peers only, not elders!",
    },
    tags: ["colloquial", "casual", "reaction"],
  },
  {
    type: "PHRASE",
    front: { text: "I'm just kidding" },
    back: {
      text: "मज़ाक कर रहा/रही हूँ",
      transliteration: "Mazaak kar raha/rahi hoon",
      explanation: "Useful after a joke that might be misunderstood.",
    },
    tags: ["colloquial", "humor"],
  },
  {
    type: "PHRASE",
    front: { text: "What to do? / It is what it is" },
    back: {
      text: "क्या करें",
      transliteration: "Kya karein",
      explanation:
        "Philosophical acceptance. Said with a shrug. Very Indian expression.",
    },
    tags: ["colloquial", "philosophical", "casual"],
  },
  {
    type: "PHRASE",
    front: { text: "No worries, it happens" },
    back: {
      text: "चलता है",
      transliteration: "Chalta hai",
      explanation:
        "Literally 'it goes'. Means 'things happen', 'it's fine'. Quintessentially Indian attitude.",
    },
    tags: ["colloquial", "philosophical", "essential"],
  },
  {
    type: "PHRASE",
    front: { text: "Right? / Isn't it?" },
    back: {
      text: "है ना? / ना?",
      transliteration: "Hai na? / Na?",
      explanation:
        "Tag question added to any sentence. 'Mausam accha hai, hai na?' (Weather is nice, right?)",
    },
    tags: ["colloquial", "conversation", "filler"],
  },
  {
    type: "PHRASE",
    front: { text: "I swear! / Seriously!" },
    back: {
      text: "सच में! / कसम से!",
      transliteration: "Sach mein! / Kasam se!",
      explanation:
        "Emphasize truthfulness. 'Kasam se' is more dramatic/colloquial.",
    },
    tags: ["colloquial", "emphasis", "casual"],
  },
  {
    type: "PHRASE",
    front: { text: "Mind-blowing! / Fantastic!" },
    back: {
      text: "ज़बरदस्त!",
      transliteration: "Zabardast!",
      explanation:
        "Strong compliment. Use for food, performances, anything impressive.",
    },
    tags: ["colloquial", "positive", "compliment"],
  },
];
