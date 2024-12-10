import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchManga } from '../Redux/AnimeSlice';
import { Link } from 'react-router-dom';
import Search from './Search';

const Manga = () => {
  const dispatch = useDispatch();
  const { manga, loading, error } = useSelector((state) => state.anime);

  useEffect(() => {
    dispatch(fetchManga());
  }, [dispatch]);

  if (loading) {
    return (
      <div id="preloader">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      
      <Search SearchType="manga"/>

      <h2>Trending Manga</h2>
      <div className="anime-list">
        {manga.length > 0 ? (
          manga.map((mangaItem) => (
            <div key={mangaItem.mal_id} className="anime-item">
              <Link to={`/manga/${mangaItem.mal_id}`}>
                <img
                  src={mangaItem.images?.jpg?.image_url}
                  alt={mangaItem.title}
                  
                />
                <h3>{mangaItem.title}</h3>
              </Link>
            </div>
          ))
        ) : (
          <p>No manga found. Try a different search term.</p>
        )}
      </div>
    </div>
  );
};

export default Manga;
