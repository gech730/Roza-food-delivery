import basket_icon from './basket_icon.png'
import logo from './logo.png'
import header_img from './header_img.png'
import search_icon from './search_icon.png'

import food_1 from './food_1.png'
import food_2 from './food_2.png'
import food_3 from './food_3.png'
import food_4 from './food_4.png'
import food_5 from './food_5.png'
import food_6 from './food_6.png'
import food_7 from './food_7.png'
import food_8 from './food_8.png'
import food_9 from './food_9.png'
import food_10 from './food_10.png'
import food_11 from './food_11.png'
import food_12 from './food_12.png'
import food_13 from './food_13.png'
import food_14 from './food_14.png'
import food_15 from './food_15.png'
import food_16 from './food_16.png'
import food_17 from './food_17.png'
import food_18 from './food_18.png'
import food_19 from './food_19.png'
import food_20 from './food_20.png'
import food_21 from './food_21.png'
import food_22 from './food_22.png'
import food_23 from './food_23.png'
import food_24 from './food_24.png'
import food_25 from './food_25.png'
import food_26 from './food_26.png'
import food_27 from './food_27.png'
import food_28 from './food_28.png'
import food_29 from './food_29.png'
import food_30 from './food_30.png'
import food_31 from './food_31.png'
import food_32 from './food_32.png'

import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import app_store from './app_store.png'
import play_store from './play_store.png'
import linkedin_icon from './linkedin_icon.png'
import facebook_icon from './facebook_icon.png'
import twitter_icon from './twitter_icon.png'
import cross_icon from './cross_icon.png'
import selector_icon from './selector_icon.png'
import rating_starts from './rating_starts.png'
import profile_icon from './profile_icon.png'
import bag_icon from './bag_icon.png'
import logout_icon from './logout_icon.png'
import parcel_icon from './parcel_icon.png'
// import upload_icon from './upload_icon.png'
import all_food from './all_food.png'
import non_fasting from './non_fasting.png'
import breakfast from './breakfast.png' 
import hot_drinks from './hot_drinks.png'
import cold_drinks from './cold_drinks.png'
import tradtional_drinking from './traditional_drinking.png'
import dessert from './dessert.png'
import pasta from './pasta.png'
export const assets = {
    logo,
    basket_icon,
    header_img,
    search_icon,
    rating_starts,
    add_icon_green,
    add_icon_white,
    remove_icon_red,
    app_store,
    play_store,
    linkedin_icon,
    facebook_icon,
    twitter_icon,
    cross_icon,
    selector_icon,
    profile_icon,
    logout_icon,
    bag_icon,
    parcel_icon
}

export const menu_list = [
    {
      menu_name: "የጾም ምግቦች",
      menu_image: all_food
    },
    {
      menu_name: "የፍስክ ምግቦች",
      menu_image: non_fasting
    },
    {
      menu_name: "ቁርስ",
      menu_image: breakfast
    },
    {
      menu_name: "ትኩስ መጠጥ",
      menu_image: hot_drinks
    },
    {
      menu_name: "ቀዝቃዛ መጠጥ",
      menu_image: cold_drinks
    },
    {
      menu_name: "ባህላዊ መጠጥ",
      menu_image: tradtional_drinking
    },
    {
      menu_name: "መክሰስ",
      menu_image: dessert
    },
    {
      menu_name: "ፓስታና ማካሮኒ",
      menu_image: pasta
    }
];

export const food_list = [
    { _id: "1", name: "ሽሮ ወጥ", image: food_1, price: 150, description: "ጣፋጭ የጾም ሽሮ ወጥ", category: "የጾም ምግቦች" },
    { _id: "2", name: "ምስር ወጥ", image: food_2, price: 180, description: "ባህላዊ የምስር ወጥ", category: "የጾም ምግቦች" },
    { _id: "3", name: "አታክልት ወጥ", image: food_3, price: 160, description: "ትኩስ አታክልት ወጥ", category: "የጾም ምግቦች" },
    { _id: "4", name: "በየአይነቱ", image: food_4, price: 250, description: "ልዩ የጾም በየአይነቱ", category: "የጾም ምግቦች" },
    
    { _id: "5", name: "ዶሮ ወጥ", image: food_5, price: 550, description: "ባህላዊ የዶሮ ወጥ ከእንቁላል ጋር", category: "የፍስክ ምግቦች" },
    { _id: "6", name: "ክትፎ", image: food_6, price: 600, description: "ልዩ የጉራጌ ክትፎ ከቆጮ ጋር", category: "የፍስክ ምግቦች" },
    { _id: "7", name: "ጥብስ", image: food_7, price: 450, description: "የበግ ጥብስ", category: "የፍስክ ምግቦች" },
    { _id: "8", name: "ጎመን በስጋ", image: food_8, price: 350, description: "ጎመን በስጋ ወጥ", category: "የፍስክ ምግቦች" },
    
    { _id: "9", name: "ፉል", image: food_9, price: 120, description: "ልዩ የፆም ፉል", category: "ቁርስ" },
    { _id: "10", name: "እንቁላል ፍርፍር", image: food_10, price: 150, description: "እንቁላል ፍርፍር በዳቦ", category: "ቁርስ" },
    { _id: "11", name: "ጨጨብሳ", image: food_11, price: 180, description: "ልዩ የቅቤ ጨጨብሳ", category: "ቁርስ" },
    { _id: "12", name: "ስጋ ፍርፍር", image: food_12, price: 250, description: "የስጋ ፍርፍር", category: "ቁርስ" },
    
    { _id: "13", name: "ቡና", image: food_13, price: 30, description: "የሀበሻ ቡና", category: "ትኩስ መጠጥ" },
    { _id: "14", name: "ማኪያቶ", image: food_14, price: 40, description: "ማኪያቶ", category: "ትኩስ መጠጥ" },
    { _id: "15", name: "ሻይ", image: food_15, price: 20, description: "የቅመም ሻይ", category: "ትኩስ መጠጥ" },
    { _id: "16", name: "ወተት", image: food_16, price: 50, description: "ትኩስ ወተት", category: "ትኩስ መጠጥ" },
    
    { _id: "17", name: "አምቦ ውሃ", image: food_17, price: 40, description: "አምቦ ውሃ", category: "ቀዝቃዛ መጠጥ" },
    { _id: "18", name: "ኮካ ኮላ", image: food_18, price: 40, description: "ለስላሳ", category: "ቀዝቃዛ መጠጥ" },
    { _id: "19", name: "ስፕራይት", image: food_19, price: 40, description: "ለስላሳ", category: "ቀዝቃዛ መጠጥ" },
    { _id: "20", name: "የታሸገ ውሃ", image: food_20, price: 25, description: "የታሸገ ውሃ", category: "ቀዝቃዛ መጠጥ" },
    
    { _id: "21", name: "ጠጅ", image: food_21, price: 150, description: "ባህላዊ ጠጅ", category: "ባህላዊ መጠጥ" },
    { _id: "22", name: "ጠላ", image: food_22, price: 50, description: "ባህላዊ ጠላ", category: "ባህላዊ መጠጥ" },
    { _id: "23", name: "አረቄ", image: food_23, price: 100, description: "ንፁህ አረቄ", category: "ባህላዊ መጠጥ" },
    { _id: "24", name: "ቦርዴ", image: food_24, price: 60, description: "ባህላዊ ቦርዴ", category: "ባህላዊ መጠጥ" },
    
    { _id: "25", name: "ሳምቡሳ", image: food_25, price: 20, description: "የምስር ሳምቡሳ", category: "መክሰስ" },
    { _id: "26", name: "ፋሲካ ዳቦ", image: food_26, price: 150, description: "ሙሉ ዳቦ", category: "መክሰስ" },
    { _id: "27", name: "ኩኪስ", image: food_27, price: 80, description: "ጣፋጭ ኩኪስ", category: "መክሰስ" },
    { _id: "28", name: "ኬክ", image: food_28, price: 120, description: "የቸኮሌት ኬክ", category: "መክሰስ" },
    
    { _id: "29", name: "ፓስታ በአትክልት", image: food_29, price: 200, description: "የፆም ፓስታ", category: "ፓስታና ማካሮኒ" },
    { _id: "30", name: "ማካሮኒ በስጋ", image: food_30, price: 250, description: "ማካሮኒ በስጋ", category: "ፓስታና ማካሮኒ" },
    { _id: "31", name: "ፓስታ በስጋ", image: food_31, price: 280, description: "ፓስታ በስጋ", category: "ፓስታና ማካሮኒ" },
    { _id: "32", name: "ማካሮኒ በአትክልት", image: food_32, price: 200, description: "የፆም ማካሮኒ", category: "ፓስታና ማካሮኒ" }
];
