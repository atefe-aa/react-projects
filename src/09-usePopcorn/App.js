import { useEffect, useState } from "react";
import "./css/index.css";
import  Loader  from "./components/Loader";
import  ErrorMessage  from "./components/ErrorMessage";
import  Navbar  from "./components/Navbar";
import  Search  from "./components/Search";
import  Logo  from "./components/Logo";
import  NumResult  from "./components/NumResult";
import  Main  from "./components/Main";
import  Box  from "./components/Box";
import  MovieList  from "./components/MovieList";
import  MovieDetailes  from "./components/MovieDetailes";
import  WatchedSummery  from "./components/WatchedSummery";
import  WatchedMoviesList  from "./components/WatchedMoviesList";
import { useMovies } from "./customHooks/useMovies";

document.title = `usePopcorn`;

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr?.length, 0);

export const key = "9b708f19";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  //const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(function () {
    //we can set initial value of a state using a simple callback function with a return and NOT calling a function
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });
  const { movies, isLoading, error } = useMovies(query);

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
