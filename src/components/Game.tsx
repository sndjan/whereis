import { useState, useEffect } from "react";
import GameCSS from "../modules/Game.module.css";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";

function Game() {
  const [imageUrl, setImageUrl] = useState(
    "https://source.unsplash.com/500x500"
  );
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [bobLoaded, setBobLoaded] = useState(false);
  const [restart, setRestart] = useState(false);
  const [start, setStart] = useState(true);
  const [count, setCount] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [bobOpacity, setBobOpacity] = useState("0.6");

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
    if (start === false) {
      setBobLoaded(true);
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

  const startGame = () => {
    setStart(false);
    setBobLoaded(true);
    updateImage();
  };

  const resetGame = () => {
    setCount(0);
    setTimeElapsed(0);
    updateImage();
    setRestart(false);
    setTimerRunning(false);
  };

  const changeBob = (opacity: string) => {
    setBobOpacity(opacity);
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
          <h1 style={{ marginBottom: "50px" }}>
            WHERE IS BOB?{" "}
            <img src="./images/bob.png" alt="" style={{ width: "30px" }} />
          </h1>
          <div style={{ marginBottom: "60px" }}>
            <ToggleButtonGroup type="radio" name="options" defaultValue={2}>
              <ToggleButton
                id="tbg-radio-1"
                value={1}
                variant="outline-light"
                onChange={() => changeBob(".8")}
              >
                Easy
              </ToggleButton>
              <ToggleButton
                id="tbg-radio-2"
                value={2}
                variant="outline-light"
                onChange={() => changeBob(".6")}
              >
                Medium
              </ToggleButton>
              <ToggleButton
                id="tbg-radio-3"
                value={3}
                variant="outline-light"
                onChange={() => changeBob(".4")}
              >
                Hard
              </ToggleButton>
              <ToggleButton
                id="tbg-radio-4"
                value={4}
                variant="outline-light"
                onChange={() => changeBob(".1")}
              >
                Impossible
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div>
            You found {count}/5 in {formatTime(timeElapsed)}
          </div>
        </div>
        <div
          className={GameCSS.game}
          style={{ position: "relative", width: "500px", height: "500px" }}
        >
          {start && (
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
                borderRadius: "10px",
              }}
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={startGame}
                style={{
                  position: "relative",
                  zIndex: "2",
                }}
              >
                Start
              </button>
            </div>
          )}
          {restart && (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: "1",
                position: "relative",
                backgroundColor: "#0000009c",
                justifyContent: "center",
                borderRadius: "10px",
              }}
            >
              <p style={{ fontSize: "20px" }}>Congrats! You found 5/5 Bobs!</p>
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
              borderRadius: "10px",
            }}
            onLoad={handleBobLoad}
          />
          {bobLoaded && (
            <img
              id="bob"
              src="./images/bob.png"
              alt=""
              style={{
                position: "absolute",
                left: imagePosition.x,
                top: imagePosition.y,
                width: "15px",
                opacity: bobOpacity,
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
