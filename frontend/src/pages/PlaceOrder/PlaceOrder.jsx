import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

function PlaceOrder() {
  const { url, getTotalCartAmount, cartItems, food_list, token } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    firstName: "", lastName: "", email: "",
    phone: "", address: "", city: "", region: "", postalCode: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (!token) return toast.error("Please sign in first");

    const items = Object.entries(cartItems)
      .filter(([, qty]) => qty > 0)
      .map(([itemId, quantity]) => {
        const food = food_list.find((f) => f._id === itemId);
        if (!food) return null;
        return { productId: itemId, name: food.name, price: food.price, quantity, image: food.image };
      })
      .filter(Boolean);

    if (items.length === 0) return toast.error("Your cart is empty");

    const itemsPrice = getTotalCartAmount();
    const deliveryFee = 50;
    const totalAmount = itemsPrice + deliveryFee;

    setLoading(true);
    try {
      const res = await axios.post(
        url + "/api/order/initialize",
        {
          amount: totalAmount, email: data.email,
          first_name: data.firstName, last_name: data.lastName,
          phone_number: data.phone, items, itemsPrice, deliveryFee,
          address: {
            fullName: `${data.firstName} ${data.lastName}`,
            phone: data.phone, address: data.address,
            city: data.city, region: data.region, postalCode: data.postalCode,
          },
        },
        { headers: { token, "Content-Type": "application/json" } }
      );

      if (res.data.checkout_url) {
        window.location.href = res.data.checkout_url;
      } else {
        toast.error(res.data.error || "Payment initialization failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery information</p>
        <div className="multi-fields">
          <input name="firstName" onChange={onChangeHandler} required value={data.firstName} type="text" placeholder="First name" />
          <input name="lastName" onChange={onChangeHandler} required value={data.lastName} type="text" placeholder="Last name" />
        </div>
        <input name="email" onChange={onChangeHandler} required value={data.email} type="email" placeholder="Email address" />
        <input name="phone" onChange={onChangeHandler} required value={data.phone} type="text" placeholder="Phone number" />
        <input name="address" onChange={onChangeHandler} required value={data.address} type="text" placeholder="Street address" />
        <div className="multi-fields">
          <input name="city" onChange={onChangeHandler} required value={data.city} type="text" placeholder="City" />
          <input name="region" onChange={onChangeHandler} required value={data.region} type="text" placeholder="Region / sub-city" />
        </div>
        <input name="postalCode" onChange={onChangeHandler} value={data.postalCode} type="text" placeholder="Postal code (optional)" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()} ETB</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 50} ETB</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50} ETB</p>
            </div>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Processing…" : "PROCEED TO PAYMENT"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
