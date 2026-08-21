import { useEffect, useState } from "react";

function TMDBMovies() {
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem("tmdbSearchTerm") || "";
  });

  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem("tmdbMovies");

    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("tmdbSearchTerm", searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem(
      "tmdbMovies",
      JSON.stringify(movies)
    );
  }, [movies]);

  async function handleSearch(event) {
    event.preventDefault();

    const trimmedSearch = searchTerm.trim();

    if (trimmedSearch === "") {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          trimmedSearch
        )}&include_adult=false&language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Unable to retrieve movies. Status: ${response.status}`
        );
      }

      const data = await response.json();

      setMovies(data.results);
    } catch (error) {
      console.error("TMDB Search Error:", error);
      setError("Unable to retrieve movie information.");
    } finally {
      setLoading(false);
    }
  }

  function clearSearch() {
    setSearchTerm("");
    setMovies([]);

    localStorage.removeItem("tmdbSearchTerm");
    localStorage.removeItem("tmdbMovies");
  }

  return (
    <section className="tmdb-page">
      <h1>Search TMDB Movies</h1>

      <form
        className="movie-search-form"
        onSubmit={handleSearch}
      >
        <label htmlFor="movie-search">
          Movie Title
        </label>

        <input
          id="movie-search"
          type="text"
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
          placeholder="Enter a movie title"
        />

        <button type="submit">
          Search
        </button>

        {movies.length > 0 && (
          <button
            type="button"
            onClick={clearSearch}
          >
            Clear Results
          </button>
        )}
      </form>

      {loading && <p>Searching...</p>}

      {error && <p>{error}</p>}

      {!loading && movies.length > 0 && (
        <div className="movie-grid">
          {movies.map((movie) => (
            <article
              className="movie-card"
              key={movie.id}
            >
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                />
              )}

              <div className="movie-card-content">
                <h2>{movie.title}</h2>

                <p>
                  <strong>Release Date:</strong>{" "}
                  {movie.release_date ||
                    "Not available"}
                </p>

                <p>
                  <strong>Rating:</strong>{" "}
                  {movie.vote_average
                    ? movie.vote_average.toFixed(1)
                    : "N/A"}
                </p>

                <p>
                  {movie.overview ||
                    "No description available."}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default TMDBMovies;