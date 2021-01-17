import React, { useEffect, useState } from "react";
import "../Styles/GameCard.css";
import { db } from "../Database/Base";

const GameCard = () => {
  const [productos, SetProductos] = useState([]);

  const getLinks = async () => {
    db.collection("Games").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      SetProductos(docs);
    });
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      {productos.map((producto) => (
        <div className="main-card" key={producto.name}>
          <div className="main-card__favorite">
            <img src="Img/start1.svg" alt="start" />
          </div>
          <div className="main-card__container">
            <img src={producto.url} className="main-card__img" alt="start" />
          </div>

          <div>
            <p className="main-card__product_name">{producto.name}</p>
            <p className="main-card__product_price">${producto.price}</p>
          </div>

          <div className="main-card__button_Add">
            <div className="main-card__button_circle">
              <img
                src="Img/plus.svg"
                alt="add"
                className="main-card__button_circle-img"
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default GameCard;
