import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebade-config";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { EmailAuthProvider } from "firebase/auth";
import { getAuth, signInAnonymously, linkWithCredential } from "firebase/auth";

function AuthPage() {
  const [login, setLogin] = useState(false);

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPass, setRegisterPass] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const navToMain = useNavigate();

  function OnePerson() {
    const credential = EmailAuthProvider.credential(
      registerEmail,
      registerPass
    );

    linkWithCredential(auth.currentUser, credential)
      .then((usercred) => {
        const user = usercred.user;
        console.log("Anonymous account successfully upgraded", user);
      })
      .catch((error) => {
        console.log("Error upgrading anonymous account", error);
      });
  }

  // const register = async () => {
  //   try {
  //     const user = await createUserWithEmailAndPassword(
  //       auth,
  //       registerEmail,
  //       registerPass
  //     );
  //     navToMain("/");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const logIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPass
      );
      navToMain("/");
    } catch (err) {
      console.log(err);
    }
  };

  const [userr, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  //   console.log(auth.currentUser.email);

function regAno (){

  const credential = EmailAuthProvider.credential(registerEmail, registerPass);

  linkWithCredential(auth.currentUser, credential)
    .then((usercred) => {
      const user = usercred.user;
      console.log("Anonymous account successfully upgraded", user);
    })
    .catch((error) => {
      console.log("Error upgrading anonymous account", error);
    });
    navToMain("/");

}

  return (
    <div>
      <div className="container">
        <div className="signin_box">
          <div className="btns_for">
            <a onClick={() => setLogin(true)} className="btns_for_log">
              Войти
            </a>
            <a className="line"></a>
            <a onClick={() => setLogin(false)} className="btns_for_log">
              Регистрация
            </a>
          </div>
          {login ? (
            <div className="login_inp">
              <h2>Войти</h2>

              <p>Логин</p>
              <input
                onChange={(event) => {
                  setLoginEmail(event.target.value);
                }}
                placeholder="Aman@gmail.com"
              />
              <p>Пароль </p>
              <input
                onChange={(event) => {
                  setLoginPass(event.target.value);
                }}
                type="password"
                placeholder="Пароль"
              />
              <button onClick={logIn} className="btn_sign">
                Войти
              </button>
            </div>
          ) : (
            <div className="login_inp">
              <h2>Регистрация</h2>

              <p>Логин</p>
              <input
                onChange={(event) => {
                  setRegisterEmail(event.target.value);
                }}
                placeholder="Aman@gmail.com"
              />
              <p>Пароль </p>
              <input
                onChange={(event) => {
                  setRegisterPass(event.target.value);
                }}
                type="password"
                placeholder="Пароль"
              />

              <button
                onClick={()=>regAno()}
                className="btn_sign"
              >
                {" "}
                Зарегистрироваться
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AuthPage;
