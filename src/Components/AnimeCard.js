import React from 'react';
import { Link } from 'react-router-dom';

const AnimeCard = ({ anime }) => {
  return (
    <div className="anime-item">
      <Link to={`/anime/${anime.mal_id}`}>
        <img src={anime.images.jpg.image_url} alt={anime.title} />
        <h3>{anime.title}</h3>
      </Link>
    </div>
  );
};

export default AnimeCard;
