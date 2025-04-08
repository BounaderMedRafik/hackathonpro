import { AboutUsDataProps, navLinks } from "./types";

export const navigationLinks: navLinks[] = [
  {
    title: "Home",
    link: "#hero",
  },
  {
    title: "About",
    link: "#about",
  },
  {
    title: "Features",
    link: "#features",
  },
  // {
  //   title: "Testimonials",
  //   link: "#testimonials",
  // },
  {
    title: "Join us",
    link: "#join-us",
  },
];

export const useBarLinks: navLinks[] = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Search",
    link: "/search",
  },
];

export const aboutUsData: AboutUsDataProps[] = [
  {
    title: "Stay informed, effortlessly",
    desc: "Get notified of food recalls, quality issues, or safety alerts — all connected to the products you’ve searched.",
  },
  {
    title: "Connect with a trusted community",
    desc: "Join a platform where producers and consumers exchange knowledge, raise concerns, and share healthy food tips.",
  },
  {
    title: "Make smart decisions with AI",
    desc: "Get instant meal ideas and food handling tips based on what you have. Powered by our AI assistant and real-time data.",
  },
];

export const testimonials = [
  {
    quote:
      "Finally, I can check if my food is still safe just by entering a number. So simple yet powerful!",
    name: "Lina K.",
    title: "Working Mom",
  },
  {
    quote:
      "TraceEats gave me confidence in what I eat. I discovered a recalled product before I even opened it.",
    name: "Ahmed R.",
    title: "University Student",
  },
  {
    quote:
      "As a chef, ingredient quality is everything. Now I can trace everything down to the source.",
    name: "Chef Nour E.",
    title: "Restaurant Owner",
  },
  {
    quote:
      "Push notifications for recalls are a game changer. I wish every app did this.",
    name: "Salim T.",
    title: "Grocery Shopper",
  },
  {
    quote:
      "I search my cereal box and found out it was linked to a recall—this app probably saved my stomach.",
    name: "Hiba M.",
    title: "High School Teacher",
  },
  {
    quote:
      "Our small farm now uses TraceEats to prove transparency. Buyers appreciate it and sales went up.",
    name: "Amine D.",
    title: "Local Producer",
  },
];

export const testimonialBottom = [
  {
    quote:
      "I had no idea food could be this traceable. Even got meal ideas based on what I search!",
    name: "Fatima Z.",
    title: "Foodie & Blogger",
  },
  {
    quote: "It feels like having a food safety expert in my pocket.",
    name: "Omar J.",
    title: "New Parent",
  },
  {
    quote:
      "The community section helped me understand how others handle food storage—super helpful.",
    name: "Leila S.",
    title: "Nutrition Student",
  },
  {
    quote:
      "I don’t trust vague expiry dates. This app gave me solid info from the lot number itself.",
    name: "Yassir M.",
    title: "Solo Living",
  },
  {
    quote:
      "The AI chat recommended a recipe from what I had search—amazing and tasty!",
    name: "Rania F.",
    title: "Busy Professional",
  },
  {
    quote:
      "I’ve started searching everything before buying. It’s my new grocery ritual.",
    name: "Karim H.",
    title: "Health-Conscious Shopper",
  },
];

export const features = [
  {
    image: "/search.jpg",
    title: "Enter a Lot Number",
    description:
      "Easily trace any food product by search the lot code with your camera or typing it manually. Get instant access to product history, origin, and safety status.",
  },
  {
    image: "/timeline.jpg",
    title: "Status & Recall Alerts",
    description:
      "Stay updated with real-time notifications about recalls or quality issues related to your search products. Never miss a critical alert.",
  },
  {
    image: "/Community.jpg",
    title: "Community Insights",
    description:
      "Join discussions, share food safety tips, and learn from others. Our community feed keeps you informed, engaged, and empowered.",
  },
];

export const HostServer = "http://10.1.4.152:3000";

export const eventsAvailable = [
  "Shipped",
  "Canned",
  "Harvested",
  "Received",
  "Packed",
  "Processed",
];

export const statusAvilable = ["onHold", "Consumable", "Not consumable"];
