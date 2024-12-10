import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendingAnime } from '../Redux/AnimeSlice';
import AnimeCard from './AnimeCard';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const { trendingAnime, loading: trendingLoading, error: trendingError } = useSelector(
    (state) => state.anime
  );

  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [lastSearch, setLastSearch] = useState('');
  const [searched, setSearched] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchType, setSearchType] = useState('anime');  

  const [latestAnime, setLatestAnime] = useState([]);
  const [latestloading, setLatestLoading] = useState(true);
  const [errormsg, setErrormsg] = useState(null);

  const location = useLocation();

  
  const resetSearch = () => {
    setSearch('');
    setData([]);
    setSearched(false);
    setSearchError('');
    setSearchLoading(false);
  };


  const filterContent = (content) => {
    return content.filter((item) => {
      const containsHentai = item.genres?.some((genre) => genre.name.toLowerCase() === 'hentai');
      return !containsHentai;  
    });
  };

  
  useEffect(() => {
    dispatch(fetchTrendingAnime());
  }, [dispatch]);

  
  const fetchLatestContent = async () => {
    try {
      let url = '';
      if (searchType === 'anime') {
        url = 'https://api.jikan.moe/v4/anime?sort=desc&limit=20';
      } else {
        url = 'https://api.jikan.moe/v4/manga?sort=desc&limit=20';
      }
      const response = await axios.get(url);
      const filteredData = filterContent(response.data.data);  
      setLatestAnime(filteredData);
    } catch (err) {
      setErrormsg('Failed to fetch latest content.');
    } finally {
      setLatestLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestContent();
  }, [searchType]);

  
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const fetchData = async (e) => {
    e.preventDefault();

    if (search.trim() === '') {
      setSearchError('Please enter a search term');
      setData([]);
      setSearched(true);
      return;
    }

    if (search === lastSearch) {
      return;
    }

    try {
      setSearchError('');
      setSearched(true);
      setSearchLoading(true);

      let apiUrl = '';
      if (searchType === 'anime') {
        apiUrl = `https://api.jikan.moe/v4/anime?q=${search}`;
      } else {
        apiUrl = `https://api.jikan.moe/v4/manga?q=${search}`;
      }

      const response = await axios.get(apiUrl);
      const filteredData = filterContent(response.data.data);  // Apply content filter
      setData(filteredData);
      setLastSearch(search);
    } catch (err) {
      setSearchError('Failed to fetch data. Please try again.');
      setData([]);
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      resetSearch();
    }
  }, [location.pathname]);

  return (
    <div className="container">
      <div className="searchbar">
        <form onSubmit={fetchData}>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder={`Search ${searchType}...`}
          />
          <button type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>

       
        <div>
          <i className='fas fa-filter'></i>
          <label>
            <input
              type="radio"
              name="searchType"
              value="anime"
              checked={searchType === 'anime'}
              onChange={() => setSearchType('anime')}
            />
            Anime
          </label>
          <label>
            <input
              type="radio"
              name="searchType"
              value="manga"
              checked={searchType === 'manga'}
              onChange={() => setSearchType('manga')}
            />
            Manga
          </label>
        </div>
      </div>

      {searchLoading && (
        <div id="preloader">
          <div className="loader"></div>
        </div>
      )}

      {searched && searchError && <div className="error">{searchError}</div>}

      
      <div className="anime-list">
        {searched && data.length === 0 && !searchLoading && !searchError && search && (
          <p>No {searchType} found. Try a different search term.</p>
        )}
        {data.length > 0 && !searchLoading && !searchError &&
          data.map((item) => (
            <div key={item.mal_id} className="anime-item">
              <Link to={`/${searchType}/${item.mal_id}`}>
                <img
                  src={item.images?.jpg?.image_url}
                  alt={item.title}
                  className="search-item-img"
                />
                <h3>{item.title}</h3>
              </Link>
            </div>
          ))}
      </div>

      {trendingLoading && (
        <div id="preloader">
          <div className="loader"></div>
        </div>
      )}

      {errormsg && <div className="error">{errormsg}</div>}

      <div>
        <h2>Trending</h2>
        <div className="anime-list">
          {trendingAnime.length === 0 && !trendingLoading && !trendingError && (
            <p>No trending {searchType} found.</p>
          )}
          {trendingAnime.length > 0 && !trendingLoading &&
            trendingAnime.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
        </div>
      </div>

      <div>
        <h2>{searchType === 'anime' ? 'Anime you may like' : 'Manga you may like'}</h2>
        <div className="anime-list">
          {latestAnime.length === 0 && !latestloading && !errormsg && (
            <p>No {searchType} found.</p>
          )}
          {latestAnime.length > 0 && !latestloading &&
            latestAnime.map((item) => (
              <AnimeCard key={item.mal_id} anime={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
