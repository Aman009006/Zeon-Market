import React, { useEffect, useState } from "react";
import CardItem from "../../components/CardItem/CardItem";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navigation/NavBar";
// import { onSnapshot ,collection,query } from "firebase/firestore";
import {firestore} from '../../firebade-config'
import { collection, onSnapshot, query } from "firebase/firestore";
import "./style.scss";



function FavoritePage() {
let favorite = JSON.parse(localStorage.getItem('favorite'))

  useEffect(() => {
    const q = query(collection(firestore, 'favorite'))
    const getFavorites = onSnapshot(q, (querySnapshot) => {
      let arr = []
      querySnapshot.forEach(doc => {
        arr.push({...doc.data(), id: doc.id})
      })
      console.log(arr);
    }) 
    console.log(firestore);
    return () => getFavorites()
  }, [])

 

  return (
    <div>
      <div className="container favorite">
        <h2>Избранное</h2>
        <p  className="favorite__items">
          Товаров в избранном: {favorite?.length}
        </p>
        <div className="favorite__cards">
          {favorite?.map((card) => {
            return <CardItem card={card} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default FavoritePage;
