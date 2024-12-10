import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomAnime } from '../Redux/AnimeSlice';
import AnimeCard from './AnimeCard';

const Random = () => {
  const dispatch = useDispatch();
  const { randomAnime, loading, error } = useSelector((state) => state.anime);

  
  const filterContent = (content) => {
    return content.filter((item) => {
      const containsHentai = item.genres?.some((genre) => genre.name.toLowerCase() === 'hentai');
      return !containsHentai; 
    });
  };

  useEffect(() => {
    dispatch(fetchRandomAnime());
  }, [dispatch]);

  
  if (loading) return (
    <div id="preloader">
      <div className="loader"></div>
    </div>
  );

  if (error) return <div className='error'>Error: {error}</div>;

  
  const filteredAnime = filterContent(randomAnime);

  return (
    <div>
      <h2>Random Anime</h2>

     
      <div className="anime-list">
        {filteredAnime && filteredAnime.length > 0 ? (
          filteredAnime.map((anime, index) => (
            <AnimeCard key={index} anime={anime} />
          ))
        ) : (
          <p className='msg'>No random anime available.</p>
        )}
      </div>
    </div>
  );
};

export default Random;
