import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import AnimeInfo from './Components/AnimeInfo';
import Trending from './Components/Trending';
import Manga from './Components/Manga';
import Search from './Components/Search';
import Random from './Components/RandomAnime';
import './App.css'
import MangaInfo from './Components/MangaInfo';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<AnimeInfo />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/manga" element={<Manga />} />
        <Route path="/manga/:id" element={<MangaInfo />} />
        <Route path="/search" element={<Search />} />
        <Route path="/random" element={<Random />} />
      </Routes>
      <footer>
        <div>
          <p>© AnimePlay | All rights reserved.</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
