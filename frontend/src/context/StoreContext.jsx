import { createContext, useEffect, useState } from "react";
import api, { BASE_URL } from "../utils/api";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const labels = {
  nav: {
    home: "Home",
    menu: "Menu",
    all: "All",
    contact: "Contact",
    myOrders: "My Orders",
    signIn: "Sign In",
    profile: "Profile",
    logout: "Logout",
    lightMode: "Light mode",
    darkMode: "Dark mode",
    brandName: "Roza",
    brandSub: "Food Delivery",
  },
  hero: {
    badge: "🇪🇹 Traditional Ethiopian Food",
    titleMain: "Delicious",
    titleAccent: "Ethiopian Meals",
    subtitle:
      "Fresh injera, tibs, kitfo and more — delivered fast to your door. Taste the authentic flavors of Ethiopia.",
    exploreButton: "Browse Menu →",
    ordersButton: "Track Orders",
    stats: [
      { value: "50+", label: "Dish varieties" },
      { value: "4.9★", label: "Rating" },
      { value: "30 min", label: "Fast delivery" },
      { value: "Free", label: "First order" },
    ],
  },
  explore: {
    label: "What would you like to eat?",
    title: "Explore our menu",
    subtitle:
      "From fasting-friendly and meat dishes to coffee and snacks — choose the Ethiopian meal you love.",
  },
  foodDisplay: {
    label: "Fresh & Delicious",
    topDishes: "Top Dishes Near You",
    noDishes: "No dishes found in this category.",
  },
  login: {
    welcomeBack: "Welcome back!",
    accountCreated: "Account created!",
    login: "Login",
    register: "Create Account",
    fullName: "Full Name",
    email: "Email Address",
    password: "Password",
    placeholderName: "Enter your full name...",
    placeholderEmail: "your@email.com",
    placeholderPassword: "••••••••",
    terms: "I agree to the Privacy Policy",
    wait: "Please wait...",
    createAccount: "Create Account",
    haveAccount: "Already have an account?",
    noAccount: "Don't have an account?",
  },
};

const StoreContextProvider = ({ children }) => {
  const url = BASE_URL;
  const [cartItems, setCartItems]   = useState({});
  const [token, setToken]           = useState("");
  const [userInfo, setUserInfo]     = useState(null);
  const [food_list, setFood_list]   = useState([]);
  const [loading, setLoading]       = useState(true);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ── API helpers ────────────────────────────────────────────────────────────

  const fetchFoodList = async () => {
    try {
      const res = await api.get("/api/food/get");
      if (res.data.success) {
        setFood_list(res.data.data);
      } else {
        toast.error(res.data.message || "Failed to load menu");
      }
    } catch {
      toast.error("Failed to load menu. Please refresh.");
    }
  };

  const loadCartData = async (authToken) => {
    try {
      const res = await api.get("/api/cart/get", {
        headers: { token: authToken },
      });
      if (res.data.success) setCartItems(res.data.cartData || {});
    } catch {
      // silent — cart stays empty
    }
  };

  const loadUserProfile = async (authToken) => {
    try {
      const res = await api.get("/api/user/profile", {
        headers: { token: authToken },
      });
      if (res.data.success) setUserInfo(res.data.data);
    } catch {
      // silent
    }
  };

  // ── Initial load ───────────────────────────────────────────────────────────

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchFoodList();

      const storedToken = localStorage.getItem("token");
      const storedCart  = localStorage.getItem("cartItems");

      if (storedCart) {
        try { setCartItems(JSON.parse(storedCart)); } catch {}
      }

      if (storedToken) {
        setToken(storedToken);
        await Promise.all([loadCartData(storedToken), loadUserProfile(storedToken)]);
      }
      setLoading(false);
    };
    init();
  }, []);

  // ── Cart ───────────────────────────────────────────────────────────────────

  const addToCart = async (itemId) => {
    if (!token) {
      toast.info("Please sign in to add items to cart");
      return;
    }
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    try {
      await api.post("/api/cart/add", { itemId }, { headers: { token } });
    } catch {
      setCartItems((prev) => ({ ...prev, [itemId]: Math.max((prev[itemId] || 1) - 1, 0) }));
      toast.error("Failed to update cart");
    }
  };

  const removeFromCart = async (itemId) => {
    if (!token) return;
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max((prev[itemId] || 1) - 1, 0) }));
    try {
      await api.delete("/api/cart/remove", { data: { itemId }, headers: { token } });
    } catch {
      // silent
    }
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      if (cartItems[id] > 0) {
        const item = food_list.find((p) => p._id === id);
        if (item) total += item.price * cartItems[id];
      }
    }
    return total;
  };

  // ── Auth ───────────────────────────────────────────────────────────────────

  const login = async (email, password) => {
    try {
      const res = await api.post("/api/user/login", { email, password });
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        await Promise.all([loadCartData(res.data.token), loadUserProfile(res.data.token)]);
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (err) {
      return { success: false, message: err.message || "Login failed" };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await api.post("/api/user/register", { name, email, password });
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        await Promise.all([loadCartData(res.data.token), loadUserProfile(res.data.token)]);
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (err) {
      return { success: false, message: err.message || "Registration failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems");
    setToken("");
    setCartItems({});
    setUserInfo(null);
  };

  // ── Profile ────────────────────────────────────────────────────────────────

  const updateProfile = async (name, email) => {
    try {
      const res = await api.put("/api/user/profile", { name, email }, { headers: { token } });
      if (res.data.success) { setUserInfo(res.data.data); return { success: true, message: res.data.message }; }
      return { success: false, message: res.data.message };
    } catch (err) {
      return { success: false, message: err.message || "Update failed" };
    }
  };

  const updateProfileImage = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("profileImage", imageFile);
      const res = await api.put("/api/user/profile", formData, {
        headers: { token, "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) { setUserInfo(res.data.data); return { success: true, message: res.data.message }; }
      return { success: false, message: res.data.message };
    } catch (err) {
      return { success: false, message: err.message || "Image upload failed" };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const res = await api.put("/api/user/password", { currentPassword, newPassword }, { headers: { token } });
      return { success: res.data.success, message: res.data.message };
    } catch (err) {
      return { success: false, message: err.message || "Password change failed" };
    }
  };

  // ── Context value ──────────────────────────────────────────────────────────

  return (
    <StoreContext.Provider value={{
      food_list, loading,
      cartItems, setCartItems,
      addToCart, removeFromCart, getTotalCartAmount,
      url, token, setToken,
      userInfo,
      login, register, logout,
      updateProfile, updateProfileImage, changePassword,
      labels
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
