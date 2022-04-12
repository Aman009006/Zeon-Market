import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import "./style.scss";

function MainSlider() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios(`https://baha19.pythonanywhere.com/api/site/sliders-create/`)
      .then(function (response) {
        setCards(response.data);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="container slider">
      <Carousel>
        {cards.map((image) => {
          return (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={image.image}
                alt="First slide"
              />
              <Carousel.Caption>
                {/* <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

export default MainSlider;
