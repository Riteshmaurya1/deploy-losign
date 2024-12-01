import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Home.css"; // Import the CSS file
import videoBg from "../assets/background.mp4";
import { handleError } from "../utils";
import { useEffect } from "react";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
    return () => {};
  }, []);
  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  // const fetchProducts = async () => {
  //   try {
  //     const url = "http://localhost:3001/products";
  //     const headers = {
  //       headers: {
  //         'Authorization': localStorage.getItem("token"),
  //       },
  //     };
  //     const response = await fetch(url, headers);
  //     const result = await response.json();
  //     console.log(result);
  //   } catch (error) {
  //     handleError(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);
  return (
    <>
      <video src={videoBg} autoPlay muted loop class="background-video" />
      <div className="container2">
        <button className="logout-button" onClick={handleLogout}>
          Log out
        </button>
      </div>
      <div className="container">
        <h1>
          Welcome, <span>{loggedInUser}</span>
        </h1>
      </div>

      <div className="container">
        <h1>Lorem ipsum Start.</h1>
        <p>
          Make sure to replace "path/to/your/video.mp4" with the actual path to
          your video file. Additionally, consider using a video that is
          optimized for web use to ensure quick loading times and a smooth user
          experience.
        </p>
      </div>
    </>
  );
};

export default Home;
