import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import "./css/Signup.css"; // Import the CSS file

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const naviagate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };
  console.log("login info---", signupInfo);

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("Wrong Credentials...");
    }
    try {
      const url = "http://localhost:3001/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      console.log(result);

      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          naviagate("/login");
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
      <h1>Sign Up</h1>
      <form onClick={handleSignup}>
        <div>
          <label htmlFor="name">Username:</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter Your Name..."
            value={signupInfo.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            autoFocus
            placeholder="Enter Your Email..."
            value={signupInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Create Password"
            value={signupInfo.password}
          />
        </div>
        <button type="submit">Sign Up</button>
        <span>
          Already have an account ?<Link to="/login">login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
