import React from "react";
import "../Styles/Login_Register.css";

const Login_Register = () => {
  return (
    <>
      <div className="main-log">
        <div className="main-log__container">
          <div className="mani-log__container-margin">
            <div className="main-log__container-top">
              <div className="main-log_container-logo">
                <img
                  src="Img/Logo1.svg"
                  alt=""
                  className="main-log__container-img"
                />
                <h3 className="main-log__container-title">CODESHOP</h3>
              </div>
              <div className="main-log_container-form">
                <form className="main-log_container-form_form">
                  <input
                    type="text"
                    className="main-log_container-form_input"
                  />
                  <input
                    type="text"
                    className="main-log_container-form_input"
                  />
                  <div className="main-log__container-options">
                    <button className="main-log__container-options_button">
                      INICIAR SESIÓN
                    </button>
                    <span className="main-log__container-span">
                      ¿Olvidaste tu contraseña?
                    </span>
                  </div>
                  <div className="main-log__container-apart">
                    <hr className="main-log__container-apart_hr" />
                    <div className="main-log__container-apart_text">
                      <p>O</p>
                    </div>
                    <hr className="main-log__container-apart_hr" />
                  </div>
                  <div className="main-log__container-google">
                    <img
                      src="Img/Google.png"
                      alt=""
                      className="main-log__container-google_img"
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="main-log__container-create_account">
              <button className="main-log__container-create_account_button">
                Crear mi cuenta CodeShop !
              </button>
            </div>
          </div>
        </div>
        <div className="main-log__wallpaper">
          <div className="main-log__wallpaper-gradient"></div>
        </div>
      </div>
    </>
  );
};

export default Login_Register;
