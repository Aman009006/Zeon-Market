import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navigation/NavBar";
import Carousel from "react-bootstrap/Carousel";
import "./style.scss";
import CardItem from "../../components/CardItem/CardItem";
import CardItemFive from "../../components/CardItemFive/CardItemFive";
import { Swiper, SwiperSlide } from "swiper/react";

function CardPage() {
  const param = useParams();

  let idProd = param.id;
  const [cards, setCards] = useState({});
  const [extraCard, setExtraCard] = useState([]);

  const [likepage, setLikePage] = useState(false);
  // const handleSelect = (selectedIndex, e) => {
  //   setIndex(selectedIndex);
  // };

  const [limit, setLimit] = useState(5);

  let navigatee = useNavigate();

  useEffect(() => {
    axios(
      `https://still-island-00146.herokuapp.com/api/v1/store/products/?limit=${limit}`
    )
      .then(function (response) {
        setExtraCard(response.data.results);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, [limit]);

  useEffect(() => {
    axios(
      `https://still-island-00146.herokuapp.com/api/v1/store/product/${idProd}/`
    )
      .then(function (response) {
        setCards(response.data);
        console.log(cards);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, [param]);

  const [baskets, setBasket] = useState(false);

  useEffect(() => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    basket?.map((id) => {
      if (id.id === cards.id) {
        setBasket(true);
      }
    });
  }, [baskets, cards]);

  function putCard(product) {
    let basket = JSON.parse(localStorage.getItem("basket"));

    if (!basket) {
      basket = [product];
      localStorage.setItem("basket", JSON.stringify(basket));
      return;
    }
    for (let i = 0; i < basket.length; i++) {
      if (basket[i].id === product.id) {
        setBasket(false);
        basket.splice(i, 1);
        localStorage.setItem("basket", JSON.stringify(basket));
        // setLikeProd(false)
        return;
      }
    }
    basket.push(product);
    setBasket(true);
    localStorage.setItem("basket", JSON.stringify(basket));
    return;
  }

  useEffect(() => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    favorite?.map((id) => {
      if (id.id === cards.id) {
        setLikePage(true);
      }
    });
  }, [likepage, cards]);

  function putProducts(product) {
    let favorite = JSON.parse(localStorage.getItem("favorite"));

    if (!favorite) {
      favorite = [product];
      localStorage.setItem("favorite", JSON.stringify(favorite));
      return;
    }
    for (let i = 0; i < favorite.length; i++) {
      if (favorite[i].id === product.id) {
        setLikePage(false);
        favorite.splice(i, 1);
        localStorage.setItem("favorite", JSON.stringify(favorite));
        // setLikeProd(false)
        return;
      }
    }
    favorite.push(product);
    setLikePage(true);
    localStorage.setItem("favorite", JSON.stringify(favorite));
    return;
  }

  function cutTags(str) {
    return str.replace(/<\/?[^>]+(>|$)/gi, "").replace(/&nbsp;/gi, " ");
  }

  return (
    <div>
      <div className="container card__page">
        <div className="card__page-img">
          {cards?.children_products?.map((image) => {
            return <img src={image.image} />;
          })}
        </div>

        <div className="mobile__page">
          <Carousel>
            {cards?.children_products?.map((image) => (
              <Carousel.Item>
                <img
                  className="d-block w-100 card__page_img"
                  src={image.image}
                  alt="Third slide"
                />

                <Carousel.Caption>
                  {/* <h3>Third slide label</h3>
                    <p>
                      Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p> */}
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        <div className="card__page-title hier">
          <h2>{cards.name}</h2>
          <div className="cpt">
            {" "}
            <p className="mtr">Артикул:</p> <p> {cards.vendor_code}</p>{" "}
          </div>
          <div className="cpt">
            {" "}
            <p>Color:</p>
            {/* {cards?.colors?.map((color) => {
              
              return <div className="clrs" id={color.name}></div> 
            })} */}
            {cards?.children_products?.map((image) => {
              return <div  className="clrs" id={image.color_name}></div>;
            })}
            {/* {cards.colors.map(color => {

              console.log(color);

              return <div className="clrs" id={color.name}></div>
            })} */}
          </div>
          <div className="pricecp">
            <h2 className="pricecp">{cards.price} p</h2>{" "}
            {cards.old_price && (
              <p className="old__price">{cards.old_price} p</p>
            )}
          </div>
          <p className="about__prod">О товаре:</p>
          <p className="about__prod-title">
            {cutTags(cards ? cards.description || "" : "")}
          </p>
          <div className="about__card-page">
            <div className="div ">
              <div className="size__card">
                <p>Размерный ряд: </p>
                {/* <p>42-50</p> */}
                <p>{cards.size}</p>
              </div>
              <div className="size__card">
                <p>Состав ткани: </p>
                <p>{cards.fabric_structure}</p>
              </div>
            </div>
            <div className="div">
              <div className="size__card">
                <p>Количество в линейке : </p>
                <p>{cards.number_in_ruler}</p>
              </div>
              <div className="size__card">
                <p>Материал: </p>
                <p>{cards.material}</p>
              </div>
            </div>
          </div>
          <div className="card__page-btns">
            {baskets ? (
              <button
                onClick={() => navigatee("/cort")}
                className="card__page-btn card__page-btn-pay"
              >
                <div>Перейти в корзину</div>
              </button>
            ) : (
              <button
                onClick={() => putCard(cards)}
                className="card__page-btn card__page-btn-pay"
              >
                <img src="/images/add.svg" /> Добавить в корзину
              </button>
            )}
            <button
              onClick={() => {
                putProducts(cards);
              }}
              className="card__page-btn card__page-like"
            >
              {likepage ? (
                <img src="/images/likepage.svg" />
              ) : (
                <img src="/images/like.svg" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <h2 className="mbprod">Похожие товары</h2>
        <div className="mbnew desktop">
          {extraCard.map((card) => {
            return <CardItemFive card={card} />;
          })}
        </div>

        <div className="mbnew mobilen">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
          >
            {extraCard.map((card) => {
              return (
                <SwiperSlide>
                  {" "}
                  <CardItemFive card={card} />{" "}
                </SwiperSlide>
              );
            })}
            {/* {cards.map((card) => {
              return (
                <SwiperSlide>
                  <CardItem card={card} />
                </SwiperSlide>
              );
            })} */}
          </Swiper>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default CardPage;
