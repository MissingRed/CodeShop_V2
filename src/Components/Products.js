import React from "react";
import ListItemAdmin from "./ListItemAdmin";

const Products = ({ number }) => {
  return (
    <>
      <div>
        <div className="store">
          <h2>Lista de productos</h2>
          <div className="lista">
            <ListItemAdmin indice={number} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
