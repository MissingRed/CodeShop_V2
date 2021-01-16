import React, { useEffect, useState } from "react";
import "../Styles/Game_Card.css";
import { db } from "../Database/Base";

const Game_Card = () => {
  const [productos, SetProductos] = useState([]);

  const getLinks = async () => {
    db.collection("Games").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      SetProductos(docs);
      console.log(docs.length);
    });
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      {productos.map((producto) => (
        <div className="card">
          <div className="start1">
            <img src="Img/start1.svg" alt="start" />
          </div>
          <div className="section">
            <img src={producto.url} className="photo" alt="start" />
          </div>

          <div className="data">
            <p className="titleGame">{producto.name}</p>

            <p className="precio">${producto.price}</p>
          </div>

          <div className="add">
            <div className="circle1">
              <img src="Img/plus.svg" alt="add" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Game_Card;
