import React, { useEffect, useContext } from "react";
import Navbar from "../Components/Navbar";
import Chip from "../Components/Chip";
import Sidebar from "../Components/Sidebar";
import Banner from "../Components/Banner";
import Swal from "sweetalert2";
import GameCard from "../Components/GameCard";
import { AuthContext } from "../Database/Auth";

import "../Styles/Home.css";

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser.emailVerified) {
      Swal.fire(
        "Email no verificado!",
        "Por favor verifica tu Email en Perfil para realizar compras",
        "info"
      );
    }
  }, [currentUser]);

  return (
    <>
      <div className="sticky-header">
        <Navbar />
        <Chip />
      </div>
      <div className="main-container">
        <div className="main-container__margin">
          <Sidebar />
          <div className="main-contianer__store">
            <Banner />
            <div className="main-container__store_items">
              <GameCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
