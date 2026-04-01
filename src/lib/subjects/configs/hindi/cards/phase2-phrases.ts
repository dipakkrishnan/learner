import type { CardTemplate } from "@/types/subject";

export const phraseCards: CardTemplate[] = [
  {
    type: "PHRASE",
    front: { text: "What's up? / How's it going?" },
    back: {
      text: "क्या हाल है?",
      transliteration: "Kya haal hai?",
      explanation: "Casual 'how are you'. Works with everyone.",
    },
    tags: ["phrase", "casual", "greeting"],
  },
  {
    type: "PHRASE",
    front: { text: "What are you doing?" },
    back: {
      text: "क्या कर रहे हो?",
      transliteration: "Kya kar rahe ho?",
      explanation:
        "Casual form. For respectful: 'Aap kya kar rahe hain?' (आप क्या कर रहे हैं?)",
    },
    tags: ["phrase", "casual", "question"],
  },
  {
    type: "PHRASE",
    front: { text: "I don't understand" },
    back: {
      text: "मुझे समझ नहीं आया",
      transliteration: "Mujhe samajh nahin aaya",
      explanation: "Very useful! People will then try to explain more simply.",
    },
    tags: ["phrase", "essential", "survival"],
  },
  {
    type: "PHRASE",
    front: { text: "Please speak slowly" },
    back: {
      text: "धीरे बोलिए",
      transliteration: "Dheere boliye",
      explanation:
        "Ask people to slow down. 'Boliye' is respectful form of 'speak'.",
    },
    tags: ["phrase", "essential", "survival"],
  },
  {
    type: "PHRASE",
    front: { text: "What is this called in Hindi?" },
    back: {
      text: "इसे हिंदी में क्या कहते हैं?",
      transliteration: "Ise Hindi mein kya kehte hain?",
      explanation: "Great for learning on the go! Point at things and ask.",
    },
    tags: ["phrase", "essential", "learning"],
  },
  {
    type: "PHRASE",
    front: { text: "I'm learning Hindi" },
    back: {
      text: "मैं हिंदी सीख रहा/रही हूँ",
      transliteration: "Main Hindi seekh raha/rahi hoon",
      explanation:
        "'Raha' for males, 'rahi' for females. People love hearing this!",
    },
    tags: ["phrase", "essential", "learning"],
  },
  {
    type: "PHRASE",
    front: { text: "One minute / Wait a moment" },
    back: {
      text: "एक मिनट / रुकिए",
      transliteration: "Ek minute / Rukiye",
      explanation: "'Ek minute' uses the English word — totally normal in Hindi.",
    },
    tags: ["phrase", "casual", "essential"],
  },
  {
    type: "PHRASE",
    front: { text: "Let's go" },
    back: {
      text: "चलो / चलिए",
      transliteration: "Chalo / Chaliye",
      explanation:
        "'Chalo' is casual (friends/peers). 'Chaliye' is respectful (elders).",
    },
    tags: ["phrase", "casual", "essential"],
  },
];
