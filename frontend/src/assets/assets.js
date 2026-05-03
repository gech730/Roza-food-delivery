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
      menu_name: "Fasting Foods",
      menu_image: all_food
    },
    {
      menu_name: "Meat Dishes",
      menu_image: non_fasting
    },
    {
      menu_name: "Breakfast",
      menu_image: breakfast
    },
    {
      menu_name: "Hot Drinks",
      menu_image: hot_drinks
    },
    {
      menu_name: "Cold Drinks",
      menu_image: cold_drinks
    },
    {
      menu_name: "Traditional Drinks",
      menu_image: tradtional_drinking
    },
    {
      menu_name: "Snacks",
      menu_image: dessert
    },
    {
      menu_name: "Pasta & Macaroni",
      menu_image: pasta
    }
];

export const food_list = [
    { _id: "1", name: "Shiro Wat", image: food_1, price: 150, description: "Rich fasting-style chickpea stew with berbere spices.", category: "Fasting Foods" },
    { _id: "2", name: "Misir Wat", image: food_2, price: 180, description: "Classic red lentil stew, slow simmered.", category: "Fasting Foods" },
    { _id: "3", name: "Atkilt Wat", image: food_3, price: 160, description: "Cabbage, carrots and potatoes stewed until tender.", category: "Fasting Foods" },
    { _id: "4", name: "Beyaynetu", image: food_4, price: 250, description: "Mixed fasting platter served on injera.", category: "Fasting Foods" },

    { _id: "5", name: "Doro Wat", image: food_5, price: 550, description: "Spicy chicken stew with hardboiled eggs and injera.", category: "Meat Dishes" },
    { _id: "6", name: "Kitfo", image: food_6, price: 600, description: "Minced seasoned beef tartare served with cottage cheese.", category: "Meat Dishes" },
    { _id: "7", name: "Tibs", image: food_7, price: 450, description: "Sautéed lamb cubes with peppers and onions.", category: "Meat Dishes" },
    { _id: "8", name: "Gomen Be Siga", image: food_8, price: 350, description: "Collard greens sautéed with beef.", category: "Meat Dishes" },

    { _id: "9", name: "Ful", image: food_9, price: 120, description: "Seasoned mashed fava beans topped with garnish.", category: "Breakfast" },
    { _id: "10", name: "Scrambled Eggs", image: food_10, price: 150, description: "Eggs scrambled and served with fresh bread.", category: "Breakfast" },
    { _id: "11", name: "Chechebsa", image: food_11, price: 180, description: "Torn flatbread sautéed with spiced butter.", category: "Breakfast" },
    { _id: "12", name: "Meat Firfir", image: food_12, price: 250, description: "Injera mixed with spiced beef sauté.", category: "Breakfast" },

    { _id: "13", name: "Ethiopian Coffee", image: food_13, price: 30, description: "Traditional coffee ceremony espresso.", category: "Hot Drinks" },
    { _id: "14", name: "Macchiato", image: food_14, price: 40, description: "Layered Ethiopian-style macchiato.", category: "Hot Drinks" },
    { _id: "15", name: "Spiced Tea", image: food_15, price: 20, description: "Black tea steeped with cloves and cinnamon.", category: "Hot Drinks" },
    { _id: "16", name: "Hot Milk", image: food_16, price: 50, description: "Steamed milk, lightly sweetened.", category: "Hot Drinks" },

    { _id: "17", name: "Ambo Water", image: food_17, price: 40, description: "Sparkling mineral water.", category: "Cold Drinks" },
    { _id: "18", name: "Coca-Cola", image: food_18, price: 40, description: "Chilled soda.", category: "Cold Drinks" },
    { _id: "19", name: "Sprite", image: food_19, price: 40, description: "Chilled citrus soda.", category: "Cold Drinks" },
    { _id: "20", name: "Bottled Water", image: food_20, price: 25, description: "Still bottled drinking water.", category: "Cold Drinks" },

    { _id: "21", name: "Tej", image: food_21, price: 150, description: "Honey wine, lightly effervescent.", category: "Traditional Drinks" },
    { _id: "22", name: "Tella", image: food_22, price: 50, description: "Home-style barley beer.", category: "Traditional Drinks" },
    { _id: "23", name: "Areke", image: food_23, price: 100, description: "Clear spirit distilled from grains.", category: "Traditional Drinks" },
    { _id: "24", name: "Borde", image: food_24, price: 60, description: "Fermented traditional sprouted grain drink.", category: "Traditional Drinks" },

    { _id: "25", name: "Sambusa", image: food_25, price: 20, description: "Crisp pastries filled with lentil stuffing.", category: "Snacks" },
    { _id: "26", name: "Festive Bread Loaf", image: food_26, price: 150, description: "Soft round bread loaf baked until golden.", category: "Snacks" },
    { _id: "27", name: "Cookies", image: food_27, price: 80, description: "Buttery bakery cookies.", category: "Snacks" },
    { _id: "28", name: "Chocolate Cake", image: food_28, price: 120, description: "Moist layered chocolate dessert.", category: "Snacks" },

    { _id: "29", name: "Vegetable Pasta", image: food_29, price: 200, description: "Pasta tossed with seasonal vegetables.", category: "Pasta & Macaroni" },
    { _id: "30", name: "Macaroni with Meat", image: food_30, price: 250, description: "Baked macaroni with seasoned meat sauce.", category: "Pasta & Macaroni" },
    { _id: "31", name: "Pasta with Meat", image: food_31, price: 280, description: "Ribbon pasta with rich beef sauce.", category: "Pasta & Macaroni" },
    { _id: "32", name: "Vegetable Macaroni", image: food_32, price: 200, description: "Macaroni casserole with veggies.", category: "Pasta & Macaroni" }
];
