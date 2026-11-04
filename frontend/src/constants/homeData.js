// Data constants for Roza Fast Food home page sections

export const ABOUT_BADGES = [
  {
    id: 1,
    icon: "🌱",
    title: "Fresh Ingredients",
    desc: "Locally sourced daily produce & prime cuts"
  },
  {
    id: 2,
    icon: "🏺",
    title: "Traditional Recipes",
    desc: "Generations-old blends of berbere & niter kibbeh"
  },
  {
    id: 3,
    icon: "⚡",
    title: "Fast Delivery",
    desc: "Hot, insulated delivery across Addis Ababa"
  },
  {
    id: 4,
    icon: "📍",
    title: "Addis Ababa",
    desc: "Proudly serving Bole, Kazanchis, CMC & beyond"
  }
];

export const SERVICES_LIST = [
  {
    id: "delivery",
    icon: "🛵",
    title: "Doorstep Delivery",
    desc: "Hot, insulated packaging brings sizzling tibs and soft injera straight to your dining table.",
    startingAt: "50 ETB"
  },
  {
    id: "catering",
    icon: "🍲",
    title: "Celebration Catering",
    desc: "Generous traditional buffets with authentic mesob presentation for weddings and graduations.",
    startingAt: "3,500 ETB"
  },
  {
    id: "platters",
    icon: "🍽️",
    title: "Family Platters",
    desc: "Grand Beyaynetu and mixed meat combinations served on giant injera for 4 to 8 people.",
    startingAt: "850 ETB"
  },
  {
    id: "office",
    icon: "💼",
    title: "Office Lunch Delivery",
    desc: "Conveniently packaged individual portions and group meal trays delivered on schedule.",
    startingAt: "250 ETB"
  },
  {
    id: "events",
    icon: "🎉",
    title: "Event & Party Orders",
    desc: "Custom party spreads, finger foods, traditional coffee ceremony setups, and staffing.",
    startingAt: "5,000 ETB"
  },
  {
    id: "fasting",
    icon: "🌿",
    title: "Fasting Specials",
    desc: "100% plant-based shiro, misir wot, atkilt, and gomen prepared with pure vegetable oil.",
    startingAt: "300 ETB"
  }
];

export const TESTIMONIALS_LIST = [
  {
    id: 1,
    name: "Hermela Tesfaye",
    initials: "HT",
    rating: 5,
    dish: "Special Doro Wot with Ayib",
    quote: "The rich berbere flavor reminds me of my grandmother's holiday cooking. It arrived piping hot within 25 minutes. Roza is hands down the best delivery in Addis!"
  },
  {
    id: 2,
    name: "Tewodros Alemu",
    initials: "TA",
    rating: 5,
    dish: "Sizzling Derek Tibs Platter",
    quote: "Ordered the family platter for our Sunday gathering. The meat was remarkably tender, perfectly seasoned with rosemary and awaze, and the injera was ultra-fresh."
  },
  {
    id: 3,
    name: "Selamawit Kebede",
    initials: "SK",
    rating: 5,
    dish: "Ultimate Fasting Beyaynetu",
    quote: "During fasting seasons, finding rich and satisfying vegan Ethiopian food delivered quickly can be tough. Roza's shiro and kik alicha are unmatched in town."
  }
];

export const CONTACT_INFO = {
  address: "Bole Medhanialem, Camen Building, Addis Ababa, Ethiopia",
  phones: ["+251 911 23 45 67", "+251 922 88 99 00"],
  email: "orders@rozafastfood.com",
  hours: "Monday – Sunday: 11:30 AM – 10:30 PM",
  socials: [
    { name: "Telegram", url: "https://t.me", icon: "✈️" },
    { name: "Instagram", url: "https://instagram.com", icon: "📷" },
    { name: "Facebook", url: "https://facebook.com", icon: "🌐" },
    { name: "TikTok", url: "https://tiktok.com", icon: "🎵" }
  ]
};

// Fallback high-quality food images
export const PLACEHOLDER_IMAGES = {
  hero: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=2000&q=85",
  about: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=85",
  dishes: {
    "Injera & Stews": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    "Tibs": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    "Kitfo": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    "Fasting Food": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    "Drinks": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    default: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
  }
};


export const HERO_SLIDES = [
  {
    id: 1,
    title: "Authentic Ethiopian Flavor,",
    accent: "Delivered Fast",
    subtitle: "Savor freshly rolled 100% teff injera, sizzling prime tibs, and aromatic heritage stews delivered hot to your doorstep.",
    tag: "Traditional Addis Feast",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=2000&q=85"
  },
  {
    id: 2,
    title: "Sizzling Derek Tibs,",
    accent: "Straight from the Skillet",
    subtitle: "Tender beef and lamb pan-seared with fresh rosemary, garlic, and hot green chilies with rich awaze dipping sauce.",
    tag: "Sizzling Skillet Specials",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=85"
  },
  {
    id: 3,
    title: "Slow-Simmered Doro Wot,",
    accent: "Generational Spices",
    subtitle: "Rich, aromatic berbere chicken stew simmered slowly for hours with hard-boiled eggs and homemade ayib cheese.",
    tag: "Heritage Holiday Classics",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000&q=85"
  },
  {
    id: 4,
    title: "Pure Vegan Beyaynetu,",
    accent: "Fresh & Colorful",
    subtitle: "A giant fasting combination platter of clay-pot shiro, spicy misir wot, yellow split peas, and braised greens.",
    tag: "100% Fasting-Friendly",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=2000&q=85"
  }
];

export const HERO_TICKER_ITEMS = [
  { icon: "🔥", text: "Sizzling Derek Tibs" },
  { icon: "🍲", text: "Special Doro Wot" },
  { icon: "🌾", text: "100% Teff Injera" },
  { icon: "🥩", text: "Gurage Kitfo & Ayib" },
  { icon: "🌿", text: "Vegan Beyaynetu" },
  { icon: "⚡", text: "Fast 30-Min Delivery" },
  { icon: "🥘", text: "Clay-Pot Shiro Tegabino" },
  { icon: "☕", text: "Fresh Roasted Coffee" }
];
