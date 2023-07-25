import { useState } from "react";

export default function App() {
  const [cost, setCost] = useState(0);

  const [tip1, setTip1] = useState(0);
  const [tip2, setTip2] = useState(0);

  function resetHandlre() {
    setCost(0);
    setTip1(0);
    setTip2(0);
  }
  return (
    <div>
      <Bill setCost={setCost} cost={cost} />
      <Tip tip={tip1} setTip={setTip1}>
        How did you like the service?
      </Tip>
      <Tip tip={tip2} setTip={setTip2}>
        How did your friend like the service?
      </Tip>
      {cost > 0 && (
        <>
          {" "}
          <Total cost={cost} tip1={tip1} tip2={tip2} />
          <Reset onReset={resetHandlre} />
        </>
      )}
    </div>
  );
}

function Bill({ setCost, cost }) {
  return (
    <div>
      <br />
      <label>How much was the bill?</label>
      <input
        type="text"
        value={cost !== 0 ? cost : ""}
        onChange={(e) => setCost(Number(e.target.value))}
      />
    </div>
  );
}

function Tip({ children, setTip, tip }) {
  function handleTip(e) {
    setTip(Number(e.target.value));
  }
  return (
    <div>
      <br />
      <label>{children}</label>
      <select value={tip} onChange={handleTip}>
        <option value={0}>not satisfied 0%</option>
        <option value={10}>fine 10%</option>
        <option value={20}>amazing 20%</option>
      </select>
    </div>
  );
}

function Total({ cost, tip1, tip2 }) {
  const totalTip = (cost * ((tip1 + tip2) / 2)) / 100;
  return (
    <div>
      <br />
      <strong>
        You pay ${cost + totalTip} (${cost} + ${totalTip} tip)
      </strong>
    </div>
  );
}

function Reset({ onReset }) {
  return (
    <div>
      <br />
      <button onClick={onReset}>Reset</button>
    </div>
  );
}
