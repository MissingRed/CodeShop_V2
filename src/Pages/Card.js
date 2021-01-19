import React from "react";
import Navbar from "../Components/Navbar";
import Chip from "../Components/Chip";
import Sidebar from "../Components/Sidebar";

import "../Styles/Card.css";

const Card = () => {
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
            <h2>Tarjeta Bancaria</h2>
            <button className="main-card__add_button">
              Añadir tarjeta bancaria
            </button>

            <div className="info">
              <h1>¡Aún no tienes ningún método de pago registrado!</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
