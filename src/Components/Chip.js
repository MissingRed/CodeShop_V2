import React from "react";
import "../Styles/Chip.css";

const Chip = ({ Search, Filter }) => {
  return (
    <>
      <div className="main-chip">
        <div className="main-chip__separator">
          <div className="main-chip__item">
            <button
              className="main-chip__item_button"
              onClick={Filter}
              value=""
            >
              Todos
            </button>
          </div>
          <div className="main-chip__item">
            <button
              className="main-chip__item_button"
              onClick={Filter}
              value="League Of Legends"
            >
              <p>League Of Legends</p>
            </button>
          </div>
          <div className="main-chip__item">
            <button
              className="main-chip__item_button"
              onClick={Filter}
              value="Xbox"
            >
              Xbox One
            </button>
          </div>
          <div className="main-chip__item">
            <button
              className="main-chip__item_button"
              onClick={Filter}
              value="Play"
            >
              Play Station
            </button>
          </div>

          <div className="main-chip__item">
            <button
              className="main-chip__item_button"
              onClick={Filter}
              value="Valorant"
            >
              Valorant
            </button>
          </div>
          <div className="main-chip__item">
            <button
              className="main-chip__item_button"
              onClick={Filter}
              value="Clash Of Clans"
            >
              Clash Of Clans
            </button>
          </div>
        </div>

        <div className="main-chip__search">
          <img src="Img/search.svg" alt="" className="icon1" />
          <input
            type="text"
            className="main-chip__search_input"
            onChange={Search}
          />
        </div>
      </div>
    </>
  );
};

export default Chip;
