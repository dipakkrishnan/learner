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
];
