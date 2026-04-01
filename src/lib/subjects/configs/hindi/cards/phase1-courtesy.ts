import type { CardTemplate } from "@/types/subject";

export const courtesyCards: CardTemplate[] = [
  {
    type: "PHRASE",
    front: { text: "Thank you" },
    back: {
      text: "धन्यवाद / शुक्रिया",
      transliteration: "Dhanyavaad / Shukriya",
      explanation:
        "Dhanyavaad is more formal (Hindi), Shukriya is Urdu-origin and casual. Both work.",
    },
    tags: ["courtesy", "essential"],
  },
  {
    type: "PHRASE",
    front: { text: "Please / Excuse me" },
    back: {
      text: "प्लीज़ / माफ़ कीजिए",
      transliteration: "Please / Maaf kijiye",
      explanation:
        "'Please' in English is extremely common in Hinglish. 'Maaf kijiye' is still useful for polite interruption or apology.",
    },
    tags: ["courtesy", "essential", "casual"],
  },
  {
    type: "PHRASE",
    front: { text: "Yes / No (respectful)" },
    back: {
      text: "जी हाँ / जी नहीं",
      transliteration: "Ji haan / Ji nahin",
      explanation:
        "'Ji' softens your tone and sounds respectful. Very useful with parents and in-laws.",
    },
    tags: ["courtesy", "essential", "casual"],
  },
  {
    type: "PHRASE",
    front: { text: "It's no problem / Don't worry" },
    back: {
      text: "कोई बात नहीं",
      transliteration: "Koi baat nahin",
      explanation:
        "Literally 'no matter'. Used to say 'it's okay', 'no worries', 'don't mention it'.",
    },
    tags: ["courtesy", "essential", "casual"],
  },
  {
    type: "PHRASE",
    front: { text: "Please sit down" },
    back: {
      text: "बैठिए",
      transliteration: "Baithiye",
      explanation: "Respectful form of 'sit'. Use when welcoming guests.",
      examples: ["आइए, बैठिए (Aaiye, baithiye) — Come, sit down"],
    },
    tags: ["courtesy", "hospitality", "essential"],
  },
  {
    type: "PHRASE",
    front: { text: "Sorry / Forgive me" },
    back: {
      text: "माफ़ कीजिए",
      transliteration: "Maaf kijiye",
      explanation:
        "Respectful apology. For casual: 'Sorry' (English word used commonly in Hindi).",
    },
    tags: ["courtesy", "essential"],
  },
  {
    type: "PHRASE",
    front: { text: "Please have some water" },
    back: {
      text: "पानी लीजिए",
      transliteration: "Paani lijiye",
      explanation:
        "Offering water is basic hospitality in Indian homes. 'Lijiye' = please take (respectful).",
    },
    tags: ["courtesy", "hospitality", "essential"],
  },
];
