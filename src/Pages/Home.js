import React, { useEffect, useContext } from "react";
import { AuthContext } from "../Database/Auth";
// import app from "../Database/Base.js";
import Navbar from "../Components/Navbar";
import Chip from "../Components/Chip";
import "../Styles/Home.css";
import Swal from "sweetalert2";

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      if (!currentUser.emailVerified) {
        Swal.fire({
          title: "Verifica tu correo!",
          text: "Por favor verifica tu correo para poder comprar",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Enviar correo de verifiación",
        }).then((result) => {
          if (result.isConfirmed) {
            currentUser
              .sendEmailVerification()
              .then(function () {
                Swal.fire(
                  "Enviado!",
                  "Revisa tu bandeja de entrada",
                  "success"
                );
              })
              .catch(function (error) {
                Swal.fire("Error", "Error inesperado", "error");
                console.log(error);
              });
          }
        });
      }
    }
  }, [currentUser]);

  return (
    <>
      <Navbar />
      <div className="main-container">
        <Chip />
        <h1>Home</h1>
      </div>

      {/* 
      <p>{currentUser.displayName}</p>
      <button onClick={() => app.auth().signOut()}>Cerrar Sesión</button> */}
    </>
  );
};

export default Home;
