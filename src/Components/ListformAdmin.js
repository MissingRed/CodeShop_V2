import React, { useState, useEffect, useContext } from "react";
import { db } from "../Database/Base";
import { AuthContext } from "../Database/Auth";
import { storage } from "../Database/Base";

const ListformAdmin = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [, setProgress] = useState(0);

  const initStateValue = {
    name: "",
    quantity: "",
    price: "",
    category: "",
  };

  const [values, setValues] = useState(initStateValue);
  const [, setUrl] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateImg();
    setValues({ ...initStateValue });
  };

  const getLinkById = async (id) => {
    const doc = await db.collection(currentUser.uid).doc(id).get();
    setValues({ ...doc.data() });
  };

  const uploadImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const updateImg = () => {
    const uploadTask = storage.ref(`images/${values.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(values.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            props.addOrEditLink({ ...values, url: url });
          });
      }
    );
  };

  console.log("image:", image);
  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initStateValue });
    } else {
      getLinkById(props.currentId);
    }
  }, [props.currentId]);

  return (
    <>
      <div className="completeForm">
        <div className="cerrar">
          <button onClick={() => props.setOpenModal(false)} className="close">
            <img src="Img/minimize.svg" alt="" />
          </button>
        </div>

        <div className="formAdd">
          <h1>Agregar Producto</h1>
          <form onSubmit={handleSubmit} className="addForm">
            <input
              type="text"
              placeholder="Nombre del producto"
              name="name"
              onChange={handleInputChange}
              value={values.name}
            />
            {/* <input
              name="category"
              placeholder="Categoria"
              onChange={handleInputChange}
              value={values.category}
              type="text"
            ></input> */}
            <input
              name="quantity"
              placeholder="Numero de unidades"
              onChange={handleInputChange}
              value={values.quantity}
              type="text"
            ></input>

            <input
              name="price"
              placeholder="Precio"
              onChange={handleInputChange}
              value={values.price}
              type="number"
            ></input>
            <input type="file" name="" id="" onChange={uploadImage} />
            <select name="category" onChange={handleInputChange}>
              <option value="none">Sin Categoria</option>
              <option value="Lol">League Of Legends</option>
              <option value="Play">Play Station</option>
              <option value="Xbox">Xbox one</option>
              <option value="Pc">Pc</option>
              <option value="Android">Android</option>
            </select>
            <button>
              {props.currentId === "" ? "GUARDAR PRODRUCTO" : "ACTUALIZAR"}
            </button>
          </form>
        </div>
        {/* <div className="imgForm">
          <img src={url || "http://via.placeholder.com/300"} alt="Imagen" />
          <progress value={progress} max="100" />
        </div> */}
      </div>
    </>
  );
};

export default ListformAdmin;
