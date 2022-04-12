import React from "react";
import './style.scss'

function Benefits() {
    return(
        <div className="benefits container">
            <h2 className="benefits__title">Наши преимущества</h2>
            <div className="benefits__cards">
                <div className="benefits__card">
                    <img src="/images/benefits/money.png"/>
                    <p className="benefits__subtitle">Удобные способы оплаты</p>
                    <p className="benefits__descr">Мы предлагаем возможность безналичной оплаты</p>

                </div>
                <div className="benefits__card">
                    <img src="/images/benefits/truck.png"/>
                    <p className="benefits__subtitle">Удобные способы оплаты</p>
                    <p className="benefits__descr">Мы предлагаем возможность безналичной оплаты</p>

                </div>
                <div className="benefits__card">
                    <img src="/images/benefits/Group.png"/>
                    <p className="benefits__subtitle mt-5">Удобные способы оплаты</p>
                    <p className="benefits__descr">Мы предлагаем возможность безналичной оплаты</p>

                </div>
                <div className="benefits__card">
                    <img src="/images/benefits/shop.png"/>
                    <p className="benefits__subtitle">Удобные способы оплаты</p>
                    <p className="benefits__descr">Мы предлагаем возможность безналичной оплаты</p>

                </div>
            </div>
        </div>
    )
}
export default Benefits;