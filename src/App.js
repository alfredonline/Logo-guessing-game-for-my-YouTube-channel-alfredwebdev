import "./App.css";
import Logos from "./Data/Logos";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// screens
import LoserScreen from "./Screens/LoserScreen";

// functions
import CheckAnswer from "./Tools/CheckAnswer";
import ReturnRandomNumber from "./Tools/ReturnRandomNumber";
import WinnerScreen from "./Screens/WinnerScreen";

function App() {
  const [score, setScore] = useState(0);
  const [gameIsFinished, setGameIsFinished] = useState(false); // game is finished is for when the user wins / there are no items in the array left
  const [userHasLost, setUserHasLost] = useState(false);

  const [usersAnswer, setUsersAnswer] = useState("");
  const [currentLogoObject, setCurrentLogoObject] = useState();
  const [isZoomed, setIsZoomed] = useState(true);
  const [blacklistArr, setBlacklistArr] = useState(Array);
  const [arrToSelectFrom, setArrToSelectFrom] = useState(Array);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [canShowFullImg, setCanShowFullImg] = useState(false);

  const FilterArr = () => {
    setBlacklistArr((blacklistArr) => [...blacklistArr, currentLogoObject]);
  };

  useEffect(() => {
    const newArr = Logos.filter((item) => !blacklistArr.includes(item));
    setArrToSelectFrom(newArr);
  }, [blacklistArr]);

  useEffect(() => {
    if (isFirstRender) setIsFirstRender(false);
    if (!isFirstRender) {
      if (arrToSelectFrom.length === 0) {
        setGameIsFinished(true); // user has won the game
      } else {
        setIsZoomed(false);
        setTimeout(() => {
          setIsZoomed(true);
          setCanShowFullImg(false);
          setUsersAnswer("");
          setCurrentLogoObject(
            arrToSelectFrom[ReturnRandomNumber(arrToSelectFrom.length)]
          );
        }, 1000);
      }
    }
  }, [arrToSelectFrom]);

  const CheckAnswerAndUpdateUI = () => {
    const userIsCorrect = CheckAnswer(
      currentLogoObject.name.toLowerCase(),
      usersAnswer.toLowerCase()
    );

    if (userIsCorrect) {
      let scoreNew = score
      scoreNew++
      setScore(scoreNew)
      FilterArr();
      setCanShowFullImg(true);
    } else {
      setUserHasLost(true);
    }
  };

  const ResetGame = () => {
    setScore(0);
    setArrToSelectFrom(Logos);
    setBlacklistArr(Array);
    setUsersAnswer("");
    setGameIsFinished(false);
    setUserHasLost(false);
  };

  useEffect(() => {
    setArrToSelectFrom(Logos);
    setCurrentLogoObject(Logos[ReturnRandomNumber(Logos.length)]);
    console.log(currentLogoObject);
  }, []);

  if (gameIsFinished) {
    return <WinnerScreen ResetGame={() => ResetGame()} />;
  } else if (userHasLost) {
    return <LoserScreen ResetGame={() => ResetGame()} score={score} />;
  } else
    return (
      <Grid
        container
        className="wrapper"
        direction="column"
        justifyItems="center"
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "28px",
            padding: "12px",
            color: "#222",
            textAlign: "center",
          }}
        >
          Guess the Zoomed In Logo
        </Typography>
        <Typography sx={{textAlign: "center", padding: "12px"}}>
          Score: {score}
        </Typography>
        <Grid
          item
          style={{ backgroundImage: "url(" + currentLogoObject?.img + ")" }}
          className={
            isZoomed
              ? "zoomedIn standardImg"
              : canShowFullImg && "zoomedOut standardImg"
          }
          sx={{ margin: "0 auto" }}
        ></Grid>
        <Grid
          item
          sx={{
            display: "flex",
            margin: "0 auto",
            padding: "20px",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <TextField
            value={usersAnswer}
            variant="outlined"
            onChange={(e) => setUsersAnswer(e.target.value)}
          />
          <Button
            variant="filled"
            onClick={() => CheckAnswerAndUpdateUI()}
            sx={{ backgroundColor: "blue", color: "white" }}
          >
            Submit Answer
          </Button>
        </Grid>
      </Grid>
    );
}

export default App;
