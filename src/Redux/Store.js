import { configureStore } from "@reduxjs/toolkit";
import AnimeReducer from './AnimeSlice'
const Store = configureStore({
    reducer:{
      anime:  AnimeReducer,
    }
})
export default Store;