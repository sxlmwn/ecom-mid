export type CategorySlug =
  | "breakfast"
  | "lunch"
  | "fast-food"
  | "beverages"
  | "stationery"
  | "desserts";

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  iconName: "Coffee" | "UtensilsCrossed" | "Flame" | "CupSoda" | "BookOpen" | "Cake";
  accentColor: string;
  route: string;
}

export const categories: Category[] = [
  {
    slug: "breakfast",
    name: "Breakfast",
    tagline: "Morning parathas, hot chai & fresh bakery items to kickstart lectures",
    iconName: "Coffee",
    accentColor: "#E67E22", // warm orange
    route: "/breakfast",
  },
  {
    slug: "lunch",
    name: "Lunch",
    tagline: "Hearty biryani, daily curries, and balanced student meal platters",
    iconName: "UtensilsCrossed",
    accentColor: "#5B8C5A", // fresh green
    route: "/lunch",
  },
  {
    slug: "fast-food",
    name: "Fast Food",
    tagline: "Crispy burgers, loaded fries & rolls ready between class intervals",
    iconName: "Flame",
    accentColor: "#D35400", // deep warm orange
    route: "/fast-food",
  },
  {
    slug: "beverages",
    name: "Beverages",
    tagline: "Espresso coffees, chilled lemonades, shakes & signature chai",
    iconName: "CupSoda",
    accentColor: "#4B2E20", // coffee brown
    route: "/beverages",
  },
  {
    slug: "desserts",
    name: "Desserts & Bakery",
    tagline: "Freshly baked brownies, artisan cakes, donuts & chilled ice creams",
    iconName: "Cake",
    accentColor: "#9C4149", // berry chocolate
    route: "/desserts",
  },
  {
    slug: "stationery",
    name: "Stationery",
    tagline: "Exam notebooks, lab manuals, pens & calculators at Counter #1",
    iconName: "BookOpen",
    accentColor: "#7A5230", // warm leather/tan
    route: "/stationery",
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);
