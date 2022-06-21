import React from "react";
import Typography from "@mui/material/Typography"

function LoserScreen(props) {
  const link =
    "https://media1.giphy.com/media/cr9vIO7NsP5cY/giphy.gif?cid=790b7611ac7b40bb0c0415d04b13cd93d507b1318d7a8c4d&rid=giphy.gif&ct=g";
  return (
    <div
      style={{ backgroundImage: "url(" + link + ")" }}
      className="fullScreen"
    >
        <Typography sx={{color: "#fff", fontWeight: "700", fontSize: "20px", textAlign: "center"}}>
        You scored {props.score}

        </Typography>
        <div onClick={() => props.ResetGame()} className="resetGameButton">Reset Game</div>
    </div>
  );
}

export default LoserScreen;
