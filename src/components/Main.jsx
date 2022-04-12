import React from "react";
import NavBar from "./Navigation/NavBar";
import Footer from "./Footer/Footer";
import MainSlider from "./Slider/MainSlider";
import CardItem from "./CardItem/CardItem";
import BestSeller from "./BestSeller/BestSeller";
import NewSeller from "./NewSeller/NewSeller";
import Collection from "./Collection/Collection";
import CollectionItem from "./CollectionItem/CollectionItem";
import Benefits from "./Benefits/Benefits";

function Main() {
  return (
    <div>
      <MainSlider />
      <BestSeller/>
      <NewSeller/>
      <Collection/>
      <Benefits/>
      <Footer />
    </div>
  );
}
export default Main;
