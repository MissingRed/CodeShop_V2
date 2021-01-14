import React from "react";
import "../Styles/Navbar.css";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <div className="main-navbar">
        <div className="main-navbar__group-title">
          <img
            src="Img/align-justify_land.svg"
            alt=""
            className="main-navbar__left-img"
          />
          <h3 className="main-navbar__title">CodeShop</h3>
        </div>
        <div className="main-navbar__center-logo">
          <img
            src="Img/Logo_land.svg"
            alt=""
            className="main-navbar__center-img"
          />
        </div>
        <NavLink to="/Login" className="main-navbar__right-button">
          Iniciar Sesión
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;
