import React from "react";
import "../Styles/Chip.css";

const Chip = () => {
  return (
    <>
      <div className="main-chip">
        <div className="main-chip__separator">
          <div className="main-chip__item">
            <button className="main-chip__item_button">Todos</button>
          </div>
          <div className="main-chip__item">
            <button className="main-chip__item_button">
              <p>League Of Legends</p>
            </button>
          </div>
          <div className="main-chip__item">
            <button className="main-chip__item_button">Fortnite</button>
          </div>
          <div className="main-chip__item">
            <button className="main-chip__item_button">Play Station</button>
          </div>

          <div className="main-chip__item">
            <button className="main-chip__item_button">Valorant</button>
          </div>
          <div className="main-chip__item">
            <button className="main-chip__item_button">Clash Of Clans</button>
          </div>
        </div>

        <div className="main-chip__search">
          <img src="Img/search.svg" alt="" className="icon1" />
          <input type="text" className="main-chip__search_input" />
        </div>
      </div>
    </>
  );
};

export default Chip;
