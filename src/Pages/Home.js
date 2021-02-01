import React, { useEffect, useContext, useState } from "react";
import Navbar from "../Components/Navbar";
import Chip from "../Components/Chip";
import Sidebar from "../Components/Sidebar";
import Swal from "sweetalert2";
import GameCard from "../Components/GameCard";
import { Link } from "react-router-dom";

import Banner from "../Components/Banner";

import { AuthContext } from "../Database/Auth";
import { db } from "../Database/Base";

import "../Styles/Home.css";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [SearchResult, setSearchResult] = useState([]);
  const [InputSearch, SetInputSearch] = useState("");
  const [, SetProductos] = useState([]);

  const getLinks = async () => {
    db.collection("Games").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      SetProductos(docs);
    });
  };
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
          ...doc.data(),
          id: doc.id,
        });
      });
      setSearchResult(docs);
    } else {
      setSearchResult([]);
    }
  };

  const handleChangeFilter = async (e) => {
    SetInputSearch(e.target.value);

    if (e.target.value) {
      const user = await db
        .collection("Games")
        .limit(10)
        .where("category", ">=", e.target.value)
        .where("category", "<=", e.target.value + "\uf8ff")
        .get();

      const docs = [];

      user.forEach((doc) => {
        docs.push({
          // name: doc.get("name"),
          // price: doc.get("price"),
          // quantity: doc.get("quantity"),
          // url: doc.get("url"),
          ...doc.data(),
          id: doc.id,
        });
      });

      setSearchResult(docs);
    } else {
      setSearchResult([]);
    }
  };

  const GameCardFilter = () => {
    var name = "";
    name = SearchResult.map((res) => (
      <div className="main-card" key={res.name}>
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

        <Link to={`/Product/${res.id}`}>
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

    getLinks();
    // console.log(prod);
  }, [currentUser]);

  return (
    <>
      {/* <div className="sticky-header">
        <Navbar />
        <Chip Search={handleChangeSearch} Filter={handleChangeFilter} />
      </div>
      <div className="main-container">
        <div className="main-container__margin">
          <Sidebar />
          <div className="main-contianer__store">
            <Banner />
            <div className="main-container__store_items">
              {InputSearch ? (
                <div className="cardSearch">{GameCardFilter()}</div>
              ) : (
                <GameCard />
              )}
            </div>
          </div>
        </div>
      </div> */}

      <div className="grid">
        <div className="header">
          <Navbar />
        </div>
        <div className="chip">
          <Chip Search={handleChangeSearch} Filter={handleChangeFilter} />
        </div>
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="section">
          <div className="primary">
            <Banner />
            <div className="main-container__store_items">
              {InputSearch ? GameCardFilter() : <GameCard />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
