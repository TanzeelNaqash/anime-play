import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  trendingAnime: [],
  randomAnime: [],
  animeInfo: null,
  mangaInfo: null,
  manga: [],
  loading: false,
  error: null
};

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    fetchAnimeStart: (state)=>{
      state.loading = true
      state.error = null
  },
  fetchAnimeSuccess: (state, action)=>{
      state.loading = false
      state.anime = action.payload
},
fetchAnimeFailure: (state, action) => {
  state.loading = false
  state.error = action.payload
},

    setTrendingAnime: (state, action) => {
      state.trendingAnime = action.payload;
    },
    setRandomAnime: (state, action) => {
      state.randomAnime = action.payload;
    },
    setAnimeInfo: (state, action) => {
      state.animeInfo = action.payload;
    },
 
    setManga: (state, action) => {
      state.manga = action.payload;
    },
    setMangaInfo: (state, action) => {
      state.mangaInfo = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});



export const fetchTrendingAnime = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get('https://api.jikan.moe/v4/top/anime');
    dispatch(setTrendingAnime(response.data.data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchRandomAnime = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const randomAnimeList = [];    
    for (let i = 0; i < 10; i++) {
      const response = await axios.get('https://api.jikan.moe/v4/random/anime');
      randomAnimeList.push(response.data.data);  
    }

    
    dispatch(setRandomAnime(randomAnimeList));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchAnimeInfo = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
    dispatch(setAnimeInfo(response.data.data)); 
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};




export const fetchManga = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get('https://api.jikan.moe/v4/top/manga');
    dispatch(setManga(response.data.data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};


export const fetchMangaInfo = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/manga/${id}`);
    dispatch(setMangaInfo(response.data.data));
    console.log(response.data.data)
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const {
   fetchAnimeStart,
    fetchAnimeSuccess,
    fetchAnimeFailure,
  setTrendingAnime,
  setRandomAnime,
  setAnimeInfo,
  setManga,
  setMangaInfo,
  setLoading,
  setError
} = animeSlice.actions;

export default animeSlice.reducer;
