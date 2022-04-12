import React,{useEffect} from "react";
import {NavLink} from 'react-router-dom'
import "./style.scss";

function Footer() {

  useEffect(() => {
    window.scrollTo(0,0)
  }, []);
  

  return (
    <div className="footer">
      <div className="container">
        <div className="footer__content ">
          <img src="/images/footer-logo.svg" />
          <div className="footer__adres">
            <div className="footer__desck">
              <p className="footer__title-p">Компания</p>
              <NavLink to="/about">О нас</NavLink>
              <NavLink to="/news"> Новости</NavLink>
              <NavLink to="/help"> Помощь</NavLink>
            </div>
            <div className="footer__desck">
              <p className="footer__title-p">Контакты</p>
              <a href="#" className="footer__desck-p">
                <div className="df">
                  <img src="/images/icons/phone.svg" />{" "}
                  <a href="tel:+996 500 123 456">+996 500 123 456</a>
                </div>
              </a>
              <a href="#" className="footer__desck-p">
                <div className="df">
                  <img src="/images/icons/phone.svg" />
                  <a href="tel:+996 500 123 456">+996 500 123 456</a>
                </div>
              </a>
              <a href="#" className="footer__desck-p">
                <div className="df">
                  <img src="/images/icons/mail.svg" />
                  <span>mail@gmail.com</span>
                </div>
              </a>
            </div>
            <div className="footer__desck">
              <p className="footer__title-p">Мы в социальных сетях:</p>
              <a href="#" className="footer__desck-p">
                <div className="dff">
                  <img src="/images/icons/insta.svg" />
                  <span>Instagram</span>
                </div>
              </a>
              <a href="#" className="footer__desck-p">
                <div className="dff">
                  <img src="/images/icons/telegram.png" />
                  <span>Telegram</span>
                </div>
              </a>
              <a href="#" className="footer__desck-p">
                <div className="dff">
                  <img src="/images/icons/whats.png" />
                  <span>Whatsapp</span>
                </div>{" "}
              </a>
            </div>
          </div>
        </div>
        <p className="footer__why">Developed by Zeon 2022</p>
      </div>
    </div>
  );
}
export default Footer;
