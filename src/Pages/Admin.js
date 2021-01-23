import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Chip from "../Components/Chip";
import Productos from "../Components/Productos";
import { db } from "../Database/Base";

import "../Styles/Admin.css";

const Admin = () => {
  const [number, setNumber] = useState("");
  const [position, setPosition] = useState();

  const getNumberGames = async () => {
    const numberGames = [];
    db.collection("Games").onSnapshot((query) => {
      query.forEach((game) => {
        numberGames.push({ ...game.data(), id: game.id });
      });
      setNumber(numberGames.length);
      let cont = 0;
      for (let index = 0; index < numberGames.length; index++) {
        cont++;
        setPosition(cont);
      }
    });
  };

  useEffect(() => {
    getNumberGames();
  }, [number]);

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
            <h2>Admin</h2>
            <div className="board">
              <div className="generalInfo">
                <div className="box sold">
                  <h4>0</h4>
                  <p>Productos Vendidos</p>
                  <div className="cantidad">
                    <img src="Img/shopping-bag.svg" alt="bag" />
                  </div>
                </div>
                <div className="box active">
                  <h4>{number}</h4>
                  <p>Productos Activos</p>
                  <div className="cantidad">
                    <img src="Img/check-circle.svg" alt="check" />
                  </div>
                </div>
                <div className="box inactive">
                  <h4>0</h4>
                  <p>Productos Inactivos</p>

                  <div className="cantidad">
                    <img src="Img/x-circle.svg" alt="x" />
                  </div>
                </div>
              </div>
            </div>
            <div className="Productos">
              <Productos number={position} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
