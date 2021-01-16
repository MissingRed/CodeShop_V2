import React from "react";
import "../Styles/Landing.css";
import Navbar from "../Components/Navbar";
import { NavLink } from "react-router-dom";

const Landing = () => {
  const videoSource = "Video/video.mp4";
  return (
    <>
      <div className="main-landing">
        <video
          autoPlay="autoplay"
          loop="loop"
          muted
          className="main-landing__video"
        >
          <source src={videoSource} type="video/mp4" />
        </video>

        <div className="main-landing__group-video">
          <div className="main-landing__group-items">
            <Navbar landing="CodeShop" />
            <div className="main-landing__group-content">
              <div className="main-landing__group-left">
                <div>
                  <h1>DISFRUTA EN GRANDE</h1>
                  <p className="main-landing__group-left_p">
                    Con el mejor contenido digital
                  </p>
                  <NavLink to="/Home" className="main-landing__button-store">
                    Ir a la Tienda
                  </NavLink>
                </div>
              </div>
              <div className="main-landing__group-right">
                <img
                  src="Img/xbox.png"
                  alt="xbox"
                  className="main-landing__group-right_img"
                />
                <h3> ̶$̶3̶2̶.̶0̶0̶0̶ HOY $25.900</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
