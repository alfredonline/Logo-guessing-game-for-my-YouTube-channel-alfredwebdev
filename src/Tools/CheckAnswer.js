const CheckAnswer = (correctAnswer, usersGuess) => {
  if (correctAnswer === usersGuess) {
    return true;
  } else {
    return false;
  }
};

export default CheckAnswer;
