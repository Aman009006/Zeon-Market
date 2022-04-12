import React, { useState, useEffect } from "react";
import "./style.scss";

function NewsItem({news}) {
  const [state, setState] = useState(true);

  console.log(news);
 
  return (
    <div>
      <div className="news__card">
        <img src={news.image} />
        <div className="news__title">
          <p className="news__descr">{news.title}</p>
          
            <p className="news__subtitle">
             {news.description}
            </p>
          
           {state ? <p className="news__subtitle-mobile">
              {news.description.substring(0,180)}
            </p> : <p className="news__subtitle-mobile">
              {news.description}
            </p>}
          
          <button onClick={() => setState(!state)} className="news__button">
           {state ? "Читать польностью" : "Скрыть"} 
          </button>
        </div>
      </div>
    </div>
  );
}
export default NewsItem;
