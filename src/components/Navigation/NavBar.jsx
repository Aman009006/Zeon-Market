import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import HelperBtn from "../HelperBtn/HelperBtn";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import "./style.scss";
import SearchPage from "../../Pages/SearchPage/SearchPage";

function NavBar({ handleData, getWord }) {
  
  let basket = JSON.parse(localStorage.getItem("basket"));
  let favorite = JSON.parse(localStorage.getItem("favorite"));
    

  window.addEventListener("basket", function () {
    console.log("hello");
  });

  const [open, setOpen] = useState(false);

  const [inp, setInp] = useState(false);

  inp
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "scroll");

  const [bread, setBread] = useState(true);

  const location = useLocation();
  const folders = location.pathname.substring(1).split("/");

  const translate = (folder) => {
    switch (folder) {
      case "collections":
        return "Коллекции";
      case "collection":
        return "Коллекция";
      case "search":
        return "Результаты поиска";
      case "card":
        return "Продукт";
      case "about":
        return "О нас";
      case "news":
        return "Новости";
      case "cort":
        return "Корзина";
      case "favorite":
        return "Избранные";
      case "help":
        return "Помощь";
      default:
        return folder;
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setBread(false);
    } else {
      setBread(true);
    }
  }, [location.pathname]);

  let lockBr = location.pathname;
  const [words, setWords] = useState("");

  const [searchcards, setCards] = useState([]);
  // const [opensearch,setOpensearch]=useState(false)

  handleData(searchcards);
  // console.log(words);
  getWord(words);

  let Navigate = useNavigate();

  function searchValue(e) {
    setWords(e.target.value);
    // setOpensearch(true)
    Navigate("/search");

    axios(
      `https://still-island-00146.herokuapp.com/api/v1/store/products/?search=${words}`
    )
      .then(function (response) {
        setCards(response.data.results);
      })

      .catch(function (error) {
        console.log(error);
      });
  }
  const [searchHis, setSearchHis] = useState(false);
  // console.log(location.pathname);

  // words.length = 0 && setSearchHis(false)

  return (
    <div className="navBar">
      <div className="main-nav">
        <div className="nav">
          <div className="nav__content container">
            <div className="nav__up">
              <ul className="nav__ul">
                <li className="nav__li">
                  <NavLink to="/about">О нас</NavLink>{" "}
                </li>
                <li className="nav__li">
                  <NavLink to="/collections"> Коллекции</NavLink>{" "}
                </li>
                <li className="nav__li">
                  <NavLink to="/news"> Новости</NavLink>{" "}
                </li>
              </ul>
              <div className="nav__number">
                <span className="nav__phone">Тел:</span>
                <a href="tel:+996771904040" className="nav__phone_number">
                  +996 000 00 00 00
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="navigation">
          <div className="container nav__bar">
            <NavLink to="/">
              <img src="/images/logo192.png" />
            </NavLink>
            <div className="nav__search">
              <div
                className={
                  searchHis ? "search__history_tab" : "search__history_tab__tab"
                }
              >
                <div
                  className={
                    searchHis ? "search__history" : "search__history__tab"
                  }
                >
                  <input
                    placeholder="Поиск"
                    value={words}
                    onChange={(e) => {
                      searchValue(e);
                      setSearchHis(true);
                    }}
                    className="search__input"
                  />
                  <button
                    onClick={() => setSearchHis(false)}
                    className="search__btn"
                  >
                    <img src="/images/icons/search.svg" />
                  </button>
                </div>

                <div className={searchHis ? "posit" : "posit__tab"}>
                  {searchcards.map((card) => {
                    return (
                      <div
                        onClick={() => setWords(card.name)}
                        className={searchHis ? "wh_history" : "dn"}
                      >
                        {card.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="nav__btns">
              <button className="nav__btn" id="favorite__btn">
                <img src="/images/icons/favorite.svg" />{" "}
               {favorite?.length > 0 && <div className="red__circle"></div>}
                <span className="btn__title">
                  <NavLink to="/favorite">Избранное</NavLink>
                </span>
              </button>
              <div className="line"></div>
              <button className="nav__btn" id="cort__btn">
                {basket?.length>0 && <div className="red__circle"></div>}
                <img src="/images/icons/cort.svg" />{" "}
                <span className="btn__title">
                  <NavLink to="/cort">Корзина</NavLink>{" "}
                </span>
              </button>
            </div>
          </div>
        </div>
        {bread && (
          <div className=" breadcrum">
            <div className="container">
              <div>
                <a className="" href="/">
                  Главная
                </a>
                {folders.map((folder, index) => {
                  return (
                    <>
                      <span>/</span>
                      <NavLink
                        to={
                          "/" +
                          folders.filter((fold, i) => i <= index).join("/")
                        }
                      >
                        <span>{translate(folder)}</span>
                      </NavLink>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={open ? "menu_burger" : "non"}>
        <div onClick={() => setOpen(false)} className="close">
          <div className="buger__menu">
            <div className="close__pop">
              <h3>Меню</h3>{" "}
              <img
                onClick={() => setOpen(false)}
                src="/images/icons/close.svg"
              />
            </div>
            <p>
              <NavLink to="/about">О нас</NavLink>{" "}
            </p>
            <p>
              <NavLink to="/collections"> Коллекции</NavLink>{" "}
            </p>
            <p>
              <NavLink to="/news"> Новости</NavLink>{" "}
            </p>
            <div className="line"></div>
            <button className="nav__btn" id="favorite__btn">
              <img src="/images/icons/favorite.svg" />{" "}
              <span className="btn__title">
                <NavLink to="favorite">Избранное</NavLink>
              </span>
            </button>
            <button className="nav__btn" id="cort__btn">
              <img src="/images/icons/cort.svg" />{" "}
              <span className="btn__title">
                <NavLink to="/cort">Корзина</NavLink>{" "}
              </span>
            </button>
            <div className="mt-233">
              <div className="btn__title ">Свяжитсь с нами:</div>

              <a
                href="tel:+996771904040"
                className="nav__phone_number btn__title"
              >
                +996 000 00 00 00
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile">
        <button onClick={() => setOpen(true)}>
          <img className="burger__img" src="/images/burger.svg" />
        </button>
        <NavLink to="/">
          <img src="/images/logo192.png" />
        </NavLink>
        <button>
          {inp ? (
            <img
              onClick={() => setInp(!inp)}
              className="search__img"
              src="/images/close.svg"
            />
          ) : (
            <img
              onClick={() => setInp(!inp)}
              className="search__img"
              src="/images/icons/search.svg"
            />
          )}
        </button>
      </div>

      {inp && (
        <div className="input__search_m">
          <div className="container">
            <div className="mob_df">
              <div className="nav__search">
                <div
                  className={
                    searchHis
                      ? "search__history_tab"
                      : "search__history_tab__tab"
                  }
                >
                  <div
                    className={
                      searchHis ? "search__history" : "search__history__tab"
                    }
                  >
                    <input
                      placeholder="Поиск"
                      value={words}
                      onChange={(e) => {
                        searchValue(e);
                        setSearchHis(true);
                      }}
                      className="search__input"
                    />
                    <button
                      onClick={() => {
                        setSearchHis(false);
                        setInp(!inp);
                      }}
                      className="search__btn"
                    >
                      <img src="/images/icons/search.svg" />
                    </button>
                  </div>

                  <div className={searchHis ? "posit" : "posit__tab"}>
                    {searchcards.map((card) => {
                      return (
                        <div
                          onClick={() => setWords(card.name)}
                          className={searchHis ? "wh_history" : "dn"}
                        >
                          {card.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* <input
                className="search-mobile"
                placeholder="Поиск "
                onChange={(e) => {
                  searchValue(e);
                  setSearchHis(true);

                }}
              />
              <button onClick={()=>setInp(!inp)} className="search__btn">
                <img src="/images/icons/search.svg" />
              </button> */}
            </div>
          </div>
        </div>
      )}

      {bread && (
        <div className=" breadcrum-mobile">
          <div className="container">
            <div>
              <a className="" href="/">
                Главная
              </a>

              <a active>{lockBr}</a>
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <HelperBtn />
      </div>

      <div className=""></div>
    </div>
  );
}
export default NavBar;
