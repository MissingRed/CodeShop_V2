import React from "react";

const Register = () => {
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
    </>
  );
};

export default Register;
