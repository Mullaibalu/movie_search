import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, addToFavorites, isFavorite }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.imdbID}`}>
        <img src={movie.Poster} alt={movie.Title} />
      </Link>
      
      <h3>{movie.Title} ({movie.Year})</h3>
      {isFavorite ? (
        <button disabled>⭐ Favorite</button>
      ) : (
        <button onClick={() => addToFavorites(movie)}> Add to Favorites</button>
      )}
    </div>
  );
};

export default MovieCard;
