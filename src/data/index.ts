import { Facebook, Twitter, Linkedin, Instagram } from "react-feather";

interface SocialLink {
  icon: React.ElementType;
  link: string;
  id: number;
}

export const footerSocialLinks: SocialLink[] = [
  {
    id: 1,
    icon: Facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: 2,
    icon: Twitter,
    link: "https://twitter.com/",
  },
  {
    id: 3,
    icon: Linkedin,
    link: "https://www.linkedin.com/",
  },
  {
    id: 4,
    icon: Instagram,
    link: "https://www.instagram.com/",
  },
];

export const menuItems = [
  {
    id: 1,
    name: {
      en: "Wild Mushroom Arancini",
      ar: "أرانشيني الفطر البري",
    },
    price: 18.0,
    currency: "AED",
    description: {
      en: "Ricotta, goat cheese, beetroot and dateline.",
      ar: "ريكوتا، جبن ماعز، شمندر وتمر.",
    },
    image: "/assets/food-1.png",
  },
  {
    id: 2,
    name: {
      en: "Honey Glazed Salmon",
      ar: "سلمون مزجج بالعسل",
    },
    price: 17.0,
    currency: "AED",
    description: {
      en: "Ricotta, goat cheese, beetroot and dateline.",
      ar: "ريكوتا، جبن ماعز، شمندر وتمر.",
    },
    image: "/assets/food-2.png",
  },
  {
    id: 3,
    name: {
      en: "Truffle Mushroom Risotto",
      ar: "ريزوتو الفطر بالكمأ",
    },
    price: 64.0,
    currency: "AED",
    description: {
      en: "Ricotta, goat cheese, beetroot and dateline.",
      ar: "ريكوتا، جبن ماعز، شمندر وتمر.",
    },
    image: "/assets/food-3.png",
  },
  {
    id: 4,
    name: {
      en: "Mediterranean Quinoa Salad",
      ar: "سلطة الكينوا المتوسطية",
    },
    price: 25.0,
    currency: "AED",
    description: {
      en: "Ricotta, goat cheese, beetroot and dateline.",
      ar: "ريكوتا، جبن ماعز، شمندر وتمر.",
    },
    image: "/assets/food-4.png",
  },
  {
    id: 5,
    name: {
      en: "Braised Short Ribs",
      ar: "أضلاع قصيرة مطهية ببطء",
    },
    price: 18.0,
    currency: "AED",
    description: {
      en: "Ricotta, goat cheese, beetroot and dateline.",
      ar: "ريكوتا، جبن ماعز، شمندر وتمر.",
    },
    image: "/assets/food-5.png",
  },
  {
    id: 6,
    name: {
      en: "Roasted Vegetable Platter",
      ar: "طبق خضروات مشوية",
    },
    price: 85.0,
    currency: "AED",
    description: {
      en: "Ricotta, goat cheese, beetroot and dateline.",
      ar: "ريكوتا، جبن ماعز، شمندر وتمر.",
    },
    image: "/assets/food-6.png",
  },
  {
    id: 7,
    name: {
      en: "Freshly Squeezed Juices",
      ar: "عصائر طازجة معصورة",
    },
    price: 46.0,
    currency: "AED",
    description: {
      en: "Ricotta, goat cheese, beetroot and dateline.",
      ar: "ريكوتا، جبن ماعز، شمندر وتمر.",
    },
    image: "/assets/food-1.png",
  },
  {
    id: 8,
    name: {
      en: "Roasted Vegetable Platter",
      ar: "طبق خضروات مشوية",
    },
    price: 86.0,
    currency: "AED",
    description: {
      en: "Ricotta, goat cheese, beetroot and dateline.",
      ar: "ريكوتا، جبن ماعز، شمندر وتمر.",
    },
    image: "/assets/food-2.png",
  },
];
