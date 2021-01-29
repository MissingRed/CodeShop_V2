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

  const getLinks = async () => {
    db.collection("transactions")
      .where("uid", "==", currentUser.uid)
      .get()
      .then(function (querySnapshot) {
        const docs = [];
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          docs.push({ ...doc.data(), id: doc.id });
        });
        SetCompras(docs);
        // console.log(docs);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };

  useEffect(() => {
    getLinks();
  }, []);

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
            <h2>Compras realizadas</h2>

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
                            <h4>${compra.transactions[0].amount.total} USD</h4>
                            <img src="Img/money.png" alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="logometod">
                        <div className="centro">
                          <img src="Img/paypal.svg" alt="paylogo" />
                          <p className="code">{compra.payer.payment_method}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="abajo">
                    <div className="later">
                      <img src={compra.img} alt="" />
                      <div className="infocomp">
                        <h4 className="name">
                          {compra.transactions[0].item_list.items[0].name}
                        </h4>
                        <p>1 un ${compra.transactions[0].amount.total}</p>
                      </div>
                    </div>
                    <div className="detalles">
                      <div className="nuevo">
                        <img src="Img/refresh.svg" alt="refresh" />
                        <Link
                          className="link"
                          to={`/Product/${compra.transactions[0].item_list.items[0].sku}`}
                        >
                          Hacer pedido de nuevo
                        </Link>
                      </div>
                      <button>Ver detalles del pedido</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* {transactions.map((compras) => {
              <p>{compras.id}</p>;
            })} */}
            {/* <p>{productos.create_time}</p> */}
            {/* <h4>Articulo</h4> */}
            {/* <p>{productos.transactions[0].item_list.items[0].name}</p> */}
            {/* <h4>Tipo</h4>
            <p>{productos.payer.payment_method}</p>
            <h4>Total</h4>
            <p>${productos.transactions[0].amount.total}</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Purchases;
