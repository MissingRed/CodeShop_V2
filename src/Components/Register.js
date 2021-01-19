import React, { useContext, useState, useCallback } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import app from "../Database/Base.js";
import { Redirect, withRouter } from "react-router";
import { AuthContext } from "../Database/Auth.js";

const Register = ({ history }) => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const [values, setValues] = useState();

  const handleInputChange = () => {
    setValues({ ...values });
  };
  const handleRegister = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password, user } = event.target.elements;
      setValues({ email, password, user });
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
          .then(function (result) {
            return result.user.updateProfile({
              displayName: user.value,
            });
          });
        history.push("/Home");
      } catch (error) {
        alert("Error");
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  const googleAuth = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .catch((err) => {
        alert(err);
      });
  };

  if (currentUser) {
    return <Redirect to="/Home" />;
  }

  return (
    <>
      <form className="main-log_container-form_form" onSubmit={handleRegister}>
        <input
          type="text"
          className="main-log_container-form_input"
          name="user"
          placeholder="Nombre de Usuario"
          onChange={handleInputChange}
        />
        <input
          className="main-log_container-form_input"
          name="email"
          type="email"
          placeholder="Correo electronico"
          onChange={handleInputChange}
        />
        <input
          className="main-log_container-form_input"
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleInputChange}
        />

        <div className="main-log__container-options">
          <button className="main-log__container-options_button" type="submit">
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

export default withRouter(Register);
