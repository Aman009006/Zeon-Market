import React, { useState, useEffect } from "react";
import "./style.scss";

function CortCard({ getTotalCount,getDis,basketsi ,setLikeProd,putCard,getTotalSum}) {
  const [count, setCount] = useState(1);
  const discountPrice =  basketsi.old_price !== null && (basketsi.old_price - basketsi.price)
  useEffect(() => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    basket?.map((id) => {
      if (id.id === basketsi.id) {
        setLikeProd(true);
      }
    });
  }, [basketsi]);
 
 
  useEffect(()=>{
  let discount = discountPrice *count
  let totalPrice = basketsi.price * count
  getTotalSum(totalPrice ,'plus');
  getDis(discount,"plus")
  getTotalCount(count,'plus')
},[])



const AddingSum = (arg) =>{
  setCount(count + 1)
  getDis(discountPrice,'plus')
  getTotalCount(1,'plus')
  getTotalSum(basketsi.price , 'plus')
}

const MinusSum = (arg) =>{
  setCount(count - 1)
  getDis(discountPrice,'minus')
  getTotalCount(1,'minus')
  getTotalSum(basketsi.price , 'minus')
}


  return (
    <div className="container cort__card">
      <div className="card__sort">
        <div className="cort__card-item">
        <img src={basketsi.children_products[0].image} />

          <div className="cort__card-title">
            <div className="sort__card__descr">
              <p className="card__title">{basketsi?.name}</p>
              <p className="card__subtitle">Размер: 42-52</p>
              <p className="card__color">
                Цвет:
                {basketsi?.children_products?.map((color) => {
                  return <div id={color.color_name}></div>;
                })}
              </p>

              <p className="card__price">{basketsi.price} р</p>
              <div className="count">
                <button
                  onClick={() => count > 1 && MinusSum()}
                  className="count__btn"
                >
                  -
                </button>
                <h2>{count}</h2>
                <button
                  onClick={() => AddingSum()}
                  className="count__btn"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <img
          onClick={() => {
            putCard(basketsi);

          }}
          className="close__cort"
          src="/images/closechat.svg"
        />
      </div>
    </div>
  );
}
export default CortCard;
