import React,{useEffect} from "react";
import CardItem from "../../components/CardItem/CardItem";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navigation/NavBar";
import "./style.scss";

function FavoritePage() {
  let favorite = JSON.parse(localStorage.getItem("favorite"));
  // console.log(favorite);
 

  return (
    <div>
      <div className="container favorite">
        <h2>Избранное</h2>
        <p className="favorite__items">Товаров в избранном: {favorite?.length}</p>
        <div className="favorite__cards">
          {favorite?.map(card=>{
            return <CardItem card={card}/>
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default FavoritePage;
