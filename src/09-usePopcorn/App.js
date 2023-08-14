import { useEffect, useState } from "react";
import "./index.css";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import { Navbar } from "./Navbar";
import { Search } from "./Search";
import { Logo } from "./Logo";
import { NumResult } from "./NumResult";
import { Main } from "./Main";
import { Box } from "./Box";
import { MovieList } from "./MovieList";
import { MovieDetailes } from "./MovieDetailes";
import { WatchedSummery } from "./WatchedSummery";
import { WatchedMoviesList } from "./WatchedMoviesList";

document.title = `usePopcorn`;

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr?.length, 0);

export const key = "9b708f19";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  //const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(function () {
    //we can set initial value of a state using a simple callback function with a return and NOT calling a function
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  useEffect(
    function () {
      const controller = new AbortController();
      async function moviesFetching() {
        try {
          setIsLoading(true);
          setError("");
          //to prevent fetching so many requests at the same time
          const res = await fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Somthing went wrong with fetching movies!");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found!");

          setMovies(data.Search);
          setError(""); //because of rerendering and abort errors
        } catch (err) {
          if (err.name !== "AbortError") {
            // to ignor abort errors
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          //to have the is loading off,after everything is done specially after throwing an error
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      handleCloseMovie();
      moviesFetching();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelect={handleSelectMovie} />
          )}
          {isLoading && <Loader />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetailes
              selectedId={selectedId}
              onAddWatched={handleAddWatched}
              onClose={handleCloseMovie}
              watched={watched}
            />
          ) : (
            <>
              {" "}
              <WatchedSummery watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDelete={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
