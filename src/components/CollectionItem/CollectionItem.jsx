import React, { Component } from "react";
import { Navigate, NavLink } from "react-router-dom";

import "./style.scss";

function CollectionItem(card) {
  return (
    <div className="collection__item">
      <a className="ccc" href="#">
        <img src={card.card.image} />
      </a>
      <p className="collection__item-descr">{card.card.name}</p>
      <button className="collection__item-btn">
        {" "}
        <NavLink to={"/collections/" + card.card.id}>
          {" "}
          <span>Смотреть все</span>{" "}
          <img className="white_arr" src="/images/coll.svg" />{" "}
          <img className="black_arr" src="/images/colll.svg" />{" "}
        </NavLink>{" "}
      </button>
    </div>
  );
}
export default CollectionItem;
