import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import videoBg from "../assets/background.mp4";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const naviagate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };
  console.log("login info---", loginInfo);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Wrong Credentials...");
    }
    try {
      const url = "https://deploy-losign-backend.vercel.app/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      console.log(result);
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("jwtToken", jwtToken);
        localStorage.setItem("loggedInUser", name);

        setTimeout(() => {
          naviagate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  

  return (
    <div className="container">
      <video src={videoBg} autoPlay muted loop class="background-video" />
      <h1>Login</h1>
      <form onClick={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            autoFocus
            placeholder="Enter Your Email..."
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={loginInfo.password}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          You have an account? Lets Create<Link to="/signup"> Sign Up</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
