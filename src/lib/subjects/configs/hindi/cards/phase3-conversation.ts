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
  {
    type: "PHRASE",
    front: { text: "Listen... (getting attention)" },
    back: {
      text: "सुनिए / सुनो",
      transliteration: "Suniye / Suno",
      explanation:
        "'Suniye' = respectful (elders, in-laws). 'Suno' = casual (friends, spouse). Natural way to start any conversation. 'Accha suniye...' is very common.",
    },
    tags: ["conversation", "opener", "essential"],
  },
  {
    type: "PHRASE",
    front: { text: "By the way..." },
    back: {
      text: "वैसे...",
      transliteration: "Waise...",
      explanation:
        "Conversational pivot. 'Waise, aapka kaam kaisa chal raha hai?' (By the way, how's your work going?). Very natural topic-changer.",
    },
    tags: ["conversation", "filler", "essential"],
  },
  {
    type: "PHRASE",
    front: { text: "How is your work going?" },
    back: {
      text: "काम कैसा चल रहा है?",
      transliteration: "Kaam kaisa chal raha hai?",
      explanation:
        "Standard conversation topic with family. 'Chal raha hai' = going/ongoing. Reply: 'Theek hai, chal raha hai' (It's fine, going on).",
    },
    tags: ["conversation", "question", "family"],
  },
  {
    type: "PHRASE",
    front: { text: "It's been a long time!" },
    back: {
      text: "बहुत दिन हो गए!",
      transliteration: "Bahut din ho gaye!",
      explanation:
        "Said when you haven't seen someone in a while. Often followed by: 'Kahan the?' (Where were you?) or 'Milke accha laga' (Nice to see you).",
    },
    tags: ["conversation", "greeting", "family"],
  },
  {
    type: "PHRASE",
    front: { text: "Nice to meet you / Good seeing you" },
    back: {
      text: "मिलके अच्छा लगा",
      transliteration: "Milke accha laga",
      explanation:
        "Warm expression when meeting someone or saying goodbye. Very genuine-sounding. Male speaker form.",
    },
    tags: ["conversation", "greeting", "essential"],
  },
  {
    type: "PHRASE",
    front: { text: "What do you think?" },
    back: {
      text: "आपको क्या लगता है?",
      transliteration: "Aapko kya lagta hai?",
      explanation:
        "Great for including elders in conversation. Shows respect by asking their opinion. Casual version: 'Tujhe kya lagta hai?'",
    },
    tags: ["conversation", "question", "respectful"],
  },
  {
    type: "PHRASE",
    front: { text: "That reminds me..." },
    back: {
      text: "हाँ, याद आया...",
      transliteration: "Haan, yaad aaya...",
      explanation:
        "Natural way to bring up a new topic or memory in conversation. 'Yaad' = memory. Very conversational.",
    },
    tags: ["conversation", "filler", "transition"],
  },
  {
    type: "PHRASE",
    front: { text: "I was saying..." },
    back: {
      text: "मैं कह रहा था कि...",
      transliteration: "Main keh raha tha ki...",
      explanation:
        "Getting back to your point after an interruption. Indian conversations are lively — you'll need this!",
    },
    tags: ["conversation", "continuation", "essential"],
  },
  {
    type: "PHRASE",
    front: { text: "Same here / Me too" },
    back: {
      text: "मेरा भी / मुझे भी",
      transliteration: "Mera bhi / Mujhe bhi",
      explanation:
        "'Mera bhi' for possessive (my X too). 'Mujhe bhi' for feelings/wants (I also want/feel). Quick agreement in conversation.",
    },
    tags: ["conversation", "agreement", "casual"],
  },
  {
    type: "PHRASE",
    front: { text: "Isn't that right? (seeking agreement)" },
    back: {
      text: "सही कहा ना?",
      transliteration: "Sahi kaha na?",
      explanation:
        "Rhetorical check — you're stating something and looking for a nod. 'Na' at the end softens it. Very natural in group conversations.",
    },
    tags: ["conversation", "agreement", "filler"],
  },
];
