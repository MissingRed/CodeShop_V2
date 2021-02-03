import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Components/Navbar";
import Chip from "../Components/Chip";
import Sidebar from "../Components/Sidebar";
import { db } from "../Database/Base";
import { AuthContext } from "../Database/Auth";
import { Link } from "react-router-dom";

import "../Styles/Purchases.css";

const Purchases = () => {
  const { currentUser } = useContext(AuthContext);
  const [compras, SetCompras] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);

  const getLinks = async () => {
    db.collection("transactions")
      .where("uid", "==", currentUser.uid)
      .get()
      .then(function (querySnapshot) {
        const docs = [];
        querySnapshot.forEach(function (doc) {
          if (doc.exists) {
            docs.push({ ...doc.data(), id: doc.id });
            setLoading(false);
          } else {
            setLoading(false);
            setNotFound(true);
          }
          // doc.data() is never undefined for query doc snapshots
        });
        SetCompras(docs);
        setLoading(false);
        // setEmpty(true);
        // console.log(docs);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
        setError(error);
      });
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      <div className="grid">
        <div className="header">
          <Navbar />
        </div>
        <div className="chip">
          <Chip />
        </div>
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="section">
          <div className="primary">
            <h2>Compras realizadas</h2>
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
                    {error ? (
                      <p>Error</p>
                    ) : (
                      <>
                        {empty ? (
                          <p>Vacio</p>
                        ) : (
                          <>
                            {compras.map((compra) => (
                              <div key={compra.id} className="compraProd">
                                <div className="comp">
                                  <div>
                                    <div className="arriba">
                                      <div className="cotenedorxd">
                                        <div className="fecha">
                                          <p>FECHA DE COMPRA</p>
                                          <h4>{compra.create_time}</h4>
                                        </div>
                                        <div className="total">
                                          <p>TOTAL</p>
                                          <div className="money">
                                            <h4>
                                              $
                                              {
                                                compra.transactions[0].amount
                                                  .total
                                              }{" "}
                                              USD
                                            </h4>
                                            <img src="Img/money.png" alt="" />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="logometod">
                                        <div className="centro">
                                          <img
                                            src="Img/paypal.svg"
                                            alt="paylogo"
                                          />
                                          <p className="code">
                                            {compra.payer.payment_method}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="abajo">
                                    <div className="later">
                                      <img src={compra.img} alt="" />
                                      <div className="infocomp">
                                        <h4 className="name">
                                          {
                                            compra.transactions[0].item_list
                                              .items[0].name
                                          }
                                        </h4>
                                        <p>
                                          1 un $
                                          {compra.transactions[0].amount.total}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="detalles">
                                      <div className="nuevo">
                                        <img
                                          src="Img/refresh.svg"
                                          alt="refresh"
                                        />
                                        <Link
                                          className="link"
                                          to={`/Product/${compra.transactions[0].item_list.items[0].sku}`}
                                        >
                                          Hacer pedido de nuevo
                                        </Link>
                                      </div>
                                      <Link to={`/Purchases/${compra.id}`}>
                                        Ver detalles del pedido
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Purchases;
