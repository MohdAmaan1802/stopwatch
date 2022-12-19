import "./styles.css";

import React, { useEffect, useRef, useState } from "react";

function App() {
  const [time, setTime] = useState({ hr: 0, min: 0, sec: 0 });
  const [startVisible, setStartVisible] = useState(true);

  useEffect(() => {
    handleTime();
    setStartVisible(true);
    return clearInterval(id.current);
  }, []);

  const id = useRef();

  function handleTime() {
    setStartVisible(false);
    // setIsPaused(!isPaused);
    id.current = setInterval(() => {
      setTime((prev) => {
        if (prev.sec === 60) {
          return { ...prev, min: prev.min + 1, sec: 0 };
        }
        if (prev.min === 60) {
          return { ...prev, hr: prev.hr + 1, min: 0, sec: 0 };
        }

        return { ...prev, sec: prev.sec + 1 };
      });
    }, 1000);
  }

  function handleStopClick() {
    clearInterval(id.current);
    setStartVisible(true);
  }

  return (
    <div className="App">
      <h1>
        {time.hr.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false
        })}
        :
        {time.min.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false
        })}
        :
        {time.sec.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false
        })}
      </h1>

      <button
        style={{
          backgroundColor: startVisible ? "green" : "red",
          color: "white"
        }}
        onClick={() => {
          startVisible ? handleTime() : handleStopClick();
        }}
      >
        {startVisible === true ? "Start" : "Stop"}
      </button>

      <button
        onClick={() => {
          clearInterval(id.current);
          setTime({ hr: 0, min: 0, sec: 0 });
        }}
      >
        Restart
      </button>
    </div>
  );
}

export default App;
