import mongoose from "mongoose";
import dotenv from "dotenv";
import foodModel from "./models/foodModel.js";

dotenv.config();

const menuItems = [
    { name: "Shiro Wat", image: "food_1.png", price: 150, description: "Rich fasting-style chickpea stew with berbere spices.", category: "Fasting Foods" },
    { name: "Misir Wat", image: "food_2.png", price: 180, description: "Classic red lentil stew, slow simmered.", category: "Fasting Foods" },
    { name: "Atkilt Wat", image: "food_3.png", price: 160, description: "Cabbage, carrots and potatoes stewed until tender.", category: "Fasting Foods" },
    { name: "Beyaynetu", image: "food_4.png", price: 250, description: "Mixed fasting platter served on injera.", category: "Fasting Foods" },

    { name: "Doro Wat", image: "food_5.png", price: 550, description: "Spicy chicken stew with hardboiled eggs and injera.", category: "Meat Dishes" },
    { name: "Kitfo", image: "food_6.png", price: 600, description: "Minced seasoned beef tartare served with cottage cheese.", category: "Meat Dishes" },
    { name: "Tibs", image: "food_7.png", price: 450, description: "Sautéed lamb cubes with peppers and onions.", category: "Meat Dishes" },
    { name: "Gomen Be Siga", image: "food_8.png", price: 350, description: "Collard greens sautéed with beef.", category: "Meat Dishes" },

    { name: "Ful", image: "food_9.png", price: 120, description: "Seasoned mashed fava beans topped with garnish.", category: "Breakfast" },
    { name: "Scrambled Eggs", image: "food_10.png", price: 150, description: "Eggs scrambled and served with fresh bread.", category: "Breakfast" },
    { name: "Chechebsa", image: "food_11.png", price: 180, description: "Torn flatbread sautéed with spiced butter.", category: "Breakfast" },
    { name: "Meat Firfir", image: "food_12.png", price: 250, description: "Injera mixed with spiced beef sauté.", category: "Breakfast" },

    { name: "Ethiopian Coffee", image: "food_13.png", price: 30, description: "Traditional coffee ceremony espresso.", category: "Hot Drinks" },
    { name: "Macchiato", image: "food_14.png", price: 40, description: "Layered Ethiopian-style macchiato.", category: "Hot Drinks" },
    { name: "Spiced Tea", image: "food_15.png", price: 20, description: "Black tea steeped with cloves and cinnamon.", category: "Hot Drinks" },
    { name: "Hot Milk", image: "food_16.png", price: 50, description: "Steamed milk, lightly sweetened.", category: "Hot Drinks" },

    { name: "Ambo Water", image: "food_17.png", price: 40, description: "Sparkling mineral water.", category: "Cold Drinks" },
    { name: "Coca-Cola", image: "food_18.png", price: 40, description: "Chilled soda.", category: "Cold Drinks" },
    { name: "Sprite", image: "food_19.png", price: 40, description: "Chilled citrus soda.", category: "Cold Drinks" },
    { name: "Bottled Water", image: "food_20.png", price: 25, description: "Still bottled drinking water.", category: "Cold Drinks" },

    { name: "Tej", image: "food_21.png", price: 150, description: "Honey wine, lightly effervescent.", category: "Traditional Drinks" },
    { name: "Tella", image: "food_22.png", price: 50, description: "Home-style barley beer.", category: "Traditional Drinks" },
    { name: "Areke", image: "food_23.png", price: 100, description: "Clear spirit distilled from grains.", category: "Traditional Drinks" },
    { name: "Borde", image: "food_24.png", price: 60, description: "Fermented traditional sprouted grain drink.", category: "Traditional Drinks" },

    { name: "Sambusa", image: "food_25.png", price: 20, description: "Crisp pastries filled with lentil stuffing.", category: "Snacks" },
    { name: "Festive Bread Loaf", image: "food_26.png", price: 150, description: "Soft round bread loaf baked until golden.", category: "Snacks" },
    { name: "Cookies", image: "food_27.png", price: 80, description: "Buttery bakery cookies.", category: "Snacks" },
    { name: "Chocolate Cake", image: "food_28.png", price: 120, description: "Moist layered chocolate dessert.", category: "Snacks" },

    { name: "Vegetable Pasta", image: "food_29.png", price: 200, description: "Pasta tossed with seasonal vegetables.", category: "Pasta & Macaroni" },
    { name: "Macaroni with Meat", image: "food_30.png", price: 250, description: "Baked macaroni with seasoned meat sauce.", category: "Pasta & Macaroni" },
    { name: "Pasta with Meat", image: "food_31.png", price: 280, description: "Ribbon pasta with rich beef sauce.", category: "Pasta & Macaroni" },
    { name: "Vegetable Macaroni", image: "food_32.png", price: 200, description: "Macaroni casserole with veggies.", category: "Pasta & Macaroni" }
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
