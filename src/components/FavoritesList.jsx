import React from "react";

const FavoritesList = ({ favorites, removeFromFavorites }) => {
  return (
    <div className="favorites-section">
      <h2>⭐ Favorite Movies</h2>
      
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((movie) => (
            <div key={movie.imdbID} className="favorite-card">
              <img src={movie.Poster} alt={movie.Title} />
              <h4>{movie.Title} ({movie.Year})</h4>
              <button onClick={() => removeFromFavorites(movie.imdbID)}>❌ Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
