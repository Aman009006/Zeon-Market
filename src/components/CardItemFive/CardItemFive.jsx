import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { NavLink } from "react-router-dom";
import "./style.scss";

function CardItemFive(props) {
  const [index, setIndex] = useState(0);
  let idProd = props.card.id;
  const [likeProd, setLikeProd] = useState(false);

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
  function Up(){
    window.scrollTo(0,0)
  }

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  let sale = Math.floor(
    ((props.card.old_price - props.card.price) / props.card.old_price) * 100
  );

  useEffect(() => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    favorite?.map(id=>{
      if(id.id === props.card.id){
        setLikeProd(true);
      }
    })
  }, [likeProd]);

  function putProducts(product) {
    let favorite = JSON.parse(localStorage.getItem("favorite"));

    if (!favorite) {
      favorite = [product];
      localStorage.setItem("favorite", JSON.stringify(favorite));
      return;
    }
    for (let i = 0; i < favorite.length; i++) {

      if (favorite[i].id === product.id) {
        setLikeProd(false)
        favorite.splice(i, 1);
        localStorage.setItem("favorite", JSON.stringify(favorite));
        console.log(likeProd)
        // setLikeProd(false)
        return;
      } 
    }
    favorite.push(product);
    setLikeProd(true)
    localStorage.setItem("favorite", JSON.stringify(favorite));
    return;
  }
  return (
    <div className="card__smoll">
      <div className="card__container">
        {sale > 1 && (
          <div className="sale">
            <p>{sale}%</p>
          </div>
        )}
      </div>

      <div onClick={() => putProducts(props.card)} className="like_card">
        {likeProd ? (
          <img
            src="/images/likeeac.svg"
          />
        ) : (
          <img  src="/images/likee.svg" />
        )}
      </div>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {props.card?.children_products?.map((image) => (
          <Carousel.Item>
            <img
              className="smoll_img d-block w-100"
              src={image.image}
              alt="Third slide"
            />

            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <NavLink to={`/card/${idProd}`}>
      
        <div onClick={()=>Up()} className="card__descr_smoll">
          <p className="card__title">{props.card.name}</p>
          <div className="price__old__p">
            <p className="card__price">{props.card.price} р</p>
            {props.card.old_price && (
              <p className="card__price_old">{props.card.old_price} р</p>
            )}
          </div>
          <p className="card__subtitle">
            Размер: {props.card.size}
          </p>
          <div className="card__colors">
            
            {props.card?.children_products?.map((image) => (
              <div id={image.color_name}></div>
            ))}
          </div>
        </div>
      </NavLink>
    </div>
  );
}
export default CardItemFive;
