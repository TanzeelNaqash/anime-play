import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Search = ({ SearchType }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [lastSearch, setLastSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchType, setSearchType] = useState(SearchType || "anime"); 

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (SearchType && SearchType !== searchType) {
      setSearchType(SearchType); 
    }
  }, [SearchType]);  

  const filterContent = (content) => {
    return content.filter((item) => {
      const containsHentai = item.genres?.some((genre) => genre.name.toLowerCase() === 'hentai');
      return !containsHentai;
    });
  };

  // Function to fetch data from Jikan API
  const fetchData = async (e) => {
    e.preventDefault();

    if (search.trim() === "") {
      setError("Please enter a search term");
      setData([]);
      setSearched(true);
      return;
    }

    if (search === lastSearch) {
      return;
    }

    try {
      setLoading(true);
      setError("");
      setLastSearch(search);

      let apiUrl = "";
      if (searchType === "anime") {
        apiUrl = `https://api.jikan.moe/v4/anime?q=${search}`;
      } else if (searchType === "manga") {
        apiUrl = `https://api.jikan.moe/v4/manga?q=${search}`;
      }

      console.log(`Fetching data from: ${apiUrl}`);  

      const response = await axios.get(apiUrl);  
      console.log(response.data); 

      setLoading(false);

      const filteredData = filterContent(response.data.data);

      setData(filteredData);
      setSearched(true);
    } catch (err) {
      setLoading(false);
      setError("Failed to fetch data. Please try again.");
      setData([]);
      setSearched(true);
    }
  };

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
              checked={searchType === "anime"}
              onChange={() => setSearchType("anime")}
            />
            Anime
          </label>
          <label>
            <input
              type="radio"
              name="searchType"
              value="manga"
              checked={searchType === "manga"}
              onChange={() => setSearchType("manga")}
            />
            Manga
          </label>
        </div>
      </div>

      {loading && (
        <div id="preloader">
          <div className="loader"></div>
        </div>
      )}

      {searched && error && <div className="error">{error}</div>}

      {searched && data.length === 0 && !loading && !error && (
        <p>No {searchType} found. Try a different search term.</p>
      )}

      <div className="anime-list">
        {data.length > 0 &&
          data.map((item) => (
            <div key={item.mal_id} className="anime-item">
              <Link to={`/${searchType}/${item.mal_id}`}>
                <img
                  src={item.images?.jpg?.image_url || 'default-image-url'}
                  alt={item.title || 'No Title'}
                />
                <h3>{item.title || 'No Title'}</h3>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
