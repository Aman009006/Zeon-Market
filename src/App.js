import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./components/Main";
import "./App.css";
import MainSlider from "./components/Slider/MainSlider";
import AboutPage from "./Pages/AboutPage/AboutPage";
import CollectionPage from "./Pages/CollectionPage/CollectionPage";
import CollectionPageCard from "./Pages/CollectionPageCard/CollectionPageCard";
import NewsPage from "./Pages/NewsPage/NewsPage";
import HelpPage from "./Pages/HelpGage/HelpPage";
import FavoritePage from "./Pages/FavoritePage/FavotitePage";
import CortPage from "./Pages/CortPage/CortPage";
import PublicPage from "./Pages/PublicPage/PublicPage";
import CardPage from "./Pages/CardPage/CardPage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import NavBar from "./components/Navigation/NavBar";

export default function App() {
 
  const [data,setData] = useState([])
  const [words,setWords] = useState()

  const handleData = (arg) =>{
    setData(arg)
  }
  const getWord = (arg) =>{
    setWords(arg)
  }


  return (
    <div>
        <NavBar getWord={getWord} handleData = {handleData} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/collections" element={<CollectionPage />} />
          <Route path="/collections/:id" element={<CollectionPageCard />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/favorite" element={<FavoritePage />} />
          <Route path="/cort" element={<CortPage />} />
          <Route path="/public" element={<PublicPage />} />
          <Route path="/card/:id" element={<CardPage />} />
          <Route path="/search" element={<SearchPage data={data} words={words} />} />
        </Routes>
    </div>
  );
}
