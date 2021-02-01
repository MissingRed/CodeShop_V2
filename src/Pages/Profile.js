import React, { useContext, useState } from "react";
import Navbar from "../Components/Navbar";
import Chip from "../Components/Chip";
import Sidebar from "../Components/Sidebar";
import Swal from "sweetalert2";
import "../Styles/Profile.css";

import { AuthContext } from "../Database/Auth";
import app from "../Database/Base.js";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [password, setPassword] = useState(false);

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
      });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const { password, Newpassword } = event.target.elements;
    try {
      await app
        .auth()
        .signInWithEmailAndPassword(currentUser.email, password.value);
      currentUser
        .updatePassword(Newpassword.value)
        .then(function () {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Contraseña cambiada con exito",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salio mal!, Vuelve a intentarlo",
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La contraseña actual es incorrecta!",
      });
    }
  };

  return (
    <>
      <div className="grid">
        <div className="header">
          <Navbar />
        </div>
        <div className="chip">
          <Chip />
        </div>
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="section">
          <div className="primary">
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

                        <p className="negrilla">Verificación de Email</p>
                        <div>
                          {currentUser.emailVerified === false ? (
                            <button
                              onClick={buttonVerified}
                              className="main-profile__button"
                            >
                              <img src="Img/alert.svg" alt="Alert" />
                              Enviar correo de verificación
                            </button>
                          ) : (
                            <div className="verificado">
                              <span>Correo Verificado</span>
                              <img src="Img/check.svg" alt="Check" />
                            </div>
                          )}
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
                        <div className="info-edit">
                          <p className="negrillaul">Ultima conexión</p>
                          <p className="tiempo">
                            {currentUser.metadata.lastSignInTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="change">
                <div className="probar1">
                  <p className="negrillaPass">Contraseña</p>

                  {password ? (
                    <form
                      className="main-log_container-form_form"
                      onSubmit={handleLogin}
                    >
                      <input
                        type="password"
                        name="password"
                        placeholder="Contraseña actual"
                        className="main-log_container-form_input"
                      />
                      <input
                        type="password"
                        name="Newpassword"
                        placeholder="Nueva contraseña"
                        className="main-log_container-form_input"
                      />
                      <button
                        className="main-log__container-options_button"
                        type="submit"
                      >
                        Guardar contraseña
                      </button>
                    </form>
                  ) : (
                    <div>
                      <span>*******************</span>
                      <div>
                        <button
                          className="main-profile__password_button"
                          onClick={() => setPassword(!password)}
                        >
                          Modificar Contraseña
                        </button>
                      </div>
                    </div>
                  )}
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
