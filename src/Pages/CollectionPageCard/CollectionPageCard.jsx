import React,{useEffect,useState} from "react";
import CollectionItem from "../../components/CollectionItem/CollectionItem";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navigation/NavBar";
import axios from "axios";
import "./style.scss";
import { useParams } from "react-router-dom";
import CardItem from "../../components/CardItem/CardItem";

function CollectionPage() {
  const [collection ,setCollection] = useState([]);
  const [limit,setLimit]=useState(8)


const param = useParams()
const paramId = param.id
console.log(param);

  useEffect(() => {
    axios(`https://still-island-00146.herokuapp.com/api/v1/store/similar-products/${paramId}/100/`)
      .then(function (response) {
        // console.log(response.data.results);
        setCollection(response.data);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, []);
 
  console.log(collection);

  return (
      <div>
      <div className="container collection__content">
        <h2> {'Коллекция '+ param.id}</h2>
        <div className="collection__items">
        {collection?.map(card => {
        
            return <div className="cardcoll"><CardItem card={card}/></div>
        })}

        </div>
      </div>
      <Footer />
    </div>
  );
}
export default CollectionPage;
