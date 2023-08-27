import { useEffect } from "react";

function Timer({ remainingSeconds, dispatch }) {
  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        if (remainingSeconds === 0) return dispatch({ type: "finish" });
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch, remainingSeconds]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
}

export default Timer;
