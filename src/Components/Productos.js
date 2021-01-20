import React from "react";
import ListItemAdmin from "../Components/ListItemAdmin";

const Productos = () => {
  return (
    <React.Fragment>
      <div>
        <div className="store">
          <h2>Lista de productos</h2>

          <div className="lista">
            <ListItemAdmin />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Productos;
