import React, { useState, useEffect } from "react";
import axios from "axios";
import CollectionItem from "../CollectionItem/CollectionItem";
import CardItem from "../CardItem/CardItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./style.scss";

function NewSeller() {
  const [cards, setCards] = useState([]);
  const [limit, setLimit] = useState(4);

  useEffect(() => {
    axios(
      `https://still-island-00146.herokuapp.com/api/v1/store/collections/?limit=${limit}`
    )
      .then(function (response) {
        setCards(response.data.results);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, [limit]);

  return (
    <div className="best">
      <div className="container">
        <h2 className="best__title">Коллекция</h2>
        <div className="collection__cards">
          {cards.map((card) => {
            return (
              <div>
                <CollectionItem card={card} />
              </div>
            );
          })}
        </div>
        <button
          onClick={() => setLimit(limit + 4)}
          className="best__btn desktop"
        >
          Еще
        </button>
        <div className="collection__cards-mobile">
          <Swiper
            spaceBetween={50}
            slidesPerView={1.3}
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
          >
            {cards.map((card) => {
              return (
                <SwiperSlide>
                  <CollectionItem card={card} />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <button onClick={() => setLimit(limit + 4)} className="best__btn ">
            Еще
          </button>
        </div>
      </div>
    </div>
  );
}
export default NewSeller;
