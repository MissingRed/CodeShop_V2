import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../Styles/GameCard.css";
import { db } from "../Database/Base";
import { AuthContext } from "../Database/Auth";

const GameCard = () => {
  const [productos, SetProductos] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [favorites, setFavorites] = useState([]);

  const { currentUser } = useContext(AuthContext);

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

  const favoriteItem = async (linkObject) => {
    await db.collection("Favorites").doc().set(linkObject);
    alert("Guardado");
  };

  const getFavorites = async () => {
    setLoading(true);
    db.collection("Favorites")
      .doc("j8N51cZt3NcqH5b1QkVf")
      .get()
      .then((doc) => {
        if (doc.exists) {
          setFavorites({ ...doc.data(), id: doc.id });
          setLoading(false);
        } else {
          setLoading(false);
          setNotFound(true);
        }
      })
      .catch((err) => {
        setError(err);
      });
  };

  useEffect(() => {
    getFavorites();
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
                  {favorites.name === producto.name ? (
                    <div className="main-card__favorite">
                      <img src="Img/start1black.svg" alt="start" />
                    </div>
                  ) : (
                    <div className="main-card__favorite">
                      <img
                        src="Img/start1.svg"
                        alt="start"
                        onClick={() =>
                          favoriteItem({ ...producto, uid: currentUser.uid })
                        }
                      />
                    </div>
                  )}
                  {/* {favorites[0].name === producto.name ? (
                    <div className="main-card__favorite">
                      <img src="Img/start1black.svg" alt="start" />
                    </div>
                  ) : (
                    <div className="main-card__favorite">
                      <img
                        src="Img/start1.svg"
                        alt="start"
                        onClick={() =>
                          favoriteItem({ ...producto, uid: currentUser.uid })
                        }
                      />
                    </div>
                  )} */}

                  {/* {favorites.map((res) =>
                    res.name === producto.name ? (
                      <div className="main-card__favorite">
                        <img src="Img/start1black.svg" alt="start" />
                      </div>
                    ) : (
                      <div className="main-card__favorite">
                        <img
                          src="Img/start1.svg"
                          alt="start"
                          onClick={() =>
                            favoriteItem({ ...producto, uid: currentUser.uid })
                          }
                        />
                      </div>
                    )
                  )} */}
                  {/* <div className="main-card__favorite">
                    <img
                      src="Img/start1.svg"
                      alt="start"
                      onClick={() =>
                        favoriteItem({ ...producto, uid: currentUser.uid })
                      }
                    />
                  </div> */}

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
