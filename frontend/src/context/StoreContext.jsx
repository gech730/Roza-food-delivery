import { createContext, useEffect, useState } from "react";
import axios from 'axios';

/**
 * Store Context
 * Manages global state for food items, cart, and user authentication
 */
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  
  // Cart items state
  const [cartItems, setCartItems] = useState({});
  
  // Authentication token
  const [token, setToken] = useState("");
  
  // User info state
  const [userInfo, setUserInfo] = useState(null);
  
  // Food list state
  const [food_list, setFood_list] = useState([]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  /**
   * Fetch Food List
   * Retrieves all food items from the database
   */
  const fetchFoodList = async () => {
    try {
      const res = await axios.get(`${url}/api/food/get`);
      if (res.data.success) {
        setFood_list(res.data.data);
      } else {
        console.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  /**
   * Load Cart Data
   * Fetches user's cart from the server
   */
  const loadCartData = async (authToken) => {
    if (authToken) {
      try {
        const res = await axios.get(`${url}/api/cart/get`, {
          headers: { token: authToken }
        });
        if (res.data.success) {
          setCartItems(res.data.cartData);
        }
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }
  };

  /**
   * Load User Profile
   * Fetches user profile data from the server
   */
  const loadUserProfile = async (authToken) => {
    if (authToken) {
      try {
        const res = await axios.get(`${url}/api/user/profile`, {
          headers: { token: authToken }
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
      // Fetch food list
      await fetchFoodList();

      // Load cart from localStorage
      const storedCart = localStorage.getItem("cartItems");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }

      // Load token from localStorage
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
        await loadUserProfile(storedToken);
      }
    };
    
    loadPage();
  }, []);

  /**
   * Add Item to Cart
   * Updates local state and syncs with server
   */
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  /**
   * Remove Item from Cart
   * Updates local state and syncs with server
   */
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    
    if (token) {
      try {
        await axios.delete(`${url}/api/cart/remove`, {
          data: { itemId },
          headers: { token }
        });
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  /**
   * Calculate Total Cart Amount
   * Returns the total price of all items in cart
   */
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

  /**
   * User Login
   * Authenticates user and stores token
   */
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${url}/api/user/login`, { email, password });
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
      return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };

  /**
   * User Registration
   * Creates new user account
   */
  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${url}/api/user/register`, { name, email, password });
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
      return { success: false, message: error.response?.data?.message || "Registration failed" };
    }
  };

  /**
   * User Logout
   * Clears user session and cart
   */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems");
    setToken("");
    setCartItems({});
    setUserInfo(null);
  };

  /**
   * Update User Profile
   * Updates user name and/or email
   */
  const updateProfile = async (name, email) => {
    try {
      const res = await axios.put(
        `${url}/api/user/profile`,
        { name, email },
        { headers: { token } }
      );
      if (res.data.success) {
        setUserInfo(res.data.data);
        return { success: true, message: res.data.message };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Update failed" };
    }
  };

  /**
   * Update User Profile Image
   * Uploads and updates user profile picture
   */
  const updateProfileImage = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("profileImage", imageFile);
      
      const res = await axios.put(
        `${url}/api/user/profile`,
        formData,
        { 
          headers: { 
            token,
            "Content-Type": "multipart/form-data"
          } 
        }
      );
      
      if (res.data.success) {
        setUserInfo(res.data.data);
        return { success: true, message: res.data.message };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Image upload failed" };
    }
  };

  /**
   * Change Password
   * Updates user password
   */
  const changePassword = async (currentPassword, newPassword) => {
    try {
      const res = await axios.put(
        `${url}/api/user/password`,
        { currentPassword, newPassword },
        { headers: { token } }
      );
      return { success: res.data.success, message: res.data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Password change failed" };
    }
  };

  // Context value to be provided to components
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
