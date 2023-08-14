import { WatchedMovie } from "./WatchedMovie";

export function WatchedMoviesList({ watched, onDelete }) {
  return (
    <ul className="list">
      {watched?.map((movie) => (
        <WatchedMovie movie={movie} onDelete={onDelete} />
      ))}
    </ul>
  );
}
