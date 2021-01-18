import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import Chip from "../Components/Chip";
import Sidebar from "../Components/Sidebar";
import Swal from "sweetalert2";
import "../Styles/Profile.css";

import { AuthContext } from "../Database/Auth";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  const buttonVerified = () => {
    currentUser
      .sendEmailVerification()
      .then(function () {
        Swal.fire(
          "Correo enviado!",
          "Revisa la bandeja de entrada de: " + currentUser.email,
          "success"
        );
      })
      .catch(function (error) {
        Swal.fire("Error", "Error inesperado", "error");
        console.log(error);
      });
  };

  return (
    <>
      <div className="sticky-header">
        <Navbar />
        <Chip />
      </div>
      <div className="main-container">
        <div className="main-container__margin">
          <Sidebar />
          <div className="main-contianer__store">
            <h2>Perfil</h2>
            <div className="profile-info">
              <div className="dataProfile">
                <div className="probar">
                  <div className="currentUser">
                    <div className="infoxd">
                      <div className="separador">
                        <div className="wrapp">
                          <p className="negrilla">Usuario</p>
                          <p>{currentUser.displayName}</p>
                        </div>
                        <div className="wrapp">
                          <p className="negrilla">E-Mail</p>
                          <p>{currentUser.email}</p>
                        </div>
                        <div className="wrapp">
                          <p className="negrilla">Verificación de Email</p>
                          <div>
                            {currentUser.emailVerified === false ? (
                              <button
                                onClick={buttonVerified}
                                className="main-profile__button"
                              >
                                <img src="Img/alert.svg" alt="" />
                                Enviar correo de verificación
                              </button>
                            ) : (
                              <div className="verificado">
                                <span>Correo Verifiado</span>
                                <img src="Img/check.svg" alt="" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="img">
                        <img
                          src={
                            currentUser.photoURL === null
                              ? "Img/defaultUser_img.png"
                              : currentUser.photoURL
                          }
                          alt="User"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="info-edit">
                    <p className="negrilla">Ultima conexión</p>
                    <p>{currentUser.metadata.lastSignInTime}</p>
                  </div>
                </div>
              </div>
              <div className="change">
                <div className="probar1">
                  <p className="negrilla">Contraseña</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
