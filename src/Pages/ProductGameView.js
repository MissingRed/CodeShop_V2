import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Database/Base";
import Navbar from "../Components/Navbar";
import "../Styles/ProductGameView.css";
import PaypalCheckoutButton from "../Components/PaypalCheckoutButton";

const ProductGameView = () => {
  let { id } = useParams();
  const [product, setProduct] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getLinks = async () => {
    setLoading(true);
    db.collection("Games")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setProduct(doc.data());
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

  const order = {
    customer: "123456",
    total: product.price,
    items: [
      {
        sku: "112",
        name: product.name,
        price: product.price,
        quantity: 1,
        currency: "USD",
      },
      // {
      //   sku: "99",
      //   name: "Camisa JS",
      //   price: "50.00",
      //   quantity: 1,
      //   currency: "USD",
      // },
    ],
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
            <p>Cargando...</p>
          ) : (
            <>
              {error ? (
                <p>Error</p>
              ) : (
                <div>
                  <div className="sticky-header">
                    <Navbar />
                  </div>
                  <div className="contenido">
                    <div className="imagen">
                      <img src={product.urlBanner} alt="banner" />
                    </div>
                    <div className="centrar">
                      <div className="information">
                        <div className="imagenprod">
                          <img src={product.url} alt="" />
                          <div className="infogamecontent">
                            <h2>{product.name}</h2>
                            <div className="informationGame">
                              <p>{product.description}</p>
                              <p>Disponible en: {product.category}</p>
                            </div>
                          </div>
                          <div className="buttons">
                            <h2>${product.price}</h2>
                            <p>Juego {product.name} versión digital*</p>
                            <div className="gris">
                              <p>- Español Juego Original </p>
                              <p>- Entrega inmediata</p>
                              <p>- Incluye guía paso a paso</p>
                            </div>

                            <PaypalCheckoutButton order={order} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProductGameView;