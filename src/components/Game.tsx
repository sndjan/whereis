import React, { useState, useEffect } from "react";
import GameCSS from "../modules/Game.module.css";

function Game() {
  const [imageUrl, setImageUrl] = useState(
    "https://source.unsplash.com/500x500"
  );
  const [imagePosition, setImagePosition] = useState({ x: -335, y: 300 });
  const [bobLoaded, setBobLoaded] = useState(false);
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
    if (count >= 1 && count <= 5) {
      startTimer();
    }
  };

  const handleBobClick = () => {
    updateImage();
    setCount(count + 1);
    stopTimer();
  };

  const startTimer = () => {
    setTimerRunning(true);
  };

  const stopTimer = () => {
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
          <div>Click Bob to start the game!</div>
          <div>{formatTime(timeElapsed)}</div>
        </div>
        <div
          className={GameCSS.game}
          style={{ position: "relative", width: "500px", height: "500px" }}
        >
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
              src="./public/bob.png"
              alt=""
              style={{
                position: "absolute",
                left: imagePosition.x,
                top: imagePosition.y,
                width: "15px",
                opacity: ".4",
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
