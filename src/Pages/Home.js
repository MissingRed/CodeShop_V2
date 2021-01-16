import React, { useEffect, useContext } from "react";
import { AuthContext } from "../Database/Auth";
import Navbar from "../Components/Navbar";
import Chip from "../Components/Chip";
import Sidebar from "../Components/Sidebar";
import Banner from "../Components/Banner";
import Swal from "sweetalert2";

import "../Styles/Home.css";

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
      <div className="sticky-header">
        <Navbar />
        <Chip />
      </div>

      <div className="main-container">
        <div className="main-container__margin">
          <Sidebar />
          <Banner />
        </div>
      </div>
    </>
  );
};

export default Home;
