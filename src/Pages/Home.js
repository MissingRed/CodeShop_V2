import React from "react";
// import { AuthContext } from "../Database/Auth";
// import app from "../Database/Base.js";
import Navbar from "../Components/Navbar";
import Chip from "../Components/Chip";
import "../Styles/Home.css";

const Home = () => {
  // const { currentUser } = useContext(AuthContext);
  return (
    <>
      <Navbar />
      <div className="main-container">
        <Chip />
        <h1>Home</h1>
      </div>

      {/* 
      <p>{currentUser.displayName}</p>
      <button onClick={() => app.auth().signOut()}>Cerrar Sesión</button> */}
    </>
  );
};

export default Home;
