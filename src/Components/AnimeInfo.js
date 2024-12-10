import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnimeInfo } from "../Redux/AnimeSlice";
import { useParams } from "react-router-dom";

const AnimeInfo = () => {
  const { id } = useParams(); // Get anime ID from the URL
  const dispatch = useDispatch();
  const { animeInfo, loading, error } = useSelector((state) => state.anime);

  useEffect(() => {
    // Dispatch fetchAnimeInfo action when the component mounts
    dispatch(fetchAnimeInfo(id));
  }, [id, dispatch]);

  if (loading)
    return (
      <div id="preloader">
        <div className="loader"></div>
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!animeInfo) return <div>No anime details found!</div>;

  // Check if images and jpg are defined
  const imageUrl = animeInfo.images?.jpg?.image_url;

  return (
    <div className="anime-info">
      <h1>{animeInfo.title}</h1>
      <img src={imageUrl} alt={animeInfo.title} />
      <p>{animeInfo.synopsis}</p>
      <p>
        <strong>Genre:</strong>{" "}
        {animeInfo.genres?.map((genre) => genre.name).join(", ")}
      </p>
      <p>
        <strong>episodes:</strong> {animeInfo.episodes}
      </p>
      <p>
        <strong>Status:</strong> {animeInfo.status}
      </p>
      <p>
        <strong>Rating:</strong> {animeInfo.score}
      </p>
      <p>
        <strong>Premiered:</strong> {animeInfo.aired?.string}
      </p>
    </div>
  );
};

export default AnimeInfo;
