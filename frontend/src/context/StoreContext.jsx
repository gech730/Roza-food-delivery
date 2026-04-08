import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [food_list, setFood_list] = useState([]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const fetchFoodList = async () => {
    try {
      const res = await axios.get(`${url}/api/food/get`);
      if (res.data.success) {
        setFood_list(res.data.data);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  const loadCartData = async (authToken) => {
    if (authToken) {
      try {
        const res = await axios.get(`${url}/api/cart/get`, {
          headers: { token: authToken },
        });
        if (res.data.success) {
          setCartItems(res.data.cartData);
        }
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }
  };

  const loadUserProfile = async (authToken) => {
    if (authToken) {
      try {
        const res = await axios.get(`${url}/api/user/profile`, {
          headers: { token: authToken },
        });
        if (res.data.success) {
          setUserInfo(res.data.data);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    }
  };

 // Initial data load on component mount
  useEffect(() => {
    const loadPage = async () => {
      await fetchFoodList();
      const storedCart = localStorage.getItem("cartItems");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }

      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
        await loadUserProfile(storedToken);
      }
    };

    loadPage();
  }, []);


  const addToCart = async (itemId) => {
    if(!token){
      return alert("please sign in first");
    }
    
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

      try {
        await axios.post(`${url}/api/cart/add`,
          { itemId },
          { headers: { token } },
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    
  };
  
  const removeFromCart = async (itemId) => {

    if (token) {
       setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
      try {
        await axios.delete(`${url}/api/cart/remove`, {
          data: { itemId },
          headers: { token },
        });
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };
 
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };


  const login = async (email, password) => {
    try {
      const res = await axios.post(`${url}/api/user/login`, {
        email,
        password,
      });
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        await loadCartData(res.data.token);
        await loadUserProfile(res.data.token);
        return { success: true };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };
   
  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${url}/api/user/register`, {
        name,
        email,
        password,
      });
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        await loadCartData(res.data.token);
        await loadUserProfile(res.data.token);
        return { success: true };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };
    

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems");
    setToken("");
    setCartItems({});
    setUserInfo(null);
  };
 
  
  const updateProfile = async (name, email) => {
    try {
      const res = await axios.put(
        `${url}/api/user/profile`,
        { name, email },
        { headers: { token } },
      );
      if (res.data.success) {
        setUserInfo(res.data.data);
        return { success: true, message: res.data.message };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Update failed",
      };
    }
  };


  const updateProfileImage = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("profileImage", imageFile);

      const res = await axios.put(`${url}/api/user/profile`, formData, {
        headers: {
          token,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        setUserInfo(res.data.data);
        return { success: true, message: res.data.message };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Image upload failed",
      };
    }
  };
 

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const res = await axios.put(
        `${url}/api/user/password`,
        { currentPassword, newPassword },
        { headers: { token } },
      );
      return { success: res.data.success, message: res.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Password change failed",
      };
    }
  };


  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    userInfo,
    login,
    register,
    logout,
    updateProfile,
    updateProfileImage,
    changePassword,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
