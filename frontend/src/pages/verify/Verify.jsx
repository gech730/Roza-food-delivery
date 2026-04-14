import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./Verify.css";
const Verify = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { url, setCartItems } = useContext(StoreContext);

  useEffect(() => {
    const tx_ref = params.get("tx_ref");

    if (!tx_ref) {
      console.error("tx_ref not found in URL");
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await axios.get(`${url}/api/order/verify/${tx_ref}`);

        console.log("Verification result:", response.data);
        if (response.data?.status === "success") {
          setStatus("success");
          // Clear cart from frontend state and localStorage
          setCartItems({});
          localStorage.removeItem("cartItems");
          setTimeout(() => {
            navigate("/myOrders");
          }, 2000);
        } else {
          setStatus("failed");
        }
      } catch (error) {
        console.error(
          "Verification error:",
          error.response?.data || error.message,
        );
        setStatus("failed");
      } finally {
        setLoading(false); // ✅ stop spinner
      }
    };

    verifyPayment();
  }, []);

  if (loading) {
    return (
      <div className="verify">
        <div className="spinner"></div>
        <h2>Verifying payment...</h2>
      </div>
    );
  }
  return (
    <div>
      {status === "success" ? (
        <h2>✅ Payment Successful</h2>
      ) : (
        <h2>❌ Payment Failed</h2>
      )}
    </div>
  );
};

export default Verify;
