import React,{useState} from "react";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navigation/NavBar";
import NewsItem from "../../components/NewsItem/NewsItem";
import "./style.scss";
import axios from "axios";


function NewsPage() {

  const [newsCard, setCards] = useState([]);



  axios(
    `https://still-island-00146.herokuapp.com/api/v1/news/posts/`
  )
    .then(function (response) {
      setCards(response.data.results);
    })
  
    .catch(function (error) {
      console.log(error);
    });


  return (
    <div>
      <div className="container news__content">
        <h2>Новости</h2>
        <div className="news__cards">
       
       {newsCard?.map(news=>{
        return <NewsItem news={news}/>
       })}

        </div>
      </div>
      <Footer />
    </div>
  );
}
export default NewsPage;
