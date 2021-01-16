import React, { useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { Redirect } from "react-router";

import { AuthContext } from "../Database/Auth.js";

const Register = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const googleAuth = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .catch((err) => {
        alert(err);
      });
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/Home" />;
  }

  return (
    <>
      <form className="main-log_container-form_form">
        <input type="text" className="main-log_container-form_input" />
        <input type="text" className="main-log_container-form_input" />
        <input type="password" className="main-log_container-form_input" />

        <div className="main-log__container-options">
          <button className="main-log__container-options_button">
            REGISTRARSE
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

export default Register;
