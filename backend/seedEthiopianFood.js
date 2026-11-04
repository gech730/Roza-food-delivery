import mongoose from "mongoose";
import dotenv from "dotenv";
import foodModel from "./models/foodModel.js";

dotenv.config();

const menuItems = [
    { name: "Shiro Wat", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736790/roza_food/foods/food_1_1793736792123.png", price: 150, description: "Rich fasting-style chickpea stew with berbere spices.", category: "Fasting Foods" },
    { name: "Misir Wat", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736803/roza_food/foods/food_2_1793736805150.png", price: 180, description: "Classic red lentil stew, slow simmered.", category: "Fasting Foods" },
    { name: "Atkilt Wat", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736813/roza_food/foods/food_3_1793736815668.png", price: 160, description: "Cabbage, carrots and potatoes stewed until tender.", category: "Fasting Foods" },
    { name: "Beyaynetu", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736818/roza_food/foods/food_4_1793736819753.png", price: 250, description: "Mixed fasting platter served on injera.", category: "Fasting Foods" },

    { name: "Doro Wat", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736819/roza_food/foods/food_5_1793736820899.png", price: 550, description: "Spicy chicken stew with hardboiled eggs and injera.", category: "Meat Dishes" },
    { name: "Kitfo", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736819/roza_food/foods/food_6_1793736821700.png", price: 600, description: "Minced seasoned beef tartare served with cottage cheese.", category: "Meat Dishes" },
    { name: "Tibs", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736821/roza_food/foods/food_7_1793736822842.png", price: 450, description: "Sautéed lamb cubes with peppers and onions.", category: "Meat Dishes" },
    { name: "Gomen Be Siga", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736821/roza_food/foods/food_8_1793736823615.png", price: 350, description: "Collard greens sautéed with beef.", category: "Meat Dishes" },

    { name: "Ful", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736822/roza_food/foods/food_9_1793736824518.png", price: 120, description: "Seasoned mashed fava beans topped with garnish.", category: "Breakfast" },
    { name: "Scrambled Eggs", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736792/roza_food/foods/food_10_1793736793125.png", price: 150, description: "Eggs scrambled and served with fresh bread.", category: "Breakfast" },
    { name: "Chechebsa", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736793/roza_food/foods/food_11_1793736794807.png", price: 180, description: "Torn flatbread sautéed with spiced butter.", category: "Breakfast" },
    { name: "Meat Firfir", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736794/roza_food/foods/food_12_1793736795923.png", price: 250, description: "Injera mixed with spiced beef sauté.", category: "Breakfast" },

    { name: "Ethiopian Coffee", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736795/roza_food/foods/food_13_1793736797527.png", price: 30, description: "Traditional coffee ceremony espresso.", category: "Hot Drinks" },
    { name: "Macchiato", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736797/roza_food/foods/food_14_1793736798711.png", price: 40, description: "Layered Ethiopian-style macchiato.", category: "Hot Drinks" },
    { name: "Spiced Tea", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736799/roza_food/foods/food_15_1793736800864.png", price: 20, description: "Black tea steeped with cloves and cinnamon.", category: "Hot Drinks" },
    { name: "Hot Milk", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736800/roza_food/foods/food_16_1793736801737.png", price: 50, description: "Steamed milk, lightly sweetened.", category: "Hot Drinks" },

    { name: "Ambo Water", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736800/roza_food/foods/food_17_1793736802677.png", price: 40, description: "Sparkling mineral water.", category: "Cold Drinks" },
    { name: "Coca-Cola", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736801/roza_food/foods/food_18_1793736803505.png", price: 40, description: "Chilled soda.", category: "Cold Drinks" },
    { name: "Sprite", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736802/roza_food/foods/food_19_1793736804337.png", price: 40, description: "Chilled citrus soda.", category: "Cold Drinks" },
    { name: "Bottled Water", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736804/roza_food/foods/food_20_1793736806135.png", price: 25, description: "Still bottled drinking water.", category: "Cold Drinks" },

    { name: "Tej", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736805/roza_food/foods/food_21_1793736807154.png", price: 150, description: "Honey wine, lightly effervescent.", category: "Traditional Drinks" },
    { name: "Tella", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736806/roza_food/foods/food_22_1793736808167.png", price: 50, description: "Home-style barley beer.", category: "Traditional Drinks" },
    { name: "Areke", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736807/roza_food/foods/food_23_1793736809718.png", price: 100, description: "Clear spirit distilled from grains.", category: "Traditional Drinks" },
    { name: "Borde", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736808/roza_food/foods/food_24_1793736810547.png", price: 60, description: "Fermented traditional sprouted grain drink.", category: "Traditional Drinks" },

    { name: "Sambusa", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736809/roza_food/foods/food_25_1793736811425.png", price: 20, description: "Crisp pastries filled with lentil stuffing.", category: "Snacks" },
    { name: "Festive Bread Loaf", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736810/roza_food/foods/food_26_1793736812314.png", price: 150, description: "Soft round bread loaf baked until golden.", category: "Snacks" },
    { name: "Cookies", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736811/roza_food/foods/food_27_1793736813126.png", price: 80, description: "Buttery bakery cookies.", category: "Snacks" },
    { name: "Chocolate Cake", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736812/roza_food/foods/food_28_1793736813924.png", price: 120, description: "Moist layered chocolate dessert.", category: "Snacks" },

    { name: "Vegetable Pasta", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736813/roza_food/foods/food_29_1793736814771.png", price: 200, description: "Pasta tossed with seasonal vegetables.", category: "Pasta & Macaroni" },
    { name: "Macaroni with Meat", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736814/roza_food/foods/food_30_1793736816587.png", price: 250, description: "Baked macaroni with seasoned meat sauce.", category: "Pasta & Macaroni" },
    { name: "Pasta with Meat", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736815/roza_food/foods/food_31_1793736817658.png", price: 280, description: "Ribbon pasta with rich beef sauce.", category: "Pasta & Macaroni" },
    { name: "Vegetable Macaroni", image: "https://res.cloudinary.com/duwz0a15i/image/upload/v1793736817/roza_food/foods/food_32_1793736818856.png", price: 200, description: "Macaroni casserole with veggies.", category: "Pasta & Macaroni" }
];

const seedEthiopianFood = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    console.log("Clearing existing food items...");
    await foodModel.deleteMany({});

    console.log("Inserting menu items...");
    await foodModel.insertMany(menuItems);

    console.log("Menu successfully seeded!");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding menu:", error);
    process.exit(1);
  }
};

seedEthiopianFood();
