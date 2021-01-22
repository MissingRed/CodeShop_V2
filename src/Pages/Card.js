import React from "react";
import Navbar from "../Components/Navbar";
import Chip from "../Components/Chip";
import Sidebar from "../Components/Sidebar";
// importar botón
import PaypalCheckoutButton from "../Components/PaypalCheckoutButton";
// import { usePayPalCheckout } from "react-paypal-checkout-button";

import "../Styles/Card.css";

const Card = () => {
  const order = {
    customer: "123456",
    total: "70.00",
    items: [
      {
        sku: "112",
        name: "Camisa ReactJS",
        price: "20.00",
        quantity: 1,
        currency: "USD",
      },
      {
        sku: "99",
        name: "Camisa JS",
        price: "50.00",
        quantity: 1,
        currency: "USD",
      },
    ],
  };

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
            <PaypalCheckoutButton order={order} />
            {/* {isLoadingButton && <h3>loading..</h3>} */}

            {/* <div ref={paypalRef} /> */}
            <div className="infocard">
              <h1>¡Aún no tienes ningún método de pago registrado!</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
