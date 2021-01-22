import React, { useEffect, useState } from "react";
import { db } from "../Database/Base";
import ListformAdmin from "../Components/ListformAdmin";
import Swal from "sweetalert2";

function ListItemAdmin({ indice }) {
  const [productos, SetProductos] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const addOrEditLink = async (linkObject) => {
    const sleep = (milliseconds) => {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    if (currentId === "") {
      await db.collection("Games").doc().set(linkObject);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto agrado con exito",
        showConfirmButton: false,
        timer: 1500,
      });
      await sleep(2000);
      setOpenModal(false);
    } else {
      await db.collection("Games").doc(currentId).update(linkObject);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto Actualizado con exito",
        showConfirmButton: false,
        timer: 1500,
      });
      setCurrentId("");
    }
  };

  const onDeleteLink = async (id) => {
    Swal.fire({
      title: "Estas seguro de Eliminar este producto?",
      text: "No podras revertir los cambios",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si! Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        db.collection("Games").doc(id).delete();
        Swal.fire(
          "Eliminado",
          "El pruducto se ha eliminado con exito",
          "success"
        );
      }
    });
  };

  const getLinks = async () => {
    db.collection("Games").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      SetProductos(docs);
      // console.log(
      //   storage
      //     .ref("images")
      //     .child("google")
      //     .getDownloadURL()
      //     .then((url) => {
      //       setUrl(url);
      //     })
      // );
    });
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <div>
      <div className="op">
        <button onClick={() => setOpenModal(!openModal)}>AGREGAR</button>
      </div>
      {openModal ? (
        <div className="modalAdd">
          <ListformAdmin
            {...{ addOrEditLink, currentId, productos, setOpenModal }}
          />
        </div>
      ) : (
        ""
      )}
      <div className="completos">
        {productos.map((producto) => (
          <div className="itemAdmin" key={producto.id}>
            <div className="infove">
              <p>{indice}</p>
              <div className="imgve">
                {/* <img src={producto.url} alt="" /> */}
              </div>
              <div className="nombre">
                <p>{producto.name}</p>
              </div>
            </div>
            <div>
              <p>Cantidad: {producto.quantity}</p>
            </div>
            <div>
              <p>Precio: ${producto.price}</p>
            </div>
            <div className="operaciones">
              <i className="red" onClick={() => onDeleteLink(producto.id)}>
                Eliminar
              </i>
              <i className="blue" onClick={() => setCurrentId(producto.id)}>
                Actualizar
              </i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListItemAdmin;
