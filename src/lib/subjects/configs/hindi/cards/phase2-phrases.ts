import type { CardTemplate } from "@/types/subject";

export const phraseCards: CardTemplate[] = [
  {
    type: "PHRASE",
    front: { text: "What's up? / How's it going?" },
    back: {
      text: "क्या हाल है?",
      transliteration: "Kya haal hai?",
      explanation: "Casual version of 'Aap kaise hain?' from Phase 1. Less formal, works with everyone — friends, cousins, siblings.",
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
      text: "मैं हिंदी सीख रहा हूँ",
      transliteration: "Main Hindi seekh raha hoon",
      explanation:
        "Male speaker form. People usually light up when they hear this.",
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
  {
    type: "VOCABULARY",
    front: { text: "Numbers 1–5" },
    back: {
      text: "एक, दो, तीन, चार, पाँच",
      transliteration: "Ek, do, teen, chaar, paanch",
      explanation:
        "Essential for 'ek aur roti' (one more roti), 'do minute' (two minutes), 'teen baje' (3 o'clock).",
    },
    tags: ["numbers", "essential", "vocabulary"],
  },
  {
    type: "VOCABULARY",
    front: { text: "Numbers 6–10" },
    back: {
      text: "छह, सात, आठ, नौ, दस",
      transliteration: "Chhah, saat, aath, nau, das",
      explanation:
        "Beyond 10, people often switch to English numbers in casual Hinglish. These 10 cover most everyday needs.",
    },
    tags: ["numbers", "essential", "vocabulary"],
  },
  {
    type: "PHRASE",
    front: { text: "Where is the bathroom?" },
    back: {
      text: "बाथरूम कहाँ है?",
      transliteration: "Bathroom kahaan hai?",
      explanation:
        "'Bathroom' in English is standard — nobody says the Hindi equivalent in real life. 'Kahaan hai' = where is.",
    },
    tags: ["phrase", "essential", "survival"],
  },
  {
    type: "PHRASE",
    front: { text: "I'll be right back" },
    back: {
      text: "मैं अभी आता हूँ",
      transliteration: "Main abhi aata hoon",
      explanation:
        "Literally 'I come right now' — means 'be right back'. Male speaker form. Very common when stepping away briefly.",
    },
    tags: ["phrase", "essential", "casual"],
  },
  {
    type: "PHRASE",
    front: { text: "How much does this cost?" },
    back: {
      text: "यह कितने का है?",
      transliteration: "Yeh kitne ka hai?",
      explanation:
        "Essential for shopping, autos, street food. Expect the answer in a mix of Hindi and English numbers.",
    },
    tags: ["phrase", "essential", "practical"],
  },
];
