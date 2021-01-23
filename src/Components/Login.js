import React, { useContext, useCallback } from "react";
import { withRouter, Redirect } from "react-router";
import firebase from "firebase/app";
import "firebase/auth";
import { AuthContext } from "../Database/Auth.js";
import app from "../Database/Base.js";

import "../Styles/Login_Register.css";

const Login = ({ history }) => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const googleAuth = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .catch((err) => {
        alert(err);
      });
  };

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/Home");
      } catch (error) {
        alert("Error al inciar sesión");
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/Home" />;
  }
  return (
    <>
      <form className="main-log_container-form_form" onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          className="main-log_container-form_input"
          placeholder="Correo electronico"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="main-log_container-form_input"
        />
        <div className="main-log__container-options">
          <button className="main-log__container-options_button" type="submit">
            INICIAR SESIÓN
          </button>
          <span className="main-log__container-span">
            {/* ¿Olvidaste tu contraseña? */}
            <div className="main-log__container-google">
              <img
                src="Img/Google.png"
                alt="Google"
                className="main-log__container-google_img"
                onClick={googleAuth}
              />
            </div>
          </span>
        </div>
      </form>
    </>
  );
};

export default withRouter(Login);
