import mongoose from "mongoose";
import dotenv from "dotenv";
import foodModel from "./models/foodModel.js";

dotenv.config();

const ethiopianFoods = [
    { name: "ሽሮ ወጥ", image: "food_1.png", price: 150, description: "ጣፋጭ የጾም ሽሮ ወጥ", category: "የጾም ምግቦች" },
    { name: "ምስር ወጥ", image: "food_2.png", price: 180, description: "ባህላዊ የምስር ወጥ", category: "የጾም ምግቦች" },
    { name: "አታክልት ወጥ", image: "food_3.png", price: 160, description: "ትኩስ አታክልት ወጥ", category: "የጾም ምግቦች" },
    { name: "በየአይነቱ", image: "food_4.png", price: 250, description: "ልዩ የጾም በየአይነቱ", category: "የጾም ምግቦች" },
    
    { name: "ዶሮ ወጥ", image: "food_5.png", price: 550, description: "ባህላዊ የዶሮ ወጥ ከእንቁላል ጋር", category: "የፍስክ ምግቦች" },
    { name: "ክትፎ", image: "food_6.png", price: 600, description: "ልዩ የጉራጌ ክትፎ ከቆጮ ጋር", category: "የፍስክ ምግቦች" },
    { name: "ጥብስ", image: "food_7.png", price: 450, description: "የበግ ጥብስ", category: "የፍስክ ምግቦች" },
    { name: "ጎመን በስጋ", image: "food_8.png", price: 350, description: "ጎመን በስጋ ወጥ", category: "የፍስክ ምግቦች" },
    
    { name: "ፉል", image: "food_9.png", price: 120, description: "ልዩ የፆም ፉል", category: "ቁርስ" },
    { name: "እንቁላል ፍርፍር", image: "food_10.png", price: 150, description: "እንቁላል ፍርፍር በዳቦ", category: "ቁርስ" },
    { name: "ጨጨብሳ", image: "food_11.png", price: 180, description: "ልዩ የቅቤ ጨጨብሳ", category: "ቁርስ" },
    { name: "ስጋ ፍርፍር", image: "food_12.png", price: 250, description: "የስጋ ፍርፍር", category: "ቁርስ" },
    
    { name: "ቡና", image: "food_13.png", price: 30, description: "የሀበሻ ቡና", category: "ትኩስ መጠጥ" },
    { name: "ማኪያቶ", image: "food_14.png", price: 40, description: "ማኪያቶ", category: "ትኩስ መጠጥ" },
    { name: "ሻይ", image: "food_15.png", price: 20, description: "የቅመም ሻይ", category: "ትኩስ መጠጥ" },
    { name: "ወተት", image: "food_16.png", price: 50, description: "ትኩስ ወተት", category: "ትኩስ መጠጥ" },
    
    { name: "አምቦ ውሃ", image: "food_17.png", price: 40, description: "አምቦ ውሃ", category: "ቀዝቃዛ መጠጥ" },
    { name: "ኮካ ኮላ", image: "food_18.png", price: 40, description: "ለስላሳ", category: "ቀዝቃዛ መጠጥ" },
    { name: "ስፕራይት", image: "food_19.png", price: 40, description: "ለስላሳ", category: "ቀዝቃዛ መጠጥ" },
    { name: "የታሸገ ውሃ", image: "food_20.png", price: 25, description: "የታሸገ ውሃ", category: "ቀዝቃዛ መጠጥ" },
    
    { name: "ጠጅ", image: "food_21.png", price: 150, description: "ባህላዊ ጠጅ", category: "ባህላዊ መጠጥ" },
    { name: "ጠላ", image: "food_22.png", price: 50, description: "ባህላዊ ጠላ", category: "ባህላዊ መጠጥ" },
    { name: "አረቄ", image: "food_23.png", price: 100, description: "ንፁህ አረቄ", category: "ባህላዊ መጠጥ" },
    { name: "ቦርዴ", image: "food_24.png", price: 60, description: "ባህላዊ ቦርዴ", category: "ባህላዊ መጠጥ" },
    
    { name: "ሳምቡሳ", image: "food_25.png", price: 20, description: "የምስር ሳምቡሳ", category: "መክሰስ" },
    { name: "ፋሲካ ዳቦ", image: "food_26.png", price: 150, description: "ሙሉ ዳቦ", category: "መክሰስ" },
    { name: "ኩኪስ", image: "food_27.png", price: 80, description: "ጣፋጭ ኩኪስ", category: "መክሰስ" },
    { name: "ኬክ", image: "food_28.png", price: 120, description: "የቸኮሌት ኬክ", category: "መክሰስ" },
    
    { name: "ፓስታ በአትክልት", image: "food_29.png", price: 200, description: "የፆም ፓስታ", category: "ፓስታና ማካሮኒ" },
    { name: "ማካሮኒ በስጋ", image: "food_30.png", price: 250, description: "ማካሮኒ በስጋ", category: "ፓስታና ማካሮኒ" },
    { name: "ፓስታ በስጋ", image: "food_31.png", price: 280, description: "ፓስታ በስጋ", category: "ፓስታና ማካሮኒ" },
    { name: "ማካሮኒ በአትክልት", image: "food_32.png", price: 200, description: "የፆም ማካሮኒ", category: "ፓስታና ማካሮኒ" }
];

const seedEthiopianFood = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    console.log("Clearing existing food items...");
    await foodModel.deleteMany({});

    console.log("Inserting Ethiopian food items...");
    await foodModel.insertMany(ethiopianFoods);

    console.log("Ethiopian food menu successfully seeded!");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding Ethiopian food:", error);
    process.exit(1);
  }
};

seedEthiopianFood();
