import { CategorySlug } from "./categories";

export type ProductTag = "veg" | "spicy" | "bestseller" | "new" | "chef-pick";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  price: number; // in PKR
  oldPrice?: number; // for discount badges
  shortDescription: string;
  longDescription: string;
  ingredients: string[]; // For food items; for stationery these represent features
  calories?: number; // For food & drinks
  prepTime: string; // e.g. "10-15 min" or "Ready instantly"
  rating: number; // 4.0 - 4.9
  reviewCount: number;
  tags: ProductTag[];
  stock: number;
  image: string; // URL / path
  gallery?: string[];
}

export const products: Product[] = [
  // ==========================================
  // BREAKFAST (7 Items)
  // ==========================================
  {
    id: "prod-bf-01",
    slug: "halwa-puri-platter",
    name: "Halwa Puri Platter",
    category: "breakfast",
    price: 350,
    shortDescription: "Golden crisp puris served with traditional sooji halwa and spicy chana tarkari.",
    longDescription:
      "A cherished weekend and morning campus favorite. Freshly rolled puris puffed in hot oil, accompanied by aromatic cardamom-infused semolina halwa, spiced chickpeas, and mixed pickle.",
    ingredients: ["Fresh Puris", "Semolina Sooji Halwa", "Spiced Chickpea Curry", "Achar Pickle"],
    calories: 580,
    prepTime: "8-12 min",
    rating: 4.9,
    reviewCount: 142,
    tags: ["bestseller", "veg", "chef-pick"],
    stock: 45,
    image: "", // Graceful gradient fallback (traditional dish without verified Unsplash match)
  },
  {
    id: "prod-bf-02",
    slug: "aloo-paratha-with-chai",
    name: "Aloo Paratha with Chai",
    category: "breakfast",
    price: 250,
    shortDescription: "Flaky whole-wheat flatbread stuffed with spiced potatoes, served with karak chai.",
    longDescription:
      "Comforting Pakistani breakfast perfection. Crispy pan-fried layered paratha packed with cumin and coriander mashed potatoes, served piping hot alongside a cup of freshly brewed doodh patti chai.",
    ingredients: ["Whole Wheat Flour", "Spiced Mashed Potatoes", "Butter", "Karak Milk Tea"],
    calories: 460,
    prepTime: "10-15 min",
    rating: 4.8,
    reviewCount: 198,
    tags: ["bestseller", "veg"],
    stock: 60,
    image: "", // Graceful gradient fallback (traditional dish without verified Unsplash match)
  },
  {
    id: "prod-bf-03",
    slug: "egg-paratha-roll",
    name: "Egg Paratha Roll",
    category: "breakfast",
    price: 220,
    shortDescription: "Fluffy seasoned egg fried over a crisp paratha rolled with sliced onions and mint chutney.",
    longDescription:
      "The quintessential on-the-go morning fuel for busy COMSATS students. A seasoned beaten egg fried right onto a warm paratha, rolled tight with tangy green mint chutney and crispy sliced red onions.",
    ingredients: ["Farm Eggs", "Crispy Paratha", "Mint Chutney", "Red Onions", "Chaat Masala"],
    calories: 390,
    prepTime: "5-8 min",
    rating: 4.6,
    reviewCount: 110,
    tags: ["chef-pick"],
    stock: 50,
    image: "", // Graceful gradient fallback (traditional dish without verified Unsplash match)
  },
  {
    id: "prod-bf-04",
    slug: "masala-omelette-toast",
    name: "Masala Omelette & Toast",
    category: "breakfast",
    price: 200,
    shortDescription: "Two-egg desi omelette with diced chilies, tomatoes, and herbs served with toasted bread.",
    longDescription:
      "A classic morning staple prepared to order. Whisked farm eggs mixed with diced red onions, juicy tomatoes, fresh coriander, and green chilies, pan-fried and paired with golden buttered toast.",
    ingredients: ["2 Fresh Eggs", "Green Chilies", "Tomatoes & Herbs", "Buttered Sourdough Toast"],
    calories: 340,
    prepTime: "5-7 min",
    rating: 4.5,
    reviewCount: 76,
    tags: ["spicy"],
    stock: 40,
    image: "", // Graceful gradient fallback (traditional dish without verified Unsplash match)
  },
  {
    id: "prod-bf-05",
    slug: "honey-pancake-stack",
    name: "Honey Pancake Stack",
    category: "breakfast",
    price: 320,
    oldPrice: 360,
    shortDescription: "Triple-stacked fluffy golden pancakes drizzled with organic honey and churned butter.",
    longDescription:
      "Sweet, cloud-like buttermilk pancakes made fresh daily on the cafe griddle. Layered with pure natural honey, topped with a slab of salted butter, and garnished with fresh seasonal berries.",
    ingredients: ["Buttermilk Batter", "Organic Honey", "Salted Butter", "Fresh Berries"],
    calories: 420,
    prepTime: "8-10 min",
    rating: 4.7,
    reviewCount: 88,
    tags: ["new", "veg"],
    stock: 30,
    image: "/images/products-4k/honey-pancake-stack.webp",
  },
  {
    id: "prod-bf-06",
    slug: "fruit-yogurt-bowl",
    name: "Fruit & Yogurt Bowl",
    category: "breakfast",
    price: 280,
    shortDescription: "Creamy Greek yogurt topped with crunchy oat granola, chia seeds, and fresh seasonal fruit.",
    longDescription:
      "A nourishing, light option to stay alert during morning classes. Thick strained yogurt sweetened lightly with honey, loaded with toasted oat granola, sliced bananas, pomegranate seeds, and chia.",
    ingredients: ["Greek Yogurt", "Artisanal Granola", "Bananas & Pomegranate", "Chia Seeds"],
    calories: 290,
    prepTime: "3-5 min",
    rating: 4.6,
    reviewCount: 64,
    tags: ["veg", "new"],
    stock: 25,
    image: "/images/products-4k/fruit-yogurt-bowl.webp",
  },
  {
    id: "prod-bf-07",
    slug: "cheese-croissant",
    name: "Cheese Croissant",
    category: "breakfast",
    price: 240,
    shortDescription: "Flaky, all-butter French-style croissant filled with melted mature cheddar cheese.",
    longDescription:
      "Baked fresh every morning in our campus ovens. Golden laminations of flaky pastry with rich European butter, stuffed with a gooey, savory cheddar and mozzarella cheese blend.",
    ingredients: ["Laminated Butter Pastry", "Mature Cheddar", "Mozzarella", "Egg Wash"],
    calories: 360,
    prepTime: "3-5 min",
    rating: 4.5,
    reviewCount: 92,
    tags: ["veg"],
    stock: 35,
    image: "/images/products-4k/cheese-croissant.webp",
  },

  // ==========================================
  // LUNCH (7 Items)
  // ==========================================
  {
    id: "prod-ln-01",
    slug: "chicken-biryani",
    name: "Chicken Biryani",
    category: "lunch",
    price: 380,
    oldPrice: 420,
    shortDescription: "Aromatic long-grain basmati rice layered with tender marinated chicken and special spices.",
    longDescription:
      "The undisputed king of campus lunches. Fragrant sella basmati rice layered with juicy bone-in chicken thighs, caramelized onions, saffron, and whole garam masala, served with mint raita and fresh salad.",
    ingredients: ["Aged Basmati Rice", "Tender Chicken", "Saffron & Spices", "Mint Raita"],
    calories: 650,
    prepTime: "5-8 min",
    rating: 4.9,
    reviewCount: 312,
    tags: ["bestseller", "spicy", "chef-pick"],
    stock: 75,
    image: "/images/products-4k/chicken-biryani.webp",
  },
  {
    id: "prod-ln-02",
    slug: "chicken-karahi-plate",
    name: "Chicken Karahi Plate",
    category: "lunch",
    price: 520,
    shortDescription: "Wok-cooked spicy chicken simmered in tomatoes, ginger, green chilies, and black pepper.",
    longDescription:
      "Prepared fresh in high-flame woks. Juicy chicken pieces seared with crushed garlic, juicy ripe tomatoes, shredded ginger, and freshly cracked black pepper. Served with two tandoori naans.",
    ingredients: ["Chicken Cuts", "Roma Tomatoes", "Ginger Juliennes", "Green Chilies", "2 Tandoori Naans"],
    calories: 720,
    prepTime: "15-20 min",
    rating: 4.8,
    reviewCount: 164,
    tags: ["spicy", "chef-pick"],
    stock: 30,
    image: "/images/products-4k/chicken-karahi-plate.webp",
  },
  {
    id: "prod-ln-03",
    slug: "daal-chawal",
    name: "Daal Chawal",
    category: "lunch",
    price: 260,
    shortDescription: "Comforting yellow lentil curry tempered with garlic and cumin over steamed basmati rice.",
    longDescription:
      "Homestyle Pakistani comfort food for hearty weekday lunches. Slow-simmered yellow moong and masoor lentils finished with a fragrant desi ghee tadka of cumin and fried garlic, over fluffy steamed rice.",
    ingredients: ["Moong & Masoor Daal", "Basmati Rice", "Garlic Cumin Tadka", "Kachumber Salad"],
    calories: 480,
    prepTime: "5-7 min",
    rating: 4.7,
    reviewCount: 145,
    tags: ["bestseller", "veg"],
    stock: 65,
    image: "", // Graceful gradient fallback (traditional dish without verified Unsplash match)
  },
  {
    id: "prod-ln-04",
    slug: "chicken-handi-with-roti",
    name: "Chicken Handi with Roti",
    category: "lunch",
    price: 450,
    shortDescription: "Boneless chicken simmered in a velvety cream and yogurt gravy, served with 2 hot rotis.",
    longDescription:
      "Tender boneless chicken morsels slow-cooked in a traditional clay handi style. The sauce combines dairy cream, yogurt, roasted fenugreek leaves, and mild spices. Comes with two whole wheat tandoori rotis.",
    ingredients: ["Boneless Chicken", "Dairy Cream", "Roasted Kasuri Methi", "2 Tandoori Rotis"],
    calories: 610,
    prepTime: "12-15 min",
    rating: 4.7,
    reviewCount: 118,
    tags: ["chef-pick"],
    stock: 40,
    image: "", // Graceful gradient fallback (traditional dish without verified Unsplash match)
  },
  {
    id: "prod-ln-05",
    slug: "beef-pulao",
    name: "Beef Pulao",
    category: "lunch",
    price: 360,
    shortDescription: "Bannu-style spiced beef broth rice with fork-tender beef chunks and fried onions.",
    longDescription:
      "A rich, deeply aromatic pulao cooked in a concentrated bone-marrow stock. Fork-tender chunks of prime beef are paired with long grains of rice that soak up all the natural juices and mild whole spices.",
    ingredients: ["Aged Rice", "Tender Beef Chunks", "Bone Broth Yakhni", "Fried Golden Onions"],
    calories: 670,
    prepTime: "5-8 min",
    rating: 4.8,
    reviewCount: 153,
    tags: ["bestseller"],
    stock: 55,
    image: "", // Graceful gradient fallback (traditional dish without verified Unsplash match)
  },
  {
    id: "prod-ln-06",
    slug: "creamy-chicken-pasta",
    name: "Creamy Chicken Pasta",
    category: "lunch",
    price: 420,
    oldPrice: 480,
    shortDescription: "Penne pasta in a velvety parmesan garlic white sauce with grilled chicken and mushrooms.",
    longDescription:
      "Al dente penne pasta tossed in a luxurious garlic alfredo sauce made from real butter, dairy cream, and shaved parmesan. Topped with sliced Italian-herbed grilled chicken breast and sauteed mushrooms.",
    ingredients: ["Penne Pasta", "Herb-Grilled Chicken", "Parmesan Cream Sauce", "Sliced Mushrooms"],
    calories: 640,
    prepTime: "10-14 min",
    rating: 4.6,
    reviewCount: 96,
    tags: ["new"],
    stock: 35,
    image: "/images/products-4k/creamy-chicken-pasta.webp",
  },
  {
    id: "prod-ln-07",
    slug: "chapli-kebab-plate",
    name: "Chapli Kebab Plate",
    category: "lunch",
    price: 400,
    shortDescription: "Peshawari minced beef patties spiced with pomegranate seeds and coriander, served with naan.",
    longDescription:
      "Authentic Khyber-style pan-fried kebabs with crisp lacy edges and juicy centers. Made from coarsely ground beef mixed with crushed pomegranate anardana, green chilies, tomatoes, and egg.",
    ingredients: ["Minced Beef", "Crushed Anardana", "Green Chilies & Tomatoes", "Tandoori Naan"],
    calories: 590,
    prepTime: "12-15 min",
    rating: 4.8,
    reviewCount: 130,
    tags: ["spicy"],
    stock: 40,
    image: "/images/products-4k/chapli-kebab-plate.webp",
  },

  // ==========================================
  // FAST FOOD (8 Items)
  // ==========================================
  {
    id: "prod-ff-01",
    slug: "zinger-burger",
    name: "Zinger Burger",
    category: "fast-food",
    price: 420,
    oldPrice: 460,
    shortDescription: "Crunchy double-breaded crispy fried chicken thigh in a brioche bun with spicy mayo.",
    longDescription:
      "Our most popular fast food item on campus. Extra-crispy buttermilk battered chicken fillet coated in secret seasoned breading, layered with fresh shredded iceberg lettuce and house spicy chili-garlic mayo.",
    ingredients: ["Crispy Fried Chicken", "Brioche Bun", "Iceberg Lettuce", "Chili-Garlic Mayo"],
    calories: 580,
    prepTime: "8-10 min",
    rating: 4.9,
    reviewCount: 280,
    tags: ["bestseller", "spicy"],
    stock: 80,
    image: "/images/final-web/17-zinger-burger.webp",
    gallery: ["/images/final-web/18-burger-2.webp", "/images/final-web/19-burger-3.webp"],
  },
  {
    id: "prod-ff-02",
    slug: "beef-smash-burger",
    name: "Beef Smash Burger",
    category: "fast-food",
    price: 520,
    shortDescription: "Double smashed prime beef patties with caramelized edges, melted cheese, and secret sauce.",
    longDescription:
      "Griddle-smashed 100% pure beef patties with crispy, caramelized edges. Topped with double American cheese slices, grilled yellow onions, dill pickle slices, and our tangy signature burger sauce.",
    ingredients: ["Double Beef Patties", "American Cheese", "Grilled Onions", "Signature Sauce"],
    calories: 680,
    prepTime: "10-12 min",
    rating: 4.8,
    reviewCount: 142,
    tags: ["chef-pick"],
    stock: 45,
    image: "/images/final-web/16-burger.webp",
    gallery: ["/images/final-web/18-burger-2.webp", "/images/final-web/20-burger-4.webp"],
  },
  {
    id: "prod-ff-03",
    slug: "club-sandwich",
    name: "Club Sandwich",
    category: "fast-food",
    price: 380,
    shortDescription: "Triple-decker toasted sandwich with sliced chicken, fried egg, cheese, and french fries.",
    longDescription:
      "A substantial campus lunch classic. Three layers of toasted white bread stuffed with shredded chicken salad, a fried egg, cheddar cheese slice, cucumber, and tomatoes. Served with a side of crispy salted fries.",
    ingredients: ["Toasted Bread", "Chicken Mayo Filling", "Fried Egg", "Cheese & Side Fries"],
    calories: 520,
    prepTime: "8-10 min",
    rating: 4.6,
    reviewCount: 112,
    tags: ["bestseller"],
    stock: 50,
    image: "/images/products-4k/club-sandwich.webp",
    gallery: ["/images/final-web/20-burger-4.webp"],
  },
  {
    id: "prod-ff-04",
    slug: "loaded-fries",
    name: "Loaded Fries",
    category: "fast-food",
    price: 320,
    shortDescription: "Golden french fries smothered in cheddar cheese sauce, crispy chicken chunks, and jalapenos.",
    longDescription:
      "The ultimate study session sharing bowl. A mountain of crispy potato fries drenched in warm melted cheddar cheese, diced crispy chicken tender bites, sliced spicy jalapenos, and chipotle ranch drizzle.",
    ingredients: ["Crispy Fries", "Cheddar Cheese Sauce", "Chicken Bites", "Jalapenos"],
    calories: 610,
    prepTime: "6-8 min",
    rating: 4.8,
    reviewCount: 220,
    tags: ["bestseller", "spicy"],
    stock: 70,
    image: "/images/products-4k/loaded-fries.webp",
    gallery: ["/images/final-web/19-burger-3.webp"],
  },
  {
    id: "prod-ff-05",
    slug: "chicken-shawarma",
    name: "Chicken Shawarma",
    category: "fast-food",
    price: 300,
    shortDescription: "Spit-roasted spiced chicken wrapped in soft pita bread with Lebanese garlic sauce and pickles.",
    longDescription:
      "Marinated chicken shavings grilled with Lebanese spices, wrapped inside warm flatbread with authentic creamy garlic toum sauce, crunchy pickled cucumbers, and salted french fries tucked inside.",
    ingredients: ["Spiced Roast Chicken", "Warm Pita", "Garlic Toum Sauce", "Pickled Cucumbers"],
    calories: 440,
    prepTime: "5-7 min",
    rating: 4.7,
    reviewCount: 185,
    tags: ["bestseller"],
    stock: 65,
    image: "/images/products-4k/chicken-shawarma.webp",
  },
  {
    id: "prod-ff-06",
    slug: "crispy-wings-6pcs",
    name: "Crispy Wings (6 pcs)",
    category: "fast-food",
    price: 450,
    oldPrice: 500,
    shortDescription: "Half dozen golden fried chicken wings tossed in your choice of spicy buffalo or smokey BBQ.",
    longDescription:
      "Crispy-battered jumbo chicken wings fried until shatteringly crunchy, then tossed vigorously in our house-made spicy cayenne buffalo glaze. Served with cool garlic-herb ranch dipping sauce.",
    ingredients: ["6 Jumbo Chicken Wings", "Spicy Buffalo Sauce", "Garlic Herb Ranch"],
    calories: 490,
    prepTime: "10-12 min",
    rating: 4.7,
    reviewCount: 104,
    tags: ["spicy", "new"],
    stock: 40,
    image: "/images/final-web/30-chicken-wings.webp",
    gallery: ["/images/final-web/31-chicken-wings-2.webp", "/images/final-web/32-chicken-wings-3.webp"],
  },
  {
    id: "prod-ff-07",
    slug: "fajita-pizza-slice",
    name: "Fajita Pizza Slice",
    category: "fast-food",
    price: 280,
    shortDescription: "Jumbo slice of stone-baked pizza topped with fajita chicken, bell peppers, and mozzarella.",
    longDescription:
      "Generous New York style jumbo pizza slice. Hand-stretched dough baked on stone, smothered in zesty tomato sauce, gooey mozzarella cheese, marinated fajita chicken strips, bell peppers, and black olives.",
    ingredients: ["Hand-Stretched Crust", "Mozzarella", "Fajita Chicken", "Peppers & Olives"],
    calories: 380,
    prepTime: "3-5 min",
    rating: 4.5,
    reviewCount: 130,
    tags: ["chef-pick"],
    stock: 45,
    image: "/images/final-web/12-pizza-slice.webp",
    gallery: ["/images/final-web/11-pizza.webp", "/images/final-web/13-pizza-2.webp", "/images/final-web/15-pizza-3.webp"],
  },
  {
    id: "prod-ff-08",
    slug: "chicken-nuggets-8pcs",
    name: "Chicken Nuggets (8 pcs)",
    category: "fast-food",
    price: 350,
    shortDescription: "Eight bite-sized tender all-white-meat chicken nuggets with honey mustard or BBQ dip.",
    longDescription:
      "Crispy, tender, and made from 100% white chicken breast meat in a golden tempura-style crust. Perfect for quick munching between classes, paired with tangy honey mustard and classic ketchup.",
    ingredients: ["White Chicken Breast", "Crispy Batter", "Honey Mustard Dip", "Ketchup"],
    calories: 360,
    prepTime: "6-8 min",
    rating: 4.6,
    reviewCount: 78,
    tags: ["new"],
    stock: 50,
    image: "/images/products-4k/chicken-nuggets-8pcs.webp",
    gallery: ["/images/final-web/31-chicken-wings-2.webp"],
  },

  // ==========================================
  // BEVERAGES (6 Items)
  // ==========================================
  {
    id: "prod-bev-01",
    slug: "cappuccino",
    name: "Cappuccino",
    category: "beverages",
    price: 250,
    shortDescription: "Double shot of rich espresso topped with thick velvety steamed milk foam and cocoa powder.",
    longDescription:
      "Freshly pulled espresso from freshly ground Arabica beans, blended seamlessly with equal parts hot steamed milk and dense micro-foam. Lightly dusted with organic dark cocoa powder.",
    ingredients: ["Arabica Espresso", "Steamed Whole Milk", "Microfoam", "Dutch Cocoa"],
    calories: 120,
    prepTime: "4-6 min",
    rating: 4.8,
    reviewCount: 175,
    tags: ["bestseller", "veg"],
    stock: 90,
    image: "/images/final-web/00-your-cappuccino-4k.webp",
    gallery: ["/images/final-web/23-latte-art.webp", "/images/final-web/22-coffee.webp", "/images/final-web/25-coffee-2.webp"],
  },
  {
    id: "prod-bev-02",
    slug: "iced-latte",
    name: "Iced Latte",
    category: "beverages",
    price: 300,
    shortDescription: "Chilled espresso poured over fresh whole milk and ice with optional vanilla syrup.",
    longDescription:
      "A refreshing campus pick-me-up during warm afternoon study sessions. Double espresso poured slowly over cold milk and crystal ice cubes, creating beautiful marble layers. Naturally smooth and invigorating.",
    ingredients: ["Double Espresso", "Chilled Milk", "Ice Cubes", "Vanilla Touch"],
    calories: 130,
    prepTime: "3-5 min",
    rating: 4.8,
    reviewCount: 160,
    tags: ["bestseller", "veg"],
    stock: 85,
    image: "/images/final-web/27-iced-coffee-2.webp",
    gallery: ["/images/final-web/26-iced-coffee.webp", "/images/final-web/28-iced-coffee-3.webp"],
  },
  {
    id: "prod-bev-03",
    slug: "doodh-patti-chai",
    name: "Doodh Patti Chai",
    category: "beverages",
    price: 100,
    shortDescription: "Traditional slow-brewed strong tea cooked purely in full-fat milk with green cardamom.",
    longDescription:
      "The fuel that powers COMSATS assignments and late study hours. Premium black tea leaves simmered directly in rich whole milk with cracked green cardamom pods and just the right hint of sweetness.",
    ingredients: ["Black Tea Leaves", "Whole Fresh Milk", "Cardamom Pods", "Cane Sugar"],
    calories: 140,
    prepTime: "5-7 min",
    rating: 4.9,
    reviewCount: 380,
    tags: ["bestseller", "veg", "chef-pick"],
    stock: 120,
    image: "/images/final-web/21-chai.webp",
    gallery: ["/images/final-web/24-mocha.webp"],
  },
  {
    id: "prod-bev-04",
    slug: "mint-margarita",
    name: "Mint Margarita",
    category: "beverages",
    price: 200,
    shortDescription: "Zesty crushed mint leaves blended with fresh lime juice, black salt, and sparkling soda.",
    longDescription:
      "An ultra-refreshing mocktail that cleanses the palate and cools you down. Fresh garden mint leaves crushed with freshly squeezed key limes, a dash of kala namak (black salt), sugar syrup, and soda.",
    ingredients: ["Fresh Garden Mint", "Key Lime Juice", "Black Salt", "Sparkling Soda"],
    calories: 90,
    prepTime: "3-5 min",
    rating: 4.7,
    reviewCount: 140,
    tags: ["veg"],
    stock: 70,
    image: "/images/products-4k/mint-margarita.webp",
    gallery: ["/images/final-web/29-iced-cola.webp"],
  },
  {
    id: "prod-bev-05",
    slug: "cold-coffee",
    name: "Cold Coffee",
    category: "beverages",
    price: 280,
    oldPrice: 320,
    shortDescription: "Thick and frothy blended coffee milkshake topped with chocolate syrup drizzle.",
    longDescription:
      "A student-favorite blended beverage. Strong espresso blended vigorously with chilled milk, dairy vanilla cream, and crushed ice until thick and frothy, drizzled with rich chocolate syrup inside the cup.",
    ingredients: ["Espresso Extract", "Chilled Milk", "Vanilla Base", "Chocolate Swirl"],
    calories: 220,
    prepTime: "4-6 min",
    rating: 4.7,
    reviewCount: 125,
    tags: ["bestseller", "veg"],
    stock: 65,
    image: "/images/final-web/26-iced-coffee.webp",
    gallery: ["/images/final-web/27-iced-coffee-2.webp", "/images/final-web/28-iced-coffee-3.webp"],
  },
  {
    id: "prod-bev-06",
    slug: "fresh-orange-juice",
    name: "Fresh Orange Juice",
    category: "beverages",
    price: 220,
    shortDescription: "100% freshly cold-pressed seasonal citrus juice with no added sugar or preservatives.",
    longDescription:
      "Pure, vitamin-C packed goodness. Handpicked seasonal oranges freshly squeezed at our juice counter right before serving. No water, no concentrates, and zero added sugar.",
    ingredients: ["100% Squeezed Oranges", "Crushed Ice (Optional)"],
    calories: 110,
    prepTime: "4-6 min",
    rating: 4.6,
    reviewCount: 82,
    tags: ["veg", "new"],
    stock: 40,
    image: "/images/products-4k/fresh-orange-juice.webp",
  },

  // ==========================================
  // STATIONERY (7 Items)
  // ==========================================
  {
    id: "prod-st-01",
    slug: "a4-notebook-200-pages",
    name: "A4 Notebook (200 pages)",
    category: "stationery",
    price: 220,
    shortDescription: "Durable hardbound ruled notebook with 200 high-grade bleed-resistant pages.",
    longDescription:
      "The quintessential campus lecture notebook. Features 200 smooth 80 GSM acid-free ruled pages that resist ink feathering and bleed-through. Sturdy water-resistant laminated cover built to survive full semesters.",
    ingredients: ["200 Pages (80 GSM)", "Bleed-Resistant Paper", "Hardbound Cover", "Standard Ruled"],
    prepTime: "Ready instantly",
    rating: 4.8,
    reviewCount: 165,
    tags: ["bestseller"],
    stock: 150,
    image: "/images/products/a4-notebook-200-pages.webp",
  },
  {
    id: "prod-st-02",
    slug: "gel-pen-pack-5pcs",
    name: "Gel Pen Pack (5 pcs)",
    category: "stationery",
    price: 150,
    shortDescription: "Pack of 5 quick-dry 0.5mm micro-point gel ink pens in essential exam colors.",
    longDescription:
      "Ultra-smooth writing experience for rapid exam writing and lecture note-taking. Contains 3 Black and 2 Blue gel pens with ergonomic rubber grips and smudge-free quick-drying japanese ink formula.",
    ingredients: ["5 Pens (3 Black, 2 Blue)", "0.5mm Fine Tip", "Rubber Comfort Grip", "Quick-Dry Smudge Free"],
    prepTime: "Ready instantly",
    rating: 4.7,
    reviewCount: 210,
    tags: ["bestseller"],
    stock: 200,
    image: "/images/products/gel-pen-pack-5pcs.webp",
  },
  {
    id: "prod-st-03",
    slug: "highlighter-set-6colors",
    name: "Highlighter Set (6 colors)",
    category: "stationery",
    price: 180,
    shortDescription: "Set of 6 fluorescent chisel-tip highlighters for textbook revision and notes.",
    longDescription:
      "Bright, fade-resistant pastel and neon highlighters. The versatile chisel tip produces both broad 4mm strokes for highlighting text and precise 1mm lines for underlining crucial lecture key points.",
    ingredients: ["6 Fluorescent Colors", "Versatile Chisel Tip", "Water-Based Quick Dry", "Non-Toxic Formula"],
    prepTime: "Ready instantly",
    rating: 4.6,
    reviewCount: 94,
    tags: ["new"],
    stock: 90,
    image: "/images/products/highlighter-set-6colors.webp",
  },
  {
    id: "prod-st-04",
    slug: "spiral-sketchbook",
    name: "Spiral Sketchbook",
    category: "stationery",
    price: 350,
    shortDescription: "Heavyweight 140 GSM blank cartridge paper sketchbook with double-wire binding.",
    longDescription:
      "Designed specifically for architecture, computer science diagrams, and creative sketching. Double-wire brass binding allows the book to lie completely flat on drafting tables without curling.",
    ingredients: ["140 GSM Heavy Cartridge", "60 Blank Sheets", "Twin-Wire Binding", "Protective Matte Cover"],
    prepTime: "Ready instantly",
    rating: 4.8,
    reviewCount: 88,
    tags: ["chef-pick"],
    stock: 60,
    image: "/images/products/spiral-sketchbook.webp",
  },
  {
    id: "prod-st-05",
    slug: "sticky-notes-pack",
    name: "Sticky Notes Pack",
    category: "stationery",
    price: 120,
    shortDescription: "Pack of 4 brightly colored self-adhesive memo pads for book marking and reminders.",
    longDescription:
      "Essential study aid for exam prep and deadline tracking. Premium repositionable adhesive sticks firmly to textbook pages, computer monitors, and dorm desks without leaving messy residue behind.",
    ingredients: ["4 Pads (100 Sheets each)", "Vibrant Neon Colors", "Repositionable Adhesive", "Residue Free"],
    prepTime: "Ready instantly",
    rating: 4.5,
    reviewCount: 110,
    tags: [],
    stock: 140,
    image: "/images/products/sticky-notes-pack.webp",
  },
  {
    id: "prod-st-06",
    slug: "scientific-calculator",
    name: "Scientific Calculator",
    category: "stationery",
    price: 1800,
    oldPrice: 2000,
    shortDescription: "Approved university exam scientific calculator with natural textbook display and 417 functions.",
    longDescription:
      "The definitive tool for COMSATS engineering, mathematics, and computing exams. Features two-line natural textbook display, solar-assisted battery power, and comprehensive matrix, vector, and calculus functions.",
    ingredients: ["417 Scientific Functions", "Natural Textbook Display", "Solar & Battery Powered", "Slide-on Hard Case"],
    prepTime: "Ready instantly",
    rating: 4.9,
    reviewCount: 145,
    tags: ["bestseller", "chef-pick"],
    stock: 35,
    image: "/images/products/scientific-calculator.webp",
  },
  {
    id: "prod-st-07",
    slug: "assignment-file-folder",
    name: "Assignment File Folder",
    category: "stationery",
    price: 200,
    shortDescription: "Heavy-duty clear-view presentation folder with secure fastener for lab and term submissions.",
    longDescription:
      "Keep semester project reports and lab manuals crisp and professional. Made from durable tear-resistant polypropylene with a transparent front window, label pocket, and secure inner two-prong fastener.",
    ingredients: ["Durable Polypropylene", "Two-Prong Metal Clip", "Clear Front Display", "Label Insert Pocket"],
    prepTime: "Ready instantly",
    rating: 4.6,
    reviewCount: 75,
    tags: [],
    stock: 120,
    image: "/images/products/assignment-file-folder.webp",
  },
];

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all" || !category) return products;
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export function getBestsellers(limit = 8): Product[] {
  return products.filter((p) => p.tags.includes("bestseller")).slice(0, limit);
}
