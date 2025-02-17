import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieCard from "./components/MovieCard";
import FavoritesList from "./components/FavoritesList";
import MovieDetails from "./components/MovieDetails";
import "./index.css";

const API_KEY = "fbf33584"; 

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const searchMovies = async () => {
    if (!searchTerm) return;

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`
      );

      setMovies(response.data.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const addToFavorites = (movie) => {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (imdbID) => {
    const updatedFavorites = favorites.filter((movie) => movie.imdbID !== imdbID);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (savedFavorites) setFavorites(savedFavorites);
  }, []);

  return (
    <Router>
      <div className="app">
        <h1>🎬 Movie Search App</h1>

        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Search for movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && searchMovies()}
                  />
                  <button onClick={searchMovies}>Search</button>
                </div>

                <div className="movie-list">
                  {movies.length > 0 ? (
                    movies.map((movie) => (
                      <MovieCard
                        key={movie.imdbID}
                        movie={movie}
                        addToFavorites={addToFavorites}
                        isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
                      />
                    ))
                  ) : (
                    <p>No movies found.</p>
                  )}
                </div>

                <FavoritesList favorites={favorites} removeFromFavorites={removeFromFavorites} />
              </>
            }
          />

          {/* Movie Details Page */}
          <Route path="/movie/:imdbID" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
