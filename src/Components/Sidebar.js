import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Sidebar.css";

const Sidebar = () => {
  return (
    <>
      <div className="main-sidebar">
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
        </div>
      </div>
    </>
  );
};

export default Sidebar;
