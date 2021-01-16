import React, { useState, useContext } from "react";
import "../Styles/Navbar.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Database/Auth";
import app from "../Database/Base.js";

const Navbar = ({ landing }) => {
  const [openPerfil, setOpenPerfil] = useState(false);
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <div className="main-navbar">
        <div className="main-navbar__group-title">
          <img
            src={
              !landing ? "Img/align-justify.svg" : "Img/align-justify_land.svg"
            }
            alt=""
            className="main-navbar__left-img"
          />
          <h3 className="main-navbar__title">
            {!landing ? "Tienda" : landing}
          </h3>
        </div>
        <div className="main-navbar__center-logo">
          <img
            src={!landing ? "Img/Logo_black.svg" : "Img/Logo_white.svg"}
            alt=""
            className="main-navbar__center-img"
          />
        </div>
        {!currentUser ? (
          <NavLink to="/Login" className="main-navbar__right-button">
            Iniciar Sesión
          </NavLink>
        ) : (
          <div className="main-navbar__user-items">
            <h4 className="main-navbar__user-items_lang">ES</h4>
            <img
              src={!landing ? "Img/star.svg" : "Img/star_land.svg"}
              alt=""
              className="main-navbar__star_coin"
            />
            <img
              src={
                currentUser.photoURL === null
                  ? "Img/4411.png"
                  : currentUser.photoURL
              }
              alt="User"
              className="main-navbar__user_image"
              onClick={() => setOpenPerfil(!openPerfil)}
            />
            {openPerfil ? (
              <div className="main-navbar__modal">
                <img
                  src={
                    currentUser.photoURL === null
                      ? "Img/4411.png"
                      : currentUser.photoURL
                  }
                  alt="User"
                  className="main-navbar__modal-user_image"
                />
                <p className="main-navbar__modal_text">
                  {currentUser.displayName}
                </p>
                <button
                  onClick={() => app.auth().signOut()}
                  className="main-navbar__modal_button"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;