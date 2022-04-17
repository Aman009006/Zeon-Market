import React, { useEffect, useState } from "react";
import CollectionItem from "../../components/CollectionItem/CollectionItem";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navigation/NavBar";
import axios from "axios";
import "./style.scss";

function CollectionPage() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios(`https://still-island-00146.herokuapp.com/api/v1/store/collections/`)
      .then(function (response) {
        setCards(response.data.results);
        console.log('hello',response.data.results.length);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [currenPage, setCurrenPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(2);

  const lastCountryIndex = currenPage * countPerPage;
  const firstCountryIndex = lastCountryIndex - countPerPage;
  const currenCountry = cards.slice(firstCountryIndex, lastCountryIndex);

  const pageNumbers = [];

  const totalCountries = cards.length;

  for (let i = 1; i < Math.ceil( totalCountries / countPerPage); i++) {
    pageNumbers.push(i);
  }
  const paginate = pageNumber => setCurrenPage(pageNumber)
  const nextPage = () =>setCurrenPage(prev => prev+1)
  const prevPage = () =>setCurrenPage(prev => prev-1)

  return (
    <div>
      <div className="container collection__content">
        <h2>Коллекции</h2>
        <div className="collection__items">
          {currenCountry.map((card) => {
            return (
              <div className="collme">
                <CollectionItem card={card} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="container">
      <div className="pagination">
      <button onClick={()=> currenPage===1 ? null : prevPage()}  > <img className="bh" src="/images/poll.svg"/><img className="white" src="/images/wprev.svg"/>  </button>
        <div className="numberss">
          {pageNumbers.map((number) => (
            <a href="#"className={currenPage === number && "black"} onClick={()=> paginate(number)} >{number}</a>
          ))}
        </div>
      <button onClick={()=> currenPage===3 ? null : nextPage()} ><img className="bh" src="/images/colll.svg"/> <img className="white" src="/images/wnext.svg"/> </button>

      </div>
      </div>
      <Footer />
    </div>
  );
}
export default CollectionPage;
