function FinishScreen({ points, maxPossiblePoints,highscore, dispatch }) {
  const percentage = Math.ceil((points / maxPossiblePoints) * 100);
let emoji;

  if(percentage === 100) emoji = '🥇';
  if(percentage < 100 && percentage >= 75) emoji = '🎉';
  if(percentage < 75 && percentage >= 50) emoji = '🙂';
  if(percentage < 50 && percentage >= 25) emoji = '🤔';
  if(percentage < 25) emoji = '🤦‍♂️';


  return (
    <>
      {" "}
      <p className="result">
        <span>{emoji}</span> You scored {points} out of {maxPossiblePoints} (
        {percentage}%)
      </p>
      <p className="highscore">Your Highscore: {highscore}</p>
      <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "restart" })}
    >Restart</button>
    </>
  );
}

export default FinishScreen;
