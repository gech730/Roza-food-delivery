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
      setStatus("failed");
      setLoading(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await axios.get(`${url}/api/order/verify/${tx_ref}`);
        if (response.data?.status === "success") {
          setStatus("success");
          setCartItems({});
          localStorage.removeItem("cartItems");
          setTimeout(() => navigate("/myOrders"), 2000);
        } else {
          setStatus("failed");
        }
      } catch {
        setStatus("failed");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, []);

  if (loading) {
    return (
      <div className="verify">
        <div className="spinner" />
        <h2>Verifying your payment...</h2>
        <p>Please wait, do not close this page.</p>
      </div>
    );
  }
  return (
    <div className={`verify ${status === "success" ? "verify-success" : "verify-failed"}`}>
      <div className="verify-icon">{status === "success" ? "✅" : "❌"}</div>
      <h2>{status === "success" ? "Payment Successful!" : "Payment Failed"}</h2>
      <p>{status === "success" ? "Redirecting to your orders..." : "Something went wrong. Please try again."}</p>
    </div>
  );
};

export default Verify;
