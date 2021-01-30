import React from "react";
import "../Styles/Banner.css";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <>
      <div className="main-banner">
        <div className="main-banner__offer">
          <div className="main-banner__offer_title">
            <h3>ASSASSIN'S CREED VALHALLA</h3>
            <div className="main-banner__offer_buttons">
              <Link
                className="main-banner__offer_button_buy"
                to="Product/pszTHeE5SNwE5QD6r7hV"
              >
                <p className="main-banner__offer_buy">Comprar Ahora</p>
              </Link>
              <div className="main-banner__offer_button_buy color-black">
                <p className="main-banner__see-review">Ver Review</p>
              </div>
            </div>
          </div>
          <video
            src="https://store.ubi.com/on/demandware.static/-/Library-Sites-shared-library-web/default/dw8d0e1650/landings/2020/acv-hero/video.mp4"
            autoPlay
            playsInline
            loop
          ></video>
        </div>
        <div className="main-banner__video">
          <iframe
            title="videoFrame"
            width="100%"
            height="70%"
            src="https://www.youtube.com/embed/7K7xXyNIuv4?controls=0"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <h4 className="main-banner__title">ASSASSIN'S CREED VALHALLA</h4>
          <p className="main-banner__subtitle">
            El Amo y el señor de Inglaterra
          </p>
        </div>
      </div>
    </>
  );
};

export default Banner;
