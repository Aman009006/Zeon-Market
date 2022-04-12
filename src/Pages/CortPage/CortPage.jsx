import React, { useState, useEffect } from "react";
import CortCard from "../../components/CortCard/CordCard";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navigation/NavBar";
import Modal from "react-bootstrap/Modal";
import "./style.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";

function CortPage() {
  const [showAll, setShowAll] = useState(true);

  function checkwidth(e) {
    let width = window.innerWidth;
    if (width > 750) {
      setShowAll(true);
    }
  }
  window.addEventListener("resize", (e) => checkwidth(e));

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [checked, setchecked] = useState(false);

  //--------------------------------------------------------------------

  const [likeProd, setLikeProd] = useState(false);

  const [corts, useCorts] = useState([]);

  function putCard(product) {
    let basket = JSON.parse(localStorage.getItem("basket"));

    if (!basket) {
      basket = [product];
      localStorage.setItem("basket", JSON.stringify(basket));
      return;
    }
    for (let i = 0; i < basket.length; i++) {
      if (basket[i].id === product.id) {
        setLikeProd(false);
        basket.splice(i, 1);
        localStorage.setItem("basket", JSON.stringify(basket));
        // setLikeProd(false)
        return;
      }
    }
    basket.push(product);
    setLikeProd(true);
    localStorage.setItem("basket", JSON.stringify(basket));
    return;
  }
  let basket = JSON.parse(localStorage.getItem("basket"));

  //------------------------------------------------------------------

  // console.log();

  const [countProdSum, setCountProdSum] = useState(0);
  const getTotalSum = (arg, option) => {
    setCountProdSum((prev) => {
      if (option == "plus") {
        return prev + arg;
      } else if (option == "minus") {
        return prev - arg;
      }
    });
  };

  const [countp, setCountP] = useState(0);
  const getTotalCount = (arg, option) => {
    setCountP((prev) => {
      if (option == "plus") {
        return prev + arg;
      } else if (option == "minus") {
        return prev - arg;
      }
    });
  };

  const [countDis, setCountdis] = useState(0);
  const getDis = (arg, option) => {
    setCountdis((prev) => {
      if (option == "plus") {
        return prev + arg;
      } else if (option == "minus") {
        return prev - arg;
      }
    });
  };

  const [orderBas, setOrderBas] = useState({});
  function takeData(e) {
    let objNew = {
      ...orderBas,
      [e.target.name]: e.target.value,
    };
    setOrderBas(objNew);
  }



  function pushDataOrder() {

    localStorage.removeItem("basket");
    const options = {
      url: "https://still-island-00146.herokuapp.com/api/v1/store/order/",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        user_data: {
          first_name: orderBas.name,
          last_name: orderBas.surname,
          mail: orderBas.mail,
          phone_number: `${orderBas.fnumber} ${orderBas.number}`,
          country: orderBas.country,
          city: orderBas.city,
        },
        products: [
          {
            id: 1,
            quantity: 2,
          },
          {
            id: 2,
            quantity: 1,
          },
        ],
      },
    };

    axios(options).then((response) => {
      response.status === 200 && setShowOk(true)
    });
  }
  const [showOk, setShowOk] = useState(false);

  // countp  < 1 && setCountProdSum(0)

  return (
    <div>
      <div className="container cort__page">
        <div className="card__cort-page">
          {basket?.map((basketsi) => {
            return (
              <CortCard
                getTotalCount={getTotalCount}
                getDis={getDis}
                getTotalSum={getTotalSum}
                setLikeProd={setLikeProd}
                putCard={putCard}
                basketsi={basketsi}
              />
            );
          })}
        </div>
        <div className="cort__total">
          {showAll && (
            <div>
              {" "}
              <p className="cort__total-title">Сумма заказа</p>
              <div className="count__total">
                <p>Количество линеек:</p>
                <p className="price__cort">{basket?.length} шт</p>
              </div>
              <div className="count__total">
                <p>Количество товаров:</p>
                <p className="price__cort">{countp} шт</p>
              </div>
              <div className="count__total">
                <p>Стоимость:</p>
                <p className="price__cort">{countProdSum} рублей</p>
              </div>
              <div className="count__total">
                <p>Скидка:</p>
                <p className="price__cort">{countDis} рублей</p>
              </div>
              <div className="dashed"></div>
            </div>
          )}
          <div className="count__total-sum">
            <p>Итого к оплате:</p>
            <p className="price__cort">{countProdSum} рублей</p>
          </div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="cort__btn hide__btn"
          >
            {showAll ? "Скрыть" : "Информация о заказе"}
          </button>
          <button onClick={() => handleShow()} className="cort__btn">
            Оформить заказ
          </button>
        </div>
      </div>
      <Footer />
      <div className="popup">
      { showOk ?
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="modal_class">
            <img src="/images/thanks.svg" /> <h2>Спасибо!</h2>
            <p>Ваша заявка была принята ожидайте, скоро Вам перезвонят</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setShow(false)} className="collback__modal_bl">
            Продолжить покупки
          </button>
        </Modal.Footer>
      </Modal>
        :
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Оформление заказа</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal__inputfor">
              <p>Ваше имя</p>
              <input
                onChange={takeData}
                name="name"
                placeholder="Например Иван"
              />
            </div>
            <div className="modal__inputfor">
              <p>Ваше фамилия</p>
              <input
                onChange={takeData}
                name="surname"
                placeholder="Например Иванов"
              />
            </div>
            <div className="modal__inputfor">
              <p>Электронная почта</p>
              <input
                onChange={takeData}
                name="mail"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="modal__inputfor">
              <p>Ваш номер телефона</p>
              <div className="number_for">
                <select
                  onChange={takeData}
                  name="fnumber"
                  className="number_select"
                >
                  <option>🇰🇬 +996</option>
                  <option>🇰🇵 +7</option>
                  <option>🇰🇷 +34</option>
                </select>
                <input
                  onChange={takeData}
                  name="number"
                  placeholder="Введите номер телефона"
                />
              </div>
            </div>
            <div className="modal__inputfor">
              <p>Страна</p>
              <input
                onChange={takeData}
                name="country"
                placeholder="Введите страну"
              />
            </div>
            <div className="modal__inputfor">
              <p>Город</p>
              <input
                onChange={takeData}
                name="city"
                placeholder="Введите город"
              />
            </div>
            <div className="public__off">
              <input onClick={() => setchecked(!checked)} type="checkbox" />
              <span>
                Согласен с условиями{" "}
                <NavLink className="blue" to="/public">
                  публичной оферты
                </NavLink>
              </span>
            </div>
            <button
              onClick={() => pushDataOrder()}
              className={checked ? "modal__cortbtn" : "none__check"}
            >
              Заказать
            </button>
          </Modal.Body>
        </Modal>}
      </div>
    </div>
  );
}
export default CortPage;
