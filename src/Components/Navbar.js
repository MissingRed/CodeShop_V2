import React, { useState, useContext, useRef } from "react";
import "../Styles/Navbar.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Database/Auth";
import app from "../Database/Base.js";
import { Link } from "react-router-dom";

const Navbar = ({ landing, style, title }) => {
  const [openPerfil, setOpenPerfil] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [openSidebar, setOpenSidebar] = useState(false);
  const sidebarMobile = useRef();

  const handleClose = () => {
    sidebarMobile.current.style.animation = "animation_nav_reverse 0.5s";
    sidebarMobile.current.addEventListener("animationend", () =>
      setOpenSidebar(false)
    );
  };

  const handleOpen = () => {};

  return (
    <>
      <div className="main-navbar" style={style}>
        <div className="main-navbar__group-title">
          <div
            onClick={() => setOpenSidebar(!openPerfil)}
            className="main-navbar__open"
          >
            <img
              src={
                !landing
                  ? "../Img/align-justify.svg"
                  : "Img/align-justify_land.svg"
              }
              alt=""
              className="main-navbar__left-img"
            />
          </div>

          {openSidebar ? (
            <div className="sidebar-menu" ref={sidebarMobile}>
              <div className="sidebar-div">
                <img
                  src="../Img/x.svg"
                  alt="X"
                  onClick={handleClose}
                  className="main-navbar__left-img"
                />
                {/* <button type="button" className="button small float-right">
                  Toggle Menu
                </button> */}
                <div className="main-sidebar_mobile">
                  <h3 className="main-sidebar__title">Opciones</h3>
                  <div className="main-sidebar__pruducts">
                    <NavLink
                      to="/Home"
                      activeClassName="selectedNav"
                      className="main-sidebar__item"
                    >
                      Tienda
                    </NavLink>
                    <NavLink
                      to="/Profile"
                      activeClassName="selectedNav"
                      className="main-sidebar__item"
                    >
                      Perfil
                    </NavLink>
                    <NavLink
                      to="/Purchases"
                      activeClassName="selectedNav"
                      className="main-sidebar__item"
                    >
                      Compras
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          <Link to="/Home" className="main-navbar__a">
            <h3 className="main-navbar__title" style={title}>
              {!landing ? "Tienda" : landing}
            </h3>
          </Link>
        </div>
        <div className="main-navbar__center-logo">
          <img
            src={!landing ? "../Img/Logo_black.svg" : "Img/Logo_white.svg"}
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
              src={!landing ? "../Img/star.svg" : "Img/star_land.svg"}
              alt=""
              className="main-navbar__star_coin"
            />
            <img
              src={
                currentUser.photoURL === null
                  ? "Img/defaultUser_img.png"
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
                      ? "Img/defaultUser_img.png"
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
