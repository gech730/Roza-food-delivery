import React, { useContext, useState } from "react";
import axios from "axios";
import "./LOginPopUp.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const LoginPopUp = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const res = await axios.post(newUrl, data);

    if (res.data.success) {
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      setShowLogin(false);
    } else {
      alert(res.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form
        name="registration" className="login-popup-container" onSubmit={onSubmitHandler} >

        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="cancel"/>
        </div>

        <div className="login-popup-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              onChange={onChangeHandler}
              value={data.name}
              name="name"
              type="text"
              placeholder="your name"
              required
            />
          )}

          <input
            onChange={onChangeHandler}
            value={data.email}
            name="email"
            type="email"
            placeholder="your email"
            required
            id=""
          />
          <input
            onChange={onChangeHandler}
            value={data.password}
            name="password"
            type="password"
            placeholder="password"
          />
          <button type="submit">
            {currentState === "Sign UP" ? "create account" : "Login"}
          </button>
        </div>

        <div className="login-popup-conditio">
          <input type="checkbox" name="" id="" required />
          <p>By contuning, i agree the terms of privacy policy. </p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopUp;
