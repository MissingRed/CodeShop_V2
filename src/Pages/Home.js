import React from "react";
// import { AuthContext } from "../Database/Auth";
// import app from "../Database/Base.js";
import Navbar from "../Components/Navbar";

const Home = () => {
  // const { currentUser } = useContext(AuthContext);
  return (
    <>
      <Navbar />
      {/* <h1>Home</h1>
      <p>{currentUser.displayName}</p>
      <button onClick={() => app.auth().signOut()}>Cerrar Sesión</button> */}
    </>
  );
};

export default Home;
