import React, { useEffect, useState, useContext } from "react";
import Navbar from "../Components/Navbar";
import Chip from "../Components/Chip";
import Sidebar from "../Components/Sidebar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { db } from "../Database/Base";
import "../Styles/ViewPurchase.css";
import { AuthContext } from "../Database/Auth";

const ViewPurchase = () => {
  const { currentUser } = useContext(AuthContext);
  let { id } = useParams();

  const [product, setProduct] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getLinks = async () => {
      setLoading(true);
      db.collection("transactions")
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setProduct({ ...doc.data(), id: doc.id });
            setLoading(false);
          } else {
            setLoading(false);
            setNotFound(true);
          }
          console.log(doc.data());
        })
        .catch((err) => {
          setError(err);
        });
    };
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
            <Link className="return" to="/Purchases">
              <img src="../Img/arrow.svg" alt="" />
              <h2>Compras</h2>
            </Link>

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
                      <div>
                        {product.transactions[0].item_list.items[0].name}
                      </div>
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

export default ViewPurchase;
