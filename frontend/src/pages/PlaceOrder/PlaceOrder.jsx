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

    if (!token) return toast.error("እባክዎ በመጀመሪያ ይግቡ (Please sign in first)");

    const items = Object.entries(cartItems)
      .filter(([, qty]) => qty > 0)
      .map(([itemId, quantity]) => {
        const food = food_list.find((f) => f._id === itemId);
        if (!food) return null;
        return { productId: itemId, name: food.name, price: food.price, quantity, image: food.image };
      })
      .filter(Boolean);

    if (items.length === 0) return toast.error("ዘንቢልዎ ባዶ ነው (Your cart is empty)");

    const itemsPrice = getTotalCartAmount();
    const deliveryFee = 50; // Updated delivery fee to 50 ETB
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
        toast.error(res.data.error || "ክፍያ መጀመር አልተቻለም (Payment initialization failed)");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "የሆነ ስህተት ተፈጥሯል (Something went wrong. Please try again.)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">የማድረሻ አድራሻ (Delivery Information)</p>
        <div className="multi-fields">
          <input name="firstName" onChange={onChangeHandler} required value={data.firstName} type="text" placeholder="የመጀመሪያ ስም (First name)" />
          <input name="lastName" onChange={onChangeHandler} required value={data.lastName} type="text" placeholder="የአባት ስም (Last name)" />
        </div>
        <input name="email" onChange={onChangeHandler} required value={data.email} type="email" placeholder="ኢሜይል (Email address)" />
        <input name="phone" onChange={onChangeHandler} required value={data.phone} type="text" placeholder="ስልክ ቁጥር (Phone number)" />
        <input name="address" onChange={onChangeHandler} required value={data.address} type="text" placeholder="የሰፈር ስም / አድራሻ (Street address)" />
        <div className="multi-fields">
          <input name="city" onChange={onChangeHandler} required value={data.city} type="text" placeholder="ከተማ (City)" />
          <input name="region" onChange={onChangeHandler} required value={data.region} type="text" placeholder="ክፍለ ከተማ (Region)" />
        </div>
        <input name="postalCode" onChange={onChangeHandler} value={data.postalCode} type="text" placeholder="ፖስታ ቁጥር - አማራጭ (Postal code)" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>የክፍያ ማጠቃለያ (Cart Totals)</h2>
          <div>
            <div className="cart-total-details">
              <p>የምግብ ዋጋ (Subtotal)</p>
              <p>{getTotalCartAmount()} ብር</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>የማድረሻ ሂሳብ (Delivery Fee)</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 50} ብር</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>አጠቃላይ ድምር (Total)</p>
              <p>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50} ብር</p>
            </div>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "በማስኬድ ላይ... (Processing…)" : "ወደ ክፍያ ይቀጥሉ (PROCEED TO PAYMENT)"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
