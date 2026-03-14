import userModel from "../models/userModel.js";
//  add to cart
const addToCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    const { userId } = req;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData;

    // if item not exist in cart
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    // update database
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message: "Added to cart",
      data: cartData,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//  remove from cart
const removeCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    const { userId } = req;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData;

    if (cartData[itemId] > 1) {
      cartData[itemId] -= 1;
    } else {
      // remove item completely
      delete cartData[itemId];
    }

    // update database
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message: "Removed from cart",
      data: cartData,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//  get cart
const getCart = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData;
    if (Object.keys(cartData).length === 0) {
      return res.json({ success: false, message: "cart is empty" });
    }
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error });
  }
};
export { addToCart, removeCart, getCart };
