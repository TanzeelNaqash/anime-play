import React, { useEffect } from 'react';
import AnimeCard from './AnimeCard';
import { fetchTrendingAnime } from '../Redux/AnimeSlice';
import { useDispatch, useSelector } from 'react-redux';

const Trending = () => {
  const dispatch = useDispatch();
  const { trendingAnime, loading, error } = useSelector((state) => state.anime);

  
  const filterContent = (content) => {
    return content.filter((item) => {
      const containsHentai = item.genres?.some((genre) => genre.name.toLowerCase() === 'hentai');
      return !containsHentai;  
    });
  };

  useEffect(() => {
    dispatch(fetchTrendingAnime());
  }, [dispatch]);

  if (loading) return (
    <div id="preloader">
      <div className="loader"></div>
    </div>
  );
  
  if (error) return <div>Error: {error}</div>;

  
  const filteredTrendingAnime = filterContent(trendingAnime);

  return (
    <div>
      <h2>Trending</h2>
      <div className="anime-list">
        {filteredTrendingAnime.length > 0 ? (
          filteredTrendingAnime.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))
        ) : (
          <p className="msg">No trending anime available.</p>
        )}
      </div>
    </div>
  );
};

export default Trending;
