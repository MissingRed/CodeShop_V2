import React from "react";
import ListItemAdmin from "../Components/ListItemAdmin";

const Productos = ({ number }) => {
  return (
    <React.Fragment>
      <div>
        <div className="store">
          <h2>Lista de productos</h2>
          <div className="lista">
            <ListItemAdmin indice={number} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Productos;
