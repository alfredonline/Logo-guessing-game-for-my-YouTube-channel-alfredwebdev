import React from "react";

function WinnerScreen(props) {
  const link =
    "https://media4.giphy.com/media/boNNxI4tHdez3kThsn/giphy.gif?cid=ecf05e47es1pj8aj4uau1mgt5rgixwnaj8o6y92w5so6omwb&rid=giphy.gif&ct=g";
  return (
    <div
      style={{ backgroundImage: "url(" + link + ")" }}
      className="fullScreen"
    >
      <div className="resetGameButton" onClick={() => props.ResetGame()}>
        Play Again
      </div>
    </div>
  );
}

export default WinnerScreen;
