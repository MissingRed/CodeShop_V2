import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/GameCard.css";
import { db } from "../Database/Base";

const GameCard = () => {
  const [productos, SetProductos] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  const getLinks = async () => {
    setLoading(true);
    db.collection("Games").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        if (doc.exists) {
          docs.push({ ...doc.data(), id: doc.id });
          setLoading(false);
        } else {
          setLoading(false);
          setNotFound(true);
        }
      });

      SetProductos(docs);
    });
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      {notFound ? (
        <p>404</p>
      ) : (
        <>
          {loading ? (
            <div className="center">
              <img src="../Img/loading.gif" alt="load" />
              <h1>Cargando...</h1>
            </div>
          ) : (
            <>
              {productos.map((producto) => (
                <div className="main-card" key={producto.name}>
                  <div className="main-card__favorite">
                    <img src="Img/start1.svg" alt="start" />
                  </div>
                  <div className="main-card__container">
                    <img
                      src={producto.url}
                      className="main-card__img"
                      alt="start"
                    />
                  </div>

                  <div className="main-card__container_product">
                    <p className="main-card__product_name">{producto.name}</p>
                    <p className="main-card__product_price">
                      ${producto.price}
                    </p>
                  </div>
                  <Link to={`/Product/${producto.id}`}>
                    <div className="main-card__button_Add">
                      <div className="main-card__button_circle">
                        <img
                          src="Img/plus.svg"
                          alt="add"
                          className="main-card__button_circle-img"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export default GameCard;
