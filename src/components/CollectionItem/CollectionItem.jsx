import React from "react";
import { Navigate, NavLink } from 'react-router-dom';

import './style.scss';

function CollectionItem(card) {

return(
    <div className="collection__item">
    
        <a href="#">
            <img src={card.card.image}/>
        </a>
        <p className="collection__item-descr">{card.card.name}</p>
        <button  className="collection__item-btn"> <NavLink to={"/collections/"+card.card.id}> <span>Смотреть все</span> </NavLink>  </button>
    </div>
)

}
export default CollectionItem;