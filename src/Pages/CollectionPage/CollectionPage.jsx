import React,{useEffect,useState} from "react";
import CollectionItem from "../../components/CollectionItem/CollectionItem";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navigation/NavBar";
import axios from "axios";
import "./style.scss";

function CollectionPage() {
  const [cards, setCards] = useState([]);
  const [limit,setLimit]=useState(8)



  useEffect(() => {
    axios(`https://baha19.pythonanywhere.com/api/store/collections-create/?page=1&page_size=${limit}`)
      .then(function (response) {
        setCards(response.data.results);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, [limit]);

  return (
    <div>
      <div className="container collection__content">
        <h2>Коллекции</h2>
        <div className="collection__items">
        {cards.map((card) => {
            
            return (
               <div> 
               <CollectionItem card={card} />
               </div>
            )
           
          })}
       
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default CollectionPage;
