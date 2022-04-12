import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navigation/NavBar";
import Accordion from "react-bootstrap/Accordion";
import "./style.scss";

function HelpPage() {

  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios(`https://still-island-00146.herokuapp.com/api/v1/site/questions-answers/`)
      .then(function (response) {
        setCards(response.data.results.data);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="container help">
        <img src="/images/news.png" />
        <div className="help__accordion">
          <h2>Помощь</h2>
          <div className="accordion__help">
          <Accordion defaultActiveKey="0">

          {cards.map(card=>{
           
            return   <Accordion.Item eventKey={card}>
              <Accordion.Header>{card.question}</Accordion.Header>
              <Accordion.Body>
              {card.answer}
              </Accordion.Body>
            </Accordion.Item>
          })}
            
          </Accordion>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default HelpPage;