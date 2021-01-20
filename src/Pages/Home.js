import React, { useEffect, useContext, useState } from "react";
import Navbar from "../Components/Navbar";
import Chip from "../Components/Chip";
import Sidebar from "../Components/Sidebar";
import Banner from "../Components/Banner";
import Swal from "sweetalert2";
import GameCard from "../Components/GameCard";
import { AuthContext } from "../Database/Auth";
import { db } from "../Database/Base";

import "../Styles/Home.css";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [SearchResult, setSearchResult] = useState([]);
  const [InputSearch, SetInputSearch] = useState("");

  const handleChangeSearch = async (e) => {
    SetInputSearch(e.target.value);

    if (e.target.value) {
      const user = await db
        .collection("Games")
        .limit(10)
        .where("name", ">=", e.target.value)
        .where("name", "<=", e.target.value + "\uf8ff")
        .get();

      const docs = [];

      user.forEach((doc) => {
        docs.push({
          name: doc.get("name"),
          price: doc.get("price"),
          quantity: doc.get("quantity"),
          url: doc.get("url"),
        });
      });
      setSearchResult(docs);
      SearchResult.map((res) => console.log(res.name));
    } else {
      setSearchResult([]);
    }
  };

  const seares = () => {
    var name = "";
    name = SearchResult.map((res) => (
      <div className="main-container__store_items" key={res.name}>
        <div className="main-card">
          <div className="main-card__favorite">
            <img src="Img/start1.svg" alt="start" />
          </div>
          <div className="main-card__container">
            <img src={res.url} className="main-card__img" alt="start" />
          </div>

          <div>
            <p className="main-card__product_name">{res.name}</p>
            <p className="main-card__product_price">${res.price}</p>
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
      </div>
    ));

    return name;
  };

  useEffect(() => {
    if (!currentUser.emailVerified) {
      Swal.fire(
        "Email no verificado!",
        "Por favor verifica tu Email en Perfil para realizar compras",
        "info"
      );
    }
  }, [currentUser]);

  return (
    <>
      <div className="sticky-header">
        <Navbar />
        <Chip Search={handleChangeSearch} />
      </div>
      <div className="main-container">
        <div className="main-container__margin">
          <Sidebar />
          <div className="main-contianer__store">
            <Banner />
            <div className="main-container__store_items">
              {InputSearch ? (
                <div className="cardSearch">{seares()}</div>
              ) : (
                <GameCard />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
