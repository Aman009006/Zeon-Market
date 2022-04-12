import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/Navigation/NavBar";
import Footer from "../../components/Footer/Footer";
import "./style.scss";
import CardItem from "../../components/CardItem/CardItem";
import CardItemFive from "../../components/CardItemFive/CardItemFive";

function SearchPage({ data , words }) {



  const [cards, setCards] = useState([]);
  const [limit,setLimit]=useState(5)

  useEffect(() => {
    axios(`https://still-island-00146.herokuapp.com/api/v1/store/products/?limit=${limit}`)
      .then(function (response) {
        setCards(response.data.results);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, [limit]);
  console.log( data.length !== 0 ? 'true' : 'false');





  return (
    <div>
      <div className="container">
        <h2 className="search__p">Результат поиска по вашему запросу:  {words} </h2>
        <div className="search__cards">
          {data.length !== 0 ? (
            data?.map((card) => {
              return <div key={card}>
                <CardItem card={card} />
              </div>;
            })
          ) :  (
            
            <div className="nothin_no">
              <p>По Вашему запросу ничего не найдено.</p>
              <h2>Возможно Вас заинтересует</h2>
             <div className="searchd">
             {cards.map(card=>{
                return  <CardItemFive card={card}/>
              })}
             </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default SearchPage;
