import { useState, useEffect } from "react";
import {key} from "../App"


export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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
      //   handleCloseMovie();
      moviesFetching();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
