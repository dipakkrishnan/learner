import type { CardTemplate } from "@/types/subject";

export const cultureCards: CardTemplate[] = [
  {
    type: "CULTURAL",
    front: { text: "Happy Diwali!" },
    back: {
      text: "दिवाली की शुभकामनाएँ!",
      transliteration: "Diwali ki shubhkaamnaayein!",
      explanation:
        "Diwali is the biggest festival. Also say: 'Happy Diwali' — English is totally fine too.",
    },
    tags: ["cultural", "festival", "essential"],
  },
  {
    type: "CULTURAL",
    front: { text: "Happy Holi!" },
    back: {
      text: "होली की शुभकामनाएँ!",
      transliteration: "Holi ki shubhkaamnaayein!",
      explanation: "Festival of colors. Also: 'Happy Holi!'",
    },
    tags: ["cultural", "festival"],
  },
  {
    type: "CULTURAL",
    front: { text: "God bless you (elder's blessing)" },
    back: {
      text: "भगवान आपको खुश रखे",
      transliteration: "Bhagwan aapko khush rakhe",
      explanation:
        "Elders say this as a blessing. When you touch feet, they'll bless you. Just accept graciously.",
    },
    tags: ["cultural", "blessing", "family"],
  },
  {
    type: "PHRASE",
    front: { text: "May I take your blessing?" },
    back: {
      text: "आशीर्वाद दीजिए",
      transliteration: "Aashirvaad dijiye",
      explanation:
        "Asking elders for blessing — very respectful. Usually done while touching feet.",
    },
    tags: ["cultural", "respect", "family"],
  },
  {
    type: "PHRASE",
    front: { text: "This is my first time here" },
    back: {
      text: "मैं यहाँ पहली बार आया हूँ",
      transliteration: "Main yahaan pehli baar aaya hoon",
      explanation:
        "Male speaker form. Good, easy icebreaker at family gatherings.",
    },
    tags: ["cultural", "conversation", "introduction"],
  },
  {
    type: "PHRASE",
    front: { text: "Your home is very beautiful" },
    back: {
      text: "आपका घर बहुत सुंदर है",
      transliteration: "Aapka ghar bahut sundar hai",
      explanation: "Complimenting the home — always appreciated by hosts.",
    },
    tags: ["cultural", "compliment", "hospitality"],
  },
  {
    type: "CULTURAL",
    front: { text: "Congratulations! (wedding, baby, achievement)" },
    back: {
      text: "बधाई हो!",
      transliteration: "Badhai ho!",
      explanation:
        "Universal congratulations. Works for weddings, births, promotions, exams — any good news. 'Bahut bahut badhai!' for extra enthusiasm.",
    },
    tags: ["cultural", "celebration", "essential"],
  },
  {
    type: "CULTURAL",
    front: { text: "Get well soon / Take care of your health" },
    back: {
      text: "जल्दी ठीक हो जाइए / अपना ख़्याल रखिए",
      transliteration: "Jaldi theek ho jaiye / Apna khayal rakhiye",
      explanation:
        "'Apna khayal rakhiye' (take care of yourself) is the more common everyday phrase. Said to anyone who's unwell or even just when saying goodbye.",
    },
    tags: ["cultural", "caring", "family"],
  },
  {
    type: "PHRASE",
    front: { text: "You didn't need to do this! (receiving a gift)" },
    back: {
      text: "इसकी क्या ज़रूरत थी!",
      transliteration: "Iski kya zaroorat thi!",
      explanation:
        "Polite deflection when receiving a gift or favor. It's cultural — you say this even when you're thrilled. Always followed by accepting graciously.",
    },
    tags: ["cultural", "hospitality", "polite"],
  },
  {
    type: "PHRASE",
    front: { text: "Come visit us sometime" },
    back: {
      text: "कभी हमारे घर आइए",
      transliteration: "Kabhi hamare ghar aaiye",
      explanation:
        "Standard warm invitation when saying goodbye to family or friends. May or may not be literal — it's a gesture of warmth.",
    },
    tags: ["cultural", "hospitality", "departure"],
  },
];
