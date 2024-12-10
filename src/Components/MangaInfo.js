import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMangaInfo } from '../Redux/AnimeSlice';
import { useParams } from 'react-router-dom';

const MangaInfo = () => {
  const { id } = useParams(); // Get manga ID from URL
  const dispatch = useDispatch();
  const { mangaInfo, loading, error } = useSelector((state) => state.anime);

  useEffect(() => {
    
    dispatch(fetchMangaInfo(id));
  }, [id, dispatch]);

  if (loading) return (
    <div id="preloader">
      <div className="loader"></div>
    </div>
  );
  if (error) return <div>Error: {error}</div>;
  if (!mangaInfo) return <div>No manga details found!</div>;

  return (
    <div className='anime-info'>
      <h1>{mangaInfo.title}</h1>
      <img src={mangaInfo.images?.jpg?.image_url} alt={mangaInfo.title} />
      <p>{mangaInfo.synopsis}</p>
      <p><strong>Genre:</strong> {mangaInfo.genres?.map(genre => genre.name).join(', ')}</p>
      <p><strong>Chapters:</strong> {mangaInfo.chapters}</p>
      <p><strong>volumes:</strong> {mangaInfo.volumes}</p>
      <p><strong>Status:</strong> {mangaInfo.status}</p>
      <p><strong>Score:</strong> {mangaInfo.score}</p>
      <p><strong>Published:</strong> {mangaInfo.published?.string}</p>
    </div>
  );
};

export default MangaInfo;
