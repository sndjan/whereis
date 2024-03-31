import { useState, useEffect } from "react";
import GameCSS from "../modules/Game.module.css";

function Game() {
  const [imageUrl, setImageUrl] = useState(
    "https://source.unsplash.com/500x500"
  );
  const [imagePosition, setImagePosition] = useState({ x: -335, y: 300 });
  const [bobLoaded, setBobLoaded] = useState(false);
  const [restart, setRestart] = useState(false);
  const [count, setCount] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const updateImage = () => {
    const randomNumber = Math.floor(Math.random() * 500) + 1;
    setImageUrl(`https://source.unsplash.com/500x500?${randomNumber}`);
    setImagePosition({
      x: Math.floor(Math.random() * 400),
      y: Math.floor(Math.random() * 400),
    });
    setBobLoaded(false); // Zurücksetzen, um das "bob.png"-Bild neu zu laden
  };

  const handleBobLoad = () => {
    setBobLoaded(true);
    if (count >= 1 && count <= 4) {
      startTimer();
    }
  };

  const handleBobClick = () => {
    if (count <= 3) {
      updateImage();
    }
    setCount(count + 1);
    stopTimer();
    if (count >= 4) {
      setRestart(true);
      setBobLoaded(false);
    }
  };

  const startTimer = () => {
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  const resetGame = () => {
    setCount(0);
    setTimeElapsed(0);
    setBobLoaded(true);
    setImagePosition({ x: -335, y: 300 });
    setRestart(false);
    setTimerRunning(false);
  };

  useEffect(() => {
    let timer: number | undefined;
    if (timerRunning) {
      timer = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timerRunning]);

  useEffect(() => {
    if (count === 5) {
      stopTimer();
    }
  }, [count]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(ms).padStart(2, "0")}`;
  };

  return (
    <>
      <div className={GameCSS.outerbox}>
        <div className={GameCSS.text}>
          <div>
            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option1"
              autoComplete="off"
            />
            <label className="btn btn-outline-light" htmlFor="option1">
              Easy
            </label>

            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option2"
              autoComplete="off"
              checked
            />
            <label className="btn btn-outline-light" htmlFor="option2">
              Medium
            </label>

            <input
              type="radio"
              className="btn-check"
              name="options"
              id="option3"
              autoComplete="off"
            />
            <label className="btn btn-outline-light" htmlFor="option3">
              Hard
            </label>
          </div>
          <div>Click Bob to start the game!</div>
          <div>{formatTime(timeElapsed)}</div>
        </div>
        <div
          className={GameCSS.game}
          style={{ position: "relative", width: "500px", height: "500px" }}
        >
          {restart && (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                zIndex: "1",
                position: "relative",
                backgroundColor: "#0000009c",
                justifyContent: "center",
              }}
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={resetGame}
                style={{
                  position: "relative",
                  zIndex: "2",
                }}
              >
                Restart
              </button>
            </div>
          )}
          <img
            src={imageUrl}
            alt=""
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
            }}
            onLoad={handleBobLoad}
          />
          {bobLoaded && (
            <img
              src="./images/bob.png"
              alt=""
              style={{
                position: "absolute",
                left: imagePosition.x,
                top: imagePosition.y,
                width: "15px",
                opacity: ".5",
              }}
              onClick={handleBobClick} // Hier den Klick-Handler hinzufügen
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Game;
